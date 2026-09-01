import crypto from 'crypto';

export interface AuditEntry {
  tenantId: string;
  action: string;
  actor: string;
  previousHash: string;
  timestamp: string;
  data: any;
}

export function createAuditRecord(
  tenantId: string,
  action: string,
  actor: string,
  previousHash: string,
  data: any
): { entry: AuditEntry; currentHash: string } {
  const timestamp = new Date().toISOString();
  const entry: AuditEntry = { tenantId, action, actor, previousHash, timestamp, data };
  const payload = JSON.stringify(entry);
  const currentHash = crypto.createHash('sha256').update(payload).digest('hex');
  return { entry, currentHash };
}
