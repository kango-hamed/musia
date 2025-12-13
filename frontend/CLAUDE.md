# Frontend - Musia 3D Virtual Museum

## Overview

The Musia frontend is an **interactive 3D virtual museum** built with React and Three.js, providing an immersive experience where users can explore artworks, interact with an AI-powered robot guide, and take virtual tours.

### Technology Stack
- **Framework:** React 19.2.0 with TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **3D Graphics:** Three.js 0.182.0
- **React 3D:** @react-three/fiber 9.4.2, @react-three/drei 10.7.7
- **Routing:** React Router DOM 7.10.1
- **State Management:** Zustand 5.0.9
- **Styling:** Tailwind CSS 4.1.17
- **Audio:** Howler.js 2.2.4
- **Voice:** Web Speech API (browser native)

---

## Project Structure

```
frontend/
├── src/
│   ├── components/           # React components
│   │   ├── museum/          # 3D museum components
│   │   │   ├── Scene.tsx           # Main Canvas wrapper
│   │   │   ├── MuseumRoom.tsx      # Museum environment
│   │   │   ├── Artworks.tsx        # Artwork gallery
│   │   │   ├── RobotGuide.tsx      # Animated robot
│   │   │   ├── CameraController.tsx # Camera controls
│   │   │   ├── Lighting.tsx        # Scene lighting
│   │   │   └── index.ts
│   │   ├── ui/              # UI components
│   │   │   ├── VoiceButton.tsx     # Voice interaction
│   │   │   ├── TourControls.tsx    # Tour navigation
│   │   │   ├── ArtworkModal.tsx    # Artwork details
│   │   │   └── index.ts
│   │   └── [legacy]/        # Legacy components (to be migrated)
│   │       ├── Alert.jsx
│   │       ├── Button.jsx
│   │       └── Input.jsx
│   ├── lib/                 # Libraries and utilities
│   │   ├── api/            # API client functions
│   │   │   ├── artworks.ts
│   │   │   ├── trajectories.ts
│   │   │   └── index.ts
│   │   ├── stores/         # Zustand stores
│   │   │   ├── museum.ts
│   │   │   └── index.ts
│   │   └── types/          # TypeScript types
│   │       ├── artwork.ts
│   │       ├── trajectory.ts
│   │       └── index.ts
│   ├── pages/              # Page components
│   │   ├── Museum.tsx      # Main 3D museum page
│   │   ├── Dashboard.jsx   # [Legacy]
│   │   └── LoginPage.jsx   # [Legacy]
│   ├── routes/
│   │   └── AuthRoutes.routes.jsx  # [Legacy]
│   ├── services/
│   │   └── authServices.js        # [Legacy]
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/
│   └── [static assets]
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── CLAUDE.md              # This file
```

---

## Core Features

### 1. 3D Virtual Museum

**Interactive museum environment** with:
- Realistic museum room (walls, floor, ceiling)
- Artwork frames positioned on walls
- Smooth camera controls (orbit, pan, zoom)
- Dynamic lighting and shadows
- Fog effects for depth

**Technologies:**
- Three.js for 3D rendering
- React Three Fiber as React renderer
- Drei for helpers (OrbitControls, etc.)

### 2. Animated Robot Guide

**AI-powered robot character** with:
- Smooth movement between artworks
- Idle bobbing animation
- Speaking animation when active
- Glowing ring effect
- Target-based navigation

**Features:**
- Lerp-based smooth transitions
- Rotation to face artworks
- Visual states (idle, moving, speaking)

### 3. Voice Interaction

**Natural language conversation** via:
- Web Speech API for speech recognition
- Microphone input (browser permission required)
- Real-time transcription
- NLP API integration for AI responses
- Audio playback of responses

**Flow:**
1. User clicks voice button
2. Browser requests microphone permission
3. Speech recognized and transcribed
4. Sent to NLP API for processing
5. AI response played back as audio
6. Robot animates while speaking

### 4. Virtual Tours

**Guided tour system** with:
- Pre-defined trajectories
- Step-by-step navigation
- Automated robot movement
- Narrative playback
- Tour controls (play, pause, next, previous)

