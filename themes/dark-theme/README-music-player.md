# 🎵 Reusable Music Player Component

This Hugo theme now includes a fully reusable music player component that can be used across different pages and layouts.

## 📁 Files Structure

```
themes/dark-theme/
├── static/
│   ├── css/
│   │   └── music-player.css      # Reusable CSS styles
│   └── js/
│       └── music-player.js       # Music player JavaScript class
├── layouts/
│   └── partials/
│       └── music-player.html     # Hugo partial template
└── README-music-player.md        # This documentation
```

## 🚀 Quick Start

### Method 1: Using the Hugo Partial (Recommended)

```html
<!-- Basic usage -->
{{ partial "music-player.html" (dict "id" "my-player") }}

<!-- With tracks from data file -->
{{ partial "music-player.html" (dict 
  "id" "my-player" 
  "tracks" .Site.Data.music 
  "showFavorite" true 
  "autoPlay" false
) }}

<!-- With custom configuration -->
{{ partial "music-player.html" (dict 
  "id" "my-player" 
  "tracks" .Site.Data.playlist
  "variant" "compact"
  "title" "Now Playing"
  "artist" "Select a track"
  "albumArt" "/images/default-cover.jpg"
) }}
```

### Method 2: Using JavaScript Class Directly

```html
<!-- Include CSS and JS -->
<link rel="stylesheet" href="{{ "css/music-player.css" | relURL }}">
<script src="{{ "js/music-player.js" | relURL }}"></script>

<!-- Create container -->
<div id="my-music-player"></div>

<script>
// Initialize with tracks
const tracks = [
  {
    title: "Song Title",
    artist: "Artist Name", 
    url: "/path/to/song.mp3",
    albumArt: "/path/to/cover.jpg"
  }
];

const player = new MusicPlayer('my-music-player', {
  playlist: tracks,
  showFavorite: true,
  showPrevNext: true,
  autoPlay: false
});
</script>
```

## 🎛️ Configuration Options

### Hugo Partial Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | string | `"music-player"` | Unique identifier for the player |
| `tracks` | array | `[]` | Array of track objects |
| `showFavorite` | boolean | `true` | Show favorite button |
| `showPrevNext` | boolean | `true` | Show previous/next buttons |
| `autoPlay` | boolean | `false` | Auto-play first track |
| `variant` | string | `"default"` | Player style: `"default"`, `"compact"`, `"card"` |
| `albumArt` | string | `""` | Default album art URL |
| `title` | string | `"Select a track"` | Default title |
| `artist` | string | `"Choose from the collection"` | Default artist |

### JavaScript Class Options

```javascript
const options = {
  playlist: [],           // Array of track objects
  showFavorite: true,     // Show favorite button
  showPrevNext: true,     // Show prev/next buttons
  autoPlay: false,        // Auto-play on load
  autoPlayNext: true,     // Auto-play next track
  currentTrackIndex: 0    // Starting track index
};
```

### Track Object Format

```javascript
const track = {
  title: "Song Title",        // Required
  artist: "Artist Name",      // Required
  url: "/path/to/song.mp3",   // Required
  albumArt: "/cover.jpg",     // Optional
  isFavorite: false          // Optional
};
```

## 🎨 CSS Variants

### Default Player
```html
{{ partial "music-player.html" (dict "id" "player1" "variant" "default") }}
```

### Compact Player
```html
{{ partial "music-player.html" (dict "id" "player2" "variant" "compact") }}
```

### Card Style Player
```html
{{ partial "music-player.html" (dict "id" "player3" "variant" "card") }}
```

## 📊 Data File Example

Create `data/music.json` or `data/music.yaml`:

**JSON Format:**
```json
[
  {
    "title": "Summer Vibes",
    "artist": "Cool Artist",
    "url": "/music/summer-vibes.mp3",
    "albumArt": "/images/summer-album.jpg",
    "isFavorite": true
  },
  {
    "title": "Winter Dreams", 
    "artist": "Chill Artist",
    "url": "/music/winter-dreams.mp3",
    "albumArt": "/images/winter-album.jpg"
  }
]
```

