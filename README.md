# Lipödem Rehberi — Mobil Uygulama

Lipödem yönetimi için kapsamlı rehber uygulaması. React Native + Expo ile geliştirilmiştir.

## Özellikler

- **Ana Sayfa** — Günlük su takibi, kontrol listesi, ilerleme çubuğu
- **Beslenme Rehberi** — Yenmemesi/yenmesi gerekenler, beslenme modelleri
- **Egzersiz Rehberi** — Önerilen egzersizler, haftalık program
- **Takviye Rehberi** — Lipödem için en çok kullanılan takviyeler
- **Bakım & Cihazlar** — Presoterapi, RF, kırmızı ışık, masaj, kompresyon, kremler
- **Günlük Rutin Takibi** — Sabah/öğle/akşam görev listesi

## Kurulum

```bash
npm install
npx expo start
```

## Mağaza Yayını

### Android (Play Store)
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile production
eas submit --platform android
```

### iOS (App Store)
```bash
eas build --platform ios --profile production
eas submit --platform ios
```

## Gereksinimler

- Node.js 18+
- Expo CLI
- EAS CLI (mağaza yayını için)
- Apple Developer hesabı (iOS için)
- Google Play Console hesabı (Android için)
