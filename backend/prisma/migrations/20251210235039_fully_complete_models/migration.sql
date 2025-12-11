/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artworks" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT,
    "description" TEXT,
    "period" TEXT,
    "style" TEXT,
    "collection" TEXT,
    "positionX" DOUBLE PRECISION,
    "positionY" DOUBLE PRECISION,
    "floor" INTEGER NOT NULL DEFAULT 0,
    "room" TEXT,
    "orientation" DOUBLE PRECISION DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "narrative_contents" (
    "id" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT 'standard',
    "language" TEXT NOT NULL DEFAULT 'fr',
    "textContent" TEXT NOT NULL,
    "audioUrl" TEXT,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "narrative_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trajectories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "theme" TEXT,
    "estimatedDuration" INTEGER NOT NULL,
    "difficultyLevel" TEXT NOT NULL DEFAULT 'all',
    "maxVisitors" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trajectories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trajectory_steps" (
    "id" TEXT NOT NULL,
    "trajectoryId" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "narrativeContentId" TEXT,
    "stepOrder" INTEGER NOT NULL,
    "stopDuration" INTEGER NOT NULL,
    "positionX" DOUBLE PRECISION,
    "positionY" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trajectory_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_visits" (
    "id" TEXT NOT NULL,
    "trajectoryId" TEXT NOT NULL,
    "scheduledDate" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "recurrenceRule" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scheduled_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "museum_maps" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "mapData" JSONB NOT NULL,
    "scale" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "museum_maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zones" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "geometry" JSONB NOT NULL,
    "accessRules" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "robot_activity_logs" (
    "id" TEXT NOT NULL,
    "visitId" TEXT,
    "eventType" TEXT NOT NULL,
    "eventData" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "robot_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_interactions" (
    "id" TEXT NOT NULL,
    "visitId" TEXT,
    "interactionType" TEXT NOT NULL,
    "questionText" TEXT,
    "detectedIntent" TEXT,
    "intentConfidence" DOUBLE PRECISION,
    "responseText" TEXT,
    "responseSource" TEXT,
    "language" TEXT NOT NULL DEFAULT 'fr',
    "sttLatencyMs" INTEGER,
    "nlpLatencyMs" INTEGER,
    "ttsLatencyMs" INTEGER,
    "totalLatencyMs" INTEGER,
    "wasSuccessful" BOOLEAN NOT NULL DEFAULT true,
    "errorOccurred" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_metrics" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalVisits" INTEGER NOT NULL DEFAULT 0,
    "totalVisitors" INTEGER NOT NULL DEFAULT 0,
    "avgVisitDuration" DOUBLE PRECISION,
    "totalInteractions" INTEGER NOT NULL DEFAULT 0,
    "avgSttLatencyMs" DOUBLE PRECISION,
    "avgNlpLatencyMs" DOUBLE PRECISION,
    "successRate" DOUBLE PRECISION,
    "mostViewedArtworks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_cache" (
    "id" TEXT NOT NULL,
    "artworkId" TEXT,
    "questionVariants" TEXT[],
    "answerText" TEXT NOT NULL,
    "answerAudioUrl" TEXT,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "artworks_code_key" ON "artworks"("code");

-- CreateIndex
CREATE INDEX "artworks_positionX_positionY_idx" ON "artworks"("positionX", "positionY");

-- CreateIndex
CREATE INDEX "narrative_contents_artworkId_idx" ON "narrative_contents"("artworkId");

-- CreateIndex
CREATE INDEX "narrative_contents_artworkId_language_idx" ON "narrative_contents"("artworkId", "language");

-- CreateIndex
CREATE INDEX "trajectory_steps_trajectoryId_idx" ON "trajectory_steps"("trajectoryId");

-- CreateIndex
CREATE UNIQUE INDEX "trajectory_steps_trajectoryId_stepOrder_key" ON "trajectory_steps"("trajectoryId", "stepOrder");

-- CreateIndex
CREATE INDEX "scheduled_visits_scheduledDate_startTime_idx" ON "scheduled_visits"("scheduledDate", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "museum_maps_version_key" ON "museum_maps"("version");

-- CreateIndex
CREATE INDEX "zones_mapId_idx" ON "zones"("mapId");

-- CreateIndex
CREATE INDEX "zones_type_idx" ON "zones"("type");

-- CreateIndex
CREATE INDEX "robot_activity_logs_visitId_idx" ON "robot_activity_logs"("visitId");

-- CreateIndex
CREATE INDEX "robot_activity_logs_timestamp_idx" ON "robot_activity_logs"("timestamp");

-- CreateIndex
CREATE INDEX "visitor_interactions_visitId_idx" ON "visitor_interactions"("visitId");

-- CreateIndex
CREATE INDEX "visitor_interactions_timestamp_idx" ON "visitor_interactions"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "daily_metrics_date_key" ON "daily_metrics"("date");

-- CreateIndex
CREATE INDEX "daily_metrics_date_idx" ON "daily_metrics"("date");

-- CreateIndex
CREATE INDEX "faq_cache_artworkId_idx" ON "faq_cache"("artworkId");

-- CreateIndex
CREATE INDEX "faq_cache_usageCount_lastUsed_idx" ON "faq_cache"("usageCount", "lastUsed");

-- AddForeignKey
ALTER TABLE "narrative_contents" ADD CONSTRAINT "narrative_contents_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "artworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trajectory_steps" ADD CONSTRAINT "trajectory_steps_trajectoryId_fkey" FOREIGN KEY ("trajectoryId") REFERENCES "trajectories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trajectory_steps" ADD CONSTRAINT "trajectory_steps_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "artworks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trajectory_steps" ADD CONSTRAINT "trajectory_steps_narrativeContentId_fkey" FOREIGN KEY ("narrativeContentId") REFERENCES "narrative_contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_visits" ADD CONSTRAINT "scheduled_visits_trajectoryId_fkey" FOREIGN KEY ("trajectoryId") REFERENCES "trajectories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zones" ADD CONSTRAINT "zones_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "museum_maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "robot_activity_logs" ADD CONSTRAINT "robot_activity_logs_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "scheduled_visits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitor_interactions" ADD CONSTRAINT "visitor_interactions_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "scheduled_visits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq_cache" ADD CONSTRAINT "faq_cache_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "artworks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
