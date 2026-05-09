import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../utils/colors';
import { MORNING_TASKS, AFTERNOON_TASKS, EVENING_TASKS } from '../data/routine';
import { loadChecklist, saveChecklist } from '../utils/storage';
import Card from '../components/Card';

const CATEGORY_COLORS = {
  beslenme: '#059669',
  hidrasyon: '#2563EB',
  egzersiz: '#7C3AED',
  kompresyon: '#0891B2',
  takviye: '#D97706',
  cihaz: '#EC4899',
  masaj: '#F472B6',
  uyku: '#6B7280',
};

export default function DailyRoutineScreen() {
  const [checked, setChecked] = useState({});

  useFocusEffect(
    useCallback(() => {
      loadChecklist().then(setChecked);
    }, [])
  );

  async function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    await saveChecklist(next);
  }

  function sectionProgress(tasks) {
    const done = tasks.filter(t => checked[t.id]).length;
    return { done, total: tasks.length };
  }

  function totalProgress() {
    const all = [...MORNING_TASKS, ...AFTERNOON_TASKS, ...EVENING_TASKS];
    const done = all.filter(t => checked[t.id]).length;
    return { done, total: all.length, pct: Math.round((done / all.length) * 100) };
  }

  const total = totalProgress();

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#D97706', '#FCD34D']} style={styles.header}>
        <Text style={styles.headerTitle}>📋 Günlük Rutin</Text>
        <Text style={styles.headerSub}>Bugünkü görevlerini takip et</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Toplam İlerleme</Text>
            <Text style={styles.progressCount}>{total.done}/{total.total} ({total.pct}%)</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${total.pct}%` }]} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <RoutineSection
            title="🌅 Sabah Rutini"
            color="#F59E0B"
            tasks={MORNING_TASKS}
            checked={checked}
            onToggle={toggle}
            progress={sectionProgress(MORNING_TASKS)}
          />
          <RoutineSection
            title="☀️ Gün İçi Rutini"
            color="#2563EB"
            tasks={AFTERNOON_TASKS}
            checked={checked}
            onToggle={toggle}
            progress={sectionProgress(AFTERNOON_TASKS)}
          />
          <RoutineSection
            title="🌙 Akşam Rutini"
            color="#7C3AED"
            tasks={EVENING_TASKS}
            checked={checked}
            onToggle={toggle}
            progress={sectionProgress(EVENING_TASKS)}
          />

          {/* Daily Tips */}
          <Card>
            <Text style={styles.tipsTitle}>💡 Günlük Akılda Tutulacaklar</Text>
            {[
              { icon: '🚶', tip: 'Saatte bir ayağa kalk, 5 dakika yürü' },
              { icon: '💧', tip: 'Günde en az 2 litre su iç' },
              { icon: '🌡️', tip: 'Sıcak ortamdan kaçın, serinlikte kal' },
              { icon: '🧦', tip: 'Kompresyonunu giy ve unut' },
              { icon: '😴', tip: 'Gece 22:00–23:00\'da yat' },
              { icon: '🍽️', tip: 'Her öğünde protein al' },
              { icon: '🧘', tip: 'Strese girme, derin nefes al' },
            ].map((item) => (
              <View key={item.tip} style={styles.tipRow}>
                <Text style={styles.tipIcon}>{item.icon}</Text>
                <Text style={styles.tipText}>{item.tip}</Text>
              </View>
            ))}
          </Card>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RoutineSection({ title, color, tasks, checked, onToggle, progress }) {
  return (
    <View style={sectionStyles.container}>
      <View style={sectionStyles.header}>
        <Text style={sectionStyles.title}>{title}</Text>
        <View style={[sectionStyles.badge, { backgroundColor: color + '20' }]}>
          <Text style={[sectionStyles.badgeText, { color }]}>
            {progress.done}/{progress.total}
          </Text>
        </View>
      </View>
      <View style={sectionStyles.card}>
        {tasks.map((task, idx) => {
          const isDone = !!checked[task.id];
          const catColor = CATEGORY_COLORS[task.category] || COLORS.primary;
          return (
            <TouchableOpacity
              key={task.id}
              style={[
                sectionStyles.taskRow,
                idx === tasks.length - 1 && sectionStyles.taskRowLast,
              ]}
              onPress={() => onToggle(task.id)}
              activeOpacity={0.7}
            >
              <View style={[sectionStyles.checkbox, isDone && { backgroundColor: catColor, borderColor: catColor }]}>
                {isDone && <Text style={sectionStyles.checkmark}>✓</Text>}
              </View>
              <Text style={sectionStyles.taskIcon}>{task.icon}</Text>
              <Text style={[sectionStyles.taskLabel, isDone && sectionStyles.taskLabelDone]}>
                {task.label}
              </Text>
              <View style={[sectionStyles.catDot, { backgroundColor: catColor }]} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: { marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  taskRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  taskRowLast: { borderBottomWidth: 0 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  checkmark: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  taskIcon: { fontSize: 18, marginRight: 10, width: 24, textAlign: 'center' },
  taskLabel: { flex: 1, fontSize: 14, color: COLORS.text },
  taskLabelDone: { textDecorationLine: 'line-through', color: COLORS.textLight },
  catDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 8 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 24 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  headerSub: { color: '#FEF3C7', fontSize: 13, marginTop: 4 },
  progressCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12, padding: 14, marginTop: 16,
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  progressCount: { color: '#FFF8DC', fontSize: 13, fontWeight: '700' },
  progressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#FFFFFF', borderRadius: 3 },
  content: { padding: 16 },
  tipsTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  tipRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  tipIcon: { fontSize: 18, marginRight: 12, width: 24, textAlign: 'center' },
  tipText: { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 18 },
});
