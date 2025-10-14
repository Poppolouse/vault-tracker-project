# DESIGN WORKFLOW
## Varyant Sistemi + Tasarım Onay Süreci

> **NOT:** Bu dosya tasarım SÜRECN anlatır.
> Gerçek tasarım örnekleri YOKTUR.
> Tasarımlar diğer Claude ile yapılacak.

---

## 🎯 TASARIM SÜRECİ GENEL BAKIŞ

### Amaç

Vault Tracker'ın her komponenti için **birden fazla tasarım varyantı** oluşturup, kullanıcı seçimine göre en iyi tasarımı belirlemek.

### Süreç Adımları

```
1. Claude tasarım önerir → 4 varyant üretir
2. Kullanıcı HUB.html'de varyantları görür
3. Kullanıcı bir varyantı beğenir:
   a. Doğrudan onayla → Tamamlandı
   b. "Buna benzer daha fazla" → 4 yeni varyant
4. Onaylanan tasarım → approved/ klasörüne
5. Döküman oluşturulur
6. Diğer varyantlar silinir
```

---

## 🛠️ TASARIM ARAÇLARI

HUB'da her varyant için 3 güçlü araç var:

### 1. ✋ Element Picker (Seç)

**Amaç:** Tek bir elementi seçip sadece o elementi değiştir.

**Akış:**
```
1. HUB'da "✋ Seç" butonu
2. Preview page açılır (picker mode)
3. Mouse'u gezdirirken elementler highlight olur
4. Element'e tıkla → Modal açılır
5. Değişiklik tipini seç:
   - 🎨 Stil Değiştir (renk, font, boyut)
   - ✏️ İçerik Değiştir (text)
   - 🗑️ Kaldır (elementi sil)
6. Detay gir veya hızlı önerilerden seç
7. "Değişiklik İste" → Komut panoya kopyalanır
8. Trae'de Claude'a yapıştır
9. Claude yeni varyant: [variant].1
```

### 2. 📐 Boundary Tool (Sınır Belirle)

**Amaç:** Boyut sınırlarını belirle, taşma/boşluk sorunlarını çöz.

**Akış:**
```
1. HUB'da "📐 Sınır Belirle" butonu
2. Element seç
3. Mouse ile sınır ÇİZ (yaklaşık çiz, otomatik snap)
4. Modal: 6 constraint type
   - 📏 Maximum Boyut
   - 📐 Minimum Boyut
   - 🎯 Tam Boyut
   - 📦 Container Sınırı
   - 🔧 Taşma Düzelt
   - ⚖️ Scale Düzelt
5. Claude yeni varyant: [variant].boundary
```

### 3. ➕ Add Tool (Ekle)

**Amaç:** Boş alana element ekle veya Claude'dan öneri al.

**Akış:**
```
1. HUB'da "➕ Ekle" butonu
2. Boş alan seç
3. İki seçenek:
   A) Manuel: "Buraya X ekle"
   B) Öner: Claude 10 öneri sunar
4. Hover → Preview
5. Seç → Claude ekler
6. Yeni varyant: [variant].add
```

---

## 📁 KLASÖR YAPISI

### Temel Yapı

```
design-docs/
├── HUB.html                    # Ana kontrol paneli
├── pending/                    # Onay bekleyen tasarımlar
│   └── 001-navbar/
│       ├── level-1/            # Ana 4 varyant
│       ├── level-2-from-B/     # B'den türeyen 4 varyant
│       └── level-3-from-B2/    # B2'den türeyen 4 varyant
├── approved/                   # Onaylanmış tasarımlar
│   └── navbar/
│       ├── v1.html
│       ├── v1.png
│       └── v1.md
└── docs/                       # Dökümantasyon
    ├── DESIGN_SYSTEM.md
    ├── COMPONENT_LIBRARY.md
    └── CHANGELOG.md
```

### Dosya İsimlendirme

**Pending (onay bekleyen):**
```
pending/001-navbar/level-1/
├── variant-A-havali.html
├── variant-B-sade.html
├── variant-C-detayli.html
└── variant-D-gorsel.html
```

**Approved (onaylanmış):**
```
approved/navbar/
├── v1.html         # İlk versiyon
├── v1.png          # Screenshot
├── v2.html         # Revize
└── v2.png
```

---

## 🎨 VARYANT SİSTEMİ

### 4 Varyant Tipi

Her tasarım önerisi **4 farklı varyant** ile sunulur:

#### Varyant A: 🎭 Havalı/Modern
**Özellikler:**
- Cesur tasarım
- Gradient, animasyonlar, gölgeler
- Büyük elementler
- "Wow" etkisi
- Modern trend'ler

**Ne zaman kullanılır:**
- Kullanıcı modern, göze çarpan tasarım isterse
- Genç hedef kitle
- Gamer aesthetic

#### Varyant B: ✨ Sade/Minimal
**Özellikler:**
- Temiz, az element
- Çok boşluk (whitespace)
- Flat design
- Soft renkler
- Rahat his

**Ne zaman kullanılır:**
- Kullanıcı minimal, temiz tasarım isterse
- Profesyonel görünüm
- Okunabilirlik ön planda

#### Varyant C: 🎪 Detaylı/Zengin
**Özellikler:**
- Çok eleman
- İkonlar, rozetler, etiketler
- Çeşitli renkler ve bölümler
- Bilgi yoğun
- Profesyonel

**Ne zaman kullanılır:**
- Kullanıcı çok bilgi görmek isterse
- Dashboard/analytics görünümü
- Power user için

#### Varyant D: 🖼️ Görsel Ağırlıklı
**Özellikler:**
- Büyük resimler
- Az metin
- Görsel odaklı yerleşim
- Overlay, blur efektler
- Görsel hikaye

