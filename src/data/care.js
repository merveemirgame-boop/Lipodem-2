export const DEVICES = [
  {
    id: 'pressotherapy',
    name: 'Presoterapi',
    englishName: 'Pressotherapy',
    icon: '🫧',
    color: '#7C3AED',
    rating: 5,
    description: 'Lipödemde en faydalı cihazlardan biri.',
    benefits: [
      'Lenf akışını aktive eder',
      'Ödem azaltır',
      'Dolaşımı hızlandırır',
      'Bacak ağırlığını hafifletir',
    ],
    usage: '20–45 dakika seans, haftada 3–5 kez',
    tips: [
      'Aşırı basınç ayarından kaçının',
      'Düzenli kullanım önemlidir',
      'Seans öncesi iyi hidrate olun',
      'Sonrasında yürüyüş yapın',
    ],
    caution: 'Aktif infeksiyon, DVT veya kalp yetmezliğinde kullanmayın',
  },
  {
    id: 'rf',
    name: 'RF (Radyo Frekans)',
    englishName: 'Radiofrequency Therapy',
    icon: '📡',
    color: '#2563EB',
    rating: 3,
    description: 'Destekleyici cihaz, tek başına yeterli değil.',
    benefits: [
      'Cilt sıkılığını artırır',
      'Selülit görünümünü iyileştirir',
      'Dolaşım desteği sağlar',
      'Kollajen üretimini uyarır',
    ],
    usage: 'Haftada 1–2 kez profesyonel uygulama',
    tips: [
      'Yeterli su için',
      'Uygulama sonrası masaj faydalı',
      'Sonuçlar için sabırlı olun',
    ],
    caution: 'Metal implant olan bölgelere uygulamayın',
  },
  {
    id: 'redlight',
    name: 'Kırmızı Işık Terapisi',
    englishName: 'Red Light Therapy',
    icon: '🔴',
    color: '#EF4444',
    rating: 4,
    description: 'İnflamasyon ve iyileşme desteği.',
    benefits: [
      'İnflamasyonu azaltır',
      'Hücresel iyileşmeyi hızlandırır',
      'Dolaşımı destekler',
      'Ağrıyı azaltabilir',
    ],
    usage: 'Günlük 10–20 dakika, etkilenen bölgelere',
    tips: [
      'Gözleri koruyun',
      'Tutarlı günlük kullanım önemli',
      'Temiz cilde uygulayın',
      '660 nm ve 850 nm dalga boyu etkili',
    ],
    caution: 'Fotosensitif ilaç kullanıyorsanız dikkatli olun',
  },
];

export const COMPRESSION = [
  {
    name: 'Kompresyon Çorabı',
    icon: '🧦',
    color: '#7C3AED',
    description: 'Günlük kullanım için ideal',
    levels: ['15–20 mmHg: Hafif ödem', '20–30 mmHg: Orta şiddet', '30–40 mmHg: Ağır ödem'],
    when: ['Uzun yürüyüşler', 'Seyahat ve uçuş', 'Uzun süre ayakta durma', 'Sıcak hava'],
  },
  {
    name: 'Medikal Lenf Taytı',
    icon: '👖',
    color: '#EC4899',
    description: 'Bacak ve kalça bölgesi için',
    levels: ['Sınıf I: Günlük kullanım', 'Sınıf II: Tedavi amaçlı', 'Flat knit: Özel lipödem taytı'],
    when: ['Egzersiz sırasında', 'Ödem yoğun günlerde', 'Seyahat', 'Uzun oturma seansları'],
  },
];

export const MASSAGE_TYPES = [
  {
    name: 'Manuel Lenf Drenajı',
    englishName: 'Manual Lymphatic Drainage',
    icon: '🙌',
    color: '#7C3AED',
    recommended: true,
    description: 'Lipödemde birinci sıra tedavi.',
    benefits: ['Lenf akışını artırır', 'Ödem azaltır', 'Ağırlık hissini hafifletir', 'Ağrıyı azaltır'],
    frequency: 'Haftada 1–3 kez profesyonel, günlük hafif kendi kendine',
    tips: [
      'Sertifikalı lenf terapisti tercih edin',
      'Lipödem deneyimi olan terapist seçin',
      'Çok hafif dokunuşla yapılır',
      'Sonrasında kompresyon giyin',
    ],
  },
  {
    name: 'Kendi Kendine Lenf Masajı',
    englishName: 'Self Lymphatic Drainage',
    icon: '💆',
    color: '#059669',
    recommended: true,
    description: 'Günlük rutine ekleyebileceğiniz hafif masaj.',
    benefits: ['Uygun maliyetli', 'Her gün yapılabilir', 'Lenf akışını destekler'],
    frequency: 'Sabah veya akşam günlük 10–15 dakika',
    tips: [
      'Çok hafif dokunuş kullanın',
      'Lenf düğüm noktalarına doğru çalışın',
      'Kasık, koltuk altı, boyuna doğru yönlendirin',
      'Yağ veya hafif yağlı losyon kullanın',
    ],
  },
];

export const CREAMS = [
  { name: 'Kafein Jel', benefit: 'Dolaşımı hızlandırır, selülit görünümünü azaltır', icon: '☕' },
  { name: 'At Kestanesi Jeli', benefit: 'Venöz dolaşım ve şişlik için', icon: '🌰' },
  { name: 'Centella Asiatica', benefit: 'Bağ dokusu onarımı', icon: '🌿' },
  { name: 'Mentol İçerikli Kremler', benefit: 'Serinletici ve ağır his azaltıcı', icon: '❄️' },
  { name: 'Escin Bazlı Kremler', benefit: 'Damar tonusu ve ödem', icon: '💧' },
  { name: 'Retinol Body Lotion', benefit: 'Cilt sıkılığı ve görünümü', icon: '✨' },
];
