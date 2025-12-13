# Backend API - Musia

## Overview

The Musia backend is a **Node.js REST API** built with Express and TypeScript, serving as the central data management and business logic layer for the museum chatbot system.

### Technology Stack
- **Runtime:** Node.js v18+
- **Language:** TypeScript 5.3.3
- **Framework:** Express.js 4.18.2
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma 7.0.1
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Validation:** Zod 4.0.0
- **Testing:** Jest 29.7.0 + Supertest 6.3.4
- **Security:** Helmet, CORS, Rate Limiting
- **Logging:** Winston 3.12.0

---

## Project Structure

```
backend/
├── src/
│   ├── modules/               # Feature modules
│   │   ├── auth/             # Authentication & authorization
│   │   ├── artworks/         # Artwork management
│   │   ├── narrative-content/ # Narrative content
│   │   └── trajectories/     # Tour trajectories
│   ├── middlewares/          # Express middlewares
│   ├── config/               # Configuration
│   ├── database/             # Prisma client
│   ├── errors/               # Error handling
│   ├── types/                # TypeScript types
│   ├── utils/                # Utilities
│   ├── routes/               # Route aggregation
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Database migrations
│   └── seed.ts              # Database seeding
├── uploads/
│   ├── images/              # Artwork images
│   └── audio/               # Narrative audio files
├── tests/                   # Test files
├── .env                     # Environment variables
├── package.json
├── tsconfig.json
└── CLAUDE.md               # This file
```

---

## Module Architecture

### Feature-Based Structure

Each module follows a consistent pattern:

```
module/
├── dto/                    # Data Transfer Objects
│   └── module.dto.ts      # Zod schemas for validation
├── __tests__/             # Module tests
│   └── module.service.test.ts
├── module.controller.ts   # HTTP handlers
├── module.service.ts      # Business logic
├── module.routes.ts       # Route definitions
└── index.ts              # Module exports
```

### Module Breakdown

#### 1. **Auth Module** ([src/modules/auth/](src/modules/auth/))

**Purpose:** User authentication and authorization

**Files:**
- [auth.controller.ts](src/modules/auth/auth.controller.ts) - HTTP handlers for auth endpoints
- [auth.service.ts](src/modules/auth/auth.service.ts) - Auth business logic
- [auth.routes.ts](src/modules/auth/auth.routes.ts) - Auth route definitions
- [dto/auth.dto.ts](src/modules/auth/dto/auth.dto.ts) - Validation schemas

**Key Features:**
- User registration with email/password
- Login with JWT token generation
- Access token + refresh token pattern
- Token refresh mechanism
- Password reset flow
- Role-based access control (admin, manager, operator, viewer)

**Endpoints:**
```typescript
POST /api/auth/register       // Create new user
POST /api/auth/login          // Login (returns tokens)
POST /api/auth/refresh        // Refresh access token
POST /api/auth/logout         // Logout
POST /api/auth/forgot-password // Request password reset
POST /api/auth/reset-password  // Reset with token
```

**DTOs:**
- `RegisterDto` - email, password, name, role
- `LoginDto` - email, password
- `RefreshTokenDto` - refreshToken
- `ForgotPasswordDto` - email
- `ResetPasswordDto` - token, newPassword

**Security:**
- Password hashing with bcrypt (10 rounds)
- JWT tokens (access: 15min, refresh: 7 days)
- Token validation middleware
- Role-based authorization

---

#### 2. **Artworks Module** ([src/modules/artworks/](src/modules/artworks/))

**Purpose:** Museum artwork management

**Files:**
- [artwork.controller.ts](src/modules/artworks/artwork.controller.ts) - Artwork HTTP handlers
- [artwork.service.ts](src/modules/artworks/artwork.service.ts) - Artwork business logic
- [artwork.routes.ts](src/modules/artworks/artwork.routes.ts) - Route definitions
- [dto/artwork.dto.ts](src/modules/artworks/dto/artwork.dto.ts) - Validation schemas

