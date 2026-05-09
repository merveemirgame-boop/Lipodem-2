import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { DEVICES, COMPRESSION, MASSAGE_TYPES, CREAMS } from '../data/care';
import Card from '../components/Card';
import RatingStars from '../components/RatingStars';

const TABS = ['Cihazlar', 'Masaj', 'Kompresyon', 'Kremler'];

export default function CareScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState({});

  function toggle(key) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#EC4899', '#F472B6']} style={styles.header}>
        <Text style={styles.headerTitle}>💆 Bakım & Cihazlar</Text>
        <Text style={styles.headerSub}>Lenf, kompresyon ve destekleyici bakım</Text>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === i && styles.tabActive]}
            onPress={() => setActiveTab(i)}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Devices Tab */}
          {activeTab === 0 && (
            <>
              {DEVICES.map((device) => (
                <Card key={device.id} onPress={() => toggle(device.id)}>
                  <View style={styles.deviceHeader}>
                    <View style={[styles.deviceIconBg, { backgroundColor: device.color + '20' }]}>
                      <Text style={styles.deviceIcon}>{device.icon}</Text>
                    </View>
                    <View style={styles.deviceInfo}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      <Text style={styles.deviceEnglish}>{device.englishName}</Text>
                      <RatingStars rating={device.rating} />
                    </View>
                    <Text style={styles.chevron}>{expanded[device.id] ? '▲' : '▼'}</Text>
                  </View>
                  <Text style={styles.deviceDesc}>{device.description}</Text>

                  {expanded[device.id] && (
                    <View style={styles.deviceDetail}>
                      <Text style={styles.detailLabel}>✅ Faydaları</Text>
                      {device.benefits.map((b) => (
                        <View key={b} style={styles.bulletRow}>
                          <Text style={styles.bullet}>●</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}

                      <View style={styles.usageBox}>
                        <Text style={styles.usageLabel}>⏱ Kullanım</Text>
                        <Text style={styles.usageValue}>{device.usage}</Text>
                      </View>

                      <Text style={styles.detailLabel}>💡 İpuçları</Text>
                      {device.tips.map((tip) => (
                        <View key={tip} style={styles.bulletRow}>
                          <Text style={[styles.bullet, { color: device.color }]}>●</Text>
                          <Text style={styles.bulletText}>{tip}</Text>
                        </View>
                      ))}

                      <View style={styles.cautionBox}>
                        <Text style={styles.cautionIcon}>⚠️</Text>
                        <Text style={styles.cautionText}>{device.caution}</Text>
                      </View>
                    </View>
                  )}
                </Card>
              ))}
            </>
          )}

          {/* Massage Tab */}
          {activeTab === 1 && (
            <>
              <View style={styles.infoBanner}>
                <Text style={styles.infoBannerText}>
                  🙌 Manuel lenf drenajı (MLD), lipödemde birinci sıra tedavi seçeneğidir.
                  Sertifikalı lenf terapistiyle çalışmanız önerilir.
                </Text>
              </View>

              {MASSAGE_TYPES.map((massage) => (
                <Card key={massage.name}>
                  {massage.recommended && (
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedText}>⭐ Önerilen</Text>
                    </View>
                  )}
                  <View style={styles.massageHeader}>
                    <Text style={styles.massageIcon}>{massage.icon}</Text>
                    <View style={styles.massageInfo}>
                      <Text style={styles.massageName}>{massage.name}</Text>
                      <Text style={styles.massageEnglish}>{massage.englishName}</Text>
                    </View>
                  </View>
                  <Text style={styles.massageDesc}>{massage.description}</Text>

                  <View style={styles.massageBenefits}>
                    {massage.benefits.map((b) => (
                      <View key={b} style={styles.benefitChip}>
                        <Text style={styles.benefitText}>{b}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.frequencyBox}>
                    <Text style={styles.frequencyLabel}>📅 Sıklık:</Text>
                    <Text style={styles.frequencyValue}>{massage.frequency}</Text>
                  </View>

                  <Text style={styles.detailLabel}>💡 İpuçları</Text>
                  {massage.tips.map((tip) => (
                    <View key={tip} style={styles.bulletRow}>
                      <Text style={[styles.bullet, { color: massage.color }]}>●</Text>
                      <Text style={styles.bulletText}>{tip}</Text>
                    </View>
                  ))}
                </Card>
              ))}
            </>
          )}

          {/* Compression Tab */}
          {activeTab === 2 && (
            <>
              <View style={styles.infoBanner}>
                <Text style={styles.infoBannerText}>
                  🧦 Kompresyon lipödemde ana tedavilerden biridir. Özellikle uçuş,
                  uzun oturma ve sıcak havalarda mutlaka kullanın.
                </Text>
              </View>

              {COMPRESSION.map((item) => (
                <Card key={item.name}>
                  <View style={styles.compHeader}>
                    <Text style={styles.compIcon}>{item.icon}</Text>
                    <View>
                      <Text style={styles.compName}>{item.name}</Text>
                      <Text style={styles.compDesc}>{item.description}</Text>
                    </View>
                  </View>

                  <Text style={styles.detailLabel}>Basınç Seviyeleri</Text>
                  {item.levels.map((level) => (
                    <View key={level} style={styles.levelRow}>
                      <View style={[styles.levelDot, { backgroundColor: item.color }]} />
                      <Text style={styles.levelText}>{level}</Text>
                    </View>
                  ))}

                  <Text style={[styles.detailLabel, { marginTop: 10 }]}>Ne Zaman Giyilmeli?</Text>
                  {item.when.map((w) => (
                    <View key={w} style={styles.bulletRow}>
                      <Text style={[styles.bullet, { color: item.color }]}>●</Text>
                      <Text style={styles.bulletText}>{w}</Text>
                    </View>
                  ))}
                </Card>
              ))}
            </>
          )}

          {/* Creams Tab */}
          {activeTab === 3 && (
            <>
              <View style={styles.creamDisclaimer}>
                <Text style={styles.creamDisclaimerText}>
                  💄 Kremler tek başına lipödem tedavisi değildir. Ancak sistemik
                  tedaviyi destekleyebilir.
                </Text>
              </View>

              {CREAMS.map((cream) => (
                <Card key={cream.name} padding={14}>
                  <View style={styles.creamRow}>
                    <Text style={styles.creamIcon}>{cream.icon}</Text>
                    <View style={styles.creamInfo}>
                      <Text style={styles.creamName}>{cream.name}</Text>
                      <Text style={styles.creamBenefit}>{cream.benefit}</Text>
                    </View>
                  </View>
                </Card>
              ))}

              <Card>
                <Text style={styles.detailLabel}>💡 Krem Uygulama İpuçları</Text>
                {[
                  'Lenf drenajı sonrası uygulayın',
                  'Dairesel hareketlerle masaj yapın',
                  'Alttan yukarıya doğru uygulayın',
                  'Nemli cilde daha iyi emilir',
                  'Sıcak duş sonrası etkili olabilir',
                ].map((tip) => (
                  <View key={tip} style={styles.bulletRow}>
                    <Text style={[styles.bullet, { color: COLORS.secondary }]}>●</Text>
                    <Text style={styles.bulletText}>{tip}</Text>
                  </View>
                ))}
              </Card>
            </>
          )}

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
  headerSub: { color: '#FCE7F3', fontSize: 13, marginTop: 4 },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1, paddingVertical: 7,
    borderRadius: 8, alignItems: 'center',
  },
  tabActive: { backgroundColor: '#FCE7F3' },
  tabText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: '#BE185D' },
  content: { padding: 16 },
  deviceHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  deviceIconBg: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  deviceIcon: { fontSize: 26 },
  deviceInfo: { flex: 1 },
  deviceName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  deviceEnglish: { fontSize: 11, color: COLORS.textSecondary, fontStyle: 'italic', marginBottom: 4 },
  deviceDesc: { fontSize: 13, color: COLORS.textSecondary, marginTop: 8 },
  chevron: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 8 },
  deviceDetail: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  detailLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 3 },
  bullet: { fontSize: 10, color: COLORS.primary, marginRight: 8, marginTop: 4 },
  bulletText: { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 18 },
  usageBox: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: 8, padding: 10,
    marginVertical: 10,
  },
  usageLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 4 },
  usageValue: { fontSize: 13, color: COLORS.text },
  cautionBox: {
    flexDirection: 'row', backgroundColor: '#FEF3C7', borderRadius: 8,
    padding: 10, marginTop: 8, alignItems: 'flex-start',
  },
  cautionIcon: { fontSize: 14, marginRight: 6 },
  cautionText: { flex: 1, fontSize: 12, color: '#78350F', lineHeight: 18 },
  infoBanner: {
    backgroundColor: '#F0FDF4', borderRadius: 12, padding: 12,
    marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#059669',
  },
  infoBannerText: { fontSize: 13, color: '#065F46', lineHeight: 18 },
  massageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  massageIcon: { fontSize: 26, marginRight: 12 },
  massageInfo: { flex: 1 },
  massageName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  massageEnglish: { fontSize: 11, color: COLORS.textSecondary, fontStyle: 'italic' },
  massageDesc: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 10 },
  massageBenefits: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  benefitChip: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  benefitText: { fontSize: 11, color: COLORS.primary, fontWeight: '500' },
  frequencyBox: {
    flexDirection: 'row', backgroundColor: COLORS.surfaceAlt,
    borderRadius: 8, padding: 10, marginBottom: 10,
  },
  frequencyLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginRight: 6 },
  frequencyValue: { flex: 1, fontSize: 12, color: COLORS.text },
  recommendedBadge: {
    backgroundColor: '#FEF9C3', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
    alignSelf: 'flex-start', marginBottom: 10,
  },
  recommendedText: { fontSize: 11, fontWeight: '700', color: '#713F12' },
  compHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  compIcon: { fontSize: 28, marginRight: 12 },
  compName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  compDesc: { fontSize: 12, color: COLORS.textSecondary },
  levelRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  levelDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  levelText: { fontSize: 13, color: COLORS.text },
  creamDisclaimer: {
    backgroundColor: '#FDF2F8', borderRadius: 12, padding: 12,
    marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#EC4899',
  },
  creamDisclaimerText: { fontSize: 13, color: '#9D174D', lineHeight: 18 },
  creamRow: { flexDirection: 'row', alignItems: 'center' },
  creamIcon: { fontSize: 24, marginRight: 12 },
  creamInfo: { flex: 1 },
  creamName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  creamBenefit: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
});
