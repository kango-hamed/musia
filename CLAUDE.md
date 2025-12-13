# Musia - Audio Museum Chatbot

## Project Overview

**Musia** is an AI-powered audio museum guide chatbot, originally designed for a physical robot companion, now evolved into a comprehensive software solution with a 3D virtual museum interface. The project combines museum content management, conversational AI, and immersive 3D visualization.

### Vision
Create an interactive museum experience where visitors can explore artworks through natural language conversation, guided tours, and a virtual 3D environment.

### Architecture
**Microservices-based** system with three main components:
- **Backend API** (Node.js/TypeScript) - Data management and business logic
- **NLP Module** (Python/FastAPI) - AI conversational engine
- **Frontend** (React/TypeScript/Three.js) - 3D virtual museum interface

---

## Repository Structure

```
musia/
├── backend/              # REST API (Node.js + Express + Prisma + PostgreSQL)
├── frontend/             # 3D Virtual Museum (React + Three.js)
├── nlp-module/           # AI/NLP Engine (Python + FastAPI + Whisper + Groq)
├── docs/                 # Documentation and specifications
├── robot-integration/    # Future: Physical robot integration
├── .vscode/             # VS Code workspace settings
├── docker-compose.yml   # Docker orchestration (prepared)
├── CLAUDE.md            # This file
└── README.md            # Project documentation
```

---

## Tech Stack Summary

### Backend
- **Runtime:** Node.js v18+ with TypeScript 5.3
- **Framework:** Express.js 4.18
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma 7.0
- **Auth:** JWT tokens
- **Validation:** Zod 4.0
- **Testing:** Jest + Supertest

### Frontend
- **Framework:** React 19.2 with TypeScript 5.9
- **Build:** Vite 7.2
- **3D Graphics:** Three.js 0.182 + React Three Fiber 9.4
- **State:** Zustand 5.0
- **Styling:** Tailwind CSS 4.1
- **Audio:** Howler.js 2.2

### NLP Module
- **Framework:** FastAPI 0.109
- **STT:** OpenAI Whisper
- **LLM:** Groq (Llama 3.1-8b-instant)
- **TTS:** Edge TTS
- **NLP:** Sentence Transformers + NLTK
- **Database:** SQLAlchemy + SQLite

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL (or Neon account)
- Groq API key

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure DATABASE_URL, JWT_SECRET, etc.
npx prisma generate
npx prisma migrate dev
npm run dev  # Runs on http://localhost:3001
```

### 2. NLP Module Setup
```bash
cd nlp-module
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Configure GROQ_API_KEY
python run.py  # Runs on http://localhost:8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

### Access
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **NLP API:** http://localhost:8000
- **API Health:** http://localhost:3001/api/health

---

## Key Features

### Implemented
✅ **User Authentication** - JWT-based with role-based access control
✅ **Artwork Management** - CRUD with image uploads, metadata, museum positioning
✅ **Narrative Content** - Multi-version (standard/short/detailed/kids), multi-language, audio support
✅ **Trajectories** - Curated audio tours with steps, themes, difficulty levels
✅ **AI Conversation** - Speech-to-text, NLP intent classification, LLM responses, text-to-speech
✅ **3D Virtual Museum** - Interactive room with artwork gallery and animated robot guide
✅ **Voice Interaction** - Web Speech API integration with NLP backend

### Planned
🚧 **Museum Cartography** - Floor plans, zones, navigation
🚧 **Analytics Dashboard** - Visitor interactions, robot activity logs
🚧 **FAQ Caching** - Pre-generated common question responses
🚧 **Physical Robot Integration** - Hardware control, sensor data
🚧 **Scheduled Visits** - Recurring tours, visitor management

---

## Database Schema (Prisma)

### Core Models

**User** - Authentication and authorization
- Fields: id, email, password, name, role
- Roles: admin, manager, operator, viewer

**Artwork** - Museum pieces
- Fields: id, code, title, artist, description, period, style, collection
- Location: positionX, positionY, floor, room, orientation
- Media: imageUrl
- Relations: narrativeContents, trajectorySteps, faqCache

**NarrativeContent** - Storytelling content
- Fields: id, artworkId, version, language, textContent, audioUrl, duration
- Relations: artwork, trajectorySteps

**Trajectory** - Curated tours
- Fields: id, name, description, theme, estimatedDuration, difficultyLevel
- Relations: steps, scheduledVisits