### 5. Artwork Exploration

**Interactive artwork viewing:**
- Click artworks to view details
- Modal with full information
- High-resolution images
- Artist, period, style metadata
- Narrative content

---

## Component Architecture

### Museum Components

#### **Scene.tsx** - Main 3D Canvas

**Purpose:** Root 3D scene wrapper

**Code Location:** [src/components/museum/Scene.tsx](src/components/museum/Scene.tsx)

**Features:**
- Canvas setup with Vite configuration
- Suspense loading boundary
- Fog effect
- Orchestrates all 3D components

**Usage:**
```tsx
<Scene>
  <MuseumRoom />
  <Artworks />
  <RobotGuide />
  <Lighting />
  <CameraController />
</Scene>
```

**Key Props:**
- `camera` - Initial camera position and settings
- `shadows` - Enable shadow rendering
- `gl` - WebGL renderer settings

---

#### **MuseumRoom.tsx** - Museum Environment

**Purpose:** Create the museum space

**Code Location:** [src/components/museum/MuseumRoom.tsx](src/components/museum/MuseumRoom.tsx)

**Elements:**
- Floor mesh (large plane)
- Wall meshes (4 walls)
- Ceiling (optional)
- Materials with textures

**Example:**
```tsx
function MuseumRoom() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Walls */}
      <Wall position={[0, 5, -50]} />
      <Wall position={[0, 5, 50]} rotation={[0, Math.PI, 0]} />
      <Wall position={[-50, 5, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[50, 5, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}
```

---

#### **Artworks.tsx** - Artwork Gallery

**Purpose:** Render artwork frames on walls

**Code Location:** [src/components/museum/Artworks.tsx](src/components/museum/Artworks.tsx)

**Features:**
- Fetches artworks from API
- Positions based on `positionX`, `positionY`, `orientation`
- Click interaction
- Image textures loaded from URLs
- Frame geometry

**State:**
```tsx
const artworks = useMuseumStore((state) => state.artworks);
const setSelectedArtwork = useMuseumStore((state) => state.setSelectedArtwork);
```

**Rendering:**
```tsx
{artworks.map((artwork) => (
  <ArtworkFrame
    key={artwork.id}
    artwork={artwork}
    position={[artwork.positionX, artwork.positionY, 0]}
    onClick={() => setSelectedArtwork(artwork)}
  />
))}
```

---

#### **RobotGuide.tsx** - Animated Robot

**Purpose:** AI robot character with animations

**Code Location:** [src/components/museum/RobotGuide.tsx](src/components/museum/RobotGuide.tsx)

**Features:**
- Smooth movement with lerp interpolation
- Idle bobbing animation
- Speaking animation (scale pulsing)
- Glowing ring effect
- Rotation to face target

**State:**
```tsx
const robotPosition = useMuseumStore((state) => state.robotPosition);
const isSpeaking = useTourStore((state) => state.isSpeaking);
```

**Animation Loop:**
```tsx
useFrame((state, delta) => {
  if (targetPosition) {
    // Smooth movement
    robotRef.current.position.lerp(targetPosition, delta * 2);

    // Rotate to face target
    robotRef.current.lookAt(targetArtwork.position);
  }

  if (isSpeaking) {
    // Speaking animation (pulsing)
    const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
    robotRef.current.scale.setScalar(scale);
  } else {
    // Idle bobbing
    robotRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01;
  }
});
```

---

#### **CameraController.tsx** - Camera Controls

**Purpose:** User camera interaction

**Code Location:** [src/components/museum/CameraController.tsx](src/components/museum/CameraController.tsx)

**Features:**
- OrbitControls from Drei
- Zoom limits
- Pan limits
- Target tracking
- Smooth transitions

**Configuration:**
```tsx
<OrbitControls
  enableDamping
  dampingFactor={0.05}
  minDistance={10}
  maxDistance={100}
  maxPolarAngle={Math.PI / 2}
  target={[0, 5, 0]}
/>
```

---

#### **Lighting.tsx** - Scene Lighting

**Purpose:** Illuminate the 3D scene

