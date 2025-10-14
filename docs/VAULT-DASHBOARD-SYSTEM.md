# VAULT DASHBOARD SYSTEM
## Core Grid System + Edit Mode Logic

> **NOT:** Bu dosya sadece SİSTEM MANTĞINI içerir.
> Görsel tasarım, renkler, fontlar vs. YOKTUR.
> Tasarım ayrı bir süreçte yapılacak.

---

## 🎯 VAULT TRACKER NEDİR?

Vault Tracker, kullanıcının oyun kütüphanesini ve ilerlemesini takip ettiği bir dashboard uygulaması.

**Ana Özellikler:**
1. **Özelleştirilebilir Dashboard:** Kullanıcı kartları istediği gibi düzenler
2. **Grid Sistemi:** 12 sütunlu, responsive grid
3. **Edit Mode:** Drag-drop, resize, lock/unlock
4. **Çoklu Kart Tipi:** İstatistik, mevcut oyun, sıradaki oyunlar, ilerleme grafiği

---

## 📐 GRID SİSTEMİ

### Temel Konfigürasyon

```javascript
GRID_CONFIG = {
  columns: 12,        // 12 sütun
  cellWidth: 120,     // Her hücre 120px genişliğinde
  cellHeight: 120,    // Her hücre 120px yüksekliğinde
  gap: 16,           // Hücreler arası boşluk 16px
}
```

### Kart Boyutları

Her kart grid üzerinde **genişlik × yükseklik** olarak tanımlanır:

**Minimum:** 2×2 (en küçük kart)  
**Maximum:** 6×6 (en büyük kart)

**Toplam 16 farklı boyut:**

#### Kare Kartlar (4 adet):
```
2×2 = 256×256px
3×3 = 392×392px
4×4 = 528×528px
6×6 = 800×800px
```

#### Yatay Kartlar (6 adet):
```
3×2 = 392×256px
4×2 = 528×256px
6×2 = 800×256px
4×3 = 528×392px
6×3 = 800×392px
6×4 = 800×528px
```

#### Dikey Kartlar (6 adet):
```
2×3 = 256×392px
2×4 = 256×528px
2×6 = 256×800px
3×4 = 392×528px
3×6 = 392×800px
4×6 = 528×800px
```

### Grid CSS Implementation

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 120px);
  grid-auto-rows: 120px;
  gap: 16px;
}
```

### Kart Positioning

Her kart şu şekilde konumlanır:

```javascript
// Kart pozisyon modeli
interface CardPosition {
  x: number;      // Başlangıç sütunu (0-11)
  y: number;      // Başlangıç satırı (0-∞)
  width: number;  // Kaç sütun kaplar (2-6)
  height: number; // Kaç satır kaplar (2-6)
}

// CSS'e çevrilmesi:
gridColumn: `${x + 1} / span ${width}`;
gridRow: `${y + 1} / span ${height}`;
```

**Örnek:**
```javascript
// 3×2 kart, sol üst köşede
position: { x: 0, y: 0, width: 3, height: 2 }

// CSS:
grid-column: 1 / span 3;  // 1. sütundan başla, 3 sütun kapla
grid-row: 1 / span 2;      // 1. satırdan başla, 2 satır kapla
```

---

## 🎨 PATTERN SİSTEMİ

Her kart boyutu için otomatik pattern belirlenir.

### Pattern Detection

```javascript
function determinePattern(width, height) {
  const aspectRatio = width / height;
  
  if (aspectRatio > 1.2) {
    return 'HORIZONTAL';  // Geniş kart → Yan yana içerik
  } else if (aspectRatio < 0.8) {
    return 'VERTICAL';    // Uzun kart → Alt alta içerik
  } else {
    return 'SQUARE';      // Kare kart → Flexible layout
  }
}
```

### Pattern Özellikleri

| Pattern | Aspect Ratio | İçerik Akışı | Örnek Boyutlar |
|---------|--------------|--------------|----------------|
| **HORIZONTAL** | > 1.2 | Yan yana (row) | 3×2, 4×2, 6×2, 4×3, 6×3, 6×4 |
| **VERTICAL** | < 0.8 | Alt alta (column) | 2×3, 2×4, 2×6, 3×4, 3×6, 4×6 |
| **SQUARE** | 0.8-1.2 | Flexible | 2×2, 3×3, 4×4, 6×6 |

### Pattern Kullanımı

```javascript
// Component içinde
const pattern = determinePattern(cardWidth, cardHeight);

