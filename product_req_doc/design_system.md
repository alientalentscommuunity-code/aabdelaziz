# ALIENs Venture Design System PRD (Alien Universe Handbook)

**Version**: 3.0  
**Status**: Production  
**Scope**: Visual design system, galaxy space aesthetics, elegant black & green mood.

---

## 1. Design Identity

### 1.1 Visual Direction
- **Aesthetic**: Elegant Cosmic Space · Deep Void · High-End Alien
- **Foundation**: Pure Void Black (`#000000`) and Deep Galaxy backgrounds.
- **Character**: Sophisticated typography meets cosmic depth. Replacing rigid brutalism with sweeping, elegant, premium cosmic designs, layered with starlight gradients.
- **Feeling**: Mysterious, Expansive, Premium, Organic Alien.

### 1.2 Core Principles
1. **Cosmic Elegance** — Fine lines, generous spacing, and sophisticated typography.
2. **Deep Space Depth** — Multi-layered backgrounds featuring nebula purples, midnight blues, and crisp alien greens.
3. **Ethereal Interactions** — Hover states feel like drifting in space, glowing softly.
4. **Consistency** — Every surface honors the black mood layout with absolute elegance.

---

## 2. Color System

### 2.1 Base Palette (The Void)
| Name | Value | Usage |
|---|---|---|
| Deep Space | `#000000` | Primary foundation |
| Star White | `#FFFFFF` | Headlines, high contrast |
| Moon Dust | `rgba(255,255,255,0.6)` | Paragraphs, elegant text |
| Elegant Glass | `rgba(255,255,255,0.02)` | Frosted minimalist cards |
| Fine Border | `rgba(255,255,255,0.05)` | Ultra-thin separators |

### 2.2 Brand & Cosmic Colors
| Name | Hex | Semantic Use |
|---|---|---|
| Alien Green | `#00FFA3` | Primary elegant neon accent, talents, success |
| Nebula Purple | `#8B5CF6` | Ambient space gradients, mysterious galaxy depth |
| Midnight Blue | `#0F172A` | Background shadows, dark matter layers |

### 2.3 Elegant Gradients
```css
/* Cosmic Green Nebula */
--gradient-nebula: radial-gradient(100% 100% at 50% 0%, rgba(0,255,163,0.15) 0%, rgba(139,92,246,0.08) 50%, rgba(0,0,0,1) 100%);
```

---

## 3. Typography System

### 3.1 Font Family
```css
font-family: 'Inter', 'Space Grotesk', sans-serif;
```
*Design Philosophy*: `Inter` for elegant readable UI text; `Space Grotesk` strictly for Display/Hero headings to maintain the Sci-Fi touch.

### 3.2 Typography Rules
- **Headings**: `font-light tracking-tight text-white font-space`. Replaces brutalist black.
- **Body**: `font-light text-white/60 leading-relaxed font-inter`.
- **Labels**: `text-[10px] font-medium uppercase tracking-[0.2em] text-white/40`.

---

## 4. Spacing & Shapes

- **Elegance Through Void**: Use `p-8` to `p-16` on inner containers. Give elements room to float.
- **Border Radius**: Cards are `rounded-[2rem]` (32px), Buttons are `rounded-full`. Elegance prefers smooth, deliberate curves.

---

## 5. Component Library

### 5.1 Glass Surface (Premium & Ethereal)
```css
background: rgba(255, 255, 255, 0.02);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.04);
border-radius: 2rem;
```

### 5.2 Buttons
**Primary — Elegant Alien Green**
```css
bg-[#00FFA3] text-black px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em]
transition-all duration-500 hover:bg-white hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,255,163,0.4)]
```

### 5.3 Form Inputs (Sleek High-Fashion)
```css
w-full bg-transparent border-b border-white/10 rounded-none px-0 py-4 text-white font-light text-lg focus:border-[#00FFA3] focus:outline-none transition-all duration-500
```
*Note: Underline-only inputs yield a high-fashion tech aesthetic compared to chunky boxes.*

---

## 6. Visual Effects — The Galaxy Mood

### 6.1 The Aurora Pulse (Cosmic Green & Purple)
```css
@keyframes aurora-shift {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
  50% { transform: scale(1.05) rotate(2deg); opacity: 0.5; }
}
.aurora-bg {
  animation: aurora-shift 15s infinite ease-in-out;
  background: radial-gradient(circle at 50% -20%, rgba(0, 255, 163, 0.15), rgba(139, 92, 246, 0.1), transparent 60%);
}
```

### 6.2 Shadow System (Floating Cosmos)
- **Floating Base**: `shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]`
- **Hover State**: `shadow-[0_30px_60px_-15px_rgba(0,255,163,0.15)]`

---

## 7. Global CSS — The Void Foundation

```css
html {
  background-color: #000000;
  /* Ultra-subtle noise texture for starry galaxy elegance */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  color: #FFFFFF;
}
```

---

## 8. Maintenance Instructions

1. **Never Clutter**: Absolute minimalism is key. Negative void space is your greatest asset.
2. **Never Solid Box**: Use fine borders (`border-white/5`) instead of solid heavy blocks.
3. **Strictly Dark Canvas**: We embody the deep void. True light mode is heavily restricted. The universe is dark.
