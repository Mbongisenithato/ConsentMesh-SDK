import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ConsentTranscript({ tenantId }: { tenantId: string }) {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/v1/consent/ledger?tenantId=${tenantId}`)
      .then(res => res.json())
      .then(data => setAuditLogs(data.logs || []))
      .catch(err => console.error('Failed to load transcript:', err));
  }, [tenantId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cryptographic Audit Transcript</Text>
      <FlatList
        data={auditLogs}
        keyExtractor={(item) => item['ConsentTimestamp#EventID']}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.bold}>User ID: {item.UserId}</Text>
            <Text>Status: {item.ConsentStatus ? 'Opt-In' : 'Opt-Out'}</Text>
            <Text style={styles.timestamp}>Timestamp: {item.CreatedAt}</Text>
            <Text style={styles.hash} numberOfLines={1}>SHA-256 Hash: {item.CurrentHash}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  card: { padding: 12, marginBottom: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6 },
  bold: { fontWeight: '600' },
  timestamp: { fontSize: 12, color: '#555', marginTop: 4 },
  hash: { fontSize: 10, color: '#888', marginTop: 4, fontFamily: 'monospace' },
});