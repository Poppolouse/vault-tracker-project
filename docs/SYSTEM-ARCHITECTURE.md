# SYSTEM ARCHITECTURE
## Web App Platform - Multi-App Hub System

> **Amaç:** Tek bir platform üzerinden birden fazla web uygulamasına erişim.
> **İlk Uygulama:** Vault Tracker (Oyun takip sistemi)
> **Gelecek:** Diğer web uygulamaları eklenebilir

---

## 🏗️ GENEL MİMARİ

### Uygulama Akışı

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. LOGIN SCREEN                                │
│     - Kullanıcı adı + Şifre                    │
│     - Şimdilik: Otomatik giriş (development)   │
│     - İleride: Gerçek auth sistemi             │
│                                                 │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼ (Giriş başarılı)
┌─────────────────────────────────────────────────┐
│                                                 │
│  2. HUB (App Selector)                         │
│     - Mevcut uygulamalar listelenir            │
│     - Kullanıcı bir uygulama seçer             │
│                                                 │
│     Şu an sadece:                              │
│     ┌─────────────────┐                        │
│     │  Vault Tracker  │ ← Tek seçenek         │
│     └─────────────────┘                        │
│                                                 │
│     İleride:                                   │
│     ┌──────┬──────┬──────┐                    │
│     │ App1 │ App2 │ App3 │                    │
│     └──────┴──────┴──────┘                    │
│                                                 │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼ (Vault Tracker seçildi)
┌─────────────────────────────────────────────────┐
│                                                 │
│  3. VAULT TRACKER DASHBOARD                    │
│     - Kullanıcının dashboard'u açılır          │
│     - Grid sistemi ile kartlar gösterilir     │
│     - Edit mode ile düzenlenebilir             │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔐 AUTH SİSTEMİ

### Development Mode (Şimdilik)

```javascript
// Auto-login aktif
const isDevelopment = true;

if (isDevelopment) {
  // Otomatik giriş yap
  autoLogin({
    username: 'demo_user',
    token: 'dev_token_12345'
  });
  
  // Hub'a yönlendir
  navigate('/hub');
}
```

**Davranış:**
- Login ekranı görünür AMA otomatik submit olur
- Kullanıcı adı/şifre kutuları dolu gelir
- "Giriş yapılıyor..." mesajı → Hub'a geçiş
- Süre: ~500ms

### Production Mode (İleride)

```javascript
// Gerçek auth
const handleLogin = async (username, password) => {
  const response = await api.login(username, password);
  
  if (response.success) {
    setAuthToken(response.token);
    navigate('/hub');
  } else {
    showError(response.message);
  }
};
```

**Gereksinimler (ileride):**
- Backend API endpoint (`/api/auth/login`)
- Token storage (localStorage veya httpOnly cookie)
- Token refresh mekanizması
- Logout fonksiyonu

---

## 🎯 ROUTE YAPISI

### Route Tanımları

```javascript
const routes = [
  {
    path: '/',
    element: <LoginScreen />,
    public: true,
  },
  {
    path: '/hub',
    element: <AppHub />,
    protected: true,
  },
  {
    path: '/vault-tracker',
    element: <VaultTracker />,
    protected: true,
  },
  // İleride eklenecekler:
  // { path: '/app-2', element: <App2 />, protected: true },
  // { path: '/app-3', element: <App3 />, protected: true },
];
```

### Protected Route Logic

```javascript
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}
```

### Navigation Flow

**Senaryo 1: İlk Giriş**
```
/ (Login) 
  → Auto-login aktif 
  → /hub 
  → Vault Tracker seç 
  → /vault-tracker
```

**Senaryo 2: Direkt URL**
```
Kullanıcı tarayıcıya "/vault-tracker" yazarsa:
  → Auth kontrolü
  → Eğer login değilse → / (Login)
  → Login olduysa → /vault-tracker
```

**Senaryo 3: Hub'dan Geri Dönüş**
```
/vault-tracker içinde "Hub'a Dön" butonu:
  → navigate('/hub')
  → Vault Tracker state'i korunur (localStorage)
```

---

## 🏠 HUB COMPONENT

### Hub Mantığı