**Key Features:**
- CRUD operations for artworks
- Image upload handling
- Museum positioning (X, Y coordinates, floor, room)
- Metadata management (period, style, collection)
- Pagination support (20 items per page)
- Public read access, protected writes

**Endpoints:**
```typescript
GET    /api/artworks              // List all (paginated)
GET    /api/artworks/:id          // Get single artwork
POST   /api/artworks              // Create (protected)
PATCH  /api/artworks/:id          // Update (protected)
DELETE /api/artworks/:id          // Delete (protected)
POST   /api/artworks/:id/image    // Upload image (protected)
GET    /api/artworks/:id/narratives   // Get narratives
POST   /api/artworks/:id/narratives   // Create narrative (protected)
```

**DTOs:**
- `CreateArtworkDto` - title, artist, description, code, metadata
- `UpdateArtworkDto` - partial artwork data
- `ArtworkQueryDto` - pagination params

**Data Model:**
```typescript
interface Artwork {
  id: string;
  code: string;              // Museum internal code
  title: string;
  artist?: string;
  description?: string;
  period?: string;           // e.g., "Renaissance"
  style?: string;            // e.g., "Impressionism"
  collection?: string;       // Collection name
  positionX?: number;        // Museum X coordinate
  positionY?: number;        // Museum Y coordinate
  floor: number;             // Floor number
  room?: string;             // Room identifier
  orientation?: number;      // Rotation in degrees
  imageUrl?: string;         // Path to image
  createdAt: Date;
  updatedAt: Date;
}
```

---

#### 3. **Narrative Content Module** ([src/modules/narrative-content/](src/modules/narrative-content/))

**Purpose:** Audio narrative management for artworks

**Files:**
- [narrative.controller.ts](src/modules/narrative-content/narrative.controller.ts)
- [narrative.service.ts](src/modules/narrative-content/narrative.service.ts)
- [narrative.routes.ts](src/modules/narrative-content/narrative.routes.ts)
- [dto/narrative.dto.ts](src/modules/narrative-content/dto/narrative.dto.ts)

**Key Features:**
- Multiple narrative versions (standard, short, detailed, kids)
- Multi-language support (default: French)
- Audio file upload
- Duration tracking
- Linked to artworks

**Endpoints:**
```typescript
GET    /api/narratives            // List all (paginated)
GET    /api/narratives/:id        // Get single narrative
POST   /api/narratives            // Create (protected)
PATCH  /api/narratives/:id        // Update (protected)
DELETE /api/narratives/:id        // Delete (protected)
POST   /api/narratives/:id/audio  // Upload audio (protected)
```

**DTOs:**
- `CreateNarrativeDto` - artworkId, version, language, textContent
- `UpdateNarrativeDto` - partial narrative data
- `NarrativeQueryDto` - pagination, filters

**Data Model:**
```typescript
interface NarrativeContent {
  id: string;
  artworkId: string;
  version: string;           // "standard" | "short" | "detailed" | "kids"
  language: string;          // ISO language code (default: "fr")
  textContent: string;       // Narrative text
  audioUrl?: string;         // Path to audio file
  duration?: number;         // Duration in seconds
  createdAt: Date;
  updatedAt: Date;
}
```

**Versions:**
- `standard` - Default narrative (2-3 minutes)
- `short` - Quick overview (30-60 seconds)
- `detailed` - In-depth analysis (5-10 minutes)
- `kids` - Child-friendly version

---

#### 4. **Trajectories Module** ([src/modules/trajectories/](src/modules/trajectories/))

**Purpose:** Curated museum tours management

**Files:**
- [trajectory.controller.ts](src/modules/trajectories/trajectory.controller.ts)
- [trajectory.service.ts](src/modules/trajectories/trajectory.service.ts)
- [trajectory.routes.ts](src/modules/trajectories/trajectory.routes.ts)
- [dto/trajectory.dto.ts](src/modules/trajectories/dto/trajectory.dto.ts)

