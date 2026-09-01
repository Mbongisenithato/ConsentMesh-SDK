import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});
const docClient = DynamoDBDocumentClient.from(client);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenantId, consentId } = body;

    if (!tenantId) {
      return NextResponse.json({ error: 'Missing tenantId' }, { status: 400 });
    }

    const date = new Date();
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const ledgerKey = `TENANT#${tenantId}#MONTH#${yearMonth}`;

    return NextResponse.json({ success: true, consentId, ledgerKey });
  } catch (error: any) {
    console.error('Consent collection error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