if (pattern === 'HORIZONTAL') {
  // İçerik yan yana yerleştirilir
  return <HorizontalLayout />;
}

if (pattern === 'VERTICAL') {
  // İçerik alt alta yerleştirilir
  return <VerticalLayout />;
}

// SQUARE
return <SquareLayout />;
```

---

## 📦 KART TİPLERİ

Dashboard'da 4 farklı kart tipi var:

### 1. Statistics Card
**Amaç:** Oyun istatistiklerini gösterir  
**Veri:** Tamamlanan oyunlar, devam eden oyunlar, tamamlama oranı vs.

**Desteklenen Pattern'ler:**
- SQUARE: Tüm kare boyutlar (2×2, 3×3, 4×4, 6×6)
- HORIZONTAL: Tüm yatay boyutlar (3×2, 4×2, 6×2, 4×3, 6×3, 6×4)
- VERTICAL: ❌ Uygun değil (istatistikler yan yana gösterilmeli)

**Pattern'e göre davranış:**
- **SQUARE:** Grid layout (KPI'lar grid'de)
- **HORIZONTAL:** Yan yana KPI blokları

---

### 2. Current Game Card
**Amaç:** Şu an oynanan oyunu gösterir  
**Veri:** Oyun adı, platform, ilerleme, oynama süresi, hedefler

**Desteklenen Pattern'ler:**
- SQUARE: Tüm kare boyutlar
- HORIZONTAL: Tüm yatay boyutlar
- VERTICAL: Tüm dikey boyutlar

**Pattern'e göre davranış:**
- **SQUARE:** Standart layout (thumbnail üstte, bilgiler altta)
- **HORIZONTAL:** Thumbnail solda, bilgiler sağda
- **VERTICAL:** Thumbnail üstte, bilgiler altta (dar)

---

### 3. Next Games Card
**Amaç:** Sıradaki oyunları listeler  
**Veri:** Oyun adı, tahmini süre, öncelik

**Desteklenen Pattern'ler:**
- SQUARE: Tüm kare boyutlar
- HORIZONTAL: ❌ Uygun değil (liste dikey olmalı)
- VERTICAL: Tüm dikey boyutlar

**Pattern'e göre davranış:**
- **SQUARE:** Scrollable liste
- **VERTICAL:** Scrollable liste (daha uzun)

**Liste item sayısı:**
- Kart yüksekliğine göre otomatik hesaplanır
- Taşarsa scroll bar

---

### 4. Progress Chart Card
**Amaç:** Zaman içinde ilerleme grafiğini gösterir  
**Veri:** Aylık/haftalık tamamlanan oyun sayıları

**Desteklenen Pattern'ler:**
- SQUARE: Tüm kare boyutlar
- HORIZONTAL: Tüm yatay boyutlar
- VERTICAL: Tüm dikey boyutlar

**Pattern'e göre davranış:**
- **SQUARE:** Chart + mini stats
- **HORIZONTAL:** Chart + stats yan yana
- **VERTICAL:** Chart üstte, stats altta

---

## 🔄 EDIT MODE SİSTEMİ

Dashboard iki modda çalışır:

### View Mode (Normal)
- Kartlar statik
- İçerikler interaktif
- Düzenleme yapılamaz

### Edit Mode
- Kartlar düzenlenebilir
- Drag & drop aktif
- Resize handles görünür
- Lock/unlock buttons aktif
- Add/delete yapılabilir

### Mode Toggle

```javascript
const [mode, setMode] = useState('view'); // 'view' | 'edit'

// View → Edit
function enterEditMode() {
  setMode('edit');
  // Backup current state (cancel için)
  setBackup(currentCards);
}

// Edit → View (Save)
function saveAndExit() {
  localStorage.setItem('dashboard', JSON.stringify(currentCards));
  setMode('view');
}