**TrajectoryStep** - Tour waypoints
- Fields: id, trajectoryId, artworkId, narrativeContentId, stepOrder, stopDuration
- Relations: trajectory, artwork, narrativeContent

See [backend/prisma/schema.prisma](backend/prisma/schema.prisma) for complete schema.

---

## API Endpoints

### Backend API (Port 3001)

**Authentication** (`/api/auth`)
```
POST /auth/register       - Create account
POST /auth/login          - Login (returns JWT)
POST /auth/refresh        - Refresh access token
POST /auth/logout         - Logout
POST /auth/forgot-password
POST /auth/reset-password
```

**Artworks** (`/api/artworks`)
```
GET    /artworks          - List all (paginated, 20/page)
GET    /artworks/:id      - Get single artwork
POST   /artworks          - Create (protected)
PATCH  /artworks/:id      - Update (protected)
DELETE /artworks/:id      - Delete (protected)
POST   /artworks/:id/image - Upload image (protected)
```

**Narratives** (`/api/narratives`)
```
GET    /narratives        - List all (paginated)
GET    /narratives/:id    - Get single
POST   /narratives        - Create (protected)
PATCH  /narratives/:id    - Update (protected)
DELETE /narratives/:id    - Delete (protected)
POST   /narratives/:id/audio - Upload audio (protected)
```

**Trajectories** (`/api/trajectories`)
```
GET    /trajectories      - List all
GET    /trajectories/:id  - Get with steps
POST   /trajectories      - Create (protected)
PATCH  /trajectories/:id  - Update (protected)
DELETE /trajectories/:id  - Delete (protected)
```

### NLP Module API (Port 8000)

**Conversation**
```
POST /conversation/start     - Start session
POST /conversation/ask       - Ask question (audio file)
POST /conversation/text      - Ask question (text)
GET  /conversation/:id/history
```

**Trajectories**
```
GET  /trajectories/:id/preload - Preload tour
POST /trajectories/:id/start   - Start guided tour
```

**Artworks**
```
GET /artworks                - List all
GET /artworks/:id/narrative  - Get with TTS audio
```

**Testing**
```
POST /test/stt  - Test speech-to-text
POST /test/tts  - Test text-to-speech
GET  /voices    - List available TTS voices
```

---

## Development Workflow

### Backend Development
```bash
cd backend
npm run dev              # Start with hot reload
npm run prisma:migrate   # Run database migrations
npm test                 # Run tests
npm run build            # Build for production
npm start                # Run production build
```

### Frontend Development
```bash
cd frontend
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

### NLP Module Development
```bash
cd nlp-module
python run.py                    # Start FastAPI server
pytest                           # Run tests
pytest tests/test_stt.py -v     # Run specific test
```

---

## Environment Variables

### Backend (.env)
```bash
DATABASE_URL="postgresql://..."           # Neon PostgreSQL connection
DIRECT_URL="postgresql://..."             # Direct connection (migrations)
NODE_ENV="development"
PORT=3001
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
CORS_ORIGIN="http://localhost:5173"
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### NLP Module (.env)
```bash
GROQ_API_KEY="gsk_..."                    # Groq LLM API key
MUSIA_BACKEND_URL="http://localhost:3001/api"
```

### Frontend (.env - optional)
```bash
VITE_API_URL="http://localhost:3001/api"
VITE_NLP_URL="http://localhost:8000"
```

---

## Testing

### Backend Tests
```bash
cd backend
npm test                          # Run all tests
npm test -- --coverage            # With coverage
npm test -- auth.test.ts          # Specific file
```

Test files:
- [backend/src/modules/auth/__tests__/auth.service.test.ts](backend/src/modules/auth/__tests__/auth.service.test.ts)
- [backend/src/modules/artworks/__tests__/artwork.service.test.ts](backend/src/modules/artworks/__tests__/artwork.service.test.ts)

### NLP Module Tests
```bash
cd nlp-module
pytest                           # Run all tests
pytest tests/test_stt.py -v      # STT tests
pytest tests/test_tts.py -v      # TTS tests
pytest --cov=app                 # With coverage
```

---

## Project Status

### Current Phase: **Phase 1 Complete + Phase 2 In Progress**

**✅ Phase 0: Security & Users**
- User authentication (JWT)
- Role-based access control
- Password reset flow