**Key Features:**
- Multi-step tour creation
- Theme-based tours (e.g., "Renaissance Masters")
- Difficulty levels (kids, all, expert)
- Estimated duration tracking
- Default trajectory setting
- Step ordering

**Endpoints:**
```typescript
GET    /api/trajectories          // List all
GET    /api/trajectories/:id      // Get trajectory with steps
POST   /api/trajectories          // Create (protected)
PATCH  /api/trajectories/:id      // Update (protected)
DELETE /api/trajectories/:id      // Delete (protected)
```

**DTOs:**
- `CreateTrajectoryDto` - name, description, theme, steps
- `UpdateTrajectoryDto` - partial trajectory data
- `TrajectoryStepDto` - artworkId, narrativeContentId, stepOrder

**Data Models:**
```typescript
interface Trajectory {
  id: string;
  name: string;
  description?: string;
  theme?: string;
  estimatedDuration: number;    // Minutes
  difficultyLevel: string;      // "kids" | "all" | "expert"
  maxVisitors: number;
  isActive: boolean;
  isDefault: boolean;
  steps: TrajectoryStep[];
  createdAt: Date;
  updatedAt: Date;
}

interface TrajectoryStep {
  id: string;
  trajectoryId: string;
  artworkId: string;
  narrativeContentId?: string;  // Optional specific narrative
  stepOrder: number;            // Sequence in tour
  stopDuration: number;         // Minutes at this artwork
  positionX?: number;
  positionY?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Middlewares

### 1. **Authentication Middleware** ([src/middlewares/auth.middleware.ts](src/middlewares/auth.middleware.ts))

**Purpose:** Verify JWT tokens and attach user to request

```typescript
// Usage
router.post('/artworks', authenticate, createArtwork);
```

**Features:**
- Extracts token from `Authorization: Bearer <token>` header
- Verifies JWT signature
- Attaches decoded user to `req.user`
- Returns 401 if invalid/missing

### 2. **Authorization Middleware** ([src/middlewares/auth.middleware.ts](src/middlewares/auth.middleware.ts))

**Purpose:** Role-based access control

```typescript
// Usage
router.delete('/artworks/:id', authenticate, authorize(['admin', 'manager']), deleteArtwork);
```

**Roles Hierarchy:**
- `admin` - Full access
- `manager` - Create, read, update
- `operator` - Read, limited updates
- `viewer` - Read-only

### 3. **Upload Middleware** ([src/middlewares/upload.middleware.ts](src/middlewares/upload.middleware.ts))

**Purpose:** File upload handling with Multer

```typescript
// Image upload (max 5MB, jpg/png/webp)
router.post('/artworks/:id/image', uploadImage, uploadImageController);

// Audio upload (max 20MB, mp3/wav/m4a)
router.post('/narratives/:id/audio', uploadAudio, uploadAudioController);
```

**Configuration:**
- **Images:** `/uploads/images/`, max 5MB, formats: jpg, jpeg, png, webp
- **Audio:** `/uploads/audio/`, max 20MB, formats: mp3, wav, m4a, ogg

### 4. **Error Handler** ([src/middlewares/error-handler.ts](src/middlewares/error-handler.ts))

**Purpose:** Centralized error handling

**Features:**
- Catches all errors (sync + async via `express-async-errors`)
- Formats error responses consistently
- Logs errors with Winston
- Hides internal errors in production
- Custom error types (AppError)

**Error Response Format:**
```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input",
    details: { ... }  // Only in development
  },
  requestId: "uuid"
}
```

### 5. **Request Logger** ([src/middlewares/request-logger.ts](src/middlewares/request-logger.ts))

**Purpose:** HTTP request logging

**Features:**
- Logs method, URL, status, duration
- Uses Winston logger
- Request ID tracking
- Performance monitoring

### 6. **Request ID Middleware** ([src/middlewares/request-id.ts](src/middlewares/request-id.ts))

**Purpose:** Generate unique ID for each request

**Features:**
- UUID v4 generation
- Attached to `req.id`
- Included in response headers
- Used in logs for tracing

### 7. **Not Found Handler** ([src/middlewares/not-found-handler.ts](src/middlewares/not-found-handler.ts))

**Purpose:** Handle 404 errors

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "ROUTE_NOT_FOUND",
    "message": "Route not found"
  }
}
```

