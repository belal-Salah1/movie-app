# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `ng serve` (runs at http://localhost:4200)
- **Build:** `ng build` (output in `dist/movie-app/`)
- **Run all tests:** `ng test` (Karma + Jasmine)
- **Run single test:** `ng test --include=src/app/path/to/file.spec.ts`
- **Generate component:** `ng generate component components/component-name`

## Architecture

Angular 19 standalone-component app (no NgModules) consuming the TMDB (The Movie Database) API. Uses Bootstrap 5 + Bootstrap Icons for styling, and Angular Material.

### Key structure

- **`src/app/app.routes.ts`** — All routing. Default redirects to `/list/popular`. Routes: `/list/:category`, `/genre/:id`, `/details/movie/:id`, `/details/actor/:id`, `**` (404).
- **`src/app/services/movie-api.service.ts`** — Single service for all TMDB HTTP calls via `HttpClient`.
- **`src/app/components/`** — Page-level components: `home` (layout/navbar), `list` (movie listings by category), `genre`, `movie-details`, `actor-details`, `not-found`.
- **`src/app/pipes/`** — `language` (maps ISO codes to labels), `time` (formats runtime).
- **`src/environments/`** — `environment.development.ts` holds TMDB API key and base URLs; `environment.ts` is the production placeholder. File replacement is configured in `angular.json`.

### Patterns

- `AppComponent` directly imports `HomeComponent`; `HomeComponent` acts as the shell with navigation and `<router-outlet>`.
- `appConfig` provides routing and `HttpClient` with fetch backend (`withFetch()`).
- Strict TypeScript and strict Angular template checking are enabled (`tsconfig.json`).