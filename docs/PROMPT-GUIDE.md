# PROMPT QUICK REFERENCE
## Trae IDE Claude'a Nasıl Komut Verilir

> **Amaç:** Bu kılavuzu Trae IDE'de Claude ile çalışırken yanında tut.  
> **Kullanım:** Her major işlem öncesi ilgili prompt'u kopyala-yapıştır.

---

## 🚀 İLK BAŞLATMA

### 1. Setup Prompt (İlk konuşma)

```
Bu 4 dosyayı oku ve MUTLAKA hatırla:

1. SYSTEM-ARCHITECTURE.md
2. VAULT-DASHBOARD-SYSTEM.md  
3. DESIGN-WORKFLOW.md
4. CLAUDE-IMPLEMENTATION-GUIDE.md

ÖNEMLİ KURALLAR:

1. BLOCK SYSTEM:
   - 3 oyun = 1 blok = 1 cycle
   - Sıra: RPG → Story → Strategy
   - CSV'den hazır veri gelir (site blok ataması YAPMAZ)
   - Toplam 39 blok (117 oyun)

2. BLOCK PROGRESS SIDEBAR:
   - Dashboard GRID'inde DEĞİL
   - Ayrı bir sidebar component
   - Sol/sağ kenarda, collapsible
   - Current/Next/Completed blokları gösterir

3. TASARIM SİSTEMİ:
   - Her tasarım için 4 varyant (A/B/C/D)
   - Her varyanta "Site Üzerinde Gör" butonu
   - Preview mode ile context'te test
   - Gerçek tasarım YAPMA, sadece mantık

4. PLACEHOLDER KULLAN:
   - Renk belirleme
   - Font seçme
   - Detaylı styling yapma
   - Sadece fonksiyonel kod

Şimdi bana bu 4 dosyanın özetini ver ve anladığını göster.
```

**Beklenen Cevap:**
Claude 4 dosyayı okuyacak ve özetini verecek. Block system, sidebar, preview mode gibi kavramları anladığını gösterecek.

---

## 🏗️ IMPLEMENTATION PHASE'LERİ

### Phase 1-11: Core Implementation

```
Phase [X]'e başlıyoruz.

DİKKAT:
- CLAUDE-IMPLEMENTATION-GUIDE.md'deki Phase [X]'i oku
- Placeholder kullan (gerçek tasarım yapma)
- Block sidebar'ı unutma (grid'de DEĞİL)
- Test checklist'ini kontrol et

Hazır olduğunda başla.
```

**[X] yerine:** 1, 2, 3, ... 11

---

### Phase 12: Block Progress Sidebar

```
Phase 12: Block Progress Sidebar

ÖNEMLİ:
1. Dashboard GRID'inde DEĞİL
2. Ayrı bir <aside> component
3. Sol veya sağ kenarda
4. Collapsible olmalı
5. Sticky positioning (scroll ile birlikte)

İÇERİK:
- Current Block (expanded)
- Next 2-3 Blocks (collapsed)
- Completed Blocks (collapsible list)

VERI:
- CSV'den import
- Block grouping (3 oyun grupları)
- Progress calculation
- Status tracking

SYSTEM-ARCHITECTURE.md → 'Block Progress Tracking' bölümünü oku ve başla.
```

---

### Phase 13: Preview System

```
Phase 13: Preview Mode Implementation

AMAÇ:
Tasarımları gerçek sayfada, context içinde görme.

AKIŞ:
1. HUB.html'de "Site Üzerinde Gör" butonu
2. Butona tıklayınca: /vault-tracker?preview=button&variant=A
3. Sayfa preview mode'da açılır
4. Component inject edilir
5. Preview banner gösterilir
6. Highlight effect aktif

IMPLEMENT:
1. usePreviewMode hook
2. URL parameter detection
3. Component loader (fetch HTML)
4. Preview banner component
5. Highlight effect CSS
6. HUB.html entegrasyonu

DESIGN-WORKFLOW.md → 'Site Üzerinde Önizleme' bölümünü oku ve başla.
```

---

## 🎨 TASARIM KONUŞMALARI

### Yeni Tasarım İsteği

