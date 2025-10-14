# CLAUDE IMPLEMENTATION GUIDE
## Trae IDE'deki Claude İçin Talimatlar

> **Hedef:** Vault Tracker uygulamasını bu spec'lere göre implement et.
> **Okuyucu:** Trae IDE'de çalışan Claude Sonnet 4
> **Dosyalar:** SYSTEM-ARCHITECTURE.md, VAULT-DASHBOARD-SYSTEM.md, DESIGN-WORKFLOW.md

---

## 📚 GEREKLİ DOSYALARI OKU

Bu talimatları okumadan önce MUTLAKA şu dosyaları oku:

1. **SYSTEM-ARCHITECTURE.md** - Genel uygulama mimarisi
2. **VAULT-DASHBOARD-SYSTEM.md** - Dashboard core sistemi
3. **DESIGN-WORKFLOW.md** - Tasarım onay süreci

Her dosya belirli bir konuyu detaylı anlatır. Hepsini oku!

---

## 🎯 GENEL KURALLAR

### 1. Sistem Mantığını Uygula, Tasarım Yapma

**SEN:**
- ✅ Grid sistemini kur
- ✅ Edit mode mantığını implement et
- ✅ Lock/drag/resize sistemlerini yap
- ✅ Pattern detection yaz
- ✅ State management kur

**SEN DEĞİL:**
- ❌ Renkleri belirleme
- ❌ Font seçme
- ❌ Spacing kararları alma
- ❌ Komponent tasarımları yapma

**Tasarım ayrı bir süreçte yapılacak.**

---

### 2. Placeholder'lar Kullan

Gerçek tasarım olmadığı için placeholder'lar kullan:

**Renkler:**
```css
/* Placeholder renkler */
--color-bg: #1a1a1a;
--color-text: #ffffff;
--color-accent: #4a90e2;
--color-border: #333333;
```

**Yazılar:**
```jsx
<h1 className="text-2xl font-bold">Placeholder Title</h1>
<p className="text-sm">Placeholder description text</p>
```

**Komponentler:**
```jsx
// Statistics Card - Placeholder
function StatisticsCard({ width, height }) {
  return (
    <div style={{ width, height }}>
      <div>Statistics Card Placeholder</div>
      <div>W: {width} H: {height}</div>
    </div>
  );
}
```

---

### 3. Minimal Styling

Sadece **çalışması için gerekli** CSS yaz:

**✅ Gerekli:**
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 120px);
  gap: 16px;
}
```

**❌ Gereksiz:**
```css
.dashboard-grid {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-radius: 12px;
  /* ... süsleme */
}
```

---

### 4. Fonksiyonellik Önce

Görsel değil, **işlevsellik** önemli:

**Öncelik sırası:**
1. Grid sistemi çalışıyor mu?
2. Kartlar doğru konumlanıyor mu?
3. Pattern detection çalışıyor mu?
4. Edit mode çalışıyor mu?
5. Drag/resize çalışıyor mu?

**Görsel son öncelik:**
- Renk uyumu
- Animation
- Typography

---

## 🚀 IMPLEMENTATION ADIMARI

### PHASE 1: Temel Yapı (2h)

**Görevler:**
1. React projesi oluştur (Vite + TypeScript)
2. Route yapısını kur:
   - `/` - Login (auto-login)
   - `/hub` - App selector
   - `/vault-tracker` - Dashboard
3. Auth context setup (fake auth)
4. localStorage integration

**Test:**
- [ ] Login → Hub → Vault Tracker akışı çalışıyor
- [ ] Auto-login aktif
- [ ] Route protection çalışıyor

---

### PHASE 2: Grid Sistemi (2h)

**Görevler:**
1. Grid container (CSS Grid)
2. Card positioning logic
3. 16 boyut testi
4. Pattern detection fonksiyonu

**Kod:**
```typescript
// Grid config
const GRID_CONFIG = {
  columns: 12,
  cellWidth: 120,
  cellHeight: 120,
  gap: 16,
};