**Ne zaman kullanılır:**
- Kullanıcı görsel vurgu isterse
- Image-heavy içerik
- Portfolio tarzı

---

## 🌳 DALLANMA SİSTEMİ

### Seviye Yapısı

```
Level 1 (Ana varyantlar)
├─ A (Havalı)
├─ B (Sade)        ← Beğenildi, ama değiştirelim
├─ C (Detaylı)
└─ D (Görsel)

Level 2 (B'den türeyenler)
├─ B.1 (B'ye benzer, daha minimal)
├─ B.2 (B'ye benzer, açık tonlar)
├─ B.3 (B'ye benzer, soft gölgeler) ← Beğenildi, ama değiştirelim
└─ B.4 (B'ye benzer, monokrom)

Level 3 (B.3'ten türeyenler)
├─ B.3.1 (B.3'e benzer, daha soft)
├─ B.3.2 (B.3'e benzer, renkli gölge)
├─ B.3.3 (B.3'e benzer, border+gölge) ← ONAYLANDI!
└─ B.3.4 (B.3'e benzer, çift gölge)
```

### Dallanma Kuralları

1. **Her seviyede 4 varyant**
2. **Türeyen varyantlar ana temayı korur**
3. **Sınırsız seviye** (pratik: 3-4 seviye yeterli)
4. **Bir varyanttan birden fazla dal** açılabilir

**Örnek:**
```
Level 1: A, B, C, D

Kullanıcı hem A hem B'yi beğenir:

Level 2-from-A: A.1, A.2, A.3, A.4
Level 2-from-B: B.1, B.2, B.3, B.4

Her iki dal da ayrı ayrı ilerleyebilir!
```

---

## 🏠 HUB.html - TAM ÖZELLİK LİSTESİ

### Ana Özellikler

1. **Kategori Sistemi** (6 kategori)
   - 🧭 Navigation & Layout
   - 📊 Dashboard Elements
   - 📝 Forms & Inputs
   - 🔲 Modals & Overlays
   - 📋 Data Display
   - 💬 Feedback

2. **Arama Sistemi**
   - Keyword-based arama
   - Türkçe + İngilizce support
   - Auto-complete suggestions
   - Real-time filtering
   - Klavye kısayolu: Cmd/Ctrl + K

3. **Filtreler**
   - Tümü
   - ✓ Onaylı
   - ⏳ Onay Bekleyen
   - ○ Başlanmadı

4. **State Persistence**
   - Scroll position
   - Search query
   - Open categories
   - Active filters
   - Selected component
   - View history

5. **Session Recovery**
   - Unexpected close recovery
   - "Kaldığın yerden devam et" banner
   - Last activity tracking

6. **Navigation**
   - ← Geri butonu
   - 🏠 Ana Sayfa butonu
   - 📜 Geçmiş (view history)
   - Breadcrumb navigation

7. **Son Görüntülenenler**
   - localStorage ile tracking
   - Max 5 item
   - Quick access buttons

### Varyant Kartı Butonları

Her varyant kartında 6 buton:

```html
<div class="variant-actions">
  <!-- 1. Preview (izole) -->
  <button onclick="preview('A')">
    👁️ Önizle
  </button>
  
  <!-- 2. Preview in Context (site üzerinde) -->
  <button onclick="previewInContext('navbar', 'A')">
    🌐 Site Üzerinde Gör
  </button>
  
  <!-- 3. Element Picker -->
  <button onclick="openElementPicker('navbar', 'A')">
    ✋ Seç
  </button>
  
  <!-- 4. Boundary Tool -->
  <button onclick="openBoundaryTool('navbar', 'A')">
    📐 Sınır Belirle
  </button>
  
  <!-- 5. Add Tool -->
  <button onclick="openAddTool('navbar', 'A')">
    ➕ Ekle
  </button>
  
  <!-- 6. Approve -->
  <button onclick="approve('A')">
    ✅ Onayla
  </button>
  
  <!-- 7. Generate Similar (sadece onaylanmışlarda) -->
  <button onclick="generateSimilar('A')">
    🔀 Buna Benzer
  </button>
</div>
```

---

## 🛠️ TOOL KULLANIM AKIŞLARI

### Element Picker Flow

```
HUB → "✋ Seç" butonu
  ↓
Preview sayfası açılır (?picker=true)
  ↓
Cursor: crosshair
  ↓
Element'e hover → Highlight + tooltip
  ↓
Click → Element selected
  ↓
Modal açılır:
  - Element info
  - Change type (style/content/remove)
  - Details input
  - Quick suggestions
  ↓
"Değişiklik İste" → Command panoya
  ↓
Trae'de Claude'a yapıştır
  ↓
Claude yeni varyant oluşturur
```

### Boundary Tool Flow

```
HUB → "📐 Sınır Belirle" butonu
  ↓
Preview sayfası açılır (?boundary=true)
  ↓
1. Element seç → Click
  ↓
2. Sınırları çiz → Drag
  ↓
  - Smart snap to nearby elements
  - Real-time dimensions tooltip
  - Visual feedback (canvas)
  ↓
3. Modal açılır:
  - Size comparison (mevcut vs boundary)
  - Constraint type selector (6 tip)
  - Additional details
  - Command preview
  ↓
"Sınır Koydurulanı" → Command panoya
  ↓
Trae'de Claude'a yapıştır
  ↓
Claude constraint'leri uygular
```

### Add Tool Flow