Hub sadece **uygulama seçici**. Şu işleri yapar:
1. Mevcut uygulamaları listeler
2. Her uygulama için kart/tile gösterir
3. Kullanıcı bir uygulamaya tıklar → O uygulamaya yönlendirir

### Hub Data Structure

```javascript
const availableApps = [
  {
    id: 'vault-tracker',
    name: 'Vault Tracker',
    description: 'Game library and progress tracker',
    icon: 'gamepad', // lucide-react icon name
    route: '/vault-tracker',
    status: 'active', // active | coming-soon | maintenance
  },
  // İleride eklenecekler:
  // {
  //   id: 'app-2',
  //   name: 'App 2',
  //   description: 'Description here',
  //   icon: 'icon-name',
  //   route: '/app-2',
  //   status: 'coming-soon',
  // },
];
```

### Hub Functionality

```javascript
function AppHub() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleAppSelect = (app) => {
    if (app.status !== 'active') {
      showToast(`${app.name} is ${app.status}`);
      return;
    }
    
    navigate(app.route);
  };
  
  return (
    <div className="hub-container">
      <Header user={user} />
      
      <h1>Select an Application</h1>
      
      <div className="app-grid">
        {availableApps.map(app => (
          <AppCard 
            key={app.id}
            app={app}
            onClick={() => handleAppSelect(app)}
          />
        ))}
      </div>
    </div>
  );
}
```

**Hub özellikleri:**
- Liste/grid görünümü
- Her app için kart
- Status gösterimi (aktif/yakında/bakımda)
- Kullanıcı bilgisi (sağ üstte)
- Logout butonu

---

## 📱 VAULT TRACKER ENTEGRASYONU

### Vault Tracker Girişi

```javascript
function VaultTracker() {
  const navigate = useNavigate();
  const [dashboardState, setDashboardState] = useState(null);
  const [games, setGames] = useState([]);
  
  // Dashboard state'i localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem('vault-dashboard');
    if (saved) {
      setDashboardState(JSON.parse(saved));
    } else {
      // Default layout
      setDashboardState(DEFAULT_DASHBOARD);
    }
  }, []);
  
  // Oyun verilerini yükle
  useEffect(() => {
    const savedGames = localStorage.getItem('vault-games');
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    } else {
      // CSV'den import et (ilk kullanım)
      importGamesFromCSV();
    }
  }, []);
  
  const goToHub = () => {
    // State'i kaydet
    localStorage.setItem('vault-dashboard', JSON.stringify(dashboardState));
    navigate('/hub');
  };
  
  return (
    <div className="vault-tracker">
      <Header>
        <button onClick={goToHub}>
          ← Back to Hub
        </button>
      </Header>
      
      {/* Block Progress Sidebar */}
      <BlockProgressSidebar games={games} />
      
      {/* Main Dashboard */}
      <Dashboard state={dashboardState} games={games} />
    </div>
  );
}
```

### State Persistence

**Kaydedilecek veriler:**
```javascript
{
  dashboardLayout: [
    { id: 'card-1', type: 'statistics', position: {...}, locked: false },
    { id: 'card-2', type: 'currentGame', position: {...}, locked: true },
    // ...
  ],
  userPreferences: {
    theme: 'dark',
    defaultView: 'grid',
  },
  lastModified: '2025-01-20T10:30:00Z',
}
```

**localStorage key:**
- `vault-dashboard` → Dashboard layout
- `vault-games` → Game library data
- `auth-token` → Auth token (ileride)
- `user-data` → User preferences

---

## 🎮 GAME DATA STRUCTURE

### Block System

Vault Tracker'da oyunlar "blok" sistemiyle organize edilir:

**Blok Yapısı:**
- Her blok = 3 oyun
- Sıra: RPG → Story → Strategy
- Bir blok tamamlandığında = 1 cycle biter
- Toplam: 39 blok (117 oyun)

**Blok Tamamlanma Kuralları:**
```
Block tamamlanması:
1. RPG oyunu biter
2. Story oyunu biter  
3. Strategy oyunu biter
→ Cycle tamamlandı, sonraki blok başlar
```

### Game Data Model