// Pattern detection
function determinePattern(width: number, height: number) {
  const ratio = width / height;
  if (ratio > 1.2) return 'HORIZONTAL';
  if (ratio < 0.8) return 'VERTICAL';
  return 'SQUARE';
}
```

**Test:**
- [ ] Grid render oluyor
- [ ] 16 farklı boyut test edildi
- [ ] Pattern detection doğru çalışıyor

---

### PHASE 3: Kart Componentleri (3h)

**Görevler:**
1. 4 kart tipi için placeholder component:
   - StatisticsCard
   - CurrentGameCard
   - NextGamesCard
   - ProgressChartCard
2. Pattern-based rendering
3. Boyut-based content density

**Örnek:**
```tsx
function StatisticsCard({ width, height }: CardProps) {
  const pattern = determinePattern(width, height);
  
  if (pattern === 'HORIZONTAL') {
    return <HorizontalStatistics width={width} height={height} />;
  }
  
  if (pattern === 'SQUARE') {
    return <SquareStatistics width={width} height={height} />;
  }
  
  // VERTICAL not supported for Statistics
  return null;
}

function HorizontalStatistics({ width, height }: CardProps) {
  return (
    <div className="card" style={{ width, height }}>
      <div className="card-header">
        <span>Statistics (HORIZONTAL)</span>
      </div>
      <div className="card-content flex flex-row gap-4">
        <div className="kpi-block">KPI 1</div>
        <div className="kpi-block">KPI 2</div>
        <div className="kpi-block">KPI 3</div>
      </div>
    </div>
  );
}
```

**Test:**
- [ ] 4 kart tipi render oluyor
- [ ] Pattern'e göre layout değişiyor
- [ ] Tüm boyutlar test edildi

---

### PHASE 4: View Mode (1h)

**Görevler:**
1. Default layout tanımla
2. Cards render from state
3. localStorage'dan yükleme

**Kod:**
```typescript
const DEFAULT_LAYOUT: DashboardCard[] = [
  {
    id: 'default-stats',
    type: 'statistics',
    position: { x: 0, y: 0, width: 3, height: 3 },
    locked: true,
  },
  {
    id: 'default-current',
    type: 'currentGame',
    position: { x: 3, y: 0, width: 4, height: 4 },
    locked: false,
  },
  // ...
];
```

**Test:**
- [ ] Default layout gösteriliyor
- [ ] localStorage'a kaydediliyor
- [ ] Sayfa yenilense state korunuyor

---

### PHASE 5: Edit Mode Toggle (1h)

**Görevler:**
1. Mode state (`view` | `edit`)
2. Toggle button (header'da)
3. Grid overlay (edit mode'da)
4. Edit overlay on cards

**Kod:**
```tsx
const [mode, setMode] = useState<'view' | 'edit'>('view');

