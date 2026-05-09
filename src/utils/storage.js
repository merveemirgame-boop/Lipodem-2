import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  DAILY_CHECKLIST: 'daily_checklist_',
  WATER_COUNT: 'water_count_',
  NOTES: 'notes_',
};

function todayKey() {
  return new Date().toISOString().split('T')[0];
}

export async function loadChecklist() {
  try {
    const key = KEYS.DAILY_CHECKLIST + todayKey();
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveChecklist(data) {
  try {
    const key = KEYS.DAILY_CHECKLIST + todayKey();
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

export async function loadWaterCount() {
  try {
    const key = KEYS.WATER_COUNT + todayKey();
    const raw = await AsyncStorage.getItem(key);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export async function saveWaterCount(count) {
  try {
    const key = KEYS.WATER_COUNT + todayKey();
    await AsyncStorage.setItem(key, String(count));
  } catch {}
}