**Code Location:** [src/components/museum/Lighting.tsx](src/components/museum/Lighting.tsx)

**Lights:**
- **Ambient Light** - Soft global illumination
- **Directional Light** - Sun-like light with shadows
- **Point Lights** - Artwork spotlights
- **Hemisphere Light** - Sky/ground color gradient

**Example:**
```tsx
<>
  <ambientLight intensity={0.4} />
  <directionalLight
    position={[10, 20, 10]}
    intensity={1}
    castShadow
    shadow-mapSize={[2048, 2048]}
  />
  {artworks.map((artwork) => (
    <pointLight
      key={artwork.id}
      position={[artwork.positionX, artwork.positionY + 2, 1]}
      intensity={0.5}
      distance={5}
    />
  ))}
</>
```

---

### UI Components

#### **VoiceButton.tsx** - Voice Interaction

**Purpose:** Speech recognition and AI conversation

**Code Location:** [src/components/ui/VoiceButton.tsx](src/components/ui/VoiceButton.tsx)

**Features:**
- Web Speech API integration
- Microphone permission handling
- Real-time transcription
- NLP API communication
- Audio response playback
- Visual states (idle, listening, processing, speaking)

**States:**
- `idle` - Ready to listen
- `listening` - Recording user speech
- `processing` - Sending to NLP API
- `speaking` - Playing AI response

**Flow:**
```tsx
const startListening = () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.continuous = false;

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    setState('processing');

    const response = await fetch('http://localhost:8000/conversation/text', {
      method: 'POST',
      body: JSON.stringify({ question: transcript }),
    });

    const data = await response.json();
    playAudio(data.audioUrl);
  };

  recognition.start();
  setState('listening');
};
```

**Permissions:**
```tsx
useEffect(() => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => setPermissionGranted(true))
    .catch(() => setPermissionGranted(false));
}, []);
```

---

#### **TourControls.tsx** - Tour Navigation

**Purpose:** Control guided tours

**Code Location:** [src/components/ui/TourControls.tsx](src/components/ui/TourControls.tsx)

**Features:**
- Play/pause tour
- Next/previous step
- Step indicator
- Progress bar
- Speed control

**State:**
```tsx
const { currentTour, currentStep, isPlaying } = useTourStore();
```

**Controls:**
```tsx
<div className="tour-controls">
  <button onClick={playPause}>
    {isPlaying ? <PauseIcon /> : <PlayIcon />}
  </button>
  <button onClick={previousStep} disabled={currentStep === 0}>
    <PrevIcon />
  </button>
  <span>{currentStep + 1} / {currentTour.steps.length}</span>
  <button onClick={nextStep} disabled={isLastStep}>
    <NextIcon />
  </button>
</div>
```

---

#### **ArtworkModal.tsx** - Artwork Details

**Purpose:** Display artwork information

**Code Location:** [src/components/ui/ArtworkModal.tsx](src/components/ui/ArtworkModal.tsx)

**Features:**
- Full-screen modal
- Artwork image viewer
- Metadata display
- Narrative text
- Audio player for narratives
- Close button

**Content:**
```tsx
<Modal isOpen={selectedArtwork !== null} onClose={closeModal}>
  <img src={selectedArtwork.imageUrl} alt={selectedArtwork.title} />
  <h2>{selectedArtwork.title}</h2>
  <p>{selectedArtwork.artist}</p>
  <p>{selectedArtwork.description}</p>

  <div className="narratives">
    {narratives.map((narrative) => (
      <div key={narrative.id}>
        <p>{narrative.textContent}</p>
        {narrative.audioUrl && (
          <audio src={narrative.audioUrl} controls />
        )}
      </div>
    ))}
  </div>
</Modal>
```

---

## State Management (Zustand)

### Museum Store

**File:** [src/lib/stores/museum.ts](src/lib/stores/museum.ts)

**Purpose:** Manage museum state

**State:**
```typescript
interface MuseumStore {
  // Artworks
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;

  // Selected artwork
  selectedArtwork: Artwork | null;
  setSelectedArtwork: (artwork: Artwork | null) => void;

  // Robot
  robotPosition: Vector3;
  setRobotPosition: (position: Vector3) => void;
  robotTarget: Artwork | null;
  setRobotTarget: (artwork: Artwork | null) => void;

  // UI
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;

  // Loading
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}
```

