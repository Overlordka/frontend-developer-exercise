# Projektdokumentation - Mobicom-Pro Frontend Test

## Indholdsfortegnelse
1. [Projektoversigt](#projektoversigt)
2. [Teknologier](#teknologier)
3. [Projektstruktur](#projektstruktur)
4. [Komponenter](#komponenter)
5. [API-integration](#api-integration)
6. [Routing og navigation](#routing-og-navigation)
7. [Styling](#styling)
8. [Installation og kørsel](#installation-og-kørsel)
9. [Funktionalitet og dataflow](#funktionalitet-og-dataflow)
10. [Kendte begrænsninger og næste skridt](#kendte-begrænsninger-og-næste-skridt)

---

## Projektoversigt

Dette projekt er en mobilforberedt smart home-applikation bygget i React og Vite som løsning på Mobicom-Pro's frontend test case.

Applikationen består af tre primære views:

- **Dashboard** med energiforbrug, rumoversigt og smart controls
- **Statistik** med ugentlig forbrugsvisning og dagsopdelte udgifter
- **Indstillinger** med termostat-, ventilations- og modekontrol

Den nuværende implementering kombinerer statisk UI med live data fra test-API'et:

- Dashboardets energikort henter rigtige forbrugsdata
- Statistiksiden bygger graf og udgiftsliste ud fra API-data
- Indstillingssiden henter enhedens aktuelle værdier og sender opdateringer tilbage via `PUT`
- Flere kontrolkort og preset-valg er stadig UI-drevne og fungerer som demo-/prototypeelementer

### Implementerede krav

- Tre navigerbare sider
- Mobiloptimeret layout med max-bredde container
- Fast bundnavigation på dashboard og statistik
- Interaktive kontrolelementer til temperatur, ventilation og mode
- Integration mod Mobicom-Pro test-API

---

## Teknologier

### Core

- **React 19.2.0** - Komponentbaseret UI
- **Vite 7.2.4** - Development server og build tool
- **React Router DOM 7.13.1** - Klientside-routing

### UI og visualisering

- **SCSS** - Styling via partials og fælles variabler
- **Recharts 3.7.0** - Grafvisning på statistik-siden
- **React Icons 5.5.0** - Header- og action-ikoner

### Data og udvikling

- **Fetch API** - HTTP-kald til Mobicom-Pro API
- **ESLint** - Kodekvalitet og linting
- **sass-embedded 1.97.3** - SCSS-kompilering

---

## Projektstruktur

```text
frontend-developer-exercise/
├── documentation.md
├── public/
│   └── icons/                  # Ikoner brugt i UI'et
├── src/
│   ├── components/             # Genbrugelige UI-komponenter
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
│   ├── pages/                  # Sidekompositioner pr. route
│   │   ├── starterPage.jsx
│   │   ├── statistikPage.jsx
│   │   └── indstillingerPage.jsx
│   ├── scripts/                # API-kald og HTTP-hjælpere
│   │   ├── fetch.js
│   │   └── put.js
│   ├── styling/                # SCSS partials og globale styles
│   │   ├── _bottomNav.scss
│   │   ├── _ConfigIndst.scss
│   │   ├── _controlCard.scss
│   │   ├── _energyCard.scss
│   │   ├── _header.scss
│   │   ├── _modeSelector.scss
│   │   ├── _roomTabs.scss
│   │   ├── _smartSection.scss
│   │   ├── _statTabs.scss
│   │   ├── _variables.scss
│   │   └── main.scss
│   ├── App.jsx                 # Route-definition og layoutlogik
│   └── main.jsx                # App bootstrap
├── package.json
└── vite.config.js
```

---

## Komponenter

### Layout og navigation

#### `App.jsx`

Ansvarlig for routing og layout på tværs af applikationen.

- Definerer routes for dashboard, statistik og indstillinger
- Viser kun `BottomNav` på routes, der ikke starter med `/indstillinger`
- Importerer den globale SCSS entrypoint via `main.scss`

#### `BottomNav.jsx`

Bundnavigation med fire ikoner.

- Dashboard-knappen navigerer til `/`
- Statistik-knappen navigerer til `/statistics`
- Ikonerne for varme og lys er visuelt til stede, men har ikke navigation koblet på endnu
- Aktivt ikon skifter afhængigt af den aktuelle route

#### `Header.jsx`, `HeaderIndst.jsx`, `HeaderStatistik.jsx`

Side-specifikke headers med let forskellig adfærd.

- Dashboard viser hamburger-ikon og titlen `Smart Home`
- Indstillinger viser tilbageknap til dashboard og titlen `Varme`
- Statistik viser sidetitel og overflow-ikon

### Dashboard-komponenter

#### `EnergyCard.jsx`

Viser seneste energiforbrug baseret på live API-data.

- Henter data via `fetchCurrentEnergyConsumption()` ved mount
- Finder seneste og forrige datapunkt for at beregne sammenligning med dagen før
- Formaterer dato til dansk kortformat
- Navigerer til statistik-siden ved klik på ikonknappen
- Fejl logges til konsollen, men vises ikke i UI'et

#### `RoomTabs.jsx`

Viser en statisk, scroll-bar liste over rum.

- Indeholder rum som soveværelse, stue, badeværelse og køkken
- Har ingen aktiv filtrering eller datakobling endnu

#### `ModeSelector.jsx`

Lokal state-baseret valg af presets.

- Modes: `Hjemme`, `Ude` og `Sover`
- Skifter ikon og aktiv styling lokalt i komponenten
- Er ikke koblet til API eller global state

#### `SmartSection.jsx`

Viser et grid af smart home-kort.

- Henter enhedsdata via `fetchDevices()` ved mount
- Bruger første enhed fra API'et til at vise temperatur og work mode i stue-kortet
- Øvrige kort er statiske eksempeldata for lys og varme i andre rum

#### `ControlCard.jsx`

Genbrugelig kortkomponent til lys- og varmestyring.

- Renderer en eller to sektioner med on/off toggles
- Kan vise temperatur og mode-information
- Viser `Indstillinger`-knap, når kortet har temperatur/mode-data
- Navigerer til `/indstillinger` via `useNavigate()`

### Statistik-komponenter

#### `StatTabs.jsx`

Visualiserer ugentligt energiforbrug og tilhørende udgifter.

- Henter data via `getWeeklyEnergyConsumption()`
- Mapper API-data til danske ugedagsforkortelser
- Udfylder ugen i fast rækkefølge `Man-Søn`, også når enkelte dage mangler data
- Viser interaktiv `LineChart` med tooltip via Recharts
- Viser klikbar udgiftsliste med aktiv dagsmarkering

### Indstillinger-komponenter

#### `ConfigIndst.jsx`

Termostat- og ventilationskontrol baseret på live enhedsdata.

- Henter enhedslisten via `fetchDevices()` ved mount
- Bruger første device som aktiv enhed
- Initialiserer navn, indetemperatur, target-temperatur, ventilationsniveau og mode fra API'et
- Sender `PUT`-opdateringer via `updateDevice()` ved ændring af temperatur, ventilation og mode
- Temperatur slider og plus/minus-knapper er begrænset til intervallet `10-30°C`
- Ventilation er begrænset til niveau `0-5`
- Power-knappen ændrer kun lokal UI-state og er ikke persisteret til API'et

---

## API-integration

Al netværkslogik er samlet i `src/scripts`.

### `src/scripts/fetch.js`

Indeholder læseoperationer mod API'et.

- `fetchDevices()`
  - `GET /api/devices`
  - Bruges af `SmartSection` og `ConfigIndst`

- `fetchCurrentEnergyConsumption()`
  - `GET /api/weather` for at finde aktuel dato
  - `GET /api/statistics?device_id=38&from=...&to=...`
  - Bruges af `EnergyCard`

- `getWeeklyEnergyConsumption()`
  - Genbruger `fetchCurrentEnergyConsumption()`
  - Beregner start på uge fra seneste tilgængelige dato
  - Filtrerer datasættet ned til den aktuelle uge
  - Bruges af `StatTabs`

### `src/scripts/put.js`

Indeholder skriveoperationer mod API'et.

- `updateDevice(deviceId, payload)`
  - `PUT /api/devices/:id`
  - Bruges af `ConfigIndst` til opdatering af device-indstillinger

### Nuværende databrug i UI'et

- **Live data:** energiforbrug, ugestatistik, enhedsnavn, indetemperatur, target-temperatur, ventilationsniveau og work mode ved indlæsning
- **Lokal/demo data:** rumliste, preset-knapper, de fleste control cards, power-toggle i indstillinger og bundnavigationens varme-/lysgenveje

### Fejlhåndtering

- API-fejl kaster exceptions i scriptlaget
- Komponenterne logger som udgangspunkt fejl til konsollen
- Der er endnu ingen loading states eller brugerrettede fejlbeskeder

---

## Routing og navigation

### Routes

```jsx
<Routes>
  <Route path="/" element={<StarterPage />} />
  <Route path="/statistics" element={<StatistikPage />} />
  <Route path="/indstillinger" element={<IndstillingerPage />} />
</Routes>
```

### Navigationsflow

1. **Dashboard (`/`)** er applikationens startside
2. **Statistik (`/statistics`)** kan åbnes via bundnavigation eller energikortet
3. **Indstillinger (`/indstillinger`)** åbnes fra varme-kortets `Indstillinger`-knap
4. Tilbage-navigation fra indstillinger går til dashboard via headerens tilbageknap

### Route-afhængig UI-logik

- `BottomNav` vises på dashboard og statistik
- `BottomNav` skjules på indstillingssiden for at give mere plads til termostatpanelet
- Aktiv route bruges til at skifte bundnavigationens ikon-tilstand

---

## Styling

Projektet bruger SCSS partials organiseret pr. komponent og samlet i `src/styling/main.scss`.

### Overordnet stylingstruktur

- Hver større komponent har sin egen partial, f.eks. `_energyCard.scss` og `_statTabs.scss`
- `main.scss` importerer alle partials og de fælles variabler
- Layoutet er mobile-first med en central container på `max-width: 420px`

### Centrale designvariabler

```scss
$primary-blue: #0f407b;
$primary-white: #ffffff;
$primary-background: #fafafa;
$primary-grey: #cbccd2;
$primary-dark-grey: #a0a0a0;
$primary-text: #1a1a1a;
$green: #71ddb3;
```

### Stylingmønstre

- BEM-inspireret class naming i størstedelen af komponenterne
- Flexbox og grid bruges til layout af kort, faner og bundnavigation
- Ikon- og state-skift håndteres primært via class names og forskellige billedfiler

---

## Installation og kørsel

### Forudsætninger

- Node.js `20.19+` eller nyere anbefales til Vite 7
- npm

### Installation

```bash
git clone [repository-url]
cd frontend-developer-exercise
npm install
```

### Development

```bash
npm run dev
```

Vite starter som standard på `http://localhost:5173`.

### Build og preview

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Funktionalitet og dataflow

### Brugte React hooks

- `useState` til lokal komponentstate
- `useEffect` til initial datahentning
- `useNavigate` til programmatisk navigation
- `useLocation` til route-afhængig UI-logik

### Overordnet dataflow

1. API-kald ligger i `src/scripts/fetch.js` og `src/scripts/put.js`
2. Feature-komponenter kalder scriptlaget i `useEffect` eller event handlers
3. Resultater gemmes i lokal state via `useState`
4. UI opdateres direkte ud fra komponenternes state

### Dashboard

- Viser live energiforbrug med sammenligning mod forrige dag
- Viser rum og presets som lokal UI uden backend-kobling
- Viser smart controls, hvor stuevarme er delvist drevet af device-data fra API'et

### Statistik

- Bygger ugentlig graf ud fra live statistikdata
- Viser dagsopdelte udgifter med klikbar aktiv markering
- Periodeselektoren er visuelt til stede, men skifter ikke datasæt endnu

### Indstillinger

- Indlæser første device fra API'et som aktiv termostat
- Opdaterer temperatur og ventilationsniveau via `PUT`
- Har mode-knapper med API-opkald ved ændring
- Har power-toggle som kun påvirker lokal state i UI'et

---

## Kendte begrænsninger og næste skridt

### Nuværende begrænsninger

- Flere dele af dashboardet er stadig statiske demo-data
- Der findes ingen loading state eller brugerrettet fejlvisning
- Autentificeringstoken ligger direkte i kildekoden i scriptlaget
- Bundnavigationens varme- og lysikoner er ikke koblet til routes eller handlinger
- Power-knappen i indstillinger er ikke synkroniseret med API'et

### Relevante næste forbedringer

1. Flyt API-token til miljøvariabler
2. Tilføj loading og fejltilstande i de dataafhængige komponenter
3. Kobl flere rum- og kontrolkort til rigtige device-data
4. Gør preset-valg og power-state persistente
5. Tilføj tests for API-flow og navigation