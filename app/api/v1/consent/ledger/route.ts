import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-west-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
      return NextResponse.json({ error: 'Missing tenantId parameter' }, { status: 400 });
    }

    const queryResult = await ddbDocClient.send(
      new QueryCommand({
        TableName: 'ConsentAuditLedger',
        KeyConditionExpression: 'TenantID = :tenantId',
        ExpressionAttributeValues: { ':tenantId': tenantId },
        ScanIndexForward: false, // Return newest cryptographic records first
      })
    );

    return NextResponse.json({ success: true, logs: queryResult.Items || [] }, { status: 200 });
  } catch (error: any) {
    console.error('Ledger query failure:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}