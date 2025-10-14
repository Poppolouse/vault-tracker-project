# COMPONENT LIBRARY
## Vault Tracker - Component Dokümantasyonu

> **Amaç:** Tüm UI component'lerinin dokümantasyonu ve kullanım kılavuzu  
> **Durum:** 🚧 Geliştirme Aşamasında  
> **Son Güncelleme:** 14.10.2025

---

## 📋 COMPONENT KATEGORİLERİ

### 1. 🧭 Navigation Components
- **Navbar:** Ana navigasyon çubuğu
- **Sidebar:** Yan menü
- **Breadcrumb:** Sayfa yolu göstergesi
- **Tabs:** Sekme navigasyonu

### 2. 🎮 Game Components
- **GameCard:** Oyun kartı
- **GameGrid:** Oyun ızgarası
- **GameDetails:** Oyun detay paneli
- **GameProgress:** İlerleme göstergesi

### 3. 📊 Dashboard Components
- **DashboardGrid:** Ana dashboard ızgarası
- **StatCard:** İstatistik kartı
- **ChartWidget:** Grafik widget'ı
- **ProgressWidget:** İlerleme widget'ı

### 4. 🎨 UI Components
- **Button:** Butonlar
- **Input:** Form inputları
- **Modal:** Modal pencereler
- **Tooltip:** Bilgi baloncukları

### 5. 📱 Layout Components
- **Container:** Ana kapsayıcı
- **Grid:** Izgara sistemi
- **Card:** Kart bileşeni
- **Section:** Bölüm bileşeni

### 6. 🔧 Utility Components
- **Loading:** Yükleme göstergeleri
- **Error:** Hata mesajları
- **Empty:** Boş durum göstergeleri
- **Search:** Arama bileşenleri

---

## 📚 COMPONENT DOKÜMANTASYONU

### 🧭 Navigation Components

#### Navbar
```typescript
// Henüz tasarlanmadı - Design Hub'da test edilecek
interface NavbarProps {
  // TBD
}
```

**Durum:** ⏳ Bekliyor  
**Tasarım:** Design Hub'da test edilecek  
**Varyantlar:** Henüz oluşturulmadı

#### Sidebar
```typescript
// Henüz tasarlanmadı
interface SidebarProps {
  // TBD
}
```

**Durum:** ⏳ Bekliyor  
**Tasarım:** Design Hub'da test edilecek  
**Varyantlar:** Henüz oluşturulmadı

---

### 🎮 Game Components

#### GameCard
```typescript
// Henüz tasarlanmadı
interface GameCardProps {
  // TBD
}
```

**Durum:** ⏳ Bekliyor  
**Tasarım:** Design Hub'da test edilecek  
**Varyantlar:** Henüz oluşturulmadı

---

### 📊 Dashboard Components

#### DashboardGrid
```typescript
// Henüz tasarlanmadı
interface DashboardGridProps {
  // TBD
}
```

**Durum:** ⏳ Bekliyor  
**Tasarım:** Design Hub'da test edilecek  
**Varyantlar:** Henüz oluşturulmadı

---

## 🎯 TASARIM SÜRECI

### 1. Design Hub'da Test
Her component önce HUB.html'de test edilir:
1. Component seçilir
2. "Tasarım Başlat" tıklanır
3. Komut panoya kopyalanır
4. Claude'a yapıştırılır

### 2. Varyant Oluşturma
Claude 4 farklı varyant oluşturur:
- **Varyant A:** Minimal tasarım
- **Varyant B:** Modern tasarım
- **Varyant C:** Detaylı tasarım
- **Varyant D:** Alternatif yaklaşım

### 3. Onay Süreci
- En iyi varyant seçilir
- `approved/` klasörüne taşınır
- Bu dokümantasyon güncellenir
- Ana projede implement edilir

---

## ✅ ONAY DURUMU

### Onaylanan Component'ler
- [ ] Henüz hiçbiri onaylanmadı

### Tasarım Aşamasında
- [ ] Tüm component'ler Design Hub'da test edilecek

### Bekleyen Tasarımlar
- [x] Navbar
- [x] Sidebar
- [x] GameCard
- [x] DashboardGrid
- [x] Button
- [x] Modal
- [x] Loading
- [x] Search

---

## 🔄 GÜNCELLEME SÜRECI

1. **HUB.html'de Seçim:** Component seçilir
2. **Claude Tasarım:** 4 varyant oluşturulur
3. **Onay:** En iyi varyant seçilir
4. **Dokümantasyon:** Bu dosya güncellenir
5. **Implementation:** Ana projede kodlanır

---

## 📁 DOSYA YAPISI

```
design-docs/
├── pending/          # Henüz onaylanmamış tasarımlar
├── approved/         # Onaylanmış tasarımlar
└── docs/
    ├── DESIGN_SYSTEM.md
    ├── COMPONENT_LIBRARY.md  # Bu dosya
    └── CHANGELOG.md
```

---

## 🔗 REFERANSLAR

- **DESIGN-WORKFLOW.md:** Tasarım süreci detayları
- **DESIGN_SYSTEM.md:** Tasarım sistemi
- **HUB.html:** Component test ortamı
- **VAULT-DASHBOARD-SYSTEM.md:** Dashboard sistemi

---

*Bu dokümantasyon her component tasarımı sonrasında güncellenecektir.*