import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../utils/colors';
import { PRIORITY_LIST } from '../data/routine';
import { loadChecklist, saveChecklist, loadWaterCount, saveWaterCount } from '../utils/storage';
import Card from '../components/Card';

const { width } = Dimensions.get('window');

const QUICK_CHECKS = [
  { id: 'morning_protein', label: 'Protein kahvaltı', icon: '🥚' },
  { id: 'morning_walk', label: 'Yürüyüş', icon: '🚶' },
  { id: 'morning_compression', label: 'Kompresyon', icon: '🧦' },
  { id: 'evening_cycling', label: 'Bisiklet/Egzersiz', icon: '🚴' },
  { id: 'evening_pressotherapy', label: 'Presoterapi', icon: '🫧' },
  { id: 'evening_sleep', label: 'Erken uyku', icon: '😴' },
];

export default function HomeScreen({ navigation }) {
  const [checked, setChecked] = useState({});
  const [water, setWater] = useState(0);
  const today = new Date();
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const dateStr = `${dayNames[today.getDay()]}, ${today.getDate()} ${monthNames[today.getMonth()]}`;

  useFocusEffect(
    useCallback(() => {
      loadChecklist().then(setChecked);
      loadWaterCount().then(setWater);
    }, [])
  );

  async function toggleCheck(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    await saveChecklist(next);
  }

  async function addWater() {
    if (water >= 12) return;
    const next = water + 1;
    setWater(next);
    await saveWaterCount(next);
  }

  async function removeWater() {
    if (water <= 0) return;
    const next = water - 1;
    setWater(next);
    await saveWaterCount(next);
  }

  const doneCount = QUICK_CHECKS.filter(t => checked[t.id]).length;
  const progress = doneCount / QUICK_CHECKS.length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
          <Text style={styles.greeting}>Merhaba 👋</Text>
          <Text style={styles.date}>{dateStr}</Text>
          <Text style={styles.tagline}>Lipödem yönetim rehberin</Text>

          {/* Progress */}
          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Bugünkü İlerleme</Text>
              <Text style={styles.progressCount}>{doneCount}/{QUICK_CHECKS.length}</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Water Tracker */}
          <Card>
            <View style={styles.waterRow}>
              <Text style={styles.waterTitle}>💧 Su Takibi</Text>
              <Text style={styles.waterGoal}>Hedef: 8 bardak</Text>
            </View>
            <View style={styles.waterGlasses}>
              {Array.from({ length: 8 }, (_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={i < water ? removeWater : addWater}
                  style={[styles.glass, i < water && styles.glassFilled]}
                >
                  <Text style={styles.glassIcon}>{i < water ? '💧' : '○'}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.waterCount}>{water} bardak içildi</Text>
          </Card>

          {/* Quick Checklist */}
          <Card>
            <Text style={styles.sectionTitle}>✅ Günlük Kontrol Listesi</Text>
            {QUICK_CHECKS.map((task, idx) => (
              <TouchableOpacity
                key={task.id}
                style={[styles.checkRow, idx === QUICK_CHECKS.length - 1 && styles.checkRowLast]}
                onPress={() => toggleCheck(task.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, checked[task.id] && styles.checkboxDone]}>
                  {checked[task.id] && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={styles.checkIcon}>{task.icon}</Text>
                <Text style={[styles.checkLabel, checked[task.id] && styles.checkLabelDone]}>
                  {task.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Card>

          {/* Quick Nav */}
          <Text style={styles.sectionTitle}>📚 Bölümler</Text>
          <View style={styles.navGrid}>
            {[
              { label: 'Beslenme', icon: '🥗', screen: 'Beslenme', color: '#059669' },
              { label: 'Egzersiz', icon: '🚴', screen: 'Egzersiz', color: '#2563EB' },
              { label: 'Takviyeler', icon: '💊', screen: 'Takviyeler', color: '#7C3AED' },
              { label: 'Bakım', icon: '💆', screen: 'Bakim', color: '#EC4899' },
              { label: 'Rutin', icon: '📋', screen: 'GunlukRutin', color: '#D97706' },
              { label: 'Öncelikler', icon: '🏆', screen: null, color: '#EF4444' },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.navItem, { borderLeftColor: item.color }]}
                onPress={() => item.screen && navigation.navigate(item.screen)}
                activeOpacity={0.8}
              >
                <Text style={styles.navIcon}>{item.icon}</Text>
                <Text style={styles.navLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Priority List */}
          <Card>
            <Text style={styles.sectionTitle}>🏆 En Çok Fark Yaratanlar</Text>
            {PRIORITY_LIST.map((item) => (
              <View key={item.rank} style={styles.priorityRow}>
                <View style={[styles.rankBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.rankText}>{item.rank}</Text>
                </View>
                <Text style={styles.priorityIcon}>{item.icon}</Text>
                <Text style={styles.priorityLabel}>{item.title}</Text>
              </View>
            ))}
          </Card>

          {/* Info Banner */}
          <LinearGradient colors={['#F3E8FF', '#EDE9FE']} style={styles.infoBanner}>
            <Text style={styles.infoTitle}>⚠️ Önemli Hatırlatma</Text>
            <Text style={styles.infoText}>
              Lipödemde "tek mucize çözüm" yoktur. En iyi sonuç; beslenme, egzersiz,
              kompresyon, lenf bakımı ve uyku kombinasyonundan gelir.
              Sabırlı ve sürdürülebilir bir rutin kurun.
            </Text>
          </LinearGradient>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  greeting: { color: '#E9D5FF', fontSize: 14, fontWeight: '600' },
  date: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginTop: 2 },
  tagline: { color: '#C4B5FD', fontSize: 13, marginTop: 4 },
  progressCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  progressCount: { color: '#E9D5FF', fontSize: 13, fontWeight: '700' },
  progressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#FFFFFF', borderRadius: 3 },
  content: { padding: 16 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    marginTop: 4,
  },
  waterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  waterTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  waterGoal: { fontSize: 12, color: COLORS.textSecondary },
  waterGlasses: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  glass: {
    width: 36, height: 36, borderRadius: 8,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  glassFilled: { backgroundColor: '#DBEAFE', borderColor: '#2563EB' },
  glassIcon: { fontSize: 18 },
  waterCount: { marginTop: 10, fontSize: 13, color: COLORS.textSecondary, textAlign: 'center' },
  checkRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  checkRowLast: { borderBottomWidth: 0 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  checkboxDone: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  checkMark: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  checkIcon: { fontSize: 18, marginRight: 10, width: 24, textAlign: 'center' },
  checkLabel: { flex: 1, fontSize: 14, color: COLORS.text },
  checkLabelDone: { textDecorationLine: 'line-through', color: COLORS.textLight },
  navGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  navItem: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  navIcon: { fontSize: 22, marginRight: 10 },
  navLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  priorityRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  rankBadge: {
    width: 26, height: 26, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  rankText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  priorityIcon: { fontSize: 18, marginRight: 10, width: 24, textAlign: 'center' },
  priorityLabel: { flex: 1, fontSize: 14, color: COLORS.text, fontWeight: '500' },
  infoBanner: {
    borderRadius: 16, padding: 16, marginTop: 4,
    borderWidth: 1, borderColor: '#DDD6FE',
  },
  infoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.primaryDark, marginBottom: 6 },
  infoText: { fontSize: 13, color: COLORS.text, lineHeight: 20 },
});
