# Schéma de Base de Données

## Vue d'ensemble

Base de données PostgreSQL centralisée pour l'ensemble du système.

## Tables Principales

### Utilisateurs et Authentification

\`\`\`sql
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
email VARCHAR UNIQUE NOT NULL,
password_hash VARCHAR NOT NULL,
role VARCHAR CHECK (role IN ('admin', 'manager', 'operator', 'viewer')),
created_at TIMESTAMP DEFAULT NOW(),
last_login TIMESTAMP
);
\`\`\`

### Œuvres

\`\`\`sql
CREATE TABLE artworks (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
code VARCHAR UNIQUE,
title VARCHAR NOT NULL,
artist VARCHAR,
description TEXT,
period VARCHAR,
style VARCHAR,
collection VARCHAR,
position_x FLOAT,
position_y FLOAT,
floor INTEGER,
room VARCHAR,
orientation FLOAT,
image_url VARCHAR,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_artworks_position ON artworks(position_x, position_y);
\`\`\`

### Contenus Narratifs

\`\`\`sql
CREATE TABLE narrative_contents (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
version VARCHAR, -- 'short', 'detailed', 'kids'
language VARCHAR DEFAULT 'fr',
text_content TEXT NOT NULL,
audio_url VARCHAR,
duration INTEGER, -- secondes
created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_narrative_artwork ON narrative_contents(artwork_id);
\`\`\`

### Trajets

\`\`\`sql
CREATE TABLE trajectories (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR NOT NULL,
description TEXT,
theme VARCHAR,
estimated_duration INTEGER, -- minutes
difficulty_level VARCHAR,
max_visitors INTEGER,
is_active BOOLEAN DEFAULT true,
is_default BOOLEAN DEFAULT false,
created_by UUID REFERENCES users(id),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trajectory_steps (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
trajectory_id UUID REFERENCES trajectories(id) ON DELETE CASCADE,
artwork_id UUID REFERENCES artworks(id),
step_order INTEGER NOT NULL,
stop_duration INTEGER, -- minutes
narrative_content_id UUID REFERENCES narrative_contents(id),
position_x FLOAT,
position_y FLOAT,
notes TEXT
);

CREATE INDEX idx_trajectory_steps ON trajectory_steps(trajectory_id, step_order);
\`\`\`

### Cartographie

\`\`\`sql
CREATE TABLE museum_maps (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
version VARCHAR NOT NULL,
map_data JSONB NOT NULL,
scale FLOAT,
created_at TIMESTAMP DEFAULT NOW(),
is_active BOOLEAN DEFAULT true
);

CREATE TABLE zones (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
map_id UUID REFERENCES museum_maps(id),
name VARCHAR NOT NULL,
type VARCHAR CHECK (type IN ('public', 'restricted', 'forbidden', 'charging')),
geometry JSONB NOT NULL,
access_rules JSONB,
created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Planning des Visites

\`\`\`sql
CREATE TABLE scheduled_visits (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
trajectory_id UUID REFERENCES trajectories(id),
scheduled_date DATE NOT NULL,
start_time TIME NOT NULL,
recurrence_rule VARCHAR,
status VARCHAR DEFAULT 'scheduled'
CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_visits_date ON scheduled_visits(scheduled_date, start_time);
\`\`\`

### Logs d'Activité Robot

\`\`\`sql
CREATE TABLE robot_activity_logs (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
visit_id UUID REFERENCES scheduled_visits(id),
event_type VARCHAR NOT NULL,
event_data JSONB,
timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_robot_logs_timestamp ON robot_activity_logs(timestamp);
CREATE INDEX idx_robot_logs_visit ON robot_activity_logs(visit_id);
\`\`\`

### Interactions Visiteurs (NLP)

\`\`\`sql
CREATE TABLE visitor_interactions (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
visit_id UUID REFERENCES scheduled_visits(id),
interaction_type VARCHAR,
question_text TEXT,
detected_intent VARCHAR,
intent_confidence FLOAT,
response_text TEXT,
response_source VARCHAR, -- 'faq', 'llm_generated', 'fallback'
language VARCHAR DEFAULT 'fr',

-- Métriques performance
stt_latency_ms INTEGER,
nlp_latency_ms INTEGER,
tts_latency_ms INTEGER,
total_latency_ms INTEGER,

-- Flags
was_successful BOOLEAN DEFAULT true,
error_occurred BOOLEAN DEFAULT false,

timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_interactions_visit ON visitor_interactions(visit_id);
CREATE INDEX idx_interactions_timestamp ON visitor_interactions(timestamp);
\`\`\`

### Cache FAQ

\`\`\`sql
CREATE TABLE faq_cache (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
artwork_id UUID REFERENCES artworks(id),
question_variants TEXT[] NOT NULL,
answer_text TEXT NOT NULL,
answer_audio_url VARCHAR,
usage_count INTEGER DEFAULT 0,
last_used TIMESTAMP,
created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_faq_artwork ON faq_cache(artwork_id);
CREATE INDEX idx_faq_usage ON faq_cache(usage_count DESC, last_used DESC);
\`\`\`

### Métriques Agrégées

\`\`\`sql
CREATE TABLE daily_metrics (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
date DATE UNIQUE NOT NULL,
total_visits INTEGER DEFAULT 0,
total_visitors INTEGER DEFAULT 0,
avg_visit_duration FLOAT,
total_interactions INTEGER DEFAULT 0,
most_viewed_artworks JSONB,
avg_stt_latency_ms FLOAT,
avg_nlp_latency_ms FLOAT,
success_rate FLOAT,
created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_daily_metrics_date ON daily_metrics(date DESC);
\`\`\`

## Relations

\`\`\`mermaid
erDiagram
users ||--o{ trajectories : creates
artworks ||--o{ narrative_contents : has
artworks ||--o{ trajectory_steps : includes
trajectories ||--o{ trajectory_steps : contains
trajectories ||--o{ scheduled_visits : scheduled_as
scheduled_visits ||--o{ robot_activity_logs : generates
scheduled_visits ||--o{ visitor_interactions : has
artworks ||--o{ faq_cache : has
\`\`\`

## Politiques de Rétention

- **Logs activité**: 12 mois
- **Interactions visiteurs**: Anonymisées après 30 jours
- **Métriques**: Conservées indéfiniment
- **Audio visiteurs**: 7 jours maximum

## Voir aussi

- [Architecture technique](./architecture-technique.md)
- [Module NLP](./nlp-module/)
