import { Platform, StyleSheet, Text, View, Button, Switch, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

export default function App() {
  const [isPro, setIsPro] = useState(false);
  const [agentAccess, setAgentAccess] = useState(false); // Pro feature state

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    const apiKey = Platform.OS === 'ios' ? 'test_nytOHfvkSRoWbuADzXvjoWxobPT' : 'test_nytOHfvkSRoWbuADzXvjoWxobPT';
    Purchases.configure({ apiKey });
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      if (typeof customerInfo.entitlements.active['ConsentMesh Pro'] !== "undefined") {
        setIsPro(true);
      }
    } catch (e) {
      console.log("Error fetching customer info", e);
    }
  };

  const handleUpgrade = async () => {
    if (Platform.OS === 'web') {
      alert("RevenueCat native paywalls render on iOS and Android devices. For web billing, configure a Web Purchase Link!");
    } else {
      const paywallResult = await RevenueCatUI.presentPaywall();
      if (paywallResult === PAYWALL_RESULT.PURCHASED || paywallResult === PAYWALL_RESULT.RESTORED) {
        setIsPro(true);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛡️ ConsentMesh Dashboard</Text>
      <Text style={[styles.badge, { backgroundColor: isPro ? '#d4edda' : '#fff3cd' }]}>
        Status: {isPro ? "ConsentMesh Pro Unlocked 🔒" : "Free Tier (Restricted)"}
      </Text>

      {!isPro ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unlock Full Data Sovereignty</Text>
          <Text style={styles.cardText}>Upgrade to Pro to enable instant agent revocation and granular permission controls.</Text>
          <Button title="Upgrade to Pro" onPress={handleUpgrade} color="#007AFF" />
        </View>
      ) : (
        <View style={styles.cardPro}>
          <Text style={styles.cardTitlePro}>⚡ Pro Agent Control Center</Text>
          <View style={styles.row}>
            <Text style={styles.rowText}>Allow AI Agents to Access Training Data Streams</Text>
            <Switch 
              value={agentAccess} 
              onValueChange={(val) => setAgentAccess(val)} 
            />
          </View>
          <Text style={styles.statusNote}>
            {agentAccess ? "🟢 Active: Agents are streaming authorized data." : "🔴 Revoked: All agent access is blocked."}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  badge: { fontSize: 14, fontWeight: '600', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, overflow: 'hidden', marginBottom: 30 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '100%', maxWidth: 400, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardPro: { backgroundColor: '#e2f0cb', padding: 20, borderRadius: 12, width: '100%', maxWidth: 400, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  cardTitlePro: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#2b580c' },
  cardText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  rowText: { flex: 1, marginRight: 10, fontSize: 14, color: '#333' },
  statusNote: { fontSize: 12, fontStyle: 'italic', color: '#444', marginTop: 10 }
});