```
[Component] için tasarım öner.

KURAL:
1. 4 varyant oluştur:
   - A: Havalı/Modern
   - B: Sade/Minimal
   - C: Detaylı/Zengin
   - D: Görsel Ağırlıklı

2. Her varyant için:
   - Placeholder HTML oluştur
   - Varyant tipine göre not ekle
   - Screenshot için hazır olsun

3. HUB.html'e ekle:
   - Varyant kartları
   - "👁️ Önizle" butonu
   - "🌐 Site Üzerinde Gör" butonu
   - "✅ Onayla" butonu
   - "🔀 Buna Benzer" butonu

4. Context page belirle:
   Örnek: button → /vault-tracker

GERÇek TASARIM YAPMA! Sadece placeholder ve yapı.

DESIGN-WORKFLOW.md'deki varyant kurallarına uy.
```

**[Component] örnekleri:**
- Navbar
- Button
- Statistics Card
- Current Game Card
- Block Sidebar
- Modal
- Form

---

### Benzer Varyant İsteği

```
[Component], varyant [X]'e benzer 4 yeni varyant üret.

KURAL:
1. pending/[ID]-[component]/level-2-from-[X]/ oluştur
2. parent.txt oluştur (içinde: "variant-X-[label]")
3. Ana temayı koru, ince ayarlar yap:
   - X.1: [Ana tema] + [tweak 1]
   - X.2: [Ana tema] + [tweak 2]
   - X.3: [Ana tema] + [tweak 3]
   - X.4: [Ana tema] + [tweak 4]

BÜYÜK DEĞİŞİKLİK YAPMA!
Örnek: Minimal → Detaylı yapma
Sadece ince ayarlar (renk tonu, spacing, border style)

HUB.html'i güncelle (yeni level ekle).
```

---

### Tasarım Onaylama

```
[Component], seviye [Y], varyant [X]'i onayla.

İŞLEMLER:
1. Dosya taşı:
   pending/[ID]-[component]/level-[Y]/variant-[X].html
   → approved/[component]/v1.html (veya v2, v3...)

2. Döküman oluştur:
   approved/[component]/v1.md
   - Onay tarihi
   - Varyant bilgisi
   - Seviye bilgisi
   - Özellikler

3. DESIGN_SYSTEM.md güncelle
4. COMPONENT_LIBRARY.md güncelle
5. CHANGELOG.md'ye ekle
6. HUB.html güncelle (pending → approved)
7. pending/[ID]-[component]/ klasörünün TAMAMINI sil

Tamamlandığında bildir.
```

---

## 🐛 DEBUG VE TEST

### Component Test İsteği

```
[Component]'i test et.

TEST ALANARI:
1. Render testi
   - Component görünüyor mu?
   - Placeholder'lar doğru mu?

2. Pattern testi (sadece card'lar için)
   - HORIZONTAL pattern çalışıyor mu?
   - VERTICAL pattern çalışıyor mu?
   - SQUARE pattern çalışıyor mu?

3. Boyut testi (sadece card'lar için)
   - 16 farklı boyut test edildi mi?
   - Grid snapping doğru mu?

4. Block testi (block sidebar için)
   - CSV import çalışıyor mu?
   - Block grouping doğru mu?
   - Current/Next/Completed doğru mu?

5. Preview testi (preview mode için)
   - URL parametreleri çalışıyor mu?
   - Component inject ediliyor mu?
   - Banner gösteriliyor mu?

Sonuçları rapor et.
```

---

### Hata Düzeltme

```
[Hata açıklaması]

ÖNEMLİ KONTROL:
1. Block sidebar grid'de mi? (OLMAMALI)
2. Gerçek tasarım mı yaptın? (YAPMAMALISIN)
3. Lock kontrolü var mı? (OLMALI)
4. Collision detection çalışıyor mu? (ÇALIŞMALI)

İlgili spec dosyasını tekrar oku:
- Grid sorunu → VAULT-DASHBOARD-SYSTEM.md
- Block sorunu → SYSTEM-ARCHITECTURE.md
- Preview sorunu → DESIGN-WORKFLOW.md

Düzelt ve test et.
```

---

---

## 🛠️ TASARIM ARAÇLARI

### Element Picker (✋ Seç)

```
Element Picker ile tek element değiştir:

[Component] tasarımı, varyant [X]:

Element: [selector]
Mevcut: [current state]

DEĞİŞİKLİK TİPİ: [Stil / İçerik / Kaldır]
İSTEK: [user request]

KURAL:
1. SADECE bu elementi değiştir
2. Diğer elementler AYNEN kalsın
3. Yeni varyant: [X].1

Örnek:
navbar, varyant B:
Element: .nav-button
DEĞİŞİKLİK: Stil
İstek: Daha koyu mavi renk

→ Yeni varyant: B.1
```

