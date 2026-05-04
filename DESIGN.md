# Design Brief

## Direction
Professional Luxury Dark — refined dark charcoal foundation with warm gold accents, creating a premium restaurant aesthetic for D'Mora's sophisticated vegetarian bistro experience.

## Tone
Minimalist and elegant; deep charcoal backgrounds with strategic gold highlights evoke luxury hospitality, conveying premium quality and cultural refinement without excess.

## Differentiation
Gold-accented borders on cards and interactive elements paired with smooth scroll animations create a memorable, tactile premium experience that distinguishes D'Mora as upscale.

## Color Palette

| Token      | OKLCH           | Role                         |
|------------|-----------------|------------------------------|
| background | 0.12 0.01 35    | Deep charcoal foundation     |
| foreground | 0.92 0.01 70    | Soft off-white text          |
| primary    | 0.68 0.18 80    | Warm gold accent (CTAs)      |
| accent     | 0.68 0.18 80    | Gold highlights              |
| card       | 0.16 0.015 40   | Elevated dark card surface   |
| muted      | 0.22 0.02 35    | Subtle divider tones         |
| border     | 0.24 0.015 80   | Gold-tinged borders          |

## Typography
- Display: Fraunces — elegant serif for hero, section headings, menu categories
- Body: General Sans — refined sans for paragraphs, UI labels, descriptions
- Scale: Hero `text-6xl font-bold tracking-tight`, H2 `text-4xl font-bold tracking-tight`, Label `text-sm font-semibold uppercase tracking-wider`, Body `text-base`

## Elevation & Depth
Subtle gold-tinted shadow hierarchy; cards receive warmth through primary-colored borders and refined shadows (0.12 opacity gold). Dark surfaces layered: background (0.12L) → card (0.16L) → elevated surfaces with 2–3px gold border accent.

## Structural Zones

| Zone    | Background          | Border           | Notes                           |
|---------|---------------------|------------------|---------------------------------|
| Header  | bg-card (0.16L)     | gold-tinged      | Elevated dark nav with gold sep |
| Content | bg-background (0.12L) | —              | Deep charcoal, sections at 12px |
| Footer  | bg-card (0.16L)     | border-t gold    | Dark with gold text and accents |

## Spacing & Rhythm
Large gaps between sections (48px on mobile, 64px on desktop) create breathing room. Content grouping within cards uses 16px–24px internal padding. Gold accent elements use 2–3px borders for refinement.

## Component Patterns
- Buttons: `bg-primary text-primary-foreground rounded-lg border border-primary transition-smooth hover:shadow-gold-glow`
- Cards: `bg-card border border-primary rounded-lg shadow-card p-6`
- Badges: `bg-primary/10 text-primary rounded-md text-xs font-semibold px-3 py-1`

## Motion
- Entrance: slideInUp/slideInDown animations on scroll (0.6s spring curve)
- Hover: `transition-smooth` (0.3s ease) on all interactive elements; gold glow on focus
- Decorative: Smooth scroll behavior throughout; gold highlight fade-in on hover states

## Constraints
- Use bundled Fraunces + General Sans only; no system fallbacks
- Primary accent (gold 0.68 80) reserved for high-priority CTAs, borders, accents
- All shadows must incorporate gold hue (0.68 18 80 base); no grey shadows
- Maintain dark charcoal background (0.12L) as visual anchor; cards at 0.16L for minimal contrast lift
- Dark mode only; no light theme variant required

## Signature Detail
Gold-accented borders on cards paired with subtle gold-tinted shadows and smooth scroll animations create a luxurious, premium restaurant brand that feels both modern and culturally sophisticated.
