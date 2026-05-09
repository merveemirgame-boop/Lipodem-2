import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { SUPPLEMENTS } from '../data/supplements';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function SupplementsScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <Text style={styles.headerTitle}>💊 Takviye Rehberi</Text>
        <Text style={styles.headerSub}>Kişiye özel değişir. Doktor onayı alın.</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTitle}>⚠️ Önemli Uyarı</Text>
            <Text style={styles.disclaimerText}>
              Takviyeler ilaç yerine geçmez. Başlamadan önce doktorunuza danışın,
              özellikle ilaç kullanıyorsanız. Bilgiler genel bilgi amaçlıdır.
            </Text>
          </View>

          {SUPPLEMENTS.map((supp) => (
            <Card key={supp.id} onPress={() => setSelected(selected === supp.id ? null : supp.id)}>
              <View style={styles.suppHeader}>
                <View style={[styles.suppIconBg, { backgroundColor: supp.color + '20' }]}>
                  <Text style={styles.suppIcon}>{supp.icon}</Text>
                </View>
                <View style={styles.suppInfo}>
                  <Text style={styles.suppName}>{supp.name}</Text>
                  <Text style={styles.suppEnglish}>{supp.englishName}</Text>
                  <Badge
                    label={supp.priority}
                    color={supp.priorityColor + '20'}
                    textColor={supp.priorityColor}
                    small
                  />
                </View>
                <Text style={styles.chevron}>{selected === supp.id ? '▲' : '▼'}</Text>
              </View>

              {selected === supp.id && (
                <View style={styles.suppDetail}>
                  {/* Benefits */}
                  <Text style={styles.detailTitle}>✅ Faydaları</Text>
                  <View style={styles.benefitsRow}>
                    {supp.benefits.map((b) => (
                      <View key={b} style={styles.benefitChip}>
                        <Text style={styles.benefitText}>{b}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Usage */}
                  <View style={styles.usageBox}>
                    <View style={styles.usageRow}>
                      <Text style={styles.usageLabel}>💉 Doz</Text>
                      <Text style={styles.usageValue}>{supp.dosage}</Text>
                    </View>
                    <View style={styles.usageDivider} />
                    <View style={styles.usageRow}>
                      <Text style={styles.usageLabel}>⏰ Zamanlama</Text>
                      <Text style={styles.usageValue}>{supp.timing}</Text>
                    </View>
                  </View>

                  {/* Note */}
                  <View style={styles.noteBox}>
                    <Text style={styles.noteTitle}>📌 Not</Text>
                    <Text style={styles.noteText}>{supp.note}</Text>
                  </View>

                  {/* Caution */}
                  <View style={styles.cautionBox}>
                    <Text style={styles.cautionTitle}>⚠️ Dikkat</Text>
                    <Text style={styles.cautionText}>{supp.caution}</Text>
                  </View>
                </View>
              )}
            </Card>
          ))}

          {/* Stack Summary */}
          <Text style={styles.stackTitle}>🌟 Temel Takviye Paketi</Text>
          <Card>
            {[
              { icon: '🐟', name: 'Omega-3', note: 'Her gün, yemekle' },
              { icon: '💊', name: 'Magnezyum Glisinat', note: 'Gece yatmadan' },
              { icon: '🍊', name: 'C Vitamini', note: 'Sabah' },
              { icon: '☀️', name: 'D Vitamini + K2', note: 'Yağlı yemekle' },
              { icon: '🌿', name: 'Diosmin + Hesperidin', note: 'Yemekle birlikte' },
            ].map((item, idx) => (
              <View
                key={item.name}
                style={[styles.stackRow, idx === 4 && styles.stackRowLast]}
              >
                <Text style={styles.stackIcon}>{item.icon}</Text>
                <Text style={styles.stackName}>{item.name}</Text>
                <Text style={styles.stackNote}>{item.note}</Text>
              </View>
            ))}
          </Card>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 24 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  headerSub: { color: '#DDD6FE', fontSize: 13, marginTop: 4 },
  content: { padding: 16 },
  disclaimer: {
    backgroundColor: '#FEF3C7', borderRadius: 12, padding: 12,
    marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#F59E0B',
  },
  disclaimerTitle: { fontSize: 13, fontWeight: '700', color: '#92400E', marginBottom: 4 },
  disclaimerText: { fontSize: 12, color: '#78350F', lineHeight: 18 },
  suppHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  suppIconBg: {
    width: 50, height: 50, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  suppIcon: { fontSize: 24 },
  suppInfo: { flex: 1, gap: 4 },
  suppName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  suppEnglish: { fontSize: 12, color: COLORS.textSecondary, fontStyle: 'italic' },
  chevron: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 8 },
  suppDetail: { marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  detailTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  benefitsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  benefitChip: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  benefitText: { fontSize: 12, color: COLORS.primary, fontWeight: '500' },
  usageBox: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: 10, padding: 12, marginBottom: 10,
  },
  usageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  usageDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  usageLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  usageValue: { fontSize: 13, color: COLORS.text, fontWeight: '500', flex: 1, textAlign: 'right' },
  noteBox: {
    backgroundColor: '#EFF6FF', borderRadius: 8, padding: 10, marginBottom: 8,
  },
  noteTitle: { fontSize: 12, fontWeight: '700', color: '#1D4ED8', marginBottom: 4 },
  noteText: { fontSize: 12, color: COLORS.text, lineHeight: 18 },
  cautionBox: {
    backgroundColor: '#FEF9C3', borderRadius: 8, padding: 10,
  },
  cautionTitle: { fontSize: 12, fontWeight: '700', color: '#854D0E', marginBottom: 4 },
  cautionText: { fontSize: 12, color: '#713F12', lineHeight: 18 },
  stackTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 10, marginTop: 8 },
  stackRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  stackRowLast: { borderBottomWidth: 0 },
  stackIcon: { fontSize: 20, marginRight: 12, width: 28, textAlign: 'center' },
  stackName: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.text },
  stackNote: { fontSize: 12, color: COLORS.textSecondary },
});
