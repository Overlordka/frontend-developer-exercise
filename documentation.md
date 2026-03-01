# Projektdokumentation - Mobicom-Pro Frontend Test

## Indholdsfortegnelse
1. [Projektoversigt](#projektoversigt)
2. [Teknologier](#teknologier)
3. [Projektstruktur](#projektstruktur)
4. [Komponenter](#komponenter)
5. [Styling](#styling)
6. [Routing](#routing)
7. [Installation og kørsel](#installation-og-kørsel)
8. [Funktionalitet](#funktionalitet)

---

## Projektoversigt

Dette projekt er udviklet som en løsning til Mobicom-Pro's frontend test case. Applikationen er en mobilforberedt smart home kontrolpanel med følgende hovedfunktioner:

- **Dashboard** - Oversigt over energiforbrug, rum og smart indstillinger
- **Statistik** - Visualisering af energiforbrug og udgifter
- **Termostat indstillinger** - Kontrol af temperatur, ventilation og driftsmode

### Designkrav
Projektet er bygget baseret på det tilknyttede Adobe XD design og opfylder følgende krav:
- Tre navigerbare sider
- Scrollbar funktionalitet med fast bundmenu
- Interaktive kontrolelementer
- Responsivt mobildesign

---

## Teknologier

### Core
- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool og development server
- **React Router DOM 7.13.1** - Client-side routing

### UI & Styling
- **SCSS** - CSS preprocessor med BEM metodologi
- **Recharts 3.7.0** - Diagrammer og datavisualisering
- **React Icons 5.5.0** - Ikoner

### Development Tools
- **ESLint** - Code linting
- **Sass Embedded 1.97.3** - SCSS compiler

---

## Projektstruktur

```
frontend-developer-exercise/
├── public/
│   └── icons/              # Alle app ikoner
├── src/
│   ├── components/         # React komponenter
│   │   ├── BottomNav.jsx
│   │   ├── ConfigIndst.jsx
│   │   ├── ControlCard.jsx
│   │   ├── EnergyCard.jsx
│   │   ├── Header.jsx
│   │   ├── HeaderIndst.jsx
│   │   ├── HeaderStatistik.jsx
│   │   ├── ModeSelector.jsx
│   │   ├── RoomTabs.jsx
│   │   ├── SmartSection.jsx
│   │   └── StatTabs.jsx
│   ├── pages/              # Side komponenter
│   │   ├── starterPage.jsx
│   │   ├── statistikPage.jsx
│   │   └── indstillingerPage.jsx
│   ├── styling/            # SCSS filer
│   │   ├── _variables.scss
│   │   ├── _header.scss
│   │   ├── _energyCard.scss
│   │   ├── _roomTabs.scss
│   │   ├── _modeSelector.scss
│   │   ├── _smartSection.scss
│   │   ├── _controlCard.scss
│   │   ├── _bottomNav.scss
│   │   ├── _statTabs.scss
│   │   ├── _ConfigIndst.scss
│   │   └── main.scss
│   ├── App.jsx             # Hovedapplikation med routing
│   └── main.jsx            # Entry point
├── package.json
└── vite.config.js
```

---

## Komponenter

### Layout Komponenter

#### `BottomNav.jsx`
Bundnavigation med fire hovedknapper:
- Dashboard navigation
- Statistik navigation
- Varme kontrol
- Lys kontrol

**Features:**
- Dynamisk aktiv tilstand baseret på current route
- Automatisk ikonskift (active/inactive)
- React Router integration

#### `Header.jsx` / `HeaderIndst.jsx` / `HeaderStatistik.jsx`
Top header komponenter for forskellige sider med:
- Tilbage navigation
- Side titel
- Indstillinger knap

### Dashboard Komponenter

#### `EnergyCard.jsx`
Viser dagens energiforbrug:
- Aktuel strømforbrug (kW)
- Total forbrug for dagen (kWh)
- Procentvis sammenligning med gårsdagens forbrug

#### `RoomTabs.jsx`
Tabulerede rum navigation:
- Scrollable rum liste
- Aktiv rum indikator
- Rum ikoner

#### `ModeSelector.jsx`
Forudindstillede modes:
- Hjemme mode
- Ude mode
- Sover mode

**Features:**
- State management for aktiv mode
- Dynamisk ikon skift (on/off)
- Click handlers

#### `SmartSection.jsx`
Grid layout af kontrol kort:
- Konfigureret gennem `CARDS_CONFIG` array
- Nem tilføjelse af nye kort
- Dynamisk rendering

#### `ControlCard.jsx`
Genbrugeligt kontrol kort til lys/varme styring:
- On/off toggle switches
- Valgfri temperatur visning
- Indstillinger knap med navigation
- Support for multiple titler og items

### Statistik Komponenter

#### `StatTabs.jsx`
Omfattende statistik visning:
- **Graf sektion:**
  - Recharts LineChart
  - Ugentlige data (Man-Søn)
  - Gradient linje effekt
  - Interaktiv tooltip
  - Custom dot på aktuel dag
  
- **Udgifter liste:**
  - Klikbare expense cards
  - Dynamisk aktiv tilstand
  - kWh og pris information
  - Ikon skift baseret på aktivitet

### Indstillinger Komponenter

#### `ConfigIndst.jsx`
Termostat kontrolpanel:

**Temperatur kontrol:**
- +/- knapper for præcis justering
- Range slider (10-30°C)
- Stor display af aktuel temperatur
- Ude/inde temperatur visning

**Ventilator kontrol:**
- 5-niveau bar indikator
- Range slider kontrol
- Visuel feedback

**Mode vælger:**
- Manuel mode
- Tidsplan mode
- Boost mode
- Aktiv tilstand highlighting

**Power kontrol:**
- On/off toggle knap
- Visuel tilstandsindikator

---

## Styling

### BEM Metodologi
Alle komponenter følger BEM (Block Element Modifier) naming convention:
```scss
.component-name { }
.component-name__element { }
.component-name__element--modifier { }
```

### SCSS Variabler (_variables.scss)
Centraliserede design tokens:
```scss
$primary-blue: #0f407b;
$primary-white: #ffffff;
$primary-text: #1a1a1a;
$primary-dark-grey: #6b7280;
$primary-light-grey: #e5e7eb;
$primary-background: #f8f9fc;
```

### Responsive Design
- Mobile-first approach
- Max-width container (420px)
- Flexbox og Grid layouts
- Touch-friendly kontrolelementer

### Animationer
- Smooth transitions på hover/active states
- Transform effekter på knapper
- Color transitions
- Scale animations

---

## Routing

### Routes Konfiguration
```javascript
<Routes>
  <Route path="/" element={<StarterPage />} />
  <Route path="/statistics" element={<StatistikPage />} />
  <Route path="/indstillinger" element={<IndstillingerPage />} />
</Routes>
```

### Navigation Flow
1. **Dashboard (/)** → Hovedside med oversigt
2. **Statistik (/statistics)** → Energiforbrug og udgifter
3. **Indstillinger (/indstillinger)** → Termostat kontrol

Navigation håndteres via:
- `useNavigate()` hook for programmatisk navigation
- `useLocation()` hook for aktiv route detection

---

## Installation og kørsel

### Forudsætninger
- Node.js (v16+)
- npm eller yarn

### Installation
```bash
# Clone repository
git clone [repository-url]

# Naviger til projekt
cd frontend-developer-exercise

# Installer dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev

# Åben browser på http://localhost:5173
```

### Build
```bash
# Byg til produktion
npm run build

# Preview production build
npm run preview
```

### Linting
```bash
npm run lint
```

---

## Funktionalitet

### State Management
Komponenterne bruger React hooks til state management:
- `useState` - Lokal komponent state
- `useNavigate` - Navigation state
- `useLocation` - Route information

### Interaktive Features

#### Dashboard
- ✅ Scrollable interface
- ✅ Fast bundmenu
- ✅ Room navigation
- ✅ Mode selection
- ✅ Smart controls toggle

#### Statistik
- ✅ Ugentlig forbrugsvisning
- ✅ Interaktiv graf med tooltip
- ✅ Expense tracking per dag
- ✅ Aktiv dag selektion

#### Termostat
- ✅ Temperatur justering (10-30°C)
- ✅ Ventilator kontrol (0-5 niveau)
- ✅ Mode selektion (Manuel/Tidsplan/Boost)
- ✅ On/off power kontrol
- ✅ Real-time feedback

### Data Flow
- Komponent props for data passing
- Centraliserede konfigurationer (f.eks. CARDS_CONFIG)
- Event handlers for bruger interaktioner

---

## Fremtidige Forbedringer

### Potentielle udvidelser:
1. **API Integration** - Brug test-api fra exercise.mobicom-pro.com
2. **Persistent State** - LocalStorage/SessionStorage
3. **Real-time Updates** - WebSocket forbindelse
4. **Animations** - Framer Motion integration
5. **Accessibility** - ARIA labels og keyboard navigation
6. **Testing** - Unit og integration tests
7. **i18n** - Flersproget support
8. **Dark Mode** - Tema switching
9. **PWA** - Progressive Web App funktionalitet
10. **Performance** - Code splitting og lazy loading

---

## Kontakt

Dette projekt er udviklet som en del af Mobicom-Pro's frontend test case.

For spørgsmål eller feedback, kontakt venligst:
**ar@mobicom-pro.com**

---

**Udviklet med ❤️ og React**