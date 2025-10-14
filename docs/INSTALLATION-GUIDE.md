# KURULUM REHBERİ
## Vault Tracker - Adım Adım Kurulum

> **Amaç:** Projeyi sıfırdan kurmak için phase-by-phase rehber.  
> **Süre:** ~15-20 saat (tüm phase'ler)  
> **Yaklaşım:** İki aşamalı - Önce Design Hub, sonra Ana Site

---

## 📋 GENEL YAKLASIM

### İki Ana Aşama

```
AŞAMA 1: Design Hub Setup (3-4 saat)
├─ Phase 1: Proje başlangıcı
├─ Phase 2: Design Hub kurulumu
├─ Phase 3: HUB.html oluştur
└─ Phase 4: İlk tasarım testi

AŞAMA 2: Main Site Development (12-16 saat)
├─ Phase 5: Login + Auth
├─ Phase 6: Hub page
├─ Phase 7-11: Vault Tracker (CLAUDE-IMPLEMENTATION-GUIDE.md'ye göre)
├─ Phase 12: Block sidebar
├─ Phase 13: Preview mode + Tools
└─ Phase 14: State persistence
```

**Neden iki aşama?**
1. Tasarım Hub önce hazır olmalı
2. Ana site geliştirirken tasarımlar paralel yapılabilsin
3. Design workflow test edilsin
4. Component tasarımları önce onaylansın

---

## 🎨 AŞAMA 1: DESIGN HUB

### PHASE 1: Proje Başlangıcı (30 dk)

#### 1.1 Create Project

```bash
npm create vite@latest vault-tracker -- --template react-ts
cd vault-tracker
npm install
```

#### 1.2 Klasör Yapısı

```bash
mkdir -p design-docs/{pending,approved,docs}
mkdir -p docs
mkdir -p src/{components,routes,contexts,hooks,utils}
```

#### 1.3 Spec Dosyalarını Ekle

Şu 6 dosyayı `docs/` klasörüne kopyala:
- README.md
- SYSTEM-ARCHITECTURE.md
- VAULT-DASHBOARD-SYSTEM.md
- DESIGN-WORKFLOW.md
- CLAUDE-IMPLEMENTATION-GUIDE.md
- PROMPT-GUIDE.md

#### 1.4 Git

```bash
git init
git add .
git commit -m "Initial commit"
```

**Checklist:**
- [ ] Vite projesi çalışıyor (`npm run dev`)
- [ ] Klasörler hazır
- [ ] Spec dosyaları yerinde
- [ ] Git initialized

---

### PHASE 2: Design Docs Setup (1 saat)

#### 2.1 Klasör Yapısı

```
design-docs/
├── HUB.html (sonraki phase)
├── pending/
├── approved/
└── docs/
    ├── DESIGN_SYSTEM.md
    ├── COMPONENT_LIBRARY.md
    └── CHANGELOG.md
```

#### 2.2 Dosyaları Oluştur

```bash
touch design-docs/docs/DESIGN_SYSTEM.md
touch design-docs/docs/COMPONENT_LIBRARY.md
touch design-docs/docs/CHANGELOG.md
```

Her dosyaya başlangıç içeriği ekle (boş template'ler).

**Checklist:**
- [ ] 3 dokümantasyon dosyası hazır
- [ ] Git commit: "Setup design docs"

---

### PHASE 3: HUB.html (2 saat)

Basit bir HUB.html oluştur - tüm kategoriler ve componentlerle.

**Özellikler:**
- Kategorize görünüm (6 kategori)
- Component kartları
- "Tasarım Başlat" butonları
- Basit styling

**Detaylar:** DESIGN-WORKFLOW.md'de HUB yapısı var.

**Checklist:**
- [ ] HUB.html çalışıyor
- [ ] Componentler listeleniyor
- [ ] Butonlar aktif
- [ ] Git commit: "Add HUB.html"

---

### PHASE 4: İlk Tasarım Testi (30 dk)

1. HUB'da "Navbar → Tasarım Başlat"
2. Komut panoya kopyalanır
3. Trae'de Claude'a yapıştır
4. Claude 4 varyant oluşturur
5. HUB'ı günceller
6. Varyantları inceleyebilirsin

**Test başarılı mı?**
- [ ] Varyantlar oluşturuldu
- [ ] HUB güncellendi
- [ ] Varyantlar görüntüleniyor

---

## ✅ AŞAMA 1 TAMAMLANDI

Design Hub hazır! Artık tasarım üretebilirsin.

**Öneri:** Ana siteye geçmeden önce en az 2-3 component tasarımını onayla.

---

## 🏗️ AŞAMA 2: MAIN SITE

### PHASE 5-14: Ana Site Kurulumu

**Referans:** CLAUDE-IMPLEMENTATION-GUIDE.md

Her phase için:
1. İlgili bölümü oku
2. Kod örneklerini takip et
3. Test checklist'ini tamamla
4. Git commit yap

**Phase Özeti:**

| Phase | Görev | Süre |
|-------|-------|------|
| 5 | Login + Auth | 1.5h |
| 6 | Hub Page | 1h |
| 7 | Grid System | 2h |
| 8 | Dashboard Kartları | 2h |
| 9 | Edit Mode | 2h |
| 10 | Drag & Drop | 2h |
| 11 | Extras | 2h |
| 12 | Block Sidebar | 3h |
| 13 | Preview + Tools | 3h |
| 14 | State Persistence | 1.5h |

**Total:** ~20 saat

---

## 🎯 ÖNEMLİ NOTLAR

### Design Hub Önce Neden?

1. Tasarım dili belirle
2. Renk paleti onayla
3. Component pattern'leri netleştir
4. Paralel çalışma imkanı

### Aşama 2'ye Geçiş Kriterleri

- [ ] En az 3 component tasarımı onaylanmış
- [ ] Renk paleti belirlenmiş
- [ ] Button stilleri onaylanmış
- [ ] Typography seçilmiş

### Git Workflow

```bash
# Her phase commit
git commit -m "Phase X: [description]"

# Milestone tag
git tag -a v0.1 -m "Design Hub Complete"
git tag -a v0.5 -m "Main Site MVP"
```

---

## 📚 REFERANS

Kurulum sırasında kullan:

1. **CLAUDE-IMPLEMENTATION-GUIDE.md** → Her phase detayları
2. **DESIGN-WORKFLOW.md** → Tasarım süreci
3. **PROMPT-GUIDE.md** → Hazır komutlar
4. **VAULT-DASHBOARD-SYSTEM.md** → Grid sistemi
5. **SYSTEM-ARCHITECTURE.md** → Genel mimari

---

## ✅ KURULUM TAMAMLANDI MI?

### Final Checklist

**Aşama 1:**
- [ ] HUB.html çalışıyor
- [ ] İlk tasarım oluşturuldu
- [ ] En az 1 tasarım onaylandı

**Aşama 2:**
- [ ] Tüm phase'ler tamamlandı
- [ ] Grid sistemi çalışıyor
- [ ] Block sidebar aktif
- [ ] Preview mode hazır
- [ ] State persistence çalışıyor

### Sonraki Adımlar

1. CSV import
2. Gerçek oyun verileri
3. Mobile responsive
4. Production build
5. Deploy

---

**İyi kurulumlar!** 🚀