```typescript
interface Game {
  id: string;
  title: string;
  
  // Block system
  block: number;           // 1-39
  blockPosition: number;   // 1 (RPG), 2 (Story), 3 (Strategy)
  blockType: 'RPG' | 'Story' | 'Strategy';
  
  // Progress
  progress: number;        // 0-100
  status: 'not_started' | 'active' | 'completed';
  
  // Completion
  completionCriteria: string;
  completedAt?: string;    // ISO date
  
  // Metadata
  platform?: string;
  genre?: string[];
  coverImage?: string;
  playtime?: number;       // hours
  notes?: string;
}
```

### CSV Import Format

```csv
title,block,blockPosition,blockType,completionCriteria,progress,status
Baldur's Gate 3,1,1,RPG,"Main story + 1 major questline",100,completed
Firewatch,1,2,Story,"Credits reached",100,completed
Crusader Kings III,1,3,Strategy,"All factions won once",100,completed
Disco Elysium,2,1,RPG,"Main story + 1 major questline",46,active
Inside,2,2,Story,"Credits reached",0,not_started
Total War: Warhammer III,2,3,Strategy,"All factions won once",0,not_started
```

### Block Completion Criteria

**RPG:**
- Ana hikaye tamamlanmış
- En az 1 büyük yan questline bitmiş

**Story / Indie:**
- Oyunun sonuna ulaşılmış
- Credits ekranı görülmüş

**Strategy (Campaign-based):**
- Oyundaki TÜM factionlar ile en az birer campaign zaferi elde edilmiş

**Sim / Builder:**
- Belirli bir hedef dönüm noktası (örn. finans dengesi, şehir nüfusu)

**Sandbox / Survival:**
- Tek bir ana hedef (örn. 30 gün hayatta kalma, harita keşfi)

**Puzzle / Narrative:**
- Tüm bölümler veya hikâye tamamlanmış

### Data Source

**Başlangıçta:**
- CSV import ile veriler gelir
- Site blok ataması YAPMAZ
- Veriler hazır gelir

**İleride:**
- Manuel oyun ekleme (form ile)
- Internet metadata yükleme
- Scraper entegrasyonu
- Otomatik blok önerileri (ama son karar kullanıcıda)

---

## 🛠️ DESIGN TOOLS SİSTEMİ

Vault Tracker'da tasarımları test etmek ve ince ayar yapmak için 4 tool:

### 1. Element Picker (✋)
**Amaç:** Bir elementi seç ve değiştir

**Kullanım:**
1. HUB'da "✋ Seç" → Picker mode
2. Element'e hover → Highlight
3. Click → Element seçildi
4. Modal → 3 seçenek:
   - 🎨 Stil Değiştir
   - ✏️ İçerik Değiştir
   - 🗑️ Kaldır
5. Değişiklik iste → Claude'a komut

**Özellikler:**
- Crosshair cursor
- Element info tooltip
- Style/content/remove options
- Quick suggestions (hızlı stil önerileri)

### 2. Boundary Tool (📐)
**Amaç:** Element sınırlarını belirle

**Kullanım:**
1. HUB'da "📐 Sınır Belirle" → Boundary mode
2. Element seç
3. Sınırları çiz (kabaca, otomatik snap)
4. Modal → 6 constraint type:
   - Maximum boyut
   - Minimum boyut
   - Tam boyut (fixed)
   - Container sınırı
   - Taşma düzeltmesi
   - Scale düzeltmesi
5. Uygula → Claude'a komut

**Özellikler:**
- Smart snapping (20px threshold)
- Size comparison
- Before/after gösterimi
- Responsive hints

### 3. Add Tool (➕)
**Amaç:** Yeni element ekle

**Kullanım:**
1. HUB'da "➕ Ekle" → Add mode
2. Boş alan seç
3. İki seçenek:
   a) Manuel: "Buraya X ekle"
   b) Öner: Claude 10 öneri sunar
4. Öneri seçilirse → Hover preview
5. Onayla → Claude ekler

**Özellikler:**
- Area selection (boş alan tespiti)
- Context-aware suggestions
- Preview on hover
- Quick add suggestions

### 4. Preview Mode (🌐)
**Amaç:** Tasarımı gerçek context'te gör

**Kullanım:**
1. HUB'da "🌐 Site Üzerinde Gör"
2. Preview URL: `/vault-tracker?preview=button&variant=A`
3. Sayfa açılır, component inject edilir
4. Preview banner + highlight
5. Feedback ver veya tool kullan

