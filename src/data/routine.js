export const MORNING_TASKS = [
  { id: 'morning_protein', label: 'Protein ağırlıklı kahvaltı', icon: '🥚', category: 'beslenme' },
  { id: 'morning_water', label: 'Sabah 2 bardak su', icon: '💧', category: 'hidrasyon' },
  { id: 'morning_walk', label: 'Sabah yürüyüşü (15–30 dk)', icon: '🚶', category: 'egzersiz' },
  { id: 'morning_compression', label: 'Kompresyon giy', icon: '🧦', category: 'kompresyon' },
  { id: 'morning_supplements', label: 'Sabah takviyeleri al', icon: '💊', category: 'takviye' },
  { id: 'morning_rebounding', label: 'Rebounder (10 dk)', icon: '⬆️', category: 'egzersiz' },
];

export const AFTERNOON_TASKS = [
  { id: 'afternoon_move', label: 'Her saat ayağa kalk & yürü', icon: '🚶', category: 'egzersiz' },
  { id: 'afternoon_water', label: 'Öğle su içimi', icon: '💧', category: 'hidrasyon' },
  { id: 'afternoon_lowcarb', label: 'Düşük karbonhidrat öğle', icon: '🥗', category: 'beslenme' },
  { id: 'afternoon_stretch', label: 'Kısa esneme molası', icon: '🧘', category: 'egzersiz' },
];

export const EVENING_TASKS = [
  { id: 'evening_cycling', label: 'Bisiklet veya yürüyüş', icon: '🚴', category: 'egzersiz' },
  { id: 'evening_pressotherapy', label: 'Presoterapi (30 dk)', icon: '🫧', category: 'cihaz' },
  { id: 'evening_lymph', label: 'Hafif lenf masajı', icon: '💆', category: 'masaj' },
  { id: 'evening_redlight', label: 'Kırmızı ışık terapisi', icon: '🔴', category: 'cihaz' },
  { id: 'evening_magnesium', label: 'Magnezyum al', icon: '💊', category: 'takviye' },
  { id: 'evening_sleep', label: 'Erken uyku (22:00–23:00)', icon: '😴', category: 'uyku' },
];

export const HABIT_GOALS = [
  {
    id: 'water',
    label: 'Su',
    target: 8,
    unit: 'bardak',
    icon: '💧',
    color: '#2563EB',
  },
  {
    id: 'sleep',
    label: 'Uyku',
    target: 8,
    unit: 'saat',
    icon: '😴',
    color: '#7C3AED',
  },
  {
    id: 'steps',
    label: 'Adım',
    target: 10000,
    unit: 'adım',
    icon: '🦶',
    color: '#059669',
  },
];

export const PRIORITY_LIST = [
  { rank: 1, title: 'Kilo Kontrolü', icon: '⚖️', color: '#7C3AED' },
  { rank: 2, title: 'İnflamasyonu Düşür', icon: '🔥', color: '#EF4444' },
  { rank: 3, title: 'Kompresyon', icon: '🧦', color: '#2563EB' },
  { rank: 4, title: 'Düzenli Düşük Darbeli Egzersiz', icon: '🚴', color: '#059669' },
  { rank: 5, title: 'Lenf Drenajı', icon: '💆', color: '#EC4899' },
  { rank: 6, title: 'Kaliteli Uyku', icon: '😴', color: '#6B7280' },
  { rank: 7, title: 'Stres Azaltma', icon: '🧘', color: '#D97706' },
  { rank: 8, title: 'Sürdürülebilir Rutin', icon: '🔄', color: '#0891B2' },
];