**Usage:**
```tsx
import { useMuseumStore } from '@/lib/stores/museum';

function Component() {
  const artworks = useMuseumStore((state) => state.artworks);
  const setSelectedArtwork = useMuseumStore((state) => state.setSelectedArtwork);

  return (
    <div onClick={() => setSelectedArtwork(artwork)}>
      {artworks.map(...)}
    </div>
  );
}
```

---

### Tour Store

**File:** [src/lib/stores/tour.ts](src/lib/stores/tour.ts) (planned)

**Purpose:** Manage tour state

**State:**
```typescript
interface TourStore {
  // Current tour
  currentTour: Trajectory | null;
  setCurrentTour: (tour: Trajectory | null) => void;

  // Playback
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;

  // Robot state
  isSpeaking: boolean;
  setSpeaking: (speaking: boolean) => void;

  // Speed
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
}
```

---

## API Integration

### Artworks API

**File:** [src/lib/api/artworks.ts](src/lib/api/artworks.ts)

**Functions:**
```typescript
// Fetch all artworks
export async function fetchArtworks(): Promise<Artwork[]> {
  const response = await fetch('http://localhost:3001/api/artworks');
  const data = await response.json();
  return data.data;
}

// Fetch single artwork
export async function fetchArtwork(id: string): Promise<Artwork> {
  const response = await fetch(`http://localhost:3001/api/artworks/${id}`);
  const data = await response.json();
  return data.data;
}

// Fetch narratives for artwork
export async function fetchNarratives(artworkId: string): Promise<Narrative[]> {
  const response = await fetch(
    `http://localhost:3001/api/artworks/${artworkId}/narratives`
  );
  const data = await response.json();
  return data.data;
}
```

---

### Trajectories API

**File:** [src/lib/api/trajectories.ts](src/lib/api/trajectories.ts)

**Functions:**
```typescript
// Fetch all trajectories
export async function fetchTrajectories(): Promise<Trajectory[]> {
  const response = await fetch('http://localhost:3001/api/trajectories');
  const data = await response.json();
  return data.data;
}

// Fetch single trajectory with steps
export async function fetchTrajectory(id: string): Promise<Trajectory> {
  const response = await fetch(`http://localhost:3001/api/trajectories/${id}`);
  const data = await response.json();
  return data.data;
}
```

---

### NLP API

**Direct calls from components:**

```typescript
// Start conversation
const response = await fetch('http://localhost:8000/conversation/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});
const { session_id } = await response.json();

// Ask question (text)
const response = await fetch('http://localhost:8000/conversation/text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    session_id,
    question: 'Tell me about this artwork',
  }),
});

// Ask question (audio)
const formData = new FormData();
formData.append('audio', audioBlob);
formData.append('session_id', sessionId);