---

### Boundary Tool (📐 Sınır Belirle)

```
Boundary Tool ile boyut sınırı koy:

[Component] tasarımı, varyant [X]:

SINIR BELİRLEME
Element: [selector]
Mevcut: [width]px × [height]px
Belirlenen: [new-width]px × [new-height]px

TİP: [Maximum / Minimum / Exact / Container / Overflow / Scale]

İSTEK:
[type-specific rules]

Ek: [user notes]

→ Yeni varyant: [X].boundary

Örnek:
navbar, varyant B:
Element: .nav-button
TİP: Maximum Boyut
max-width: 150px
Kutu dışına taşmasın

→ Yeni varyant: B.boundary
```

---

### Add Tool (➕ Ekle)

```
Add Tool ile yeni element ekle:

[Component] tasarımı, varyant [X]:

YENİ ELEMENT EKLE
Alan: [width]px × [height]px
Konum: [context description]
Context: [navigation-area / card-area / etc]

İKİ SEÇENEK:

A) Manuel:
"Buraya [X] ekle"
Örn: "Buraya arama ikonu ekle"

B) Öneriler:
"Bu alana eklenebilecek 10 öneri sun"
→ Claude 10 öneri sunar
→ Seç → Claude ekler

→ Yeni varyant: [X].add
```

---

## 📦 CSV IMPORT

### Oyun Verilerini Yükleme

```
CSV'den oyun verilerini import et.

FORMAT:
title,block,blockPosition,blockType,completionCriteria,progress,status

ÖRNEK:
Baldur's Gate 3,1,1,RPG,"Main story + 1 major questline",100,completed
Firewatch,1,2,Story,"Credits reached",100,completed
Crusader Kings III,1,3,Strategy,"All factions won once",100,completed

İŞLEM:
1. CSV parser ekle
2. Game interface'e göre parse et
3. localStorage'a kaydet (vault-games key)
4. Block grouping yap
5. Test et (block sidebar'da görünmeli)

CSV dosyası: [dosya yolu veya içerik]

Import et ve sonucu göster.
```

---

## 🔄 YAYGN İŞLEMLER

### Dosya Kontrolü

```
Şu dosyayı kontrol et: [dosya yolu]

KONTROL:
- TypeScript hataları var mı?
- Placeholder'lar doğru mu?
- Comments açıklayıcı mı?
- Import'lar eksik mi?

Sorun varsa düzelt.
```

---

### Build Testi

```
Projeyi build et ve hataları raporla.

KONTROL:
- TypeScript derlemesi
- Missing imports
- Type errors
- Unused variables

Hataları listele ve düzelt.
```

---

### Git Commit Önerisi

```
Son değişiklikler için commit mesajı öner.

FORMAT:
feat: [açıklama]
fix: [açıklama]  
docs: [açıklama]
refactor: [açıklama]

KURAL:
- Kısa ve açıklayıcı
- Conventional commits format
- İngilizce

Commit mesajını ver.
```

---

## ⚠️ YAPMAMASI GEREKENLER

**Claude'a BU ŞEKİLDE KOMUT VERME:**

❌ "Güzel bir tasarım yap"
❌ "Renkli olsun"
❌ "Modern görünsün"
❌ "Animasyonlu buton yap"
❌ "Block sidebar'ı grid'e ekle"

**Bunun yerine:**

✅ "Button için 4 varyant öner (placeholder)"
✅ "Block sidebar'ı implement et (grid DIŞINDA)"
✅ "Preview mode ekle (DESIGN-WORKFLOW.md'ye göre)"
✅ "Phase 5'i başlat (CLAUDE-IMPLEMENTATION-GUIDE.md'ye göre)"

---

## 📋 CHECKLIST BEFORE ASKING

Her major işlem öncesi kontrol et:

- [ ] İlgili spec dosyasını Claude okudu mu?
- [ ] Block sidebar için "grid dışında" dedin mi?
- [ ] Tasarım için "placeholder" dedin mi?
- [ ] Preview için "Site Üzerinde Gör" dedin mi?
- [ ] Phase numarasını belirttlin mi?

---

## 🎯 BAŞARILI PROMPT ÖRNEKLERİ

### Örnek 1: Phase Başlatma