```
HUB → "➕ Ekle" butonu
  ↓
Preview sayfası açılır (?add=true)
  ↓
Alan seç → Drag to select area
  ↓
  - Area highlight
  - Empty check
  - Context detection
  ↓
Modal açılır:
  ┌────────────────────────┐
  │ İki seçenek:           │
  │ 1. Kendim Belirle      │
  │ 2. Claude Önersin      │
  └────────────────────────┘
  
Option 1: Manuel
  ↓
"Buraya X ekle" yaz
  ↓
Quick suggestions (context-based)
  ↓
"Ekle" → Command panoya

Option 2: Öneriler
  ↓
"Öner" → Suggestions prompt panoya
  ↓
Trae'de Claude'a yapıştır
  ↓
Claude 10 öneri döndürür (JSON)
  ↓
HUB'a yapıştır → Suggestions grid
  ↓
Öneri seç → Hover preview
  ↓
"Ekle" → Command panoya
```

---

## 🔄 STATE MANAGEMENT

### localStorage Keys

```javascript
const STORAGE_KEYS = {
  // HUB state
  HUB_STATE: 'hub-state',
  
  // Component data
  ALL_COMPONENTS: 'all-components',
  PENDING_DESIGNS: 'pending-designs',
  APPROVED_DESIGNS: 'approved-designs',
  
  // User preferences
  RECENT_VIEWS: 'recent-designs',
  VIEW_HISTORY: 'hub-view-history',
  
  // Dashboard (Vault Tracker)
  VAULT_DASHBOARD: 'vault-dashboard',
  VAULT_GAMES: 'vault-games',
  
  // Auth (future)
  AUTH_TOKEN: 'auth-token',
  USER_DATA: 'user-data',
};
```

### HUB State Structure

```typescript
interface HubState {
  // Current view
  currentPage: 'pending' | 'approved' | 'all';
  scrollPosition: number;
  
  // UI state
  openCategories: string[];
  searchQuery: string;
  activeFilters: string[];
  
  // Selection
  selectedComponent: string | null;
  
  // History
  viewHistory: ViewHistoryEntry[];
  
  // Timestamp
  timestamp: number;
}

interface ViewHistoryEntry {
  component: string;
  variant: string;
  timestamp: number;
  url: string;
}
```

### State Restore on Page Load

```javascript
window.addEventListener('DOMContentLoaded', () => {
  // 1. Check for interrupted session
  if (SessionRecovery.checkInterruptedSession()) {
    showRecoveryBanner();
  }
  
  // 2. Restore HUB state
  const state = HubStateManager.loadState();
  
  // 3. Apply state
  restoreScrollPosition(state.scrollPosition);
  restoreSearchQuery(state.searchQuery);
  restoreFilters(state.activeFilters);
  restoreCategories(state.openCategories);
  highlightSelectedComponent(state.selectedComponent);
  
  // 4. Start new session
  SessionRecovery.startSession();
  
  console.log('✅ State restored');
});
```

---

```html
<!-- HUB.html temel yapı -->
<!DOCTYPE html>
<html>
<head>
  <title>Tasarım Hub</title>
</head>
<body>
  
  <!-- İstatistikler -->
  <section id="stats">
    Onay Bekleyen: 3
    Onaylanmış: 12
  </section>
  
  <!-- Onay Bekleyenler -->
  <section id="pending">
    <h2>Onay Bekleyen Tasarımlar</h2>
    
    <!-- Her tasarım için -->
    <div class="design-proposal">
      <h3>Navbar - Level 1</h3>
      
      <!-- 4 varyant -->
      <div class="variants">
        <div class="variant">
          <img src="pending/001-navbar/level-1/variant-A-havali.png">
          <button onclick="preview('A')">👁️ Önizle</button>
          <button onclick="previewInContext('navbar', 'A')">🌐 Site Üzerinde Gör</button>
          <button onclick="approve('A')">✅ Onayla</button>
          <button onclick="generateSimilar('A')">🔀 Buna Benzer</button>
        </div>
        <!-- B, C, D benzer şekilde -->
      </div>
    </div>
  </section>
  
  <!-- Onaylananlar -->
  <section id="approved">
    <h2>Onaylanmış Tasarımlar</h2>
    <!-- Liste -->
  </section>
  
  <!-- Changelog -->
  <section id="changelog">
    <h2>Son Değişiklikler</h2>
    <!-- Onaylama geçmişi -->
  </section>
  
</body>
</html>
```

### HUB Fonksiyonları

```javascript
// Önizleme (sadece component)
function preview(variantId) {
  // HTML dosyasını yeni tab'de aç
  window.open(`pending/001-navbar/level-1/variant-${variantId}.html`);
}

// Site üzerinde önizleme (context preview)
function previewInContext(component, variantId) {
  // 1. Component'in hangi sayfada kullanıldığını bul
  const contextPage = getContextPage(component);
  
  // 2. Preview parametreleri ile URL oluştur
  const url = `${contextPage}?preview=${component}&variant=${variantId}`;
  
  // 3. Yeni tab'de aç
  window.open(url, '_blank');
  
  // 4. Bildirim göster
  showNotification(`${component} tasarımı site üzerinde açılıyor...`);
}

// Onay
function approve(variantId) {
  const command = `Navbar tasarımı, varyant ${variantId} onaylandı. Approved klasörüne taşı ve dökümanını oluştur.`;
  copyToClipboard(command);
  alert('✅ Komut panoya kopyalandı! Trae\'de Claude\'a yapıştır.');
}

// Benzer üret
function generateSimilar(variantId) {
  const command = `Navbar tasarımı, varyant ${variantId}'e benzer 4 yeni varyant üret.`;
  copyToClipboard(command);
  alert('🔀 Komut panoya kopyalandı! Trae\'de Claude\'a yapıştır.');
}

// Seviye değiştir
function goToLevel(designId, level) {
  // HUB'ı o seviyeyi gösterecek şekilde güncelle
  loadLevel(designId, level);
}

