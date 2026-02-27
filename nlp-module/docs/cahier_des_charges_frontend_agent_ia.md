# Cahier des Charges — Frontend Agent IA Conversationnel Voix à Voix

> **Version :** 1.0 — Février 2026
> **Stack :** React / Next.js (App Router)
> **Plateformes :** Web Desktop & Web Mobile
> **Design :** Inspiré ChatGPT / Groq — Personnalisé

---

## Table des Matières

1. [Contexte et Objectifs](#1-contexte-et-objectifs)
2. [Architecture Technique](#2-architecture-technique)
3. [Fonctionnalités Fonctionnelles](#3-fonctionnalités-fonctionnelles)
4. [Exigences UX / UI et Design System](#4-exigences-ux--ui-et-design-system)
5. [Accessibilité et Performance](#5-accessibilité-et-performance)
6. [Sécurité](#6-sécurité)
7. [Plan de Développement](#7-plan-de-développement)
8. [Stratégie de Tests](#8-stratégie-de-tests)
9. [Déploiement et CI/CD](#9-déploiement-et-cicd)
10. [Exigences Non-Fonctionnelles](#10-exigences-non-fonctionnelles)
11. [Glossaire](#11-glossaire)

---

## 1. Contexte et Objectifs

### 1.1 Présentation du projet

Ce document décrit les exigences fonctionnelles, techniques et UI/UX pour le développement du frontend d'un agent conversationnel voix à voix basé sur l'intelligence artificielle. Le backend étant déjà développé, ce cahier des charges se concentre exclusivement sur la couche présentation et l'expérience utilisateur.

L'application s'inspire de l'esthétique de ChatGPT (OpenAI) et de la rapidité de Groq, tout en adoptant une identité visuelle et des choix d'interaction propres au projet.

### 1.2 Objectifs stratégiques

- Offrir une interface intuitive permettant des conversations fluides en mode voix à voix en temps réel.
- Garantir une expérience de qualité professionnelle sur desktop et mobile via le navigateur web.
- Adopter un design system cohérent, moderne et accessible (WCAG 2.1 AA).
- Permettre une intégration transparente avec le backend existant via WebSocket et API REST.
- Être maintenable et extensible pour de futures fonctionnalités.

### 1.3 Périmètre fonctionnel

> **Inclus :** Interface de conversation (voix + texte), gestion des sessions, historique des échanges, paramètres utilisateur, authentification, thème clair/sombre, indicateurs d'état de l'agent (écoute, traitement, parole), responsive design desktop et mobile.

> **Exclus :** Développement backend, infrastructure de déploiement, applications mobiles natives (iOS/Android).

---

## 2. Architecture Technique

### 2.1 Stack technologique

| Couche | Technologie | Justification |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR, routing, optimisations natives |
| UI Library | React 18+ | Concurrent features, Suspense |
| Styling | Tailwind CSS + CSS Variables | Utilitaire, thème dynamique |
| Composants | shadcn/ui ou Radix UI | Accessibilité, composants headless |
| Gestion d'état | Zustand ou Jotai | Légèreté, simplicité |
| Temps réel | WebSocket natif / Socket.io | Streaming voix et texte |
| Audio | Web Audio API + MediaRecorder | Capture et lecture audio |
| Animations | Framer Motion | Transitions fluides |
| Tests | Vitest + Testing Library | Tests unitaires et intégration |
| Linting | ESLint + Prettier + TypeScript | Qualité de code |

### 2.2 Structure du projet

```
├── app/
│   ├── (auth)/               # Pages d'authentification (login, register)
│   └── (chat)/               # Interface principale de conversation
├── components/
│   ├── ui/                   # Composants génériques réutilisables
│   ├── voice/                # Composants spécifiques à l'interface voix
│   └── chat/                 # Bulles de message, historique, saisie
├── hooks/                    # Hooks personnalisés (useVoice, useChat, useWebSocket)
├── stores/                   # Stores Zustand (session, user, settings)
├── lib/                      # Utilitaires, clients API, configuration WebSocket
├── public/                   # Assets statiques, icônes, sons
└── types/                    # Types TypeScript globaux
```

### 2.3 Communication avec le backend

- WebSocket persistant pour le streaming audio bidirectionnel en temps réel.
- API REST (HTTP) pour la gestion des sessions, l'historique et les paramètres utilisateur.
- Gestion des reconnexions automatiques avec backoff exponentiel.
- Format d'échange : JSON pour les métadonnées, PCM / Opus pour l'audio.

---

## 3. Fonctionnalités Fonctionnelles

### 3.1 Interface de conversation — Mode Voix

#### 3.1.1 Déclenchement de la conversation

- Bouton central d'activation / désactivation du microphone (style push-to-talk ou toggle).
- Détection automatique de l'activité vocale (VAD — Voice Activity Detection) configurable.
- Indicateur visuel animé (ondulation, pulsation ou waveform) pendant la capture vocale.
- Feedback haptique sur mobile lors de l'activation (Vibration API).

#### 3.1.2 États de l'agent

| État | Description | Indicateur visuel |
|---|---|---|
| Inactif | En attente d'interaction | Bouton statique, gris |
| Écoute | Capture la voix utilisateur | Onde verte pulsante |
| Traitement | Analyse et génération de réponse | Spinner / orbites animées |
| Parole | L'agent restitue sa réponse vocale | Onde bleue animée |
| Erreur | Problème de connexion ou d'API | Icône rouge, message toast |

#### 3.1.3 Visualisation audio

- Waveform en temps réel pendant la capture (AnalyserNode WebAudio API).
- Animation de l'avatar / orbe de l'agent pendant la restitution vocale.
- Possibilité d'interrompre l'agent en reprenant la parole (interruption handling).

### 3.2 Interface de conversation — Mode Texte

- Zone de saisie de texte redimensionnable (textarea auto-grow) avec envoi par Entrée ou bouton.
- Support du mode mixte : passage fluide voix ↔ texte dans la même session.
- Affichage en streaming des réponses de l'agent (token par token, style typewriter).
- Support du Markdown dans les réponses : titres, listes, code, tableaux, liens.
- Bouton de copie sur chaque message de l'agent.

### 3.3 Historique et sessions

- Sidebar gauche listant les sessions passées, triées par date (inspirée de ChatGPT).
- Titre de session généré automatiquement à partir du premier échange.
- Renommage, suppression et archivage des sessions.
- Recherche dans l'historique des sessions (barre de recherche plein texte).
- Chargement paresseux (infinite scroll) de l'historique.

### 3.4 Gestion des paramètres et du profil

- Modal de paramètres accessible depuis l'icône engrenage.
- **Paramètres voix :** sélection de la voix de synthèse, vitesse de lecture, langue.
- **Paramètres microphone :** sélection du périphérique d'entrée, niveau de sensibilité VAD.
- **Paramètres modèle :** choix du modèle IA (si plusieurs disponibles), température.
- **Thème :** clair / sombre / système.
- **Compte :** photo de profil, nom d'affichage, mot de passe, déconnexion.

### 3.5 Authentification

- Formulaires de connexion et d'inscription avec validation côté client (React Hook Form + Zod).
- Support OAuth (Google, GitHub) en option.
- JWT stocké en mémoire ou httpOnly cookie (sécurité renforcée).
- Redirection automatique vers la dernière session après reconnexion.

### 3.6 Notifications et feedback

- Système de toasts non bloquants pour les erreurs, succès et informations.
- Gestion gracieuse des erreurs réseau avec message utilisateur clair et bouton de retry.
- Indicateur de statut de connexion WebSocket (connecté / reconnexion en cours).

---

## 4. Exigences UX / UI et Design System

### 4.1 Philosophie visuelle

L'interface s'inspire de l'esthétique épurée de ChatGPT et de la rapidité de Groq, tout en affirmant une identité propre. L'objectif est une interface qui **disparaît derrière la conversation** : sobre, efficace, sans fioriture.

### 4.2 Palette de couleurs

| Token CSS | Valeur Dark / Light | Usage |
|---|---|---|
| `--primary` | `#5E6AD2` / `#4F58C0` | Accent principal, CTA, états actifs |
| `--bg-base` | `#0D0D0D` / `#FFFFFF` | Fond global |
| `--bg-surface` | `#1A1A2E` / `#F5F5F5` | Cartes, sidebar, modals |
| `--bg-input` | `#242436` / `#EEEEEE` | Champs de saisie |
| `--text-primary` | `#F0F0F0` / `#1A1A2E` | Texte principal |
| `--text-secondary` | `#9CA3AF` / `#6B7280` | Texte secondaire, labels |
| `--border` | `#2E2E4A` / `#CBD5E0` | Bordures, séparateurs |
| `--error` | `#EF4444` | Erreurs |
| `--success` | `#10B981` | Succès, connexion active |

### 4.3 Typographie

- **Police principale :** Inter (Google Fonts) — claire, lisible, moderne.
- **Police monospace (code) :** JetBrains Mono ou Fira Code.
- **Échelle :** `xs` 12px → `sm` 14px → `base` 16px → `lg` 18px → `xl` 20px → `2xl` 24px → `3xl` 30px.
- Interligne 1.6 pour le corps de texte, 1.2 pour les titres.

### 4.4 Layout général

#### Desktop

```
┌─────────────────────────────────────────────────────────┐
│  Header (logo, statut connexion, profil)                │
├──────────────┬──────────────────────────┬───────────────┤
│              │                          │               │
│   Sidebar    │   Zone de conversation   │   Sidebar     │
│   gauche     │   (messages + saisie)    │   droite      │
│   (260px)    │                          │   (280px)     │
│   Sessions   │     Orbe / Avatar        │   optionnelle │
│   Historique │     central              │   Paramètres  │
│              │                          │   Transcr.    │
└──────────────┴──────────────────────────┴───────────────┘
```

#### Mobile (< 768px)

- Sidebar remplacée par un drawer bottom sheet ou menu hamburger.
- Interface de conversation plein écran.
- Bouton microphone centré et proéminent en bas de l'écran.
- Navigation par onglets en bas (Bottom Navigation Bar).

### 4.5 Composants clés

#### Orbe / Avatar de l'agent

Composant central de l'expérience voix. Sphère ou orbe animé dont le comportement reflète l'état de l'agent :

| État | Animation |
|---|---|
| Idle | Subtile rotation lente, respiration douce |
| Écoute | Expansion et pulsation verte |
| Traitement | Rotation accélérée, particules orbitales |
| Parole | Ondulation rythmée bleue, réactive à l'audio |

Implémentation recommandée : Canvas 2D ou WebGL léger (Three.js).

#### Barre de saisie multimodale

Zone unifiée en bas de l'écran combinant :
- Textarea auto-grow pour le texte
- Bouton microphone intégré (avec état actif animé)
- Bouton d'envoi
- Indicateurs d'état (connexion, VAD actif)

#### Bulle de message

- Messages utilisateur : alignés à droite, fond accent léger.
- Messages agent : alignés à gauche, fond surface.
- Support Markdown complet, syntax highlighting (Shiki ou Prism).
- Bouton copie au survol, indicateur de temps relatif.

### 4.6 Animations et micro-interactions

- Entrée des messages : fondu + légère translation vers le haut (150ms ease-out).
- Streaming de texte : apparition caractère par caractère avec curseur clignotant.
- États de boutons : hover, active, focus avec transitions 150ms ease.
- Loader global lors du chargement initial.
- Respect de `prefers-reduced-motion` pour l'accessibilité.

---

## 5. Accessibilité et Performance

### 5.1 Accessibilité (WCAG 2.1 AA)

- Contraste minimum 4.5:1 pour le texte normal, 3:1 pour les grands éléments.
- Navigation complète au clavier avec indicateurs de focus visibles.
- Support des lecteurs d'écran via ARIA labels, rôles et attributs appropriés.
- Annonces dynamiques (`aria-live`) pour les nouvelles réponses de l'agent.
- Textes alternatifs pour tous les éléments visuels porteurs de sens.
- Support du mode contraste élevé (Windows High Contrast Mode).

### 5.2 Objectifs de performance (Core Web Vitals)

| Métrique | Objectif cible |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTFB (Time to First Byte) | < 800ms |
| Taille du bundle JS initial (gzippé) | < 150 KB |
| Score Lighthouse global | > 90 |
| Latence WebSocket → 1er token affiché | < 100ms |

### 5.3 Stratégies d'optimisation

- Code splitting par route avec Next.js (dynamic imports).
- Mise en cache des réponses statiques via Next.js ISR / React cache.
- Lazy loading des composants lourds (waveform, Three.js orbe).
- Optimisation des images via `next/image` (WebP, responsive).
- Service Worker pour le mode offline partiel (historique en cache).

---

## 6. Sécurité

### 6.1 Gestion des tokens et sessions

- Tokens JWT stockés dans des cookies httpOnly SameSite=Strict (pas de localStorage).
- Refresh token mechanism avec rotation automatique.
- Déconnexion automatique après inactivité configurable (timeout session).

### 6.2 Protection contre les attaques

- **XSS :** assainissement de toutes les sorties, CSP (Content Security Policy) stricte.
- **CSRF :** tokens synchronisés ou SameSite cookies.
- **Brute force :** limitation du taux de tentatives de connexion côté client (debouncing + feedback UX).
- Validation et assainissement de toutes les entrées utilisateur avant envoi au backend.

### 6.3 Permissions navigateur

- Demande de permission microphone au moment de la première utilisation (pas au chargement).
- Gestion gracieuse du refus de permission avec message explicatif et alternative texte.
- Aucune donnée audio stockée côté client après traitement.

---

## 7. Plan de Développement

### 7.1 Phases et livrables

#### Phase 1 — Fondations (2-3 semaines)

- Initialisation du projet Next.js avec TypeScript, Tailwind, ESLint.
- Mise en place du design system : tokens, composants de base (Button, Input, Modal, Toast).
- Implémentation de l'authentification (login / register / OAuth optionnel).
- Layout global (sidebar + zone principale + header) responsive.

#### Phase 2 — Interface de conversation texte (2-3 semaines)

- Composants de message (bulles, streaming, Markdown rendu).
- Barre de saisie multimodale.
- Intégration WebSocket pour le streaming des réponses texte.
- Gestion des sessions et historique (sidebar + CRUD).

#### Phase 3 — Mode voix (3-4 semaines)

- Intégration Web Audio API + MediaRecorder pour la capture.
- Envoi de l'audio au backend via WebSocket.
- Lecture des réponses audio (AudioContext + queue de lecture).
- Composant orbe / avatar animé avec états visuels.
- VAD (Voice Activity Detection) côté client.
- Gestion des interruptions.

#### Phase 4 — Finitions et qualité (1-2 semaines)

- Paramètres utilisateur complets (voix, modèle, thème).
- Optimisations de performance (Lighthouse > 90).
- Tests unitaires et d'intégration (couverture > 70%).
- Audit accessibilité et correctifs.
- Recette et déploiement staging.

### 7.2 Estimation globale

> **8 à 12 semaines** pour un développeur full-stack expérimenté en React/Next.js, ou **5 à 7 semaines** avec une équipe de 2 développeurs frontend. La phase voix est la plus critique techniquement.

---

## 8. Stratégie de Tests

### 8.1 Tests unitaires

- Vitest + React Testing Library pour les composants React.
- Couverture cible : > 70% des composants et hooks métier.
- Mocks des WebSockets et Web Audio API pour les tests isolés.

### 8.2 Tests d'intégration

- Tests des flux complets : connexion → session → échange voix/texte → déconnexion.
- Tests des états d'erreur : perte de connexion, refus microphone, timeout.

### 8.3 Tests End-to-End

- Playwright pour les scénarios utilisateur critiques.
- Tests cross-browser : Chrome, Firefox, Safari, Edge.
- Tests mobile via émulation Playwright (Pixel 5, iPhone 12).

### 8.4 Tests de performance et accessibilité

- Lighthouse CI intégré dans la pipeline CI/CD (seuil d'échec si score < 85).
- axe-core pour les tests d'accessibilité automatisés.
- Tests de charge WebSocket avec k6 ou Artillery (simulation de 100 connexions simultanées).

---

## 9. Déploiement et CI/CD

### 9.1 Environnements

| Environnement | Déclencheur | Usage |
|---|---|---|
| Development | Local | Hot reload, mocks backend optionnels |
| Staging | Merge vers `develop` | Validation fonctionnelle, recette |
| Production | Tag Git sur `main` | Déploiement stable |

### 9.2 Pipeline CI/CD

1. Lint et vérification TypeScript (`tsc --noEmit`).
2. Exécution des tests unitaires et d'intégration.
3. Build Next.js et vérification de la taille des bundles.
4. Audit Lighthouse CI (seuil minimum : score 85).
5. Déploiement automatique sur staging si tous les checks passent.

### 9.3 Options d'hébergement recommandées

- **Vercel :** option optimale pour Next.js (SSR, Edge Functions, CDN global).
- **AWS (ECS / App Runner) ou GCP (Cloud Run) :** pour des contraintes de souveraineté des données.
- **Docker :** image multi-stage pour les environnements on-premise.

---

## 10. Exigences Non-Fonctionnelles

| Exigence | Détail |
|---|---|
| Compatibilité navigateurs | Chrome 110+, Firefox 110+, Safari 16+, Edge 110+ |
| Support WebRTC / WebAudio | Requis — navigateurs sans support exclus avec message explicatif |
| Internationalisation | Architecture i18n prête (next-intl) — Français et Anglais en V1 |
| Offline partiel | Affichage de l'historique en cache, mode dégradé sans WebSocket |
| RGPD | Bandeau consentement, politique de données, suppression de compte et données |
| Monitoring | Intégration Sentry pour le suivi des erreurs frontend |
| Analytics | Optionnel — Plausible ou Mixpanel (anonymisé) |
| Documentation | README, Storybook pour les composants, JSDoc sur les hooks critiques |

---

## 11. Glossaire

| Terme | Définition |
|---|---|
| VAD | Voice Activity Detection — détection automatique du début et de la fin de la parole |
| WebSocket | Protocole de communication bidirectionnelle en temps réel via TCP |
| Streaming | Transmission et affichage des données au fur et à mesure de leur génération |
| SSR | Server-Side Rendering — rendu côté serveur pour de meilleures performances initiales |
| CSP | Content Security Policy — en-tête HTTP limitant les sources de contenu autorisées |
| WCAG | Web Content Accessibility Guidelines — normes d'accessibilité web |
| LCP / INP / CLS | Core Web Vitals — métriques de performance Google |
| JWT | JSON Web Token — standard de transmission sécurisée d'informations d'authentification |
| Orbe | Composant visuel central représentant l'avatar animé de l'agent IA |
| VAD | Voice Activity Detection — détection automatique du début et de la fin de la parole |

---

> **Note finale :** Ce cahier des charges constitue la base du développement frontend. Il est destiné à évoluer en concertation avec les parties prenantes. Toute modification majeure de périmètre fera l'objet d'un avenant documenté.
