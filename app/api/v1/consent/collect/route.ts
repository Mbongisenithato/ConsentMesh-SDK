import { NextResponse } from 'next/server';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { checkTierLimit } from '@/lib/billing/limits';

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION }));

export async function POST(req: Request) {
  try {
    const { userId, domain } = await req.json();
    const currentMonthYear = new Date().toISOString().slice(0, 7); // Format: YYYY-MM

    // 1. Fetch user profile for tier and active domains
    const userResult = await docClient.send(new GetCommand({
      TableName: process.env.DYNAMODB_USERS_TABLE,
      Key: { userId },
    }));

    const user = userResult.Item;
    if (!user) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // 2. Fetch current month usage ledger
    const ledgerKey = \#\;
    const ledgerResult = await docClient.send(new GetCommand({
      TableName: process.env.DYNAMODB_USAGE_TABLE,
      Key: { PK: ledgerKey },
    }));

    const currentEvents = ledgerResult.Item?.consentCount || 0;
    const domainCount = user.activeDomains?.length || 1;

    // 3. Enforce tier limits
    const validation = checkTierLimit(user.tier, currentEvents, domainCount);
    if (!validation.allowed) {
      return NextResponse.json({ error: validation.reason }, { status: 403 });
    }

    // 4. Increment usage count in DynamoDB
    await docClient.send(new UpdateCommand({
      TableName: process.env.DYNAMODB_USAGE_TABLE,
      Key: { PK: ledgerKey },

      UpdateExpression: 'ADD consentCount :inc SET lastEventTimestamp = :ts',
      ExpressionAttributeValues: {
        ':inc': 1,
        ':ts': new Date().toISOString(),
      },
    }));

    return NextResponse.json({ success: true, recorded: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