// Component → Context Page mapping
function getContextPage(component) {
  const contextMap = {
    'navbar': '/',
    'header': '/vault-tracker',
    'button': '/vault-tracker',
    'statistics-card': '/vault-tracker',
    'current-game-card': '/vault-tracker',
    'next-games-card': '/vault-tracker',
    'progress-chart': '/vault-tracker',
    'block-sidebar': '/vault-tracker',
    'game-card': '/vault-tracker?view=list',
    'modal': '/vault-tracker',
    'form': '/vault-tracker?action=add',
  };
  
  return contextMap[component] || '/';
}
```

### HUB Güncellemesi

**Claude tarafından otomatik güncellenir:**

```javascript
// Claude yeni varyantlar oluşturduğunda
// HUB.html içindeki JavaScript array'i günceller:

const pendingDesigns = [
  {
    id: "001",
    name: "Navbar",
    level: 1,
    contextPage: "/",
    category: "navigation",
    keywords: ["nav", "navbar", "menu", "navigation", "header"],
    variants: [
      { id: "A", label: "Havalı", file: "variant-A-havali.html" },
      { id: "B", label: "Sade", file: "variant-B-sade.html" },
      { id: "C", label: "Detaylı", file: "variant-C-detayli.html" },
      { id: "D", label: "Görsel", file: "variant-D-gorsel.html" },
    ]
  }
];
```

---

## 🔍 HUB ÖZELLİKLERİ

### 1. Kategorize Görünüm

6 ana kategori:
- 🧭 Navigation & Layout
- 📊 Dashboard Elements
- 📝 Forms & Inputs
- 🔲 Modals & Overlays
- 📋 Data Display
- 💬 Feedback

### 2. Arama Sistemi

**Keyword-based arama:**
- İngilizce + Türkçe keyword'ler
- "navbar" → Navbar
- "buton" → Button
- "oyun" → Game Card

**Otomatik tamamlama:**
- Yazarken öneri gösterir
- Hover preview
- Quick select

### 3. Filtreler

- Tümü
- ✓ Onaylı
- ⏳ Onay bekleyen
- ○ Başlanmadı

### 4. Son Görüntülenenler

localStorage'da tutulan son 5 görüntüleme:
```javascript
["navbar", "button", "statistics-card", ...]
```

### 5. Klavye Kısayolları

- `Cmd/Ctrl + K` → Arama kutusuna odaklan
- `Esc` → Aramayı temizle

---

## 💾 STATE PERSISTENCE

### Sorun: Sayfa Yenilenince Başa Dönüyor

**Çözüm:** localStorage ile state korunur.

### Korunan State:

```typescript
interface HubState {
  currentPage: string;           // pending/approved
  scrollPosition: number;        // Scroll pozisyonu
  openCategories: string[];      // Açık kategoriler
  searchQuery: string;           // Arama sorgusu
  activeFilters: string[];       // Aktif filtreler
  selectedComponent: string;     // Seçili component (highlight)
  viewHistory: ViewHistoryEntry[]; // Görüntüleme geçmişi
  timestamp: number;             // Son güncelleme
}
```

### Restore on Load

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const state = HubStateManager.loadState();
  
  // Scroll restore
  window.scrollTo(0, state.scrollPosition);
  
  // Search restore
  if (state.searchQuery) {
    document.getElementById('search').value = state.searchQuery;
    searchDesigns(state.searchQuery);
  }
  
  // Categories restore
  state.openCategories.forEach(id => {
    openCategory(id);
  });
  
  // Selected component highlight
  if (state.selectedComponent) {
    highlightComponent(state.selectedComponent);
    scrollToComponent(state.selectedComponent);
  }
});
```

### View History (Geri/İleri)

```javascript
// Navigation buttons
<button onclick="navigateBack()">← Geri</button>
<button onclick="navigateHome()">🏠 Ana Sayfa</button>
<button onclick="toggleHistory()">📜 Geçmiş (12)</button>

// History dropdown
const history = ViewHistory.getHistory();
// [
//   { component: "navbar", variant: "A", timestamp: ... },
//   { component: "button", variant: "B", timestamp: ... },
//   ...
// ]
```

### Session Recovery

Beklenmedik kapanma durumunda:

```javascript
// Page load
if (SessionRecovery.checkInterruptedSession()) {
  // Banner göster: "Kaldığın yerden devam et"
  showRecoveryBanner();
}
```

**Recovery Banner:**
- Son aktivite bilgisi
- "Devam Et" → State restore
- "Yeni Başla" → Fresh start
- 10 saniye sonra otomatik dismiss

---

## 🌐 SITE ÜZERİNDE ÖNİZLEME

### "Site Üzerinde Gör" Özelliği

Tasarım varyantlarını **gerçek context içinde** görme sistemi.

**Amaç:**
- Component'i izole değil, gerçek kullanım yerinde görmek
- Çevre elementlerle uyumunu test etmek
- Hover/click gibi interaksiyonları denemek
- Responsive davranışı görmek

**Akış:**
```
1. HUB.html'de varyant kartı
   ├─ 👁️ Önizle → Sadece component (eski)
   └─ 🌐 Site Üzerinde Gör → Context preview (YENİ)

2. "Site Üzerinde Gör" tıklanır
   ↓
3. URL oluşturulur:
   /vault-tracker?preview=button&variant=A
   ↓
4. Sayfa preview mode'da açılır
   ↓
5. Component inject edilir
   ↓
6. Highlight + banner gösterilir
   ↓
7. Gerçek yerinde test edilir
```

### Preview URL Formatı

```
Format:
/{page}?preview={component}&variant={variant}

Örnekler:
/vault-tracker?preview=navbar&variant=A
/vault-tracker?preview=button&variant=B
/vault-tracker?preview=statistics-card&variant=C
/?preview=navbar&variant=D
```

