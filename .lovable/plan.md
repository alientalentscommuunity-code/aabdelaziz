

# Portfolio Redesign: ALIENs Sci-Fi Theme + Career Framework CTA

## What's Changing

Two things are being fixed:

1. **Missing Career Framework CTA** on the homepage -- adding a link/button to the `/career-framework` page
2. **Complete visual overhaul** -- replacing the current teal/purple color scheme with the ALIENs Venture design system (pure black + neon green + hunter orange + glassmorphism)

---

## Design System Changes

### Color Palette (replacing current teal/purple)
- **Background**: Pure black `#000000` (replacing `#121212`)
- **Primary (Alien Green)**: `#22C55E` (replacing the current teal `#20c997`)
- **Secondary (Hunter Orange)**: `#F97316` (replacing the current purple `#8a2be2`)
- **Text**: White at various opacities (100%, 40%, 20%)
- **Glass surfaces**: `rgba(255,255,255,0.03)` with blur and `border-white/10`

### Typography
- **Font**: Space Grotesk (replacing Inter/Poppins)
- **Headings**: `font-black italic uppercase tracking-tighter` (brutalist style)
- **Paragraphs**: `font-medium italic text-white/40`

### UI Components
- **Cards**: Glassmorphism with `rounded-[3rem]` and neon glow on hover
- **Buttons**: Primary = green-500 with glow shadow, Secondary = orange-500, Ghost = white/5 borders
- **Navigation**: Glass pill style, centered on desktop

---

## File Changes

### 1. `src/index.css`
- Update CSS variables: green for primary, orange for secondary
- Replace body background from `bg-dark` to pure black
- Add new utility classes: `.glass`, neon glow, ambient gradients, scrollbar styling, selection styling
- Import Space Grotesk font instead of Inter/Poppins
- Update `.btn-*` classes to match new color scheme
- Update `.section-title` with brutalist typography treatment

### 2. `tailwind.config.ts`
- Update custom colors: replace `dark`/`dark-accent`/`teal`/`purple` with black-based system
- Add Space Grotesk to font family
- Add new keyframes: neon pulse, glassmorphism hover
- Update CSS variable mappings for the new green/orange palette

### 3. `src/components/Navbar.tsx`
- Restyle to glass pill navigation (centered, rounded-full, backdrop-blur)
- Update colors from teal to green-500
- Add "Career Framework" link to nav
- CTA button styled with orange/green glow

### 4. `src/components/Hero.tsx`
- Pure black background
- Brutalist headline: `font-black italic uppercase tracking-tighter`
- Key metrics styled with neon green highlights
- CTA buttons with glow shadows (green primary, ghost secondary)
- Add a CTA linking to Career Framework page
- Subtitle text in `text-white/40 italic`

### 5. `src/components/About.tsx`
- Glass cards with `rounded-[3rem]` and `border-white/10`
- Working style section with glass sub-cards
- Compensation badges using green/orange accents
- Replace `bg-dark-accent` with glass backgrounds

### 6. `src/components/Experience.tsx`
- Timeline cards in glassmorphism style
- Stat boxes with neon green glow borders
- Orange highlights for hackathon/partnership wins
- Section heading with brutalist style

### 7. `src/components/Projects.tsx`
- Project cards with glass effect and `rounded-[3rem]`
- Live status = green glow, Demo status = orange glow
- Hover: `hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]`
- Tags styled with green-500/10 background

### 8. `src/components/Contact.tsx`
- Glass cards for each contact method
- Green glow on email/LinkedIn, orange on phone
- "Open to opportunities" badge with green pulse

### 9. `src/components/Footer.tsx`
- Minimal, on pure black with white/10 border top
- Social icons with green hover glow

### 10. `src/pages/CareerFramework.tsx`
- Apply same glass + brutalist theme
- Green for core track items, orange for supporting tracks

### 11. `src/pages/Index.tsx`
- Update wrapper from `bg-dark` to `bg-black`

---

## Technical Details

### New CSS Custom Properties
```text
--primary: 142 71% 45%        (green-500)
--secondary: 24 94% 53%       (orange-500)
--background: 0 0% 0%         (pure black)
--card: 0 0% 3%               (near-black for glass)
--border: 0 0% 100% / 0.1     (white at 10%)
```

### New Font Import
```text
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### Glass Utility Class
```text
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3rem;
}
```

### Ambient Background Gradient
```text
.ambient-glow {
  background: radial-gradient(
    circle at center,
    rgba(34,197,94,0.05) 0%,
    rgba(249,115,22,0.05) 50%,
    rgba(0,0,0,1) 100%
  );
}
```

All content stays exactly the same -- only the visual styling, colors, and typography are changing. The Career Framework CTA will be added as a button in the Hero section and as a nav link.
