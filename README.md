# BEYOND — Adventure Events Hub

> **Unofficial Concept Project**  
> Created by **Nirasha Ranasinghe**, Undergraduate at the University of Kelaniya, for the **Adventure Club recruitment assignment**.  
> *All listed events, schedules, dates, and registration workflows are illustrative demonstrations.*

---

## 📌 Links & Deliverables

- **Source Repository:** [github.com/nirasha-dev/beyond-adventure-events-hub](https://github.com/nirasha-dev/beyond-adventure-events-hub)
- **Live Demo:** [roaring-begonia-c1b968.netlify.app](https://roaring-begonia-c1b968.netlify.app/)
- **Official University Club Website:** [ac-uok.netlify.app/home](https://ac-uok.netlify.app/home)

---

## 🧭 Project Purpose & Problem Solved

University students often hesitate to join outdoor adventures not from lack of interest, but from **logistical uncertainty**:
- *"What gear is provided versus what must I bring myself?"*
- *"What is the physical difficulty level and pace?"*
- *"How cold will it get in the Knuckles mountain range at night?"*
- *"Can beginners participate in white-water rafting safely?"*

**BEYOND — Adventure Events Hub** addresses this challenge with:
1. **Curated Expedition Discovery:** Detailed event overviews with difficulty ratings, terrain notes, and sample cost-sharing estimates.
2. **Transparent Logistics:** Clear comparisons between shared club gear and participant-provided items, alongside hour-by-hour operational timelines.
3. **Interactive Adventure Kit:** An event-specific packing checklist that persists to the student's browser (`localStorage`), tracks readiness percentages, supports custom gear additions, and prints cleanly.
4. **Demo Registration:** A client-side demonstration of registration ergonomics with instant validation, zero backend transmission, and safe error feedback.

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Routing:** [React Router 6](https://reactrouter.com/) (with client-side SPA redirects)
- **Styling:** Plain CSS with reusable design tokens (`src/styles/tokens.css` and `src/styles/global.css`)
- **Iconography:** [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest](https://vitest.dev/) (Unit test suite)
- **Persistence:** Browser `localStorage` (Versioned and event-isolated)

---

## 📁 Project Directory Structure

```text
c:/Users/Asus/OneDrive - University of Kelaniya/Documents/Adventure Club/
├── public/
│   ├── _redirects            # Netlify SPA routing fallback
│   └── compass.svg           # Brand favicon mark
├── src/
│   ├── __tests__/            # Automated unit tests
│   │   └── unit.test.ts      # Tests for filters, math, validation, and storage
│   ├── components/           # Reusable UI components
│   │   ├── ConfirmationDialog.tsx  # Accessible modal for destructive confirmations
│   │   ├── DisclaimerBanner.tsx    # Top mandatory disclosure banner
│   │   ├── EmptyState.tsx          # Friendly empty search/filter states
│   │   ├── EventCard.tsx           # Adventure card with bookmark toggle
│   │   ├── EventFilters.tsx        # Search, category pills, difficulty, sort
│   │   ├── EventTimeline.tsx       # Timeline display for hourly itineraries
│   │   ├── Footer.tsx              # Unofficial notice, credits, and links
│   │   ├── Header.tsx              # Sticky navigation with accessible mobile drawer
│   │   ├── ProgressIndicator.tsx   # Mathematical packing progress bar
│   │   ├── RegistrationDialog.tsx  # Accessible modal for demo registration
│   │   └── ScrollToTop.tsx         # Scroll restoration on route change
│   ├── data/
│   │   └── adventures.ts     # Central typed sample event data
│   ├── hooks/                # Custom React hooks
│   │   ├── useAdventureKit.ts      # Checklist state, custom items, and math
│   │   └── useSavedAdventures.ts   # Saved/bookmarked events persistence
│   ├── pages/                # Route views
│   │   ├── AboutPage.tsx     # Context, limitations, tech stack, and credits
│   │   ├── AdventuresPage.tsx # Searchable and filterable expedition catalog
│   │   ├── EventDetailPage.tsx# Comprehensive event overview, timeline & actions
│   │   ├── HomePage.tsx      # Hero, featured trips, how it works, and FAQs
│   │   ├── MyKitPage.tsx     # Interactive packing checklist and printable view
│   │   └── NotFoundPage.tsx  # Helpful 404 page
│   ├── styles/
│   │   ├── global.css        # CSS reset, typography, buttons, and print layout
│   │   └── tokens.css        # Color palette, spacing, radii, and shadows
│   ├── types/
│   │   └── index.ts          # Central TypeScript interfaces and data contracts
│   ├── utils/                # Pure business logic utilities
│   │   ├── checklistMath.ts  # Mathematical packing readiness functions
│   │   ├── filterAndSort.ts  # Immutable search, filtering, and sorting logic
│   │   ├── storage.ts        # Versioned localStorage read/write with fallbacks
│   │   └── validation.ts     # Form and checklist item validation logic
│   ├── App.tsx               # Root route declarations & layout
│   └── main.tsx              # Application entry point
├── index.html                # HTML entry point with meta tags & Google Fonts
├── package.json              # Project scripts & dependencies
├── package-lock.json         # Pinned reproducible dependencies lockfile
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel SPA routing rewrite rule
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation & presentation guide
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or later (v22+ recommended)
- `npm` v9.0.0 or later

### Installation

Clone or open the workspace folder and install dependencies:

```bash
npm install
```

### Development Server

Run the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adventures and trip archives

The review preview is available at `/adventures`. Adventures are managed in
[`src/data/adventures.ts`](./src/data/adventures.ts), with one record per trip.
Set `eventStatus` to `Upcoming` or `Completed` to move a trip between sections
without changing its `slug` or detail URL. Upcoming records use
`registrationStatus` and can optionally provide a club-approved
`registrationLink`; records without that link use the clearly labelled demo
registration form.

Completed records can add `recap`, `photos`, `articles`,
`participantExperiences`, and `resources`. Empty optional fields are omitted
from the archive page, so content can be published progressively. Keep local
event assets grouped by slug under `public/assets/adventures/<slug>/` when
replacing the illustrative remote images.

Upcoming records can publish a `tripUpdate`, `registrationDeadline`,
`feeIncludes`, `eligibility`, `beginnerSuitability`, `transport`, `mapsUrl`,
and `packingProvision` from the same record. To publish a committee update,
edit `tripUpdate`; to close registration without moving a trip, change only
`registrationStatus`. To publish an archive later, change `eventStatus` to
`Completed` and add the recap and slug-specific photos/articles. The permanent
URL remains `/adventures/<slug>`. The homepage automatically features the
nearest upcoming record.

### Running Unit Tests

Run the Vitest test suite:

```bash
npm test
```

### Production Build & Preview

Compile and minify the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 💾 LocalStorage Architecture

The application uses browser `localStorage` to provide an offline-first experience without requiring a backend database or user accounts.

### Storage Keys & Data Schemas

1. **`beyond_adventure_kit_v1`**  
   Stores the checklist state for each adventure:
   ```json
   {
     "version": 1,
     "lastUpdated": "2026-11-06T05:00:00.000Z",
     "checklistsByEvent": {
       "adv-knuckles-01": [
         {
           "id": "knuck-c-1",
           "name": "Moisture-wicking synthetic t-shirts (x2)",
           "category": "Clothing",
           "isPacked": true,
           "isCustom": false,
           "note": "Avoid cotton; synthetic dries quickly in mountain mist"
         }
       ]
     }
   }
   ```
2. **`beyond_saved_adventures_v1`**  
   Stores an array of bookmarked adventure IDs:
   ```json
   {
     "version": 1,
     "savedIds": ["adv-knuckles-01", "adv-kitulgala-03"]
   }
   ```

### Resiliency Guarantees

- **Event Isolation:** Each adventure maintains its own independent checklist. Switching between events never resets or corrupts another event's data.
- **Quota & Private Browsing Fallback:** All read/write operations are wrapped in `try/catch` and guarded by `isStorageAvailable()`. If storage is restricted or disabled, the application seamlessly falls back to in-memory state without crashing.
- **Schema Versioning:** The stored version (`version: 1`) is verified before parsing. Incompatible payloads fall back gracefully to the default sample dataset.
- **Safe Sanitization:** User-entered custom items are trimmed, capped at 60 characters, checked for duplicates, and rendered safely as text to prevent injection.

---

## 🔒 Demo Registration Limitations

- **Simulated Only:** The registration modal is strictly an interface demonstration.
- **Zero Network Transmission:** No data is transmitted to an external server, database, email inbox, or analytics tool.
- **Zero Personal Data Stored:** Submitted details are cleared upon closing and are not saved in `localStorage`.
- **Zero Console Logging:** Sensitive form fields are never dumped to `console.log`.

---

## 🧪 Verification & Automated Testing

The project includes an automated Vitest test suite (`src/__tests__/unit.test.ts`) covering:
- **Case-Insensitive Search:** Querying "knuckles", "KNUCKLES", or "Kitulgala" returns exact matches.
- **Multi-Faceted Filtering:** Verifies that category, difficulty, search query, and saved-only filters work together accurately.
- **Immutable Sorting:** Guarantees that sorting by price or date creates shallow copies and does not mutate the source data array.
- **Checklist Math:** Verifies calculation formulas (e.g., 8 of 12 items packed equals exactly 67% readiness) and empty-array safety.
- **Validation Rules:** Checks required fields, whitespace trimming, email regex patterns, faculty selection, and acknowledgment checkboxes.
- **Custom Item Deduplication:** Verifies that items with duplicate names (case-insensitive) are rejected with friendly inline errors.
- **Storage Initialization:** Confirms that default checklists are deep-cloned so modifying one item does not mutate default template definitions.

---

## 📷 Photography & Asset Credits

All images used are licensed for free commercial and editorial use:

| Concept Event | Location | Photographer | Source & License |
| :--- | :--- | :--- | :--- |
| **Beyond the Mist** | Knuckles Mountain Range | Bailey Zindel | [Unsplash (4HG3Ca3EzWk)](https://unsplash.com/photos/4HG3Ca3EzWk) • Unsplash Free Commercial License |
| **Under the Stars** | Kalpitiya Coastal Reserve | Scott Goodwill | [Unsplash (y8Ngwq34_Ak)](https://unsplash.com/photos/y8Ngwq34_Ak) • Unsplash Free Commercial License |
| **Chase the Rapids** | Kitulgala Kelani River | Kalen Emsley | [Unsplash (Bkci_8qcdvQ)](https://unsplash.com/photos/Bkci_8qcdvQ) • Unsplash Free Commercial License |
| **Typography** | Headlines & Body | Google Fonts | Fraunces & Plus Jakarta Sans • SIL Open Font License (OFL) |

---

## 🌐 Deployment Instructions

This project is a static Single-Page Application (SPA) ready for free hosting on Netlify, Vercel, or GitHub Pages.

### Option A: Deploy to Netlify (Recommended)

1. Push your repository to your personal GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete BEYOND Adventure Events Hub project"
   git remote add origin https://github.com/nirasha-dev/beyond-adventure-events-hub.git
   git branch -M main
   git push -u origin main
   ```
2. Log into [Netlify](https://app.netlify.com/).
3. Click **Add new site** > **Import an existing project** > **GitHub**.
4. Select your repository `beyond-adventure-events-hub`.
5. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy beyond-adventure-events-hub**.
7. *(The included `public/_redirects` file ensures that refreshing `/adventures/beyond-the-mist` or `/my-kit` works without 404 errors).*

### Option B: Deploy to Vercel

1. Log into [Vercel](https://vercel.com/).
2. Click **Add New...** > **Project** and select your GitHub repository.
3. Framework Preset will automatically detect **Vite**.
4. Click **Deploy**. *(The included `vercel.json` provides SPA routing rewrites).*

---

## 👤 Author

**Nirasha Ranasinghe**  
Undergraduate, University of Kelaniya, Sri Lanka  
Applicant for the Adventure Club Recruitment Assignment