// Edit → View (Cancel)
function cancelAndExit() {
  setCurrentCards(backup); // Restore backup
  setMode('view');
}
```

---

## 🔒 LOCK/UNLOCK SİSTEMİ

Her kart kilitlenebilir veya kilidi açılabilir.

### Lock State

```javascript
interface DashboardCard {
  id: string;
  type: 'statistics' | 'currentGame' | 'nextGames' | 'progress';
  position: CardPosition;
  locked?: boolean;  // ← Lock durumu
}
```

### Kilitli Kartların Davranışı

**Kilitli kart (locked: true):**
- ❌ Drag edilemez
- ❌ Resize edilemez
- ✅ Silinebilir
- ✅ Lock açılabilir
- ✅ Diğer kartlar için collision engeli

**Kilitsiz kart (locked: false):**
- ✅ Drag edilebilir
- ✅ Resize edilebilir
- ✅ Silinebilir
- ✅ Kilitlenebilir

### Lock Toggle

```javascript
function toggleLock(cardId) {
  setCards(cards.map(card => 
    card.id === cardId 
      ? { ...card, locked: !card.locked }
      : card
  ));
}
```

### Lock Kullanım Senaryoları

1. **Sabit Header/Footer:** İstatistik kartını her zaman üstte tutmak
2. **Layout Koruma:** Önemli kartların yanlışlıkla taşınmasını önlemek
3. **Multi-User:** Admin'in sabitlediği kartlar

---

## 🎯 DRAG & DROP

Edit mode'da kullanıcı kartları sürükleyip taşır.

### Drag Mantığı

```javascript
function onDragStart(card) {
  // Lock check
  if (card.locked) return; // ← Kilitli kartlar sürüklenemez
  
  setDraggingCard(card);
}

function onDragMove(mouseX, mouseY) {
  // Mouse pozisyonunu grid koordinatına çevir
  const gridX = Math.round(mouseX / (cellWidth + gap));
  const gridY = Math.round(mouseY / (cellHeight + gap));
  
  // Geçerli mi kontrol et
  const isValid = checkCollision(gridX, gridY, draggingCard.position);
  
  // Ghost preview göster
  setGhostPosition({ x: gridX, y: gridY, valid: isValid });
}

function onDragEnd() {
  if (ghostPosition.valid) {
    // Kartı yeni pozisyona taşı
    updateCardPosition(draggingCard.id, ghostPosition);
  }
  
  setDraggingCard(null);
  setGhostPosition(null);
}
```

### Collision Detection

```javascript
function checkCollision(x, y, size) {
  // Grid sınırları kontrolü
  if (x < 0 || x + size.width > 12) return true;
  if (y < 0) return true;
  
  // Diğer kartlarla çakışma kontrolü (kilitli kartlar dahil)
  return cards.some(card => {
    if (card.id === draggingCard.id) return false; // Kendisi değil
    
    const { x: cx, y: cy, width, height } = card.position;
    
    // AABB collision
    return !(
      x + size.width <= cx ||
      x >= cx + width ||
      y + size.height <= cy ||
      y >= cy + height
    );
  });
}
```

**Önemli:** Kilitli kartlar collision hesabına dahil edilir ama kendileri taşınamaz.

---

## 📏 RESIZE

Edit mode'da kullanıcı kartları boyutlandırır.

### Resize Handles

Her kartın 4 köşesinde resize handle:
- **SE (South-East):** Sağ alt → Sağa ve aşağı büyüt
- **SW (South-West):** Sol alt → Sola ve aşağı büyüt
- **NE (North-East):** Sağ üst → Sağa ve yukarı büyüt
- **NW (North-West):** Sol üst → Sola ve yukarı büyüt

### Resize Mantığı

```javascript
function onResizeStart(card, handle) {
  // Lock check
  if (card.locked) return; // ← Kilitli kartlar resize edilemez
  
  setResizingCard(card);
  setResizeHandle(handle); // 'se' | 'sw' | 'ne' | 'nw'
}

function onResizeMove(deltaX, deltaY) {
  // Delta'yı grid birimlerine çevir
  const gridDeltaX = Math.round(deltaX / (cellWidth + gap));
  const gridDeltaY = Math.round(deltaY / (cellHeight + gap));
  
  // Yeni boyutu hesapla (handle'a göre)
  const newSize = calculateNewSize(
    resizingCard.position,
    resizeHandle,
    gridDeltaX,
    gridDeltaY
  );
  
  // Sınırlara uy (2-6)
  newSize.width = clamp(newSize.width, 2, 6);
  newSize.height = clamp(newSize.height, 2, 6);
  
  // Geçerliliği kontrol et
  const isValid = checkCollision(newSize.x, newSize.y, newSize);
  
  if (isValid) {
    // Preview göster
    setPreviewSize(newSize);
  }
}
```

### Size Constraints

```javascript
MIN_CARD_SIZE = { width: 2, height: 2 };
MAX_CARD_SIZE = { width: 6, height: 6 };
```

---

## ➕ ADD CARD

Edit mode'da yeni kart ekleme.

### Add Flow

```
1. "Add Card" butonuna tıkla
2. Modal açılır:
   - Kart tipi seç (4 seçenek)
   - Boyut seç (16 seçenek)
   - Preview gör
