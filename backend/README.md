# Musia Backend API

## Overview

This is the RESful API for the **Musia Audio Chatbot**. It manages the museum's artworks, narrative content, audio tours (trajectories), and authentication.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Language**: TypeScript
- **Validation**: Zod

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (`.env`):
    ```env
    DATABASE_URL="postgresql://user:pass@localhost:5432/musia"
    JWT_SECRET="your_secret"
    PORT=3000
    ```
4.  Run migrations:
    ```bash
    npx prisma migrate dev
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```
src/
├── modules/          # Feature-based modules
│   ├── auth/         # Authentication (Login, Register, JWT)
│   ├── artworks/     # Artwork management (CRUD, Image Upload)
│   ├── narratives/   # Narrative Content (Stories, Audio Upload)
│   └── trajectories/ # Audio Tours (Playlists of artworks)
├── middlewares/      # Auth, Upload, Error handling
├── database/         # Prisma client instance
└── utils/            # Helper functions (SuccessResponse, etc.)
```

## 🔌 Main Endpoints

### Authentication

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Artworks

- `GET /api/artworks` - List all artworks (Paginated)
- `POST /api/artworks` - Create artwork

### Narrative Content

- `POST /api/artworks/:id/narratives` - Add story to artwork
- `POST /api/narratives/:id/audio` - Upload MP3

### Trajectories (Audio Tours)

- `GET /api/trajectories` - List tours
- `get /api/trajectories/:id` - Get tour details (Pre-load for chatbot)