### Preview Mode Implementation

**Sayfa seviyesinde:**

```tsx
// VaultTracker.tsx (veya diğer sayfalar)
function VaultTracker() {
  const [previewMode, setPreviewMode] = useState(false);
  const [previewComponent, setPreviewComponent] = useState(null);
  
  useEffect(() => {
    // URL parametrelerini oku
    const params = new URLSearchParams(window.location.search);
    const component = params.get('preview');
    const variant = params.get('variant');
    
    if (component && variant) {
      setPreviewMode(true);
      
      // Varyant dosyasını yükle ve inject et
      loadPreviewVariant(component, variant).then(componentData => {
        setPreviewComponent(componentData);
        
        // Component'i highlight et
        highlightPreviewArea(component);
      });
    }
  }, []);
  
  const closePreview = () => {
    setPreviewMode(false);
    setPreviewComponent(null);
    
    // URL'i temizle
    window.history.pushState({}, '', window.location.pathname);
  };
  
  return (
    <div className="vault-tracker">
      {/* Preview Banner */}
      {previewMode && (
        <PreviewBanner 
          component={previewComponent}
          onClose={closePreview}
        />
      )}
      
      {/* Normal sayfa içeriği */}
      <Header>
        <button onClick={goToHub}>← Back to Hub</button>
      </Header>
      
      <BlockProgressSidebar games={games} />
      
      {/* Dashboard - Preview mode'daysa ilgili component inject edilir */}
      <Dashboard 
        state={dashboardState} 
        games={games}
        previewComponent={previewComponent}
      />
    </div>
  );
}
```

### Preview Banner Component

```tsx
interface PreviewBannerProps {
  component: PreviewComponent;
  onClose: () => void;
}

function PreviewBanner({ component, onClose }: PreviewBannerProps) {
  const [feedback, setFeedback] = useState('');
  
  const copyFeedback = () => {
    const text = `
Tasarım Feedback:
Component: ${component.name}
Varyant: ${component.variant}
Feedback: ${feedback}
Onay durumu: [Onayla/Red/Değişiklik iste]
    `.trim();
    
    navigator.clipboard.writeText(text);
    toast.success('Feedback panoya kopyalandı!');
  };
  
  return (
    <div className="preview-banner">
      <div className="banner-content">
        <div className="preview-info">
          <span className="preview-icon">🎨</span>
          <div className="preview-details">
            <strong>Tasarım Önizleme Modu</strong>
            <span>Component: {component.name} • Varyant: {component.variant}</span>
          </div>
        </div>
        
        <div className="banner-actions">
          <input 
            type="text"
            placeholder="Feedback yazın..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="feedback-input"
          />
          <button onClick={copyFeedback} className="btn-secondary">
            📋 Feedback Kopyala
          </button>
          <button onClick={onClose} className="btn-close">
            ❌ Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Component Injection Logic

```typescript
async function loadPreviewVariant(
  componentName: string, 
  variantId: string
): Promise<PreviewComponent> {
  // 1. Varyant HTML dosyasını fetch et
  const variantPath = `design-docs/pending/${componentName}/level-1/variant-${variantId}.html`;
  const response = await fetch(variantPath);
  const html = await response.text();
  
  // 2. HTML'i parse et
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // 3. Component data'sını çıkar
  const componentElement = doc.querySelector('[data-component]');
  const styles = doc.querySelector('style')?.textContent || '';
  const scripts = doc.querySelector('script')?.textContent || '';
  
  return {
    name: componentName,
    variant: variantId,
    html: componentElement?.outerHTML || '',
    styles,
    scripts,
  };
}

function highlightPreviewArea(componentName: string) {
  // Component'in normalde render edildiği alanı bul
  const targetSelector = getComponentTargetSelector(componentName);
  const targetElement = document.querySelector(targetSelector);
  
  if (targetElement) {
    // Highlight efekti ekle
    targetElement.classList.add('preview-highlight');
    
    // Scroll to view
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Pulse animasyonu
    targetElement.style.animation = 'preview-pulse 2s ease-in-out infinite';
  }
}

function getComponentTargetSelector(componentName: string): string {
  const selectorMap = {
    'navbar': 'nav.navbar',
    'button': '.primary-button',
    'statistics-card': '.statistics-card',
    'current-game-card': '.current-game-card',
    'block-sidebar': '.block-sidebar',
  };
  
  return selectorMap[componentName] || `[data-component="${componentName}"]`;
}
```

### Preview Styles

```css
/* Preview Banner */
.preview-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.preview-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.preview-icon {
  font-size: 2rem;
}

.preview-details {
  display: flex;
  flex-direction: column;
}

.feedback-input {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  min-width: 200px;
}

.feedback-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* Preview Highlight */
.preview-highlight {
  position: relative;
  outline: 3px solid #667eea !important;
  outline-offset: 4px;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2) !important;
}

@keyframes preview-pulse {
  0%, 100% {
    outline-color: #667eea;
  }
  50% {
    outline-color: #764ba2;
  }
}

/* Preview overlay için backdrop */
body.preview-mode::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1;
  pointer-events: none;
}

.preview-highlight {
  z-index: 2;
  position: relative;
}
```

### Component Context Mapping

Her component için hangi sayfada nerede kullanıldığını tanımla:

```typescript
interface ComponentContext {
  component: string;
  page: string;
  selector: string;
  description: string;
}