3. "Add" tıkla
4. Boş yer bul (findEmptySpot)
5. Kartı ekle
```

### Find Empty Spot Algorithm

```javascript
function findEmptySpot(requiredSize) {
  const { width, height } = requiredSize;
  
  // Sol üstten başla, tara
  for (let y = 0; y < 50; y++) {      // Max 50 satır
    for (let x = 0; x <= 12 - width; x++) {
      const testPosition = { x, y, width, height };
      
      // Bu pozisyon boş mu?
      const hasCollision = checkCollision(x, y, requiredSize);
      
      if (!hasCollision) {
        return testPosition; // Bulundu!
      }
    }
  }
  
  return null; // Boş yer yok
}
```

**Not:** Kilitli kartlar collision'da hesaba katılır.

---

## 🗑️ DELETE CARD

Edit mode'da kart silme.

### Delete Flow

```
1. Kartın "Delete" butonuna tıkla
2. Confirmation dialog:
   "Are you sure you want to delete [Card Name]?"
3. Confirm → Kartı sil
4. Cancel → İptal
```

### Delete Logic

```javascript
function deleteCard(cardId) {
  // Locked kartlar da silinebilir (sadece taşınamaz/resize edilemez)
  setCards(cards.filter(card => card.id !== cardId));
}
```

**Önemli:** Lock sadece drag/resize'ı engeller, delete'i değil.

---

## 💾 STATE MANAGEMENT

### Dashboard State

```javascript
interface DashboardState {
  mode: 'view' | 'edit';
  cards: DashboardCard[];
  backup: DashboardCard[]; // Cancel için
}
```

### Context Structure

```javascript
const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const [mode, setMode] = useState('view');
  const [cards, setCards] = useState([]);
  const [backup, setBackup] = useState([]);
  
  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vault-dashboard');
    if (saved) {
      setCards(JSON.parse(saved));
    } else {
      setCards(DEFAULT_LAYOUT);
    }
  }, []);
  
  // Functions
  const enterEditMode = () => { /* ... */ };
  const saveChanges = () => { /* ... */ };
  const cancelChanges = () => { /* ... */ };
  const addCard = (type, size) => { /* ... */ };
  const deleteCard = (id) => { /* ... */ };
  const updateCard = (id, updates) => { /* ... */ };
  const toggleLock = (id) => { /* ... */ };
  
  return (
    <DashboardContext.Provider value={{
      mode,
      cards,
      enterEditMode,
      saveChanges,
      cancelChanges,
      addCard,
      deleteCard,
      updateCard,
      toggleLock,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}
```

### Persistence

**localStorage key:** `vault-dashboard`

**Kaydedilen veri:**
```javascript
{
  cards: [
    {
      id: 'card-1',
      type: 'statistics',
      position: { x: 0, y: 0, width: 3, height: 3 },
      locked: true,
    },
    // ...
  ],
  version: '1.0',
  lastModified: '2025-01-20T10:00:00Z',
}
```

---

## ⌨️ KEYBOARD SHORTCUTS

Edit mode'da klavye kısayolları:

```javascript
useKeyboardShortcuts({
  'cmd+s': saveChanges,        // Save
  'esc': cancelChanges,         // Cancel
  'cmd+l': toggleLockSelected,  // Lock/unlock selected card
  'delete': deleteSelected,     // Delete selected card (if unlocked)
});
```

**Önemli:** Delete shortcut sadece kilitsiz kartlarda çalışır.

---

## 🔄 AUTO-ARRANGE

Kartları otomatik düzenleme.

### Auto-Arrange Logic

```javascript
function autoArrange() {
  // Kilitli ve kilitsiz kartları ayır
  const lockedCards = cards.filter(c => c.locked);
  const unlockedCards = cards.filter(c => !c.locked);
  
  // Kilitsiz kartları tipine göre sırala
  const sorted = unlockedCards.sort((a, b) => {
    const typePriority = {
      statistics: 0,
      currentGame: 1,
      progress: 2,
      nextGames: 3,
    };
    return typePriority[a.type] - typePriority[b.type];
  });
  
  // Yerleştirme
  let currentX = 0;
  let currentY = 0;
  let rowHeight = 0;
  
  const arranged = sorted.map(card => {
    const { width, height } = card.position;
    
    // Satıra sığıyor mu?
    if (currentX + width > 12) {
      // Yeni satır
      currentX = 0;
      currentY += rowHeight;
      rowHeight = 0;
    }
    
    // Kilitli kartlarla çakışma var mı?
    let testX = currentX;
    let testY = currentY;
    
    while (collidesWith(testX, testY, width, height, lockedCards)) {
      testX++;
      if (testX + width > 12) {
        testX = 0;
        testY++;
      }
    }
    
    currentX = testX + width;
    currentY = testY;
    rowHeight = Math.max(rowHeight, height);
    
    return {
      ...card,
      position: { x: testX, y: testY, width, height },
    };
  });
  
  // Kilitli kartları ekle
  return [...arranged, ...lockedCards];
}
```

**Mantık:**
- Kilitli kartlar olduğu yerde kalır
- Kilitsiz kartlar yeniden dizilir
- Kilitli kartlarla çakışma önlenir

---

## 📊 DEFAULT LAYOUT

İlk kez giren kullanıcı için varsayılan layout:

```javascript
const DEFAULT_LAYOUT = [
  {
    id: 'default-stats',
    type: 'statistics',
    position: { x: 0, y: 0, width: 3, height: 3 },
    locked: true, // Sabit kart
  },
  {
    id: 'default-current',
    type: 'currentGame',
    position: { x: 3, y: 0, width: 4, height: 4 },
    locked: false,
  },
  {
    id: 'default-next',
    type: 'nextGames',
    position: { x: 7, y: 0, width: 2, height: 4 },
    locked: false,
  },
  {
    id: 'default-progress',
    type: 'progress',
    position: { x: 9, y: 0, width: 3, height: 3 },
    locked: false,
  },
];
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Grid System
- [ ] Grid container (CSS Grid)
- [ ] Card positioning logic
- [ ] 16 boyut testi

### Phase 2: Pattern System
- [ ] determinePattern() fonksiyonu
- [ ] Pattern-based rendering
- [ ] 4 kart tipi için pattern desteği

### Phase 3: View Mode
- [ ] Cards render
- [ ] Static layout
- [ ] Content interaction

### Phase 4: Edit Mode Toggle
- [ ] Mode state
- [ ] Grid overlay
- [ ] Edit controls

### Phase 5: Lock System
- [ ] Lock toggle
- [ ] Visual states
- [ ] Lock checks (drag/resize)
- [ ] Persistence

### Phase 6: Drag & Drop
- [ ] Drag handlers
- [ ] Collision detection
- [ ] Ghost preview
- [ ] Lock check

### Phase 7: Resize
- [ ] 4 corner handles
- [ ] Resize logic
- [ ] Size constraints
- [ ] Lock check

### Phase 8: Add/Delete
- [ ] Add modal
- [ ] findEmptySpot
- [ ] Delete confirmation

### Phase 9: State & Persistence
- [ ] Context setup
- [ ] localStorage
- [ ] Save/Cancel logic

### Phase 10: Extras
- [ ] Keyboard shortcuts
- [ ] Auto-arrange
- [ ] Error handling

---

## 🎯 CORE PRINCIPLES

1. **Grid-Based:** Her şey grid sistemi üzerine kurulu
2. **Pattern-Driven:** Boyut → Pattern → Layout
3. **Lock-Aware:** Her işlemde lock kontrolü
4. **Collision-Safe:** Kartlar asla üst üste binmez
5. **Persistent:** State her zaman localStorage'a kaydedilir

---

## 📝 NOTLAR

- **Tasarım yok:** Bu doküman sadece mantık
- **Renk yok:** UI tasarımı ayrı süreçte
- **Font yok:** Tipografi ayrı süreçte
- **Layout yok:** Komponent yerleşimi ayrı süreçte

**Sadece:**
- Grid matematiği
- Pattern detection
- Edit mode mantığı
- Lock sistemi
- State management

**ÖNEMLİ HATIRLATMALAR:**
- **Block sidebar GRID'DE DEĞİL**: Ayrı `<aside>` component, flex layout ile dashboard yanında
- **Preview mode entegrasyonu**: Design tools (picker/boundary/add) dashboard'da çalışabilmeli
- **Tool overlay'ler**: Canvas overlay'ler grid sistemini etkilememeli (z-index yönetimi)

---

**Status:** SYSTEM DEFINED ✓  
**Next:** Design workflow process