---

## Database (Prisma)

### Prisma Client

**Location:** [src/database/prisma.ts](src/database/prisma.ts)

**Usage:**
```typescript
import { prisma } from '@/database/prisma';

// Example query
const artworks = await prisma.artwork.findMany({
  include: { narrativeContents: true }
});
```

**Features:**
- Singleton pattern
- Connection pooling via Neon adapter
- Type-safe queries
- Automatic migrations

### Schema

**Location:** [prisma/schema.prisma](prisma/schema.prisma)

**Database:** PostgreSQL (Neon Serverless)

**Models:**
1. **User** - Authentication
2. **Artwork** - Museum pieces
3. **NarrativeContent** - Audio narratives
4. **Trajectory** - Tours
5. **TrajectoryStep** - Tour waypoints
6. **ScheduledVisit** - Scheduled tours (planned)
7. **FAQCache** - Cached responses (planned)
8. **RobotActivityLog** - Robot logs (planned)
9. **VisitorInteraction** - Analytics (planned)

**Key Indexes:**
- `users.email` (unique)
- `artworks.code` (unique)
- `narrativeContents.artworkId`
- `trajectorySteps.trajectoryId, stepOrder`

### Migrations

**Run migrations:**
```bash
npx prisma migrate dev --name migration_name
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

**Reset database:**
```bash
npx prisma migrate reset
```

**Seed database:**
```bash
npx prisma db seed
```

---

## Configuration

### Environment Variables

**File:** `.env`

```bash
# Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:pass@host/db?sslmode=require"

# Server
NODE_ENV="development"
PORT=3001

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_REFRESH_SECRET="your-refresh-secret-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# CORS
CORS_ORIGIN="http://localhost:5173"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE_MB=10
```

### Logger Configuration

**File:** [src/config/logger.ts](src/config/logger.ts)

**Features:**
- Console + file transports
- Log levels: error, warn, info, debug
- JSON format in production
- Colorized console in development
- Error logs: `logs/error.log`
- All logs: `logs/combined.log`

**Usage:**
```typescript
import { logger } from '@/config/logger';

logger.info('User created', { userId: user.id });
logger.error('Database error', { error: err.message });
```

### Environment Validation

**File:** [src/config/env.ts](src/config/env.ts)

**Features:**
- Zod schema validation
- Type-safe environment variables
- Fails fast on invalid config
- Default values for optional vars

---

## Error Handling

### Custom Errors

**File:** [src/errors/app-error.ts](src/errors/app-error.ts)

**Base Class:**
```typescript
class AppError extends Error {
  constructor(
    public code: ErrorCode,
    public message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
  }
}
```

**Usage:**
```typescript
throw new AppError('USER_NOT_FOUND', 'User not found', 404);
```

### Error Codes

**File:** [src/errors/error-codes.ts](src/errors/error-codes.ts)

**Common Codes:**
- `VALIDATION_ERROR` - Input validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Duplicate resource
- `INTERNAL_ERROR` - Server error

---

## Type System

### Common Types

**File:** [src/types/common.types.ts](src/types/common.types.ts)

```typescript
// Pagination
interface PaginationQuery {
  page?: number;
  limit?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User from JWT
interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}
```

### API Responses

**File:** [src/types/api-responses.ts](src/types/api-responses.ts)

**Success Response:**
```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  requestId: string;
}
```

**Error Response:**
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  requestId: string;
}
```

