# VAULT TRACKER - PROJE DOKÜMANTASYONU

> **Versiyon:** 2.0  
> **Son Güncelleme:** 2025-01-20  
> **Durum:** Kuruluma Hazır ✅

---

## 🎯 PROJE HAKKINDA

**Vault Tracker**, oyun kütüphanesi yönetimi ve ilerleme takibi için geliştirilmiş bir web uygulamasıdır. Proje, **blok tabanlı oyun sistemi** ve **özelleştirilebilir dashboard** ile oyun deneyimini organize eder.

### Ana Özellikler

1. **🎮 Block System**
   - 3 oyun = 1 blok = 1 cycle
   - RPG → Story → Strategy sırası
   - 39 blok, 117 oyun
   - Sıralı ilerleme (paralel değil)

2. **📊 Customizable Dashboard**
   - 12-column grid system
   - Drag & drop kartlar
   - Resize handles
   - Lock system
   - Pattern-based layouts (H/V/S)

3. **🛠️ Design Tools**
   - ✋ Element Picker (element seç ve değiştir)
   - 📐 Boundary Tool (sınır belirle)
   - ➕ Add Tool (yeni element ekle)
   - 🌐 Preview Mode (context'te test)

4. **🏠 Design Hub**
   - Kategori sistemi (6 kategori)
   - Keyword-based arama
   - State persistence
   - View history
   - Varyant yönetimi

---

## 📚 DOSYA YAPISI

Bu proje 7 ana dokümandan oluşur:

### 1. **README.md** (bu dosya)
**Ne içerir:**
- Genel bakış
- Dosya açıklamaları
- Hızlı başlangıç
- Proje durumu

**Ne zaman oku:**
- İlk kez projeye bakıyorsan
- Hangi dosyaya ne zaman bakacağını bilmiyorsan

---

### 2. **INSTALLATION-GUIDE.md** (10 KB) 🆕
**Ne içerir:**
- Adım adım kurulum talimatları
- İki aşamalı yaklaşım (Design Hub → Main Site)
- Phase-by-phase breakdown
- Her phase için checklist ve süre tahmini
- Git workflow önerileri

**Ne zaman oku:**
- Kuruluma başlamadan ÖNCE (ilk oku!)
- Her phase başında referans
- Takıldığında troubleshooting

**Ne zaman kullan:**
- Projeyi sıfırdan kurarken
- Phase ilerlemesini takip ederken
- Checklist'leri kontrol ederken

---

### 3. **SYSTEM-ARCHITECTURE.md** (27 KB)
**Ne içerir:**
- Login → Hub → App Selection akışı
- Route yapısı
- Auth sistemi (şimdilik auto-login)
- Vault Tracker entegrasyonu
- State management yapısı
- **🎮 Block System:** 3 oyun = 1 blok = 1 cycle
- **📊 Block Progress Sidebar:** Tracking panel (grid dışında)
- **📥 CSV Import:** Oyun verilerinin yüklenmesi
- **🎯 Completion Criteria:** Her oyun tipinin bitirme kuralları
- **🛠️ Design Tools:** 4 tool sistemi (picker/boundary/add/preview)

**Ne zaman oku:**
- Projeye yeni başlarken (ilk dosya)
- Genel mimariyi anlamak için
- Route/navigation mantığı için
- Blok sistemini öğrenmek için
- Tool sistemlerini anlamak için

---

### 4. **VAULT-DASHBOARD-SYSTEM.md** (18 KB)
**Ne içerir:**
- Grid sistemi (12 col, 120px cells, 16px gap)
- 16 kart boyutu tanımı
- Pattern sistemi (Horizontal/Vertical/Square)
- Edit mode mantığı (drag/drop/resize/lock)
- State management detayları

**Ne zaman oku:**
- Dashboard sistemini anlamak için
- Grid/pattern logic için
- Edit mode özelliklerini öğrenmek için

**NOT:** Tasarım detayı içermez, sadece sistem mantığı.

---

### 5. **DESIGN-WORKFLOW.md** (31 KB)
**Ne içerir:**
- Varyant sistemi nasıl çalışır
- 4 varyant tipi (Havalı/Sade/Detaylı/Görsel)
- Dallanma mantığı (sınırsız level)
- HUB.html kullanımı
- Onay/red süreci
- **🛠️ Design Tools:** Element Picker, Boundary Tool, Add Tool detayları
- **🌐 Preview Mode:** Site üzerinde context testing
- **🏠 HUB Features:** Kategori, arama, filter, state persistence

**Ne zaman oku:**
- Tasarım sürecine başlamadan önce
- Varyant sistemini anlamak için
- HUB.html'i kullanırken
- Preview mode ve tool'ları öğrenmek için

**NOT:** Gerçek tasarım örneği içermez, sadece süreç ve araçlar.

---

### 6. **CLAUDE-IMPLEMENTATION-GUIDE.md** (29 KB)
**Ne içerir:**
- Trae IDE'deki Claude için talimatlar
- 13 phase implementation planı (Block + Preview eklendi)
- Kod örnekleri (placeholder'larla)
- Tasarım konuşması kuralları
- Checklist'ler
- Tool implementation detayları

**Ne zaman oku:**
- Trae IDE'de kod yazmaya başlarken
- Her phase öncesi
- Tasarım konuşması yaparken
- Tool sistemlerini implement ederken

**NOT:** Bu dosya Trae'deki Claude'a verilecek.

---

### 7. **PROMPT-GUIDE.md** (14 KB) 🌟
**Ne içerir:**
- Hazır prompt şablonları
- Her işlem için kopyala-yapıştır komutlar
- **🛠️ Tool Prompts:** Element Picker, Boundary Tool, Add Tool komutları
- Yaygın hatalar ve çözümleri
- Başarılı prompt örnekleri
- Sorun giderme talimatları

**Ne zaman oku:**
- Trae'de Claude ile çalışırken YANINDA TUT
- Her major işlem öncesi ilgili prompt'u kopyala
- Claude yanlış yaptığında düzeltme prompt'u
- Tool kullanırken

**NOT:** Bu en pratik dosya - hep aç tut!

---

## 🚀 HIZLI BAŞLANGIÇ

### 1. Dokümantasyonu Oku

```
1. README.md (bu dosya) - Genel bakış
2. INSTALLATION-GUIDE.md - Kurulum planı
3. SYSTEM-ARCHITECTURE.md - Mimari
4. Diğer dosyalar - İhtiyaca göre
```

### 2. Kuruluma Başla

```bash
# Trae IDE'de:
1. INSTALLATION-GUIDE.md'yi aç
2. Phase 1'den başla
3. Her phase'i sırayla tamamla
4. Test checklist'leri kontrol et
```

### 3. Tasarım Süreci

```bash
# Kurulum tamamlandıktan sonra:
1. HUB.html'i aç
2. İlk component için tasarım iste
3. 4 varyant al
4. Tools ile düzenle
5. Onayla
```

---

## 📊 PROJE DURUMU

### Yapıldı:
- ✅ Sistem mimarisi tanımlandı
- ✅ Grid sistemi belirlendi (12 col, 120px cells, 16px gap)
- ✅ Pattern sistemi belirlendi (H/V/S)
- ✅ Edit mode özellikleri belirlendi (drag/drop/resize/lock)
- ✅ Tasarım workflow'u tanımlandı (varyant sistemi)
- ✅ **Block System:** 3 oyun = 1 blok = 1 cycle (RPG → Story → Strategy)
- ✅ **Block Progress Sidebar:** Dashboard dışında tracking panel
- ✅ **Preview Mode:** Tasarımları site üzerinde görme sistemi
- ✅ **CSV Import:** Oyun verilerinin nasıl yükleneceği
- ✅ **Completion Criteria:** Her oyun tipinin bitirme kuralları
- ✅ **Design Tools:** Element Picker, Boundary Tool, Add Tool sistemi
- ✅ **HUB System:** Kategori, arama, state persistence
- ✅ **Installation Guide:** 24 phase detaylı kurulum planı

### Yapılmadı:
- ❌ Hiçbir gerçek tasarım yok
- ❌ Renk paleti yok
- ❌ Tipografi yok
- ❌ Komponent layout'ları yok
- ❌ Spacing sistemi yok
- ❌ Gerçek kod yazılmadı (sadece spec'ler hazır)

**Neden?**
Tasarımlar varyant sistemi ile yapılacak. Diğer Claude ile her komponent için 4 farklı varyant üretilecek, kullanıcı seçecek.

---

## 🎯 SIRADAKİ ADIMLAR

### 1. Kurulum (Trae IDE)

```
Phase 1-5:   Temel Altyapı (10h)
Phase 6-11:  Dashboard Core (12h)
Phase 12-15: Block System (8h)
Phase 16-20: Design Tools (10h)
Phase 21-24: HUB & Polish (10h)

Toplam: ~50 saat
```

### 2. İlk Tasarımlar

```
1. Navbar tasarımı
2. Dashboard kartları
3. Block sidebar
4. Form elementleri
```

### 3. CSV Import

```
1. Oyun listesi hazırla
2. CSV formatı:
   title,block,blockPosition,blockType,completionCriteria,progress,status
3. Import et
4. Block system test et
```

---

## 🛠️ TEKNOLOJİ STACK

### Frontend
- React 18
- TypeScript
- Vite
- React Router

### State Management
- Context API
- localStorage

### Tools
- CSS Grid
- Canvas API (tools için)
- DOMParser (preview için)

### Future
- Backend (Node.js + PostgreSQL)
- Authentication (Auth0 / Clerk)
- File upload (S3 / Cloudinary)

---

## 📁 PROJE YAPISI (KURULUM SONRASI)

```
vault-tracker/
├── src/
│   ├── components/
│   │   ├── dashboard/      # Grid, cards
│   │   ├── blocks/         # Block sidebar, modal
│   │   ├── tools/          # Picker, boundary, add tools
│   │   └── preview/        # Preview banner, modes
│   ├── contexts/           # Auth, Dashboard, Games
│   ├── hooks/              # useDrag, useResize, useTools
│   ├── types/              # TypeScript types
│   ├── utils/              # Helpers, parsers
│   └── pages/              # Login, Hub, VaultTracker
│
├── design-docs/
│   ├── HUB.html           # Design hub
│   ├── pending/           # Onay bekleyen tasarımlar
│   ├── approved/          # Onaylı tasarımlar
│   └── docs/              # Design system, changelog
│
├── docs/                  # Spec dosyaları (bunlar)
│
└── public/
    └── assets/            # Images, icons
```

---

## 📖 ÖZEL SİSTEMLER

### Block System
```
3 oyun = 1 blok = 1 cycle
Sıra: RPG → Story → Strategy
Toplam: 39 blok (117 oyun)
Sıralı ilerleme (paralel yok)
```

### Design Tools
```
✋ Element Picker    → Element seç ve değiştir
📐 Boundary Tool     → Sınırları belirle
➕ Add Tool          → Yeni element ekle
🌐 Preview Mode      → Context'te test et
```

### HUB System
```
6 Kategori           → Navigation, Dashboard, Forms, etc.
Keyword Search       → Türkçe + İngilizce
State Persistence    → Scroll, search, filters
View History         → Geri/ileri navigation
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Block Sidebar:** Dashboard GRID'inde DEĞİL, ayrı component (flex layout)
2. **Placeholder Kullan:** Gerçek tasarım YAPMA, sadece mantık
3. **Preview Mode:** Her tasarım context'te test edilmeli
4. **CSV Import:** Site blok ataması YAPMAZ, veriler hazır gelir
5. **State Persistence:** Her değişiklik localStorage'a kayıt
6. **Tool Overlay'ler:** z-index yönetimi kritik

---

## 🤝 CLAUDE İLE ÇALIŞMA

### Setup Prompt (İlk konuşma)

```
Bu 7 dosyayı oku ve MUTLAKA hatırla:

1. SYSTEM-ARCHITECTURE.md
2. VAULT-DASHBOARD-SYSTEM.md  
3. DESIGN-WORKFLOW.md
4. CLAUDE-IMPLEMENTATION-GUIDE.md
5. PROMPT-GUIDE.md
6. INSTALLATION-GUIDE.md
7. README.md (bu dosya)

Özellikle dikkat et:
- Block system (3 oyun = 1 blok)
- Tools (picker/boundary/add/preview)
- State persistence
- HUB sistemi
- Phase-by-phase kurulum

Phase'lere başlamadan önce bana özetini söyle.
```

### Her Phase Öncesi

```
Phase [X]'e başlıyoruz.

DİKKAT:
- INSTALLATION-GUIDE.md'deki Phase [X]'i oku
- Placeholder kullan (gerçek tasarım yapma)
- Tools implementasyonuna dikkat et
- Test checklist'ini kontrol et

Hazır olduğunda başla.
```

---

## 📞 YARDIM

### Takıldın mı?

1. **Spec dosyalarını tekrar oku**
   - İlgili bölümü bul
   - Örneklere bak

2. **PROMPT-GUIDE.md'ye bak**
   - Hazır komutlar var
   - Sorun giderme bölümü

3. **INSTALLATION-GUIDE.md'deki test checklist**
   - Ne eksik?
   - Hangi step atlandı?

---

## 🎉 BAŞARILAR!

Vault Tracker'ı kurmaya hazırsın! 

**İlk adım:**
1. INSTALLATION-GUIDE.md'yi aç
2. Phase 1: Project Setup'a başla
3. Keyifli kodlamalar! 🚀

---

**Status:** READY FOR INSTALLATION ✓  
**Version:** 2.0  
**Last Updated:** 2025-01-20