const COMPONENT_CONTEXTS: ComponentContext[] = [
  {
    component: 'navbar',
    page: '/',
    selector: 'nav.navbar',
    description: 'Ana navigation bar - tüm sayfalarda',
  },
  {
    component: 'header',
    page: '/vault-tracker',
    selector: 'header.page-header',
    description: 'Sayfa başlığı ve aksiyonlar',
  },
  {
    component: 'button',
    page: '/vault-tracker',
    selector: '.primary-button',
    description: 'Primary action button',
  },
  {
    component: 'statistics-card',
    page: '/vault-tracker',
    selector: '.statistics-card',
    description: 'Dashboard grid içinde istatistik kartı',
  },
  {
    component: 'current-game-card',
    page: '/vault-tracker',
    selector: '.current-game-card',
    description: 'Aktif oyun kartı',
  },
  {
    component: 'block-sidebar',
    page: '/vault-tracker',
    selector: 'aside.block-sidebar',
    description: 'Sol/sağ kenarda blok ilerleme paneli',
  },
];
```

---

## 📸 SCREENSHOT SİSTEMİ

### Otomatik Screenshot

Her HTML tasarımından otomatik screenshot alınır.

**Python script:**
```python
# screenshot_tool.py
from playwright.sync_api import sync_playwright

def take_screenshot(html_path):
    output = html_path.replace('.html', '.png')
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        page.goto(f'file:///{html_path}')
        page.wait_for_load_state('networkidle')
        page.screenshot(path=output, full_page=True)
        browser.close()
    
    print(f"✅ Screenshot: {output}")

# Kullanım:
# python screenshot_tool.py design-docs/pending
```

**Ne zaman çalışır:**
- Manuel: `python screenshot_tool.py <folder>`
- Otomatik: Claude yeni varyant oluşturduğunda

**Sonuç:**
```
pending/001-navbar/level-1/
├── variant-A-havali.html
├── variant-A-havali.png    ← Otomatik oluşturuldu
├── variant-B-sade.html
├── variant-B-sade.png      ← Otomatik oluşturuldu
...
```

---

## ✅ ONAY SÜRECİ

### Onaylama Adımları

```
1. HUB.html'de varyant seçilir
2. "Onayla" butonuna tıklanır
3. Komut panoya kopyalanır:
   "Navbar varyant B'yi onayla"
4. Trae'de Claude'a yapıştırılır
5. Claude işlemi gerçekleştirir:
   a. pending/001-navbar/level-X/variant-B.html
      → approved/navbar/v1.html
   b. pending/001-navbar/level-X/variant-B.png
      → approved/navbar/v1.png
   c. Döküman oluşturulur (approved/navbar/v1.md)
   d. DESIGN_SYSTEM.md güncellenir
   e. COMPONENT_LIBRARY.md güncellenir
   f. CHANGELOG.md'ye ekleme yapılır
   g. HUB.html güncellenir (pending → approved)
   h. Diğer tüm varyantlar ve level'lar silinir
```

### Claude'un İşlemleri

**Onay komutunu aldığında:**

```markdown
# Claude'un yapacakları:

## 1. Dosya Taşıma
- pending/001-navbar/level-2/variant-B.html 
  → approved/navbar/v1.html
- Screenshot da taşınır

## 2. Döküman Oluşturma
approved/navbar/v1.md:
```markdown
# Navbar - v1

**Onay Tarihi:** 2025-01-20  
**Varyant:** B (Sade)  
**Seviye:** 2

## Özellikler
- Minimal tasarım
- Az eleman
- Temiz görünüm

## Kullanım
[HTML dosyasından çıkarılan notlar]
```

## 3. DESIGN_SYSTEM.md Güncelleme
docs/DESIGN_SYSTEM.md'ye ekle:
```markdown
### Navbar
**Versiyon:** v1  
**Stil:** Minimal  
**Referans:** approved/navbar/v1.html
```

## 4. COMPONENT_LIBRARY.md Güncelleme
docs/COMPONENT_LIBRARY.md'ye ekle:
```markdown
## Navbar Component
**Dosya:** approved/navbar/v1.html  
**Durum:** ✅ Onaylandı  
**Açıklama:** Minimal navbar tasarımı
```

## 5. CHANGELOG.md Güncelleme
docs/CHANGELOG.md'ye ekle:
```markdown
### [2025-01-20 15:30]
#### ✨ Navbar v1 Onaylandı
- Minimal tasarım (Varyant B)
- Seviye 2'den seçildi
- **Dosya:** approved/navbar/v1.html
```

## 6. HUB.html Güncelleme
- Navbar'ı "pending" listesinden çıkar
- "approved" listesine ekle