**Utility:**
```typescript
import { successResponse } from '@/utils/success-response';

// In controller
return res.json(successResponse(artwork, 'Artwork created'));
```

---

## API Reference

### Response Format

**All responses follow this structure:**

✅ **Success (2xx):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message",
  "requestId": "uuid"
}
```

❌ **Error (4xx, 5xx):**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { ... }
  },
  "requestId": "uuid"
}
```

### Pagination

**Query Parameters:**
```
?page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Authentication

**Header:**
```
Authorization: Bearer <jwt_token>
```

**Token Payload:**
```json
{
  "userId": "clx123...",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234568790
}
```

---

## Testing

### Test Structure

**Framework:** Jest + Supertest

**Test Files:**
- [src/modules/auth/__tests__/auth.service.test.ts](src/modules/auth/__tests__/auth.service.test.ts)
- [src/modules/artworks/__tests__/artwork.service.test.ts](src/modules/artworks/__tests__/artwork.service.test.ts)

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific file
npm test auth.service.test.ts
```

### Test Examples

**Unit Test:**
```typescript
describe('ArtworkService', () => {
  it('should create artwork', async () => {
    const dto = { title: 'Mona Lisa', artist: 'Da Vinci' };
    const artwork = await artworkService.create(dto);
    expect(artwork.title).toBe('Mona Lisa');
  });
});
```

**Integration Test:**
```typescript
describe('POST /api/artworks', () => {
  it('should return 201 and created artwork', async () => {
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Artwork' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
```

---

## Security

### Implemented Measures

1. **Authentication**
   - JWT with short-lived access tokens (15min)
   - Refresh tokens for session management
   - Secure password hashing (bcrypt, 10 rounds)

2. **Authorization**
   - Role-based access control
   - Protected routes
   - Resource ownership verification

3. **Input Validation**
   - Zod schemas for all inputs
   - SQL injection prevention (Prisma)
   - XSS prevention

4. **HTTP Security**
   - Helmet middleware (security headers)
   - CORS configuration
   - Rate limiting (100 req/min)
   - Compression

5. **File Upload Security**
   - File type validation
   - File size limits
   - Unique filenames (UUID)

### Security Checklist

⚠️ **TODO Before Production:**

- [ ] Rotate JWT secrets (currently hardcoded)
- [ ] Move secrets to environment/vault
- [ ] Enable HTTPS only
- [ ] Implement CSP headers
- [ ] Add request signing
- [ ] Enable audit logging
- [ ] Set up intrusion detection
- [ ] Implement rate limiting per user
- [ ] Add CAPTCHA for public endpoints
- [ ] Review CORS whitelist

---

## Performance

### Optimizations

1. **Database**
   - Indexes on frequently queried fields
   - Connection pooling (Neon)
   - Lazy loading with Prisma includes

2. **API**
   - Compression middleware
   - Pagination (max 20 items)
   - Response caching headers

3. **File Serving**
   - Static file serving via Express
   - CDN-ready structure

### Monitoring

**Metrics to track:**
- Response times
- Error rates
- Database query performance
- Memory usage
- CPU usage

**Tools:**
- Winston logs
- Request ID tracing
- Health check endpoint

---

## Deployment

### Build

```bash
npm run build
```

**Output:** `dist/` folder

### Production Start

```bash
NODE_ENV=production node dist/server.js
```

### Environment Requirements

- Node.js 18+
- PostgreSQL database
- 512MB RAM minimum
- Environment variables configured

### Recommended Stack

- **Platform:** AWS EC2, Heroku, Railway, Render
- **Database:** Neon PostgreSQL
- **Logging:** CloudWatch, Logtail
- **Monitoring:** Datadog, New Relic
- **CDN:** CloudFront for uploads

---

## Troubleshooting

### Common Issues

**1. "Cannot connect to database"**
- Check `DATABASE_URL` format
- Verify network access to Neon
- Ensure SSL mode enabled
- Test connection with `psql`

