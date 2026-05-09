import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { EXERCISES, AVOID_EXERCISES } from '../data/exercise';
import Card from '../components/Card';
import RatingStars from '../components/RatingStars';

export default function ExerciseScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#2563EB', '#60A5FA']} style={styles.header}>
        <Text style={styles.headerTitle}>🚴 Egzersiz Rehberi</Text>
        <Text style={styles.headerSub}>Düşük darbeli egzersizler lipödem için idealdir</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Rule Banner */}
          <View style={styles.ruleBanner}>
            <Text style={styles.ruleTitle}>📌 Temel Kural</Text>
            <Text style={styles.ruleText}>
              Yüksek darbeli egzersizler bazı kişilerde durumu kötüleştirebilir.
              Ancak tamamen hareketsizlik çok daha kötüdür.
              Düşük–orta yoğunlukta düzenli hareket hedefleyin.
            </Text>
          </View>

          {/* Exercise Cards */}
          <Text style={styles.sectionTitle}>✅ Önerilen Egzersizler</Text>
          {EXERCISES.map((ex) => (
            <Card key={ex.id} onPress={() => setSelected(selected === ex.id ? null : ex.id)}>
              <View style={styles.exHeader}>
                <View style={[styles.exIconBg, { backgroundColor: ex.color + '20' }]}>
                  <Text style={styles.exIcon}>{ex.icon}</Text>
                </View>
                <View style={styles.exInfo}>
                  <Text style={styles.exName}>{ex.name}</Text>
                  <RatingStars rating={ex.rating} />
                  <Text style={styles.exDesc}>{ex.description}</Text>
                </View>
                <Text style={styles.exChevron}>{selected === ex.id ? '▲' : '▼'}</Text>
              </View>

              {selected === ex.id && (
                <View style={styles.exDetail}>
                  <Text style={styles.exDetailText}>{ex.details}</Text>

                  <View style={styles.exMeta}>
                    <View style={styles.exMetaItem}>
                      <Text style={styles.exMetaLabel}>⏱ Süre</Text>
                      <Text style={styles.exMetaValue}>{ex.duration}</Text>
                    </View>
                    <View style={styles.exMetaItem}>
                      <Text style={styles.exMetaLabel}>📅 Sıklık</Text>
                      <Text style={styles.exMetaValue}>{ex.frequency}</Text>
                    </View>
                    <View style={styles.exMetaItem}>
                      <Text style={styles.exMetaLabel}>💪 Yoğunluk</Text>
                      <Text style={styles.exMetaValue}>{ex.intensity}</Text>
                    </View>
                  </View>

                  <Text style={styles.tipsTitle}>💡 İpuçları</Text>
                  {ex.tips.map((tip) => (
                    <View key={tip} style={styles.tipRow}>
                      <Text style={[styles.tipDot, { color: ex.color }]}>●</Text>
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>
          ))}

          {/* Avoid */}
          <Text style={styles.sectionTitle}>⚠️ Dikkatli Olunması Gerekenler</Text>
          <Card>
            {AVOID_EXERCISES.map((item, idx) => (
              <View
                key={item.name}
                style={[styles.avoidRow, idx === AVOID_EXERCISES.length - 1 && styles.avoidRowLast]}
              >
                <Text style={styles.avoidIcon}>{item.icon}</Text>
                <View style={styles.avoidRight}>
                  <Text style={styles.avoidName}>{item.name}</Text>
                  <Text style={styles.avoidReason}>{item.reason}</Text>
                </View>
              </View>
            ))}
          </Card>

          {/* Weekly Plan */}
          <Text style={styles.sectionTitle}>📅 Örnek Haftalık Plan</Text>
          <Card>
            {[
              { day: 'Pazartesi', activity: '🚶 Yürüyüş 30–45 dk', type: 'Kardio' },
              { day: 'Salı', activity: '🚴 Sabit Bisiklet 30 dk', type: 'Düşük Darbe' },
              { day: 'Çarşamba', activity: '🧘 Pilates veya Yoga 45 dk', type: 'Güç + Esneme' },
              { day: 'Perşembe', activity: '🚶 Yürüyüş 30 dk + ⬆️ Rebounder 15 dk', type: 'Lenf' },
              { day: 'Cuma', activity: '🏊 Yüzme veya 🚴 Bisiklet 30 dk', type: 'Kardio' },
              { day: 'Cumartesi', activity: '🧘 Yoga + 🚶 Hafif Yürüyüş', type: 'Aktif Dinlenme' },
              { day: 'Pazar', activity: '😴 Tam Dinlenme veya 🚶 Hafif Yürüyüş', type: 'Dinlenme' },
            ].map((row, idx) => (
              <View key={row.day} style={[styles.planRow, idx === 6 && styles.planRowLast]}>
                <Text style={styles.planDay}>{row.day}</Text>
                <View style={styles.planRight}>
                  <Text style={styles.planActivity}>{row.activity}</Text>
                  <View style={styles.planTypeBadge}>
                    <Text style={styles.planTypeText}>{row.type}</Text>
                  </View>
                </View>
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
  headerSub: { color: '#BFDBFE', fontSize: 13, marginTop: 4 },
  content: { padding: 16 },
  ruleBanner: {
    backgroundColor: '#EFF6FF', borderRadius: 12, padding: 14,
    marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#2563EB',
  },
  ruleTitle: { fontSize: 14, fontWeight: '700', color: '#1D4ED8', marginBottom: 6 },
  ruleText: { fontSize: 13, color: COLORS.text, lineHeight: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 10, marginTop: 8 },
  exHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  exIconBg: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  exIcon: { fontSize: 26 },
  exInfo: { flex: 1 },
  exName: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  exDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4, lineHeight: 16 },
  exChevron: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 8, marginTop: 4 },
  exDetail: { marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  exDetailText: { fontSize: 13, color: COLORS.text, lineHeight: 20, marginBottom: 12 },
  exMeta: { flexDirection: 'row', backgroundColor: COLORS.surfaceAlt, borderRadius: 10, padding: 10, marginBottom: 12 },
  exMetaItem: { flex: 1, alignItems: 'center' },
  exMetaLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 2 },
  exMetaValue: { fontSize: 12, fontWeight: '600', color: COLORS.text, textAlign: 'center' },
  tipsTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 3 },
  tipDot: { fontSize: 10, marginRight: 8, marginTop: 4 },
  tipText: { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 18 },
  avoidRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  avoidRowLast: { borderBottomWidth: 0 },
  avoidIcon: { fontSize: 22, marginRight: 12, width: 28, textAlign: 'center' },
  avoidRight: { flex: 1 },
  avoidName: { fontSize: 14, fontWeight: '700', color: '#DC2626' },
  avoidReason: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  planRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  planRowLast: { borderBottomWidth: 0 },
  planDay: { fontSize: 12, fontWeight: '700', color: COLORS.primary, width: 80 },
  planRight: { flex: 1 },
  planActivity: { fontSize: 13, color: COLORS.text },
  planTypeBadge: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 4,
  },
  planTypeText: { fontSize: 10, color: COLORS.primary, fontWeight: '600' },
});
