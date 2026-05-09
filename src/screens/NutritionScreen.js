import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { AVOID_FOODS, GOOD_FOODS, DIET_MODELS } from '../data/nutrition';
import Card from '../components/Card';

const TABS = ['Yenilmemeli', 'Yenilmeli', 'Beslenme Modeli'];

export default function NutritionScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState({});

  function toggleExpand(key) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#059669', '#34D399']} style={styles.header}>
        <Text style={styles.headerTitle}>🥗 Beslenme Rehberi</Text>
        <Text style={styles.headerSub}>Lipödem için en kritik alan</Text>
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {activeTab === 0 && (
            <>
              <View style={styles.warningBanner}>
                <Text style={styles.warningText}>
                  ⚠️ Bu gıdaları tüketmek inflamasyonu, ödemi ve lipödem semptomlarını kötüleştirebilir.
                </Text>
              </View>
              {AVOID_FOODS.map((group) => (
                <Card key={group.category}>
                  <TouchableOpacity
                    style={styles.groupHeader}
                    onPress={() => toggleExpand(group.category)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.groupLeft}>
                      <Text style={styles.groupIcon}>{group.icon}</Text>
                      <Text style={styles.groupTitle}>{group.category}</Text>
                    </View>
                    <Text style={styles.chevron}>{expanded[group.category] ? '▲' : '▼'}</Text>
                  </TouchableOpacity>
                  {expanded[group.category] && (
                    <View style={styles.itemList}>
                      {group.items.map((item) => (
                        <View key={item} style={styles.avoidItem}>
                          <View style={[styles.dot, { backgroundColor: group.color }]} />
                          <Text style={styles.avoidItemText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </Card>
              ))}
            </>
          )}

          {activeTab === 1 && (
            <>
              <View style={styles.goodBanner}>
                <Text style={styles.goodBannerText}>
                  ✅ Bu besinler lipödem semptomlarını hafifletir ve vücudu destekler.
                </Text>
              </View>
              {GOOD_FOODS.map((group) => (
                <Card key={group.category}>
                  <TouchableOpacity
                    style={styles.groupHeader}
                    onPress={() => toggleExpand(group.category + '_good')}
                    activeOpacity={0.7}
                  >
                    <View style={styles.groupLeft}>
                      <Text style={styles.groupIcon}>{group.icon}</Text>
                      <View>
                        <Text style={styles.groupTitle}>{group.category}</Text>
                        <Text style={styles.groupDesc}>{group.description}</Text>
                      </View>
                    </View>
                    <Text style={styles.chevron}>
                      {expanded[group.category + '_good'] ? '▲' : '▼'}
                    </Text>
                  </TouchableOpacity>
                  {expanded[group.category + '_good'] && (
                    <View style={styles.itemList}>
                      {group.items.map((item) => (
                        <View key={item.name} style={styles.goodItem}>
                          <View style={styles.goodItemLeft}>
                            <View style={[styles.dot, { backgroundColor: group.color }]} />
                            <Text style={styles.goodItemName}>{item.name}</Text>
                          </View>
                          <Text style={styles.goodItemTip}>💡 {item.tip}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </Card>
              ))}
            </>
          )}

          {activeTab === 2 && (
            <>
              <Text style={styles.modelIntro}>
                Lipödemde farklı beslenme modelleri uygulanabilir. En az 4 hafta düzenli
                uygulayarak vücudunuzun tepkisini gözlemleyin.
              </Text>
              {DIET_MODELS.map((model) => (
                <Card key={model.name}>
                  <View style={styles.modelRow}>
                    <Text style={styles.modelIcon}>{model.icon}</Text>
                    <View style={styles.modelTextBlock}>
                      <Text style={styles.modelName}>{model.name}</Text>
                      <Text style={styles.modelDesc}>{model.description}</Text>
                    </View>
                    {model.suitable && (
                      <View style={styles.suitableBadge}>
                        <Text style={styles.suitableText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.modelDetails}>{model.details}</Text>
                </Card>
              ))}
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
  headerSub: { color: '#A7F3D0', fontSize: 13, marginTop: 4 },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1, paddingVertical: 8,
    borderRadius: 8, alignItems: 'center',
  },
  tabActive: { backgroundColor: '#D1FAE5' },
  tabText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: '#059669' },
  scroll: { flex: 1 },
  content: { padding: 16 },
  warningBanner: {
    backgroundColor: '#FEE2E2', borderRadius: 12, padding: 12,
    marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#EF4444',
  },
  warningText: { fontSize: 13, color: '#991B1B', lineHeight: 18 },
  goodBanner: {
    backgroundColor: '#D1FAE5', borderRadius: 12, padding: 12,
    marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#059669',
  },
  goodBannerText: { fontSize: 13, color: '#065F46', lineHeight: 18 },
  groupHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  groupLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  groupIcon: { fontSize: 22, marginRight: 10 },
  groupTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  groupDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2, maxWidth: 240 },
  chevron: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 8 },
  itemList: { marginTop: 12 },
  avoidItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  avoidItemText: { fontSize: 14, color: COLORS.text },
  goodItem: { paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  goodItemLeft: { flexDirection: 'row', alignItems: 'center' },
  goodItemName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  goodItemTip: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2, marginLeft: 18 },
  modelIntro: {
    fontSize: 13, color: COLORS.textSecondary, lineHeight: 20,
    marginBottom: 12, backgroundColor: COLORS.surfaceAlt,
    padding: 12, borderRadius: 10,
  },
  modelRow: { flexDirection: 'row', alignItems: 'flex-start' },
  modelIcon: { fontSize: 24, marginRight: 12 },
  modelTextBlock: { flex: 1 },
  modelName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  modelDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  suitableBadge: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#D1FAE5', alignItems: 'center', justifyContent: 'center',
  },
  suitableText: { color: '#059669', fontSize: 14, fontWeight: '700' },
  modelDetails: { fontSize: 13, color: COLORS.textSecondary, marginTop: 10, lineHeight: 18 },
});