const response = await fetch('http://localhost:8000/conversation/ask', {
  method: 'POST',
  body: formData,
});
```

---

## TypeScript Types

### Artwork Type

**File:** [src/lib/types/artwork.ts](src/lib/types/artwork.ts)

```typescript
export interface Artwork {
  id: string;
  code: string;
  title: string;
  artist?: string;
  description?: string;
  period?: string;
  style?: string;
  collection?: string;
  positionX?: number;
  positionY?: number;
  floor: number;
  room?: string;
  orientation?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NarrativeContent {
  id: string;
  artworkId: string;
  version: 'standard' | 'short' | 'detailed' | 'kids';
  language: string;
  textContent: string;
  audioUrl?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}
```

---

### Trajectory Type

**File:** [src/lib/types/trajectory.ts](src/lib/types/trajectory.ts)

```typescript
export interface Trajectory {
  id: string;
  name: string;
  description?: string;
  theme?: string;
  estimatedDuration: number;
  difficultyLevel: 'kids' | 'all' | 'expert';
  maxVisitors: number;
  isActive: boolean;
  isDefault: boolean;
  steps: TrajectoryStep[];
  createdAt: string;
  updatedAt: string;
}

export interface TrajectoryStep {
  id: string;
  trajectoryId: string;
  artworkId: string;
  narrativeContentId?: string;
  stepOrder: number;
  stopDuration: number;
  positionX?: number;
  positionY?: number;
  notes?: string;
  artwork?: Artwork;
  narrative?: NarrativeContent;
}
```

---

## Styling

### Tailwind CSS

**Configuration:** [tailwind.config.js](tailwind.config.js)

**Custom Classes:**
```css
/* Primary colors */
.bg-primary - Museum blue
.text-primary - Text blue
.border-primary - Border blue

/* Museum theme */
.museum-bg - Dark museum background
.museum-text - Light text on dark
.museum-card - Card with shadow

/* Animations */
.fade-in - Fade in animation
.slide-up - Slide up animation
.pulse - Pulse animation
```

**Usage:**
```tsx
<div className="museum-bg p-4 rounded-lg shadow-lg">
  <h1 className="text-primary text-2xl font-bold">Musia</h1>
</div>
```

---

### Global Styles

**File:** [src/index.css](src/index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --museum-bg: #1a1a1a;
  --museum-text: #f5f5f5;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

canvas {
  display: block;
  width: 100%;
  height: 100vh;
}
```

---

## Development

### Running Development Server

```bash
npm run dev
```

**Access:** http://localhost:5173

**Features:**
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- ESLint warnings

---

### Building for Production

```bash
npm run build
```

**Output:** `dist/` folder

**Optimization:**
- Code splitting
- Tree shaking
- Minification
- Asset optimization
- Source maps (optional)

---

### Preview Production Build

```bash
npm run preview
```

**Access:** http://localhost:4173

---

### Linting

```bash
npm run lint
```

**Configuration:** [eslint.config.js](eslint.config.js)

**Rules:**
- TypeScript best practices
- React hooks rules
- Unused variables warnings
- Import order

---

## Performance Optimization

### 3D Rendering

1. **Lazy Loading:**
```tsx
<Suspense fallback={<LoadingSpinner />}>
  <Scene />
</Suspense>
```

2. **Frustum Culling:**
- Three.js automatically culls off-screen objects
- Improves performance with many artworks

3. **Level of Detail (LOD):**
```tsx
<Lod>
  <mesh renderOrder={0} geometry={highDetail} />
  <mesh renderOrder={1} geometry={mediumDetail} />
  <mesh renderOrder={2} geometry={lowDetail} />
</Lod>
```

4. **Texture Optimization:**
- Compress images (WebP format)
- Use mipmaps
- Limit texture resolution (max 2048x2048)

5. **Shadow Map Optimization:**
```tsx
<directionalLight
  castShadow
  shadow-mapSize={[1024, 1024]}  // Lower for performance
  shadow-camera-far={50}
/>
```

---

### Asset Loading

**Preload critical assets:**
```tsx
useEffect(() => {
  const preloadImages = artworks.map((artwork) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = artwork.imageUrl;
      img.onload = resolve;
    });
  });

  Promise.all(preloadImages).then(() => setLoading(false));
}, [artworks]);
```

---

### Code Splitting

**Route-based splitting:**
```tsx
import { lazy } from 'react';

const Museum = lazy(() => import('./pages/Museum'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

---

## Browser Compatibility

### Required Features

- **WebGL 2.0** - For Three.js rendering
- **Web Speech API** - For voice recognition (Chrome, Edge)
- **ES6+ Support** - Modern JavaScript features
- **Canvas API** - For 3D rendering

### Supported Browsers

✅ **Chrome 90+** (Recommended)
✅ **Edge 90+**
✅ **Firefox 88+**
✅ **Safari 14+**

⚠️ **Limitations:**
- Web Speech API only in Chrome/Edge
- WebGL performance varies by GPU
- Mobile support limited (performance)

---

## Troubleshooting

### 3D Scene Not Rendering

**Issue:** Black screen or nothing visible

**Solutions:**
1. Check browser WebGL support: `chrome://gpu`
2. Enable hardware acceleration
3. Update graphics drivers
4. Check browser console for errors
5. Verify artworks data is loading

**Debug:**
```tsx
useEffect(() => {
  console.log('Artworks:', artworks);
  console.log('Camera:', camera);
  console.log('Renderer:', gl);
}, [artworks]);
```

---

### Voice Recognition Not Working

**Issue:** Microphone not capturing audio

**Solutions:**
1. Grant microphone permissions
2. Use HTTPS (required for Web Speech API)
3. Check browser compatibility (Chrome/Edge only)
4. Test with different microphone
5. Check browser console for permission errors

**Fallback:**
```tsx
if (!('webkitSpeechRecognition' in window)) {
  return <TextInputFallback />;
}
```

---

### API Connection Errors

**Issue:** Failed to fetch artworks

**Solutions:**
1. Check backend is running (http://localhost:3001)
2. Check NLP module is running (http://localhost:8000)
3. Verify CORS settings in backend
4. Check network tab in DevTools
5. Verify API endpoints

**Debug:**
```tsx
try {
  const response = await fetch('http://localhost:3001/api/artworks');
  if (!response.ok) {
    console.error('API Error:', response.status, response.statusText);
  }
} catch (error) {
  console.error('Network Error:', error);
}
```

---

### Performance Issues

**Issue:** Low FPS, laggy animations

**Solutions:**
1. Reduce shadow map size
2. Limit number of lights
3. Use simpler geometry
4. Enable frustum culling
5. Reduce texture resolution
6. Close other browser tabs

**Monitor performance:**
```tsx
import { Stats } from '@react-three/drei';

<Canvas>
  <Stats />
  {/* Rest of scene */}
</Canvas>
```

---

## Future Enhancements

### Planned Features

- [ ] **VR Support** - WebXR for virtual reality
- [ ] **Mobile App** - React Native version
- [ ] **Multiplayer** - Shared museum visits
- [ ] **Custom Avatars** - User-selectable avatars
- [ ] **Gesture Controls** - Hand tracking
- [ ] **Spatial Audio** - 3D positional audio
- [ ] **Screenshot/Share** - Capture and share views
- [ ] **Accessibility** - Screen reader support
- [ ] **Progressive Web App** - Offline support
- [ ] **Analytics** - User behavior tracking

### Technical Improvements

- [ ] Migrate all components to TypeScript
- [ ] Add E2E tests (Playwright)
- [ ] Implement service worker
- [ ] Add error boundaries
- [ ] Optimize bundle size
- [ ] Add performance monitoring
- [ ] Implement A/B testing
- [ ] Add animation library (Framer Motion)

---

## Testing

### Unit Tests (Planned)

```bash
npm run test
```

**Framework:** Vitest (Vite-native testing)

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VoiceButton } from './VoiceButton';

describe('VoiceButton', () => {
  it('renders correctly', () => {
    render(<VoiceButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

---

### E2E Tests (Planned)

**Framework:** Playwright

**Example:**
```typescript
test('user can explore museum', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('canvas');

  // Click artwork
  await page.click('[data-testid="artwork-1"]');
  await expect(page.locator('.artwork-modal')).toBeVisible();
});
```

---

## Deployment

### Build for Production

```bash
npm run build
```

### Deployment Platforms

**Recommended:**
- **Vercel** - Optimized for Vite/React
- **Netlify** - Easy deployment
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable CDN

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

**Configuration:** [vercel.json](vercel.json) (optional)

---

### Environment Variables

**Create `.env.production`:**
```bash
VITE_API_URL=https://api.musia.com
VITE_NLP_URL=https://nlp.musia.com
```

**Usage in code:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

---

## Resources

### Documentation
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js](https://threejs.org/docs/)
- [Zustand](https://docs.pmnd.rs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/)

### Related Files
- [Root CLAUDE.md](../CLAUDE.md) - Project overview
- [Backend CLAUDE.md](../backend/CLAUDE.md) - Backend API guide
- [NLP Module CLAUDE.md](../nlp-module/CLAUDE.md) - NLP guide

---

**Last Updated:** 2025-01-13
**Version:** 1.0.0