**✅ Phase 1: Core Content**
- Artwork management
- Narrative content with audio
- Image/audio file uploads
- Basic CRUD operations

**🔨 Phase 2: Trajectories & Tours** (In Progress)
- Trajectory creation ✅
- Multi-step tours ✅
- Guided tour flow ✅
- Scheduled visits 🚧

**📋 Phase 3: Cartography** (Planned)
- Museum maps
- Zone definitions
- Navigation paths

**📋 Phase 4: Analytics** (Planned)
- Robot activity logs
- Visitor interaction tracking
- Daily metrics dashboard

**📋 Phase 5: Optimizations** (Planned)
- FAQ caching
- Performance tuning
- Advanced search

---

## Code Quality & Security

### Strengths
✅ TypeScript with strict mode
✅ Clean architecture (feature-based modules)
✅ Input validation (Zod schemas)
✅ Centralized error handling
✅ Request logging and monitoring
✅ Rate limiting
✅ CORS protection
✅ Helmet security headers

### Critical Security Issues
🔴 **DATABASE CREDENTIALS IN .ENV** - Move to .env.example
🔴 **JWT SECRETS COMMITTED** - Regenerate and use secrets manager
🔴 **.env TRACKED IN GIT** - Add to .gitignore immediately

### Improvements Needed
⚠️ Expand test coverage (currently minimal)
⚠️ Complete frontend TypeScript migration (.jsx → .tsx)
⚠️ Add API documentation (Swagger/OpenAPI)
⚠️ Implement CI/CD pipeline
⚠️ Add E2E tests
⚠️ Add input sanitization for file uploads

---

## Contributing

### Code Style
- **TypeScript:** Strict mode, explicit types
- **Formatting:** Prettier (backend), ESLint (frontend)
- **Naming:** camelCase (variables), PascalCase (components/classes)
- **Commits:** Conventional Commits (feat:, fix:, docs:, etc.)

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch (current)
- `feature/*` - New features
- `fix/*` - Bug fixes

### Pull Request Process
1. Create feature branch from `develop`
2. Write tests for new functionality
3. Ensure all tests pass (`npm test`)
4. Update documentation
5. Create PR to `develop`
6. Code review + approval
7. Merge with squash

---

## Deployment

### Backend
```bash
cd backend
npm run build
NODE_ENV=production node dist/server.js
```

**Requirements:**
- PostgreSQL database (Neon or self-hosted)
- Node.js 18+ runtime
- Environment variables configured

### Frontend
```bash
cd frontend
npm run build
# Serve dist/ folder with nginx, Vercel, Netlify, etc.
```

### NLP Module
```bash
cd nlp-module
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Requirements:**
- Python 3.11+ runtime
- Groq API key
- 2GB+ RAM (for Whisper model)

### Docker (Planned)
```bash
docker-compose up -d
```

---

## Troubleshooting

### Backend won't start
- Check `DATABASE_URL` is correct
- Run `npx prisma generate`
- Run `npx prisma migrate dev`
- Verify PostgreSQL is running

### NLP module errors
- Ensure `GROQ_API_KEY` is set
- Check Whisper model downloaded (first run takes time)
- Verify Python 3.11+ (`python --version`)
- Check backend API is reachable

### Frontend 3D scene not rendering
- Check WebGL support in browser
- Verify artworks API returns data
- Check browser console for errors
- Ensure GPU acceleration enabled

### Audio not working
- Check browser permissions for microphone
- Verify HTTPS (required for Web Speech API)
- Check NLP module is running
- Test with `/test/tts` endpoint

---

## Documentation

- [Backend API Guide](backend/CLAUDE.md)
- [Frontend 3D Museum Guide](frontend/CLAUDE.md)
- [NLP Module Guide](nlp-module/CLAUDE.md)
- [Database Schema](docs/Database%20Schema.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)

---

## License

[Specify License]

---

## Contact & Support

For questions, issues, or contributions:
- Create an issue in the repository
- Review existing documentation
- Check the troubleshooting section

---

## Acknowledgments

**Technologies:**
- OpenAI Whisper for speech-to-text
- Groq for LLM inference
- Microsoft Edge TTS for text-to-speech
- Neon for serverless PostgreSQL
- Three.js for 3D rendering

**Last Updated:** 2025-01-13
**Version:** 0.2.0 (Phase 2 In Progress)