**YAML Format:**
```yaml
- title: "Summer Vibes"
  artist: "Cool Artist" 
  url: "/music/summer-vibes.mp3"
  albumArt: "/images/summer-album.jpg"
  isFavorite: true
- title: "Winter Dreams"
  artist: "Chill Artist"
  url: "/music/winter-dreams.mp3"
  albumArt: "/images/winter-album.jpg"
```

## 🎯 JavaScript API

### Basic Methods

```javascript
const player = new MusicPlayer('player-id', options);

// Playback control
player.play();
player.pause();
player.togglePlayPause();

// Navigation
player.playNext();
player.playPrevious();
player.loadTrack(index, autoPlay);

// Playlist management
player.setPlaylist(tracks);
player.addTrack(track);
player.removeTrack(index);

// Get current state
const currentTrack = player.getCurrentTrack();
const playlist = player.getPlaylist();

// Cleanup
player.destroy();
```

### Event Listeners

```javascript
// Track changed
document.getElementById('player-id').addEventListener('trackChanged', function(e) {
  console.log('New track:', e.detail.track);
  console.log('Track index:', e.detail.index);
});

// Favorite toggled
document.getElementById('player-id').addEventListener('favoriteToggled', function(e) {
  console.log('Track:', e.detail.track);
  console.log('Is favorite:', e.detail.isFavorite);
  
  // Save to localStorage or make API call
  localStorage.setItem('favorites', JSON.stringify(favorites));
});
```

## 🎪 Usage Examples

### 1. Simple Music Page

```html
---
title: "My Music"
---

{{ define "main" }}
<div class="container">
  <h1>🎵 My Playlist</h1>
  {{ partial "music-player.html" (dict 
    "id" "main-player" 
    "tracks" .Site.Data.playlist
  ) }}
</div>
{{ end }}
```

### 2. Multiple Players on Same Page

```html
{{ define "main" }}
<div class="container">
  <!-- Jazz Collection -->
  <h2>Jazz Collection</h2>
  {{ partial "music-player.html" (dict 
    "id" "jazz-player" 
    "tracks" .Site.Data.jazz
    "variant" "compact"
  ) }}
  
  <!-- Rock Collection -->
  <h2>Rock Collection</h2>
  {{ partial "music-player.html" (dict 
    "id" "rock-player" 
    "tracks" .Site.Data.rock
    "variant" "card"
  ) }}
</div>
{{ end }}
```

### 3. Dynamic Loading (like Oxford page)

```html
<div id="dynamic-player"></div>

<script>
async function loadTracks() {
  const response = await fetch('/api/tracks.json');
  const data = await response.json();
  
  const player = new MusicPlayer('dynamic-player', {
    playlist: data.tracks,
    showFavorite: true,
    autoPlay: false
  });
}

loadTracks();
</script>
```

## 🎨 Customizing Styles

### Override CSS Variables

```css
:root {
  --music-player-primary: #your-color;
  --music-player-background: #your-bg;
  --music-player-text: #your-text;
}
```

### Custom CSS Classes

```css
/* Target specific player */
#my-player .music-player-container {
  border-radius: 25px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

/* Global overrides */
.music-player-container.my-custom-style {
  /* Your custom styles */
}
```

## 📱 Responsive Design

The music player is fully responsive and includes:

- **Desktop**: Full-featured layout with all controls
- **Tablet**: Optimized spacing and button sizes
- **Mobile**: Stacked layout with touch-friendly controls

## ♿ Accessibility Features

- **Keyboard Navigation**: All controls are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast**: Respects user's contrast preferences
- **Focus Indicators**: Clear focus states for all interactive elements

## 🐛 Troubleshooting

### Common Issues

1. **Player not loading**: Check if CSS/JS files are included
2. **Tracks not playing**: Verify audio file URLs are correct
3. **Styling issues**: Ensure CSS variables are defined in your theme
4. **Multiple players conflict**: Use unique IDs for each player

### Debug Mode

```javascript
const player = new MusicPlayer('player-id', {
  playlist: tracks,
  debug: true  // Enable console logging
});
```

## 🔄 Migration from Old Code

If you have existing music player code, here's how to migrate:

### Before (Old inline code)
```html
<audio id="player" controls></audio>
<button onclick="playTrack()">Play</button>
```

### After (Reusable component)
```html
{{ partial "music-player.html" (dict "id" "player" "tracks" .tracks) }}
```

This provides better maintainability, consistent styling, and enhanced functionality!