**Özellikler:**
- Component injection
- Highlight effect
- Preview banner
- Tool entegrasyonu (picker/boundary/add)

---

## 📊 BLOCK PROGRESS TRACKING

### Block Progress Sidebar

Dashboard'ın yanında (gridde DEĞİL) bir sidebar ile blok ilerlemesi takip edilir.

**Konum:**
- Sol veya sağ kenarda sabit panel
- Collapsible (açılır/kapanır)
- Dashboard grid'ini etkilemez
- Scroll ile beraber hareket eder (sticky)

**İçerik:**
```
┌─────────────────────────┐
│  BLOCK PROGRESS         │
├─────────────────────────┤
│  Current Block: 2/39    │
│                         │
│  ▶ Block 2 (Active)     │
│    ✓ Disco Elysium      │
│      46% • 23h played   │
│    ○ Inside             │
│      0% • Not started   │
│    ○ Total War: WH3     │
│      0% • Not started   │
│                         │
│  Next Blocks:           │
│  ▷ Block 3              │
│    Witcher 3           │
│    Oxenfree II         │
│    Victoria 3          │
│                         │
│  ▷ Block 4              │
│    ...                 │
│                         │
│  Completed Blocks:      │
│  ✓ Block 1 (3/3)       │
└─────────────────────────┘
```

**Özellikler:**
- Aktif blok highlight
- Her oyunun progress bar'ı
- Tamamlanan bloklar katlanmış gösterilir
- Sıradaki 2-3 blok preview
- Hızlı navigasyon (blok tıklanınca o bloğun detayları)

### Block Detail Modal

Bir blok tıklanınca modal açılır:

```
┌──────────────────────────────────────┐
│  Block 2 Details              [X]    │
├──────────────────────────────────────┤
│                                      │
│  Progress: 46%  [████░░░░░░] 1/3    │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 1. Disco Elysium (RPG)         │ │
│  │    Status: Active              │ │
│  │    Progress: 46%               │ │
│  │    Playtime: 23h               │ │
│  │    Criteria: Main story + 1    │ │
│  │              major questline   │ │
│  │    [Mark as Complete]          │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 2. Inside (Story)              │ │
│  │    Status: Not Started         │ │
│  │    Progress: 0%                │ │
│  │    Criteria: Credits reached   │ │
│  │    [Start Playing]             │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 3. Total War: WH3 (Strategy)   │ │
│  │    Status: Not Started         │ │
│  │    ...                         │ │
│  └────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

### Block Progress Component Structure

```typescript
interface BlockProgressSidebarProps {
  games: Game[];
}

function BlockProgressSidebar({ games }: BlockProgressSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  
  // Blokları grupla
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
            <h3>Current: Block {currentBlock.number}/39</h3>
            <BlockCard 
              block={currentBlock} 
              expanded={true}
              onClick={() => setSelectedBlock(currentBlock.number)}
            />
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
          
          {/* Completed Blocks */}
          <section className="completed-blocks">
            <h3>Completed ({completedBlocks.length}/39)</h3>
            <CollapsibleList>
              {completedBlocks.map(block => (
                <CompletedBlockItem 
                  key={block.number}
                  block={block}
                />
              ))}
            </CollapsibleList>
          </section>
        </div>
      )}
      
      {/* Block Detail Modal */}
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

### Block Helper Functions

```typescript
function groupGamesByBlock(games: Game[]): Record<number, Game[]> {
  return games.reduce((acc, game) => {
    if (!acc[game.block]) acc[game.block] = [];
    acc[game.block].push(game);
    return acc;
  }, {});
}

function getCurrentBlock(games: Game[]): Block {
  // İlk tamamlanmamış bloğu bul
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
  
  return null; // Tüm bloklar tamamlanmış
}

function getNextBlocks(games: Game[], count: number): Block[] {
  const currentBlock = getCurrentBlock(games);
  const blocks = groupGamesByBlock(games);
  const nextBlocks: Block[] = [];
  
  for (let i = currentBlock.number + 1; i <= Math.min(39, currentBlock.number + count); i++) {
    if (blocks[i]) {
      nextBlocks.push({
        number: i,
        games: blocks[i],
        progress: 0,
        status: 'not_started'
      });
    }
  }
  
  return nextBlocks;
}

function calculateBlockProgress(games: Game[]): number {
  if (games.length === 0) return 0;
  
  const totalProgress = games.reduce((sum, game) => sum + game.progress, 0);
  return Math.round(totalProgress / games.length);
}
```

---

## 🎯 BLOCK SYSTEM INTEGRATION

### Dashboard'da Blok Bilgisi

Current Game Card'da aktif oyunun blok bilgisi gösterilir:

```tsx
function CurrentGameCard({ game }: { game: Game }) {
  return (
    <div className="current-game-card">
      <div className="game-header">
        <h2>{game.title}</h2>
        <span className="block-badge">
          Block {game.block} • {game.blockType}
        </span>
      </div>
      
      <div className="progress-bar">
        <div style={{ width: `${game.progress}%` }} />
        <span>{game.progress}%</span>
      </div>
      
      <div className="completion-criteria">
        <strong>Goal:</strong> {game.completionCriteria}
      </div>
      
      {/* Block context */}
      <div className="block-context">
        <span>Position: {game.blockPosition}/3</span>
        <button onClick={() => showBlockDetail(game.block)}>
          View Block Details →
        </button>
      </div>
    </div>
  );
}
```

### Statistics Card'da Blok İstatistikleri

```tsx
function StatisticsCard() {
  const { games } = useGames();
  const blocks = groupGamesByBlock(games);
  
  const stats = {
    totalGames: games.length,
    completedGames: games.filter(g => g.status === 'completed').length,
    totalBlocks: 39,
    completedBlocks: Object.keys(blocks).filter(blockNum => {
      return blocks[blockNum].every(g => g.status === 'completed');
    }).length,
    currentBlock: getCurrentBlock(games)?.number || 0,
    totalPlaytime: games.reduce((sum, g) => sum + (g.playtime || 0), 0),
  };
  
  return (
    <div className="statistics-card">
      <div className="stat">
        <span className="value">{stats.completedBlocks}/{stats.totalBlocks}</span>
        <span className="label">Blocks Completed</span>
      </div>
      
      <div className="stat">
        <span className="value">{stats.completedGames}/{stats.totalGames}</span>
        <span className="label">Games Completed</span>
      </div>
      
      <div className="stat">
        <span className="value">#{stats.currentBlock}</span>
        <span className="label">Current Block</span>
      </div>
      
      <div className="stat">
        <span className="value">{stats.totalPlaytime}h</span>
        <span className="label">Total Playtime</span>
      </div>
    </div>
  );
}
```

---

## 🔄 STATE MANAGEMENT

### Global State (Context)

```javascript
// contexts/AppContext.jsx
const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentApp, setCurrentApp] = useState(null);
  const [user, setUser] = useState(null);
  
  return (
    <AppContext.Provider value={{
      currentApp,
      setCurrentApp,
      user,
      setUser,
    }}>
      {children}
    </AppContext.Provider>
  );
}
```

### Per-App State

Her uygulama kendi state'ini yönetir:
- Vault Tracker → `DashboardContext`
- App 2 → `App2Context`
- vs.

**Global state sadece:**
- Auth durumu
- Current app
- User bilgileri

---

## 🚀 INITIALIZATION FLOW

### App Start

```javascript
// App.jsx
function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    async function init() {
      // 1. Check auth token
      const token = localStorage.getItem('auth-token');
      
      if (token) {
        // Validate token (ileride)
        // const valid = await validateToken(token);
        // if (valid) setAuthenticated(true);
      }
      
      // 2. Development mode - auto login
      if (IS_DEVELOPMENT) {
        setAuthenticated(true);
      }
      
      setIsInitialized(true);
    }
    
    init();
  }, []);
  
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  
  return (
    <Router>
      <Routes>
        {/* ... */}
      </Routes>
    </Router>
  );
}
```

### First-Time User Flow

```
1. Kullanıcı ilk kez siteye gelir
2. Auto-login ile giriş yapar
3. Hub'a yönlendirilir
4. Vault Tracker'ı seçer
5. Default dashboard layout yüklenir
6. localStorage'a kaydedilir
7. Bir daha geldiğinde aynı layout
```

---

## 🔧 CONFIGURATION

### Environment Variables

```javascript
// .env
VITE_API_URL=http://localhost:3000/api
VITE_IS_DEVELOPMENT=true
VITE_AUTO_LOGIN_USER=demo_user
VITE_AUTO_LOGIN_TOKEN=dev_token_12345
```

### App Config

```javascript
// config/apps.js
export const APP_CONFIG = {
  vaultTracker: {
    id: 'vault-tracker',
    route: '/vault-tracker',
    storageKey: 'vault-dashboard',
    defaultLayout: DEFAULT_VAULT_LAYOUT,
  },
  // İleride:
  // app2: { ... },
};
```

---

## 📊 DATA FLOW

### Login → Hub → App

```
┌──────────────┐
│   Login      │
│   Component  │
└──────┬───────┘
       │
       │ setAuthenticated(true)
       │ setUser(userData)
       ▼
┌──────────────┐
│   Hub        │ ← availableApps listesi
│   Component  │
└──────┬───────┘
       │
       │ navigate('/vault-tracker')
       ▼
┌──────────────────────┐
│   Vault Tracker      │
│   - Load dashboard   │ ← localStorage
│   - Render cards     │
│   - Enable edit      │
└──────────────────────┘
```

### Hub → Vault Tracker → Hub (Geri dönüş)

```
Vault Tracker:
  │
  │ "Back to Hub" tıklanır
  │
  ├─ Save state → localStorage
  │
  └─ navigate('/hub')
     │
     Hub görünür
     │
     Vault Tracker tekrar seçilirse:
       └─ Aynı state yüklenir (kaldığı yerden devam)
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### Phase 1: Temel Yapı
- [ ] Route yapısı kur
- [ ] Login screen (auto-login)
- [ ] Hub screen (tek app göster)
- [ ] Protected route logic

### Phase 2: Auth
- [ ] Auth context setup
- [ ] Auto-login logic
- [ ] Token storage (development)

### Phase 3: Hub
- [ ] App listesi render
- [ ] App selection
- [ ] Navigation

### Phase 4: Vault Tracker Entegrasyonu
- [ ] Vault route ekle
- [ ] Dashboard component
- [ ] State persistence
- [ ] Hub'a geri dönüş

### Phase 5: Polish
- [ ] Loading states
- [ ] Error handling
- [ ] Transitions

---

## 🔮 GELECEK GENİŞLEMELER

### Yeni App Ekleme

```javascript
// 1. Route ekle
{ path: '/new-app', element: <NewApp />, protected: true }

// 2. Hub listesine ekle
const availableApps = [
  // ... mevcut apps
  {
    id: 'new-app',
    name: 'New App',
    route: '/new-app',
    status: 'active',
  }
];

// 3. Component oluştur
function NewApp() {
  // Kendi state management'ı
  // Kendi localStorage key'i
}
```

### Gerçek Auth Eklenince

```javascript
// Backend endpoint'leri:
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me

// Token validation
// Password hashing
// Session management
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Development Mode:**
   - Auto-login her zaman aktif
   - Backend bağlantısı yok
   - localStorage ile simüle edilir

2. **Hub Basit Olmalı:**
   - Sadece app seçici
   - Karmaşık mantık yok
   - Her app kendi işini kendisi yapar

3. **State Izolasyonu:**
   - Her app kendi state'ini yönetir
   - Global state minimal
   - localStorage key'leri çakışmasın

4. **Vault Tracker Bağımsız:**
   - Hub bilmeden çalışabilmeli
   - Kendi routing'i yok (dashboard tek sayfa)
   - State persistence kendi sorumluluğu

---

## 📝 ÖZET

**Akış:**
```
Login (auto) → Hub → Vault Tracker
                ↑         ↓
                └─────────┘ (geri dönüş)
```

**Sorumluluklar:**
- **Login:** Auth kontrolü (şimdilik fake)
- **Hub:** App seçimi ve navigation
- **Vault Tracker:** Dashboard + Edit mode + Persistence

**State:**
- Auth state → Global (AppContext)
- Dashboard state → Local (DashboardContext) + localStorage
- Hub state → Minimal (sadece app listesi)

**Storage:**
- `auth-token` → Auth token
- `vault-dashboard` → Dashboard layout
- `user-data` → User preferences

---

**Status:** ARCHITECTURE DEFINED ✓  
**Next:** Vault Dashboard System implementation
