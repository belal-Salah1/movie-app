# MovieApp

A modern, responsive movie browsing application built with **Angular 19** and powered by the **TMDB API**. Browse popular, top-rated, and upcoming movies, explore genres, watch trailers, and discover cast details — all with a sleek dark/light theme.

**[Live Demo](https://movie-app-two-indol.vercel.app/list/popular)**

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 19.0.0 | Core framework |
| Bootstrap | 5.3.3 | Responsive layout & grid |
| Bootstrap Icons | 1.11.3 | UI icons |
| Angular Material | 19.1.5 | UI components |
| RxJS | 7.8.0 | Reactive programming |
| TMDB API | v3 | Movie data source |

---

## Features

### Movie Browsing
- Browse movies by category: **Popular**, **Top Rated**, **Upcoming**
- Filter movies by **genre** from a dynamically loaded genre list
- **Search** movies by title with real-time results
- Responsive movie grid with poster images, titles, and star ratings

### Movie Details
- Full movie info: poster, title, tagline, rating, language, runtime, release year
- **Genre tags** with clickable links
- Full **synopsis** display
- **Cast carousel** with circular profile thumbnails and arrow navigation
- **YouTube trailer** playback in a fullscreen modal
- **Recommended movies** section with poster grid
- Quick links to official website and IMDB

### Actor Details
- Large profile image with actor name and birthday
- Full **biography** text
- IMDB link and back navigation

### Theme & UI
- **Dark / Light mode** toggle with persistent localStorage preference
- Smooth theme transitions using CSS variables
- Responsive sidebar with genre navigation (collapsible on mobile)
- Expandable search bar in the navbar
- Image lazy loading for performance
- Hover animations on movie cards
- Custom 404 error page

### Responsive Design
- **Desktop**: 5-column movie grid, visible sidebar
- **Tablet**: Collapsible sidebar, adaptive grid
- **Mobile**: Hamburger menu, stacked layouts, full-width posters

---

## Project Structure

```
src/app/
  components/
    home/              # Shell layout — navbar, sidebar, router-outlet
    list/              # Movie grid by category (popular/top_rated/upcoming)
    search/            # Search results page
    genre/             # Movies filtered by genre
    movie-details/     # Full movie info, cast slider, trailer, recommendations
    actor-details/     # Actor profile and biography
    not-found/         # 404 page
  pipes/
    language.pipe.ts   # ISO code to language name (en -> ENGLISH)
    time.pipe.ts       # Runtime formatting & release year extraction
  services/
    movie-api.service.ts  # TMDB HTTP service
```

---

## Routes

| Path | Description |
|---|---|
| `/list/popular` | Popular movies (default) |
| `/list/top_rated` | Top rated movies |
| `/list/upcoming` | Upcoming movies |
| `/genre/:id` | Movies by genre |
| `/details/movie/:id` | Movie details page |
| `/details/actor/:id` | Actor details page |
| `/search?q=query` | Search results |
| `**` | 404 Not Found |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Angular CLI 19+

### Installation

```bash
git clone https://github.com/your-username/movieApp.git
cd movieApp
npm install
```

### Development Server

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build

```bash
ng build
```

Production output is in `dist/movie-app/`.

### Run Tests

```bash
ng test
```

---

## API

This app uses the [TMDB (The Movie Database) API](https://www.themoviedb.org/documentation/api) for all movie data. You'll need a TMDB API key configured in `src/environments/environment.development.ts`.

---

## License

This project is open source and available under the [MIT License](LICENSE).