return (
  <div className="dashboard">
    <header>
      {mode === 'view' ? (
        <button onClick={() => setMode('edit')}>Edit Dashboard</button>
      ) : (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </header>
    
    {mode === 'edit' && <GridOverlay />}
    
    <div className="dashboard-grid">
      {cards.map(card => (
        <EditableCard 
          key={card.id} 
          card={card} 
          mode={mode}
        />
      ))}
    </div>
  </div>
);
```

**Test:**
- [ ] Toggle çalışıyor
- [ ] Grid overlay görünüyor (edit mode'da)
- [ ] Kartlarda edit overlay var

---

### PHASE 6: Lock/Unlock (2h)

**Görevler:**
1. Lock state (card.locked)
2. Lock button (sol üst)
3. Visual states (locked/unlocked)
4. Lock indicator

**Kod:**
```tsx
function EditableCard({ card, mode }: EditableCardProps) {
  if (mode !== 'edit') return <CardContent card={card} />;
  
  return (
    <div className={`card-wrapper ${card.locked ? 'locked' : 'unlocked'}`}>
      {/* Lock button */}
      <button 
        className={`lock-btn ${card.locked ? 'locked' : 'unlocked'}`}
        onClick={() => toggleLock(card.id)}
      >
        {card.locked ? '🔒' : '🔓'}
      </button>
      
      {/* Locked indicator */}
      {card.locked && (
        <div className="locked-indicator">
          <span>🔒 Locked</span>
        </div>
      )}
      
      {/* Drag/Resize handles - only if unlocked */}
      {!card.locked && (
        <>
          <div className="drag-handle">⋮⋮</div>
          <div className="resize-handles">{/* ... */}</div>
        </>
      )}
      
      {/* Delete button - always visible */}
      <button className="delete-btn">🗑️</button>
      
      <CardContent card={card} />
    </div>
  );
}
```

**Test:**
- [ ] Lock/unlock toggle çalışıyor
- [ ] Visual states doğru
- [ ] Locked kartlarda drag/resize yok
- [ ] Delete her zaman mevcut

---

### PHASE 7: Drag & Drop (3h)

**Görevler:**
1. Drag event handlers
2. Lock check (before drag)
3. Grid position calculation
4. Collision detection
5. Ghost preview

**Kod:**
```typescript
function useDragAndDrop(cards: DashboardCard[], setCards: Function) {
  const [dragging, setDragging] = useState<DashboardCard | null>(null);
  const [ghost, setGhost] = useState<Position | null>(null);
  
  const handleDragStart = (e: MouseEvent, card: DashboardCard) => {
    // Lock check
    if (card.locked) return;
    
    setDragging(card);
    // ...
  };
  
  const handleDragMove = (e: MouseEvent) => {
    if (!dragging) return;
    
    // Calculate grid position
    const gridX = Math.round(e.clientX / (CELL_WIDTH + GAP));
    const gridY = Math.round(e.clientY / (CELL_HEIGHT + GAP));
    
    // Check collision (including locked cards)
    const valid = !checkCollision(gridX, gridY, dragging, cards);
    
    setGhost({ x: gridX, y: gridY, valid });
  };
  
  const handleDragEnd = () => {
    if (ghost?.valid) {
      updateCardPosition(dragging.id, ghost);
    }
    setDragging(null);
    setGhost(null);
  };
  
  return { handleDragStart, ghost };
}
```

**Test:**
- [ ] Drag çalışıyor (unlocked kartlarda)
- [ ] Locked kartlar sürüklenemiyor
- [ ] Grid snapping çalışıyor
- [ ] Collision detection çalışıyor
- [ ] Ghost preview gösteriliyor

---

### PHASE 8: Resize (2h)

**Görevler:**
1. 4 resize handle (SE, SW, NE, NW)
2. Lock check (before resize)
3. Resize logic
4. Size constraints (2-6)

**Kod:**
```typescript
function useResize(cards: DashboardCard[], setCards: Function) {
  const [resizing, setResizing] = useState<ResizeState | null>(null);
  
  const handleResizeStart = (e: MouseEvent, card: DashboardCard, handle: Corner) => {
    // Lock check
    if (card.locked) return;
    
    setResizing({ card, handle, startMouse: { x: e.clientX, y: e.clientY } });
  };
  
  const handleResizeMove = (e: MouseEvent) => {
    if (!resizing) return;
    
    // Calculate new size based on handle direction
    const newSize = calculateNewSize(resizing, e);
    
    // Clamp to 2-6
    newSize.width = clamp(newSize.width, 2, 6);
    newSize.height = clamp(newSize.height, 2, 6);
    
    // Apply
    updateCardSize(resizing.card.id, newSize);
  };
  
  // ...
}
```

**Test:**
- [ ] 4 resize handle çalışıyor
- [ ] Locked kartlar resize edilemiyor
- [ ] Size constraints uygulanıyor
- [ ] Grid sınırları kontrol ediliyor

---

### PHASE 9: Add/Delete (2h)

**Görevler:**
1. Add modal UI
2. Card type selector
3. Size picker
4. findEmptySpot algorithm
5. Delete confirmation

**Kod:**
```typescript
function findEmptySpot(size: Size, cards: DashboardCard[]): Position | null {
  for (let y = 0; y < 50; y++) {
    for (let x = 0; x <= 12 - size.width; x++) {
      const testPos = { x, y, width: size.width, height: size.height };
      
      if (!checkCollision(x, y, size, cards)) {
        return testPos;
      }
    }
  }
  return null;
}
```

**Test:**
- [ ] Add modal açılıyor
- [ ] Card type seçiliyor
- [ ] Size seçiliyor
- [ ] Boş yer bulunuyor
- [ ] Delete confirmation çalışıyor

---

### PHASE 10: State Management (2h)

**Görevler:**
1. DashboardContext setup
2. Save/Cancel logic
3. localStorage persistence
4. Change tracking

**Kod:**
```tsx
const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [cards, setCards] = useState<DashboardCard[]>([]);
  const [backup, setBackup] = useState<DashboardCard[]>([]);
  
  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vault-dashboard');
    if (saved) {
      setCards(JSON.parse(saved));
    } else {
      setCards(DEFAULT_LAYOUT);
    }
  }, []);
  
  const enterEditMode = () => {
    setBackup([...cards]); // Backup for cancel
    setMode('edit');
  };
  
  const saveChanges = () => {
    localStorage.setItem('vault-dashboard', JSON.stringify(cards));
    setMode('view');
    toast.success('Saved!');
  };
  
  const cancelChanges = () => {
    setCards([...backup]); // Restore
    setMode('view');
  };
  
  const toggleLock = (cardId: string) => {
    setCards(cards.map(c => 
      c.id === cardId ? { ...c, locked: !c.locked } : c
    ));
  };
  
  // ... other functions
  
  return (
    <DashboardContext.Provider value={{
      mode,
      cards,
      enterEditMode,
      saveChanges,
      cancelChanges,
      toggleLock,
      // ...
    }}>
      {children}
    </DashboardContext.Provider>
  );
}
```

**Test:**
- [ ] Context çalışıyor
- [ ] Save/Cancel çalışıyor
- [ ] localStorage sync çalışıyor
- [ ] Change tracking çalışıyor

---

### PHASE 11: Extras (2h)

**Görevler:**
1. Keyboard shortcuts
2. Auto-arrange
3. Error handling
4. Loading states

**Kod:**
```typescript
// Keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (mode !== 'edit') return;
    
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      saveChanges();
    }
    
    if (e.key === 'Escape') {
      cancelChanges();
    }
    
    if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
      e.preventDefault();
      if (selectedCard) toggleLock(selectedCard.id);
    }
    
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedCard && !selectedCard.locked) {
        deleteCard(selectedCard.id);
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [mode, selectedCard]);
```

**Test:**
- [ ] Cmd+S → Save
- [ ] Esc → Cancel
- [ ] Cmd+L → Lock
- [ ] Delete → Delete card (if unlocked)
- [ ] Auto-arrange çalışıyor

---

### PHASE 12: Block Progress Sidebar (3h)

**Görevler:**
1. Block data loading (CSV import)
2. Sidebar component
3. Block grouping logic
4. Current/next/completed blocks
5. Block detail modal
6. Integration with dashboard

**Kod:**
```typescript
// Block data structure
interface Game {
  id: string;
  title: string;
  block: number;           // 1-39
  blockPosition: number;   // 1, 2, 3
  blockType: 'RPG' | 'Story' | 'Strategy';
  progress: number;        // 0-100
  status: 'not_started' | 'active' | 'completed';
  completionCriteria: string;
  playtime?: number;
}