```
Phase 3: Kart Componentleri

GÖREV:
4 kart tipi için placeholder component oluştur.

KART TİPLERİ:
1. StatisticsCard (HORIZONTAL/SQUARE)
2. CurrentGameCard (TÜM PATTERN'LER)
3. NextGamesCard (VERTICAL/SQUARE)
4. ProgressChartCard (TÜM PATTERN'LER)

PATTERN LOGIC:
- determinePattern(width, height) fonksiyonu
- Pattern'e göre farklı layout
- Placeholder content

CLAUDE-IMPLEMENTATION-GUIDE.md → Phase 3'ü oku ve başla.
```

---

### Örnek 2: Block Sidebar

```
Block Progress Sidebar'ı implement et.

KONUM:
- Dashboard GRID'İNDE DEĞİL
- Ayrı bir <aside className="block-sidebar">
- Sol kenarda (veya sağ, sen seç)
- Collapsible button ile açılır/kapanır

İÇERİK:
[Current Block]
  ✓ Disco Elysium (46%)
  ○ Inside (0%)
  ○ Total War (0%)

[Next Blocks]
  ▷ Block 3
  ▷ Block 4

[Completed]
  ✓ Block 1 (3/3)

CSS:
- Sticky positioning
- Fixed width (300px, collapsed: 60px)
- Flex layout (dashboard + sidebar)

SYSTEM-ARCHITECTURE.md → 'Block Progress Tracking' oku.
Sonra implement et.
```

---

### Örnek 3: Preview Mode

```
"Site Üzerinde Gör" özelliğini ekle.

AKIŞ:
1. HUB.html'e button ekle:
   <button onclick="previewInContext('button', 'A')">
     🌐 Site Üzerinde Gör
   </button>

2. previewInContext fonksiyonu:
   - Component'in context page'ini bul
   - Preview URL oluştur: /vault-tracker?preview=button&variant=A
   - Yeni tab'de aç

3. VaultTracker'da usePreviewMode hook:
   - URL parametrelerini oku
   - Component'i yükle (fetch HTML)
   - Preview banner göster
   - Component'i highlight et

DESIGN-WORKFLOW.md → 'Site Üzerinde Önizleme' oku.
CLAUDE-IMPLEMENTATION-GUIDE.md → Phase 13'ü oku.
Sonra implement et.
```

---

## 💡 İPUÇLARI

1. **Her zaman spec dosyasına referans ver**
   - "SYSTEM-ARCHITECTURE.md'ye göre"
   - "Phase 5'i oku"
   - "Block Progress Tracking bölümü"

2. **Önemli kuralları tekrarla**
   - "Grid'de DEĞİL"
   - "Placeholder kullan"
   - "Gerçek tasarım yapma"

3. **Checklist iste**
   - "Test checklist'ini tamamla"
   - "Sonuçları rapor et"

4. **Net ol**
   - ❌ "Güzel yap"
   - ✅ "4 varyant, her biri için placeholder HTML"

5. **Adım adım git**
   - Phase'leri sırayla
   - Her phase'i test et
   - Sonraki phase'e geç

---

## 📞 SORUN GİDERME

### Claude Spec'i Unuttu

```
Spec'i tekrar oku:
- SYSTEM-ARCHITECTURE.md
- VAULT-DASHBOARD-SYSTEM.md
- DESIGN-WORKFLOW.md

Özellikle şu bölümleri:
- [İlgili bölüm adı]
- [İlgili bölüm adı]

Sonra tekrar dene.
```

---

### Claude Yanlış Yaptı

```
Bu yanlış çünkü:
1. [Neden yanlış]
2. [Doğru ne olmalı]

İlgili spec: [dosya adı] → [bölüm adı]

Doğru şekilde yap.
```

---

### Claude Tasarım Yaptı

```
DUR!

Gerçek tasarım YAPMA.
Sadece PLACEHOLDER kullan.

Şunları çıkar:
- Gerçek renkler
- Detaylı fontlar
- Animasyonlar
- Gradient'ler

Şunları kullan:
- Placeholder text
- Minimal CSS
- Sadece yapı

CLAUDE-IMPLEMENTATION-GUIDE.md → 'Yapma / Yap' bölümünü oku.
```

---

**Status:** PROMPT GUIDE READY ✓  
**Kullanım:** Trae IDE'de bu dosyayı aç, her işlem öncesi ilgili prompt'u kopyala