## 7. Temizlik
- pending/001-navbar/ klasörünün tamamını sil
  (Tüm level'lar, tüm varyantlar)
```

---

## 🔄 REVİZE SÜRECİ

### Onaylı Tasarımı Revize Etme

Bir tasarım onaylandıktan sonra ileride değiştirilmek istenirse:

```
1. Kullanıcı: "Navbar'ı revize et"
2. Claude: "Hangi değişiklikleri istiyorsunuz?"
3. Kullanıcı: "Daha koyu renkler"
4. Claude: 4 yeni varyant üretir (pending/002-navbar-revize/)
5. Kullanıcı birini onaylar
6. Onaylanan → approved/navbar/v2.html
7. v1 dosyaları kalır (versiyon geçmişi)
```

**Versiyon Geçmişi:**
```
approved/navbar/
├── v1.html         # Orijinal
├── v1.png
├── v2.html         # Revize
├── v2.png
└── CURRENT.txt     # İçinde: "v2"
```

---

## 📋 DÖKÜMAN YAPISI

### DESIGN_SYSTEM.md

```markdown
# Design System

## Genel Kurallar
[Renk paleti, tipografi, spacing - İLERDE EKLENCEK]

## Komponentler

### Navbar
**Versiyon:** v2  
**Durum:** ✅ Aktif  
**Dosya:** approved/navbar/v2.html  
**Özellikler:**
- [Liste]

### Button
**Versiyon:** v1  
**Durum:** ✅ Aktif  
**Dosya:** approved/button/v1.html

...
```

### COMPONENT_LIBRARY.md

```markdown
# Component Library

## Navbar
**Dosya:** approved/navbar/v2.html  
**Durum:** ✅ Production Ready  
**Son Güncelleme:** 2025-01-20

### Kullanım
[Nasıl kullanılır]

### Varyantlar
- v1: Orijinal minimal
- v2: Daha koyu renkler (aktif)

### Changelog
- v2 (2025-01-20): Renkler koyulaştırıldı
- v1 (2025-01-18): İlk versiyon
```

### CHANGELOG.md

```markdown
# Changelog

## [2025-01-20]

### ✨ Navbar v2 Onaylandı
- Daha koyu renkler
- v1'den revize
- **Dosya:** approved/navbar/v2.html

### ✨ Button v1 Onaylandı
- Minimal tasarım
- Hover animasyonu
- **Dosya:** approved/button/v1.html

## [2025-01-18]

### ✨ Navbar v1 Onaylandı
- İlk versiyon
...
```

---

## 🎯 CLAUDE TALİMATLARI

### Yeni Tasarım Önerisi

**Komut formatı:**
```
"[Component adı] için tasarım öner"

Örnek:
"Navbar için tasarım öner"
"Statistics card için tasarım öner"
```

**Claude'un yapacakları:**
```markdown
1. pending/[ID]-[component]/ klasörü oluştur
2. level-1/ klasörü oluştur
3. 4 varyant üret:
   - variant-A-havali.html
   - variant-B-sade.html
   - variant-C-detayli.html
   - variant-D-gorsel.html
4. Her varyant için .md dosyası (açıklama)
5. Screenshot oluştur (script çalıştır)
6. HUB.html'i güncelle (yeni tasarım ekle)
```

### Benzer Varyant İsteği

**Komut formatı:**
```
"[Component], varyant [X]'e benzer üret"

Örnek:
"Navbar, varyant B'ye benzer üret"
```

**Claude'un yapacakları:**
```markdown
1. Varyant B'nin özelliklerini analiz et
2. pending/001-navbar/level-2-from-B/ oluştur
3. parent.txt dosyası oluştur (içinde: "variant-B-sade")
4. B'nin temel özelliklerini koruyarak 4 yeni varyant:
   - B.1: B + tweak 1
   - B.2: B + tweak 2
   - B.3: B + tweak 3
   - B.4: B + tweak 4
5. Screenshot oluştur
6. HUB.html güncelle
```

### Onay Komutu

**Komut formatı:**
```
"[Component], seviye [X], varyant [Y]'yi onayla"

Örnek:
"Navbar, seviye 2, varyant B'yi onayla"
```

**Claude'un yapacakları:**
```markdown
1. Dosya taşıma (pending → approved)
2. Versiyon numarası belirle (v1, v2, ...)
3. Döküman oluştur (.md)
4. DESIGN_SYSTEM.md güncelle
5. COMPONENT_LIBRARY.md güncelle
6. CHANGELOG.md'ye ekle
7. HUB.html güncelle
8. pending/001-navbar/ klasörünün tamamını sil
```

### Yeniden Yap (Komut Yok)

**Komut:**
```
"[Component] için yeniden yap"

Örnek:
"Navbar için yeniden yap"
```

**Claude'un yapacakları:**
```markdown
1. Mevcut varyantları incele
2. TAMAMEN farklı yaklaşımlarla 4 yeni varyant
3. Farklı renkler, farklı layout'lar dene
4. "Sürpriz" faktörü ekle
5. Screenshot oluştur
6. HUB.html güncelle
```

### Yeniden Yap (Komutla)

**Komut formatı:**
```
"[Component] için yeniden yap: [istekler]"

Örnek:
"Navbar için yeniden yap: Daha minimalist ve pastel renkler"
```

**Claude'un yapacakları:**
```markdown
1. İsteği analiz et ("minimalist + pastel")
2. Bu temayı 4 farklı şekilde yorumla:
   - A: Çok minimalist, lila tonlar
   - B: Orta minimalist, mavi-pembe
   - C: Az eleman, krem-turkuaz
   - D: Ultra sade, monokrom pastel
3. Screenshot oluştur
4. HUB.html güncelle
```

---

## 🔀 DALLANMA ÖRNEKLERİ

### Örnek 1: Tek Dal

```
Level 1:
  A (Havalı)
  B (Sade)        ← Beğenildi
  C (Detaylı)
  D (Görsel)

Komut: "Navbar, varyant B'ye benzer üret"

Level 2 (B'den):
  B.1
  B.2
  B.3             ← Beğenildi, ONAYLANDI
  B.4

Komut: "Navbar, seviye 2, varyant B.3'ü onayla"

Result:
  approved/navbar/v1.html (B.3'ün kopyası)
  pending/001-navbar/ → SİLİNDİ
```

### Örnek 2: Çoklu Dal

```
Level 1:
  A (Havalı)      ← Beğenildi
  B (Sade)        ← Beğenildi
  C (Detaylı)
  D (Görsel)

Komut: "Navbar, varyant A ve B'ye benzer üret"

Level 2 (A'dan):
  A.1
  A.2             ← Beğenildi
  A.3
  A.4

Level 2 (B'den):
  B.1
  B.2
  B.3             ← Beğenildi
  B.4

Komut: "Navbar, seviye 2, A.2'ye benzer üret"
Komut: "Navbar, seviye 2, B.3'e benzer üret"

Level 3 (A.2'den):
  A.2.1
  A.2.2
  A.2.3
  A.2.4

Level 3 (B.3'ten):
  B.3.1
  B.3.2
  B.3.3           ← Beğenildi, ONAYLANDI
  B.3.4

Komut: "Navbar, seviye 3, B.3.3'ü onayla"

Result:
  approved/navbar/v1.html (B.3.3'ün kopyası)
  pending/001-navbar/ → TÜM DALLAR SİLİNDİ
```

### Örnek 3: Geri Dönüş

```
Level 1:
  A
  B               ← Beğenildi
  C
  D

Level 2 (B'den):
  B.1
  B.2
  B.3             ← Beğenildi
  B.4

Level 3 (B.3'ten):
  B.3.1
  B.3.2
  B.3.3
  B.3.4           ← Hiçbiri tam olmadı

Kullanıcı: "Aslında A daha iyi miydi?"

Komut: "Navbar, seviye 1'e dön"

HUB → Level 1'i gösterir
Kullanıcı A'yı seçer

Komut: "Navbar, varyant A'ya benzer üret"

Level 2 (A'dan):
  A.1
  A.2
  A.3             ← Beğenildi, ONAYLANDI
  A.4

Result:
  approved/navbar/v1.html (A.3'ün kopyası)
```

---

## 🎨 TASARIM PRENSİPLERİ

### Varyant Üretme Kuralları

**Varyant A (Havalı):**
- Cesur tercihler yap
- Trend teknikleri kullan
- Animasyon/geçiş efektleri
- Büyük typography

**Varyant B (Sade):**
- Minimal element sayısı
- Geniş whitespace
- Soft renkler
- Okunabilirlik öncelik

**Varyant C (Detaylı):**
- Çok bilgi göster
- Alt bölümler kullan
- İkonlar ve rozetler
- Professional görünüm

**Varyant D (Görsel):**
- Büyük resimler/görseller
- Az yazı
- Visual hierarchy
- Image overlay/blur

### Benzer Varyant Üretme

**Ana özellik korunur:**
```
Orijinal: Minimal navbar, pastel renkler, ince border

Benzer varyantlar:
1. Minimal + pastel + shadow eklendi
2. Minimal + pastel + border kalınlaştırıldı
3. Minimal + daha açık pastel + border yok
4. Minimal + pastel + rounded corners arttırıldı
```

**Büyük değişiklik YOK:**
- Minimal → Detaylı yapma
- Pastel → Neon yapma
- Sadece ince ayarlar

---

## ✅ WORKFLOW CHECKLIST

### Yeni Tasarım Başlangıcı
- [ ] Component belirle
- [ ] pending/[ID]-[name]/ oluştur
- [ ] level-1/ oluştur
- [ ] 4 varyant üret (A/B/C/D)
- [ ] Screenshot al
- [ ] HUB.html güncelle

### Benzer Varyant İsteği
- [ ] Orijinal varyantı analiz et
- [ ] level-X-from-[Y]/ oluştur
- [ ] parent.txt oluştur
- [ ] 4 benzer varyant üret
- [ ] Screenshot al
- [ ] HUB.html güncelle

### Onaylama
- [ ] Dosya taşı (pending → approved)
- [ ] Versiyon belirle
- [ ] Döküman oluştur (.md)
- [ ] DESIGN_SYSTEM.md güncelle
- [ ] COMPONENT_LIBRARY.md güncelle
- [ ] CHANGELOG.md'ye ekle
- [ ] HUB.html güncelle
- [ ] pending/ klasörünü sil

### Revize
- [ ] Yeni pending/ oluştur (farklı ID)
- [ ] 4 revize varyantı üret
- [ ] Onaylama → v2, v3, ... olarak kaydet
- [ ] Eski versiyon dosyalarını koru

---

## 📊 SÜREÇ AKIŞI DİYAGRAMI

```
┌─────────────────────────────────────────┐
│  Tasarım İsteği                         │
│  "Navbar için tasarım öner"             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Claude 4 Varyant Üretir                │
│  - A (Havalı)                           │
│  - B (Sade)                             │
│  - C (Detaylı)                          │
│  - D (Görsel)                           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  HUB.html'de Görüntüle                  │
│  Kullanıcı varyantları inceler          │
└──────────────┬──────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌─────────────┐   ┌─────────────┐
│  Doğrudan   │   │  Benzer     │
│  Onayla     │   │  İste       │
└──────┬──────┘   └──────┬──────┘
       │                 │
       │                 ▼
       │          ┌─────────────────┐
       │          │  4 Yeni Varyant │
       │          └──────┬──────────┘
       │                 │
       │           [Tekrar]
       │                 │
       └─────────┬───────┘
                 │
                 ▼
        ┌────────────────┐
        │  Onay Komutu   │
        └────────┬───────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│  Claude İşleri Yapar:                    │
│  1. Dosya taşı                           │
│  2. Döküman oluştur                      │
│  3. DESIGN_SYSTEM.md güncelle            │
│  4. COMPONENT_LIBRARY.md güncelle        │
│  5. CHANGELOG.md'ye ekle                 │
│  6. HUB.html güncelle                    │
│  7. pending/ sil                         │
└──────────────────────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  Tamamlandı ✓  │
        └────────────────┘
```

---

## 📝 NOTLAR

1. **Tasarım detayı yok:** Bu dosya sadece süreci anlatır
2. **Renk/font yok:** Bunlar tasarım aşamasında belirlenir
3. **Claude takip eder:** Tüm adımları Claude otomatik yapar
4. **HUB merkezi:** Her şey HUB.html üzerinden yönetilir
5. **Sınırsız dallanma:** İstediğin kadar detaya inebilirsin

---

**Status:** WORKFLOW DEFINED ✓  
**Next:** Claude implementation guide