**2. "JWT verification failed"**
- Token expired (refresh needed)
- Wrong `JWT_SECRET`
- Token format invalid

**3. "File upload fails"**
- Check file size (max 5MB images, 20MB audio)
- Verify MIME type
- Ensure `uploads/` folder exists and writable

**4. "Prisma Client not generated"**
- Run `npx prisma generate`
- Check `schema.prisma` syntax
- Verify `@prisma/client` installed

### Debug Mode

```bash
DEBUG=* npm run dev
```

### Logs Location

- `logs/error.log` - Errors only
- `logs/combined.log` - All logs

---

## Development Workflow

### 1. **Add New Feature Module**

```bash
# Create module structure
mkdir -p src/modules/feature/{dto,__tests__}
touch src/modules/feature/{controller,service,routes,index}.ts
touch src/modules/feature/dto/feature.dto.ts
```

**Template:**
```typescript
// feature.service.ts
export class FeatureService {
  async findAll() { ... }
  async findById(id: string) { ... }
  async create(dto: CreateFeatureDto) { ... }
  async update(id: string, dto: UpdateFeatureDto) { ... }
  async delete(id: string) { ... }
}

// feature.controller.ts
export const findAllController = async (req, res) => {
  const features = await featureService.findAll();
  return res.json(successResponse(features));
};

// feature.routes.ts
router.get('/', findAllController);
router.post('/', authenticate, authorize(['admin']), createController);
```

### 2. **Add Database Model**

```prisma
// prisma/schema.prisma
model Feature {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```bash
npx prisma migrate dev --name add_feature
npx prisma generate
```

### 3. **Add Validation Schema**

```typescript
// dto/feature.dto.ts
import { z } from 'zod';

export const CreateFeatureDto = z.object({
  name: z.string().min(1).max(255),
});

export type CreateFeatureDto = z.infer<typeof CreateFeatureDto>;
```

### 4. **Write Tests**

```typescript
// __tests__/feature.service.test.ts
describe('FeatureService', () => {
  beforeEach(async () => {
    await prisma.feature.deleteMany();
  });

  it('should create feature', async () => {
    const feature = await featureService.create({ name: 'Test' });
    expect(feature.name).toBe('Test');
  });
});
```

---

## API Conventions

### Naming
- **Routes:** Plural nouns (`/artworks`, `/users`)
- **IDs:** CUID format (`clx1a2b3c...`)
- **Timestamps:** ISO 8601
- **Enums:** UPPER_SNAKE_CASE

### HTTP Methods
- `GET` - Retrieve resources
- `POST` - Create resources
- `PATCH` - Partial update
- `PUT` - Full replace (not used)
- `DELETE` - Remove resources

### Status Codes
- `200` - Success
- `201` - Created
- `204` - No Content (delete)
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Error

---

## Future Enhancements

### Planned Features
- [ ] GraphQL API layer
- [ ] WebSocket support (real-time updates)
- [ ] Advanced search (Elasticsearch)
- [ ] Redis caching layer
- [ ] Background job queue (Bull)
- [ ] Email service (Sendgrid)
- [ ] S3 for file storage
- [ ] Admin dashboard
- [ ] API documentation (Swagger)
- [ ] Metrics dashboard

### Database Migrations
- Phase 3: Museum cartography
- Phase 4: Analytics and logs
- Phase 5: FAQ caching
- Robot integration tables

---

## Resources

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Related Files
- [Root CLAUDE.md](../CLAUDE.md) - Project overview
- [Frontend CLAUDE.md](../frontend/CLAUDE.md) - Frontend guide
- [NLP Module CLAUDE.md](../nlp-module/CLAUDE.md) - NLP guide
- [Database Schema](../docs/Database%20Schema.md) - Database documentation

---

**Last Updated:** 2025-01-13
**Version:** 1.0.0