interface Block {
  number: number;
  games: Game[];
  progress: number;
  status: 'not_started' | 'active' | 'completed';
}

// Block helper functions
function groupGamesByBlock(games: Game[]): Record<number, Game[]> {
  return games.reduce((acc, game) => {
    if (!acc[game.block]) acc[game.block] = [];
    acc[game.block].push(game);
    return acc;
  }, {});
}

function getCurrentBlock(games: Game[]): Block | null {
  const blocks = groupGamesByBlock(games);
  
  for (let i = 1; i <= 39; i++) {
    const blockGames = blocks[i] || [];
    const allCompleted = blockGames.every(g => g.status === 'completed');
    
    if (!allCompleted) {
      return {
        number: i,
        games: blockGames,
        progress: calculateBlockProgress(blockGames),
        status: blockGames.some(g => g.status === 'active') ? 'active' : 'not_started'
      };
    }
  }
  
  return null;
}

// Sidebar component
function BlockProgressSidebar({ games }: { games: Game[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  
  const blocks = groupGamesByBlock(games);
  const currentBlock = getCurrentBlock(games);
  const nextBlocks = getNextBlocks(games, 3);
  const completedBlocks = getCompletedBlocks(games);
  
  return (
    <aside className={`block-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <header>
        <h2>Block Progress</h2>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '→' : '←'}
        </button>
      </header>
      
      {!collapsed && (
        <div className="sidebar-content">
          {/* Current Block */}
          <section className="current-block">
            <h3>Current: Block {currentBlock?.number}/39</h3>
            {currentBlock && (
              <BlockCard 
                block={currentBlock} 
                expanded={true}
                onClick={() => setSelectedBlock(currentBlock.number)}
              />
            )}
          </section>
          
          {/* Next Blocks */}
          <section className="next-blocks">
            <h3>Next Blocks</h3>
            {nextBlocks.map(block => (
              <BlockCard 
                key={block.number}
                block={block}
                onClick={() => setSelectedBlock(block.number)}
              />
            ))}
          </section>
          
          {/* Completed */}
          <section className="completed-blocks">
            <h3>Completed ({completedBlocks.length}/39)</h3>
            <CollapsibleList items={completedBlocks} />
          </section>
        </div>
      )}
      
      {selectedBlock && (
        <BlockDetailModal 
          block={blocks[selectedBlock]}
          onClose={() => setSelectedBlock(null)}
        />
      )}
    </aside>
  );
}
```

**CSS Layout:**
```css
.vault-tracker {
  display: flex;
  gap: 1rem;
}

.block-sidebar {
  width: 300px;
  position: sticky;
  top: 1rem;
  height: calc(100vh - 2rem);
  overflow-y: auto;
  flex-shrink: 0;
}

.block-sidebar.collapsed {
  width: 60px;
}

.dashboard-grid {
  flex: 1;
}
```

**Test:**
- [ ] CSV import çalışıyor
- [ ] Bloklar doğru gruplandı
- [ ] Current block gösteriliyor
- [ ] Next blocks listeleniyor
- [ ] Completed blocks katlanmış
- [ ] Block detail modal çalışıyor
- [ ] Sidebar collapsible

---

### PHASE 13: Preview System (3h)

**Görevler:**
1. URL preview parametreleri
2. Preview mode detection
3. Component injection
4. Preview banner
5. Highlight effect
6. HUB.html entegrasyonu

**Kod:**
```typescript
// usePreviewMode hook
export function usePreviewMode() {
  const [preview, setPreview] = useState<PreviewComponent | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const component = params.get('preview');
    const variant = params.get('variant');
    
    if (component && variant) {
      loadPreviewComponent(component, variant).then(setPreview);
    }
  }, []);
  
  return { 
    preview, 
    isPreviewMode: !!preview,
    clearPreview: () => {
      setPreview(null);
      window.history.pushState({}, '', window.location.pathname);
    }
  };
}

// Preview component loader
async function loadPreviewComponent(
  componentName: string,
  variantId: string
): Promise<PreviewComponent> {
  const path = `design-docs/pending/${componentName}/level-1/variant-${variantId}.html`;
  const response = await fetch(path);
  const html = await response.text();
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  return {
    name: componentName,
    variant: variantId,
    html: doc.querySelector('[data-component]')?.outerHTML || '',
    styles: doc.querySelector('style')?.textContent || '',
    scripts: doc.querySelector('script')?.textContent || '',
  };
}

// Preview banner
function PreviewBanner({ component, onClose }: PreviewBannerProps) {
  const [feedback, setFeedback] = useState('');
  
  const copyFeedback = () => {
    const text = `
Tasarım Feedback:
Component: ${component.name}
Varyant: ${component.variant}
Feedback: ${feedback}
    `.trim();
    
    navigator.clipboard.writeText(text);
    toast.success('Feedback kopyalandı!');
  };
  
  return (
    <div className="preview-banner">
      <div className="banner-content">
        <div className="preview-info">
          <span>🎨 Tasarım Önizleme</span>
          <strong>{component.name} • {component.variant}</strong>
        </div>
        <div className="banner-actions">
          <input 
            type="text"
            placeholder="Feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={copyFeedback}>📋 Kopyala</button>
          <button onClick={onClose}>❌ Kapat</button>
        </div>
      </div>
    </div>
  );
}

// Usage in VaultTracker
function VaultTracker() {
  const { preview, isPreviewMode, clearPreview } = usePreviewMode();
  
  useEffect(() => {
    if (preview) {
      // Inject styles
      const styleTag = document.createElement('style');
      styleTag.textContent = preview.styles;
      document.head.appendChild(styleTag);
      
      // Highlight component area
      highlightComponentArea(preview.name);
      
      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, [preview]);
  
  return (
    <div className="vault-tracker">
      {isPreviewMode && (
        <PreviewBanner 
          component={preview!}
          onClose={clearPreview}
        />
      )}
      
      <Header />
      <BlockProgressSidebar games={games} />
      <Dashboard preview={preview} />
    </div>
  );
}
```

**HUB.html güncelleme:**
```javascript
// HUB.html'e ekle
function previewInContext(component, variant) {
  const contextMap = {
    'navbar': '/',
    'button': '/vault-tracker',
    'statistics-card': '/vault-tracker',
    'current-game-card': '/vault-tracker',
    'block-sidebar': '/vault-tracker',
  };
  
  const page = contextMap[component] || '/';
  const url = `${page}?preview=${component}&variant=${variant}`;
  
  window.open(url, '_blank');
}
```

**Test:**
- [ ] Preview URL parametreleri çalışıyor
- [ ] Component inject ediliyor
- [ ] Styles uygulanıyor
- [ ] Preview banner gösteriliyor
- [ ] Highlight effect çalışıyor
- [ ] Feedback kopyalama çalışıyor
- [ ] HUB entegrasyonu tamamlandı

---

## 🎨 TASARIM KONUŞMALARI

### Tasarım İsteği Geldiğinde

**Kullanıcı:** "Navbar için tasarım öner"

**Sen:**
```markdown
1. pending/001-navbar/ klasörü oluştur
2. level-1/ oluştur
3. 4 HTML dosyası oluştur:
   - variant-A-havali.html (Placeholder: "Havalı navbar")
   - variant-B-sade.html (Placeholder: "Sade navbar")
   - variant-C-detayli.html (Placeholder: "Detaylı navbar")
   - variant-D-gorsel.html (Placeholder: "Görsel navbar")
4. Her dosyaya açıklama ekle:
   ```html
   <!-- 
   Varyant A: Havalı/Modern
   - Cesur tasarım
   - Animasyonlar
   - Büyük elementler
   -->
   <div class="navbar-placeholder">
     <h1>Navbar - Varyant A (Havalı)</h1>
     <p>Tasarım burada olacak</p>
   </div>
   ```
5. HUB.html'i güncelle (yeni tasarım ekle)
```

**Önemli:**
- Gerçek tasarım YAPMA
- Sadece placeholder HTML oluştur
- Varyant tiplerine göre not ekle

---

### Benzer Varyant İsteği

**Kullanıcı:** "Navbar, varyant B'ye benzer üret"

**Sen:**
```markdown
1. pending/001-navbar/level-2-from-B/ oluştur
2. parent.txt oluştur (içinde: "variant-B-sade")
3. 4 placeholder HTML:
   - B1: "B'ye benzer + tweak 1"
   - B2: "B'ye benzer + tweak 2"
   - B3: "B'ye benzer + tweak 3"
   - B4: "B'ye benzer + tweak 4"
4. HUB.html güncelle
```

---

### Onay Komutu

**Kullanıcı:** "Navbar, seviye 2, varyant B3'ü onayla"

**Sen:**
```markdown
1. Dosya taşı:
   pending/001-navbar/level-2-from-B/B3.html
   → approved/navbar/v1.html

2. Döküman oluştur:
   approved/navbar/v1.md:
   ```markdown
   # Navbar - v1
   **Onay Tarihi:** 2025-01-20
   **Varyant:** B3 (Sade + tweak 3)
   **Seviye:** 2
   
   ## Özellikler
   [Placeholder notlar]
   ```

3. DESIGN_SYSTEM.md güncelle
4. COMPONENT_LIBRARY.md güncelle
5. CHANGELOG.md'ye ekle
6. HUB.html güncelle
7. pending/001-navbar/ sil (tüm klasör)
```

---

## ⚠️ HATALARDAN KAÇIN

### ❌ Yapma:

1. **Gerçek tasarım yapma**
```jsx
// YANLIŞ
<div style={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  borderRadius: '12px',
}}>
```

2. **Renk kararları alma**
```css
/* YANLIŞ */
--primary: #4a90e2;
--secondary: #7c3aed;
--success: #10b981;
```

3. **Layout detayları belirleme**
```jsx
// YANLIŞ
<div className="flex items-center justify-between px-6 py-4">
```

### ✅ Yap:

1. **Placeholder kullan**
```jsx
// DOĞRU
<div className="card-placeholder">
  <h1>Card Title (Placeholder)</h1>
  <p>Content will be here</p>
</div>
```

2. **Minimal styling**
```css
/* DOĞRU */
.card {
  display: flex;
  flex-direction: column;
}
```

3. **Fonksiyon odaklı**
```jsx
// DOĞRU
function Card({ width, height }) {
  return (
    <div style={{ width, height }}>
      {/* Minimal content for testing */}
    </div>
  );
}
```

---

## 📋 CHECKLIST

Her phase'i tamamladıktan sonra kontrol et:

### Grid System
- [ ] Grid render oluyor
- [ ] 12 column
- [ ] 120px cells
- [ ] 16px gap
- [ ] 16 boyut test edildi

### Pattern System
- [ ] determinePattern() çalışıyor
- [ ] HORIZONTAL → side-by-side
- [ ] VERTICAL → stacked
- [ ] SQUARE → flexible

### Cards
- [ ] 4 kart tipi var
- [ ] Pattern'e göre render
- [ ] Placeholder content

### Edit Mode
- [ ] Toggle çalışıyor
- [ ] Grid overlay
- [ ] Edit overlay on cards

### Lock System
- [ ] Lock/unlock button
- [ ] Visual states
- [ ] Lock checks (drag/resize)
- [ ] Persistence

### Drag & Drop
- [ ] Drag handle
- [ ] Lock check
- [ ] Grid snapping
- [ ] Collision detection
- [ ] Ghost preview

### Resize
- [ ] 4 corner handles
- [ ] Lock check
- [ ] Size constraints
- [ ] Grid boundaries

### Add/Delete
- [ ] Add modal
- [ ] Card type selector
- [ ] Size picker
- [ ] findEmptySpot
- [ ] Delete confirmation

### State
- [ ] Context setup
- [ ] Save/Cancel
- [ ] localStorage
- [ ] Change tracking

### Extras
- [ ] Keyboard shortcuts
- [ ] Auto-arrange
- [ ] Error handling

### Block System
- [ ] CSV import
- [ ] Block grouping
- [ ] Block sidebar
- [ ] Current/next/completed
- [ ] Block detail modal

### Preview System
- [ ] Preview URL detection
- [ ] Component injection
- [ ] Preview banner
- [ ] Highlight effect
- [ ] HUB integration

---

## 🎯 BAŞARILI IMPLEMENTATION

Başarılı bir implementation şunları içerir:

**✅ Çalışan:**
- Grid sistemi
- Pattern detection
- Edit mode (tam özellikli)
- Lock sistemi
- Drag & drop
- Resize
- Add/delete
- State management

**✅ Test edilmiş:**
- 16 boyut
- 4 kart tipi
- Lock/unlock scenarios
- Collision detection
- localStorage persistence

**✅ Temiz kod:**
- TypeScript types
- Reusable components
- Clear function names
- Minimal styling

**❌ Olmayan:**
- Gerçek tasarım
- Renkler
- Fontlar
- Detaylı layout

---

## 🤔 CONTEXT PENCERESİ SORUSU

### Cevap: **HAYIR, yüksek context gerekmez**

**Neden?**

1. **Dokümantasyon yeterli:**
   - Claude her seferinde dosyaları okur
   - Kurallar net yazılmış
   - Örnekler var

2. **Zaten yapıyor:**
   - Spec'leri takip ediyor
   - Pattern'leri uyguluyor
   - Context'i hatırlıyor

3. **Hatırlatma mekanizması:**
   - Her dosyanın başında "BU DOSYAYI OKU" notu
   - Checklist'ler var
   - Phase'lerde referanslar

### Prompt Stratejisi

**İlk Konuşma (Setup):**
```
"Bu 4 dosyayı oku ve MUTLAKA hatırla:
1. SYSTEM-ARCHITECTURE.md
2. VAULT-DASHBOARD-SYSTEM.md
3. DESIGN-WORKFLOW.md
4. CLAUDE-IMPLEMENTATION-GUIDE.md

Özellikle dikkat et:
- Blok sistemi (3 oyun = 1 blok = 1 cycle)
  * RPG → Story → Strategy sırası
  * Her blok bir cycle
  * Sıralı ilerleme (paralel yok)
  * CSV'den hazır veri gelir
- Tasarım her zaman varyantlarla
  * 4 varyant (A/B/C/D)
  * Her varyanta 'Site Üzerinde Gör' butonu
  * Preview mode ile context'te gösterme
- Block Progress Sidebar
  * Dashboard'dan AYRI component
  * Grid'de DEĞİL
  * Sol/sağ kenarda collapsible
- Hiçbir şey rastgele değil, her şey sistemli

Phase'lere başlamadan önce bana özetini söyle."
```

**Her Phase Öncesi (Hatırlatma):**
```
"Phase 5'e başlıyoruz. Şunları hatırla:
- Blok sistemi aktif (3 oyun grupları)
- Block sidebar grid'de DEĞİL
- Tasarım için varyant sistemi kullan
- Preview mode implement et

CLAUDE-IMPLEMENTATION-GUIDE.md'deki Phase 5'i oku ve başla."
```

**Tasarım İsteği (Spesifik):**
```
"Game Card için tasarım öner.

DİKKAT:
1. 4 varyant üret (A/B/C/D)
2. Her varyanta 'Site Üzerinde Gör' butonu ekle
3. Preview URL: /vault-tracker?preview=game-card&variant=X
4. Blok bilgisini göster (Block 2, Position 1, Type: RPG)
5. Completion criteria göster
6. Progress bar ekle

DESIGN-WORKFLOW.md'deki kurallara uy."
```

**Block Sidebar İsteği:**
```
"Block Progress Sidebar'ı implement et.

ÖNEMLİ:
1. Dashboard GRID'inde DEĞİL
2. Ayrı bir sidebar component
3. Sol veya sağ kenarda
4. Collapsible olmalı
5. Sticky (scroll ile birlikte)
6. Current/Next/Completed blokları göster

SYSTEM-ARCHITECTURE.md → 'Block Progress Tracking' bölümünü oku."
```

---

## 📝 NOTLAR

1. **Placeholder yeter:** Tasarım olmadan da çalışır
2. **Fonksiyon önce:** Görsel sonra gelecek
3. **Lock her zaman kontrol et:** Drag/resize'dan önce
4. **Collision önemli:** Kartlar üst üste binmemeli
5. **localStorage kritik:** State korunmalı
6. **Block sidebar ayrı:** Grid sisteminin DIŞINDA
7. **Preview mode:** Her tasarım context'te test edilmeli
8. **CSV import:** Blok verileri hazır gelir

---

## 🚀 BAŞLA!

1. Bu dosyayı oku ✓
2. Diğer spec'leri oku ✓
3. Phase 1'den başla
4. Her phase'i test et
5. Sonraki phase'e geç

**Süre tahmini:** 20-25 saat

Hazır mısın? Let's build! 🎮

---

**Status:** GUIDE READY ✓  
**Implementation:** START NOW
