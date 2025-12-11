# Musia - Audio Museum Chatbot

## 🎯 Project Overview

Musia is an **Audio-First Museum Chatbot** designed to guide visitors through their visit using natural language interaction. Originally planned for a physical robot, the project has evolved into a pure software solution (Audio Chatbot) that provides:

- **Guided Tours (Trajectories)**: Curated audio playlists of artworks.
- **Narrative Content**: Rich stories about artworks (Text + Audio).
- **Interactive Q&A**: An AI engine (NLP) that answers visitor questions based on verified museum knowledge.

## 🏗 Architecture

The project is divided into:

- **Backend (Node.js/Express)**: Manages authentication, artwork data, narrative content, and tours.
- **Frontend (Planned)**: Mobile/Web interface for the chatbot.
- **NLP Module (Planned)**: AI engine for speech-to-text, understanding, and text-to-speech.

## 🚀 Key Features Implemented (Backend)

- **Authentication**: JWT-based secure access.
- **Artworks Database**: Catalog of museum pieces.
- **Narrative Content**: Multiple versions of stories (Adults, Kids) with Audio support.
- **Trajectories**: Thematic audio tours (e.g., "Renaissance Highlights").
- **File Uploads**: Management of images and narrative audio files.

## 📚 Documentation

- [API Specification](./docs/admin-interface/api-specification.md)
- [Database Tables](./docs/database-tables.md)
- [NLP Module Details](./docs/nlp-module/README.md)
