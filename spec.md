# Happy Holi Rapunzel

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Single-page festive Holi wishes website dedicated to Rapunzel
- Main hero section with "Happy Holi, Rapunzel!" heading in a decorative font
- Personalized Holi wish message referencing her hair, tower, adventures, and magical powers
- Multiple colorful wish cards / bubbles with different Holi greetings
- A quotes section with Holi + Rapunzel themed quotes
- Interactive: click anywhere triggers a burst of colorful powder/paint particles (canvas-based)
- "Throw Colors!" CTA button that triggers a large confetti/color explosion animation
- Animated floating lanterns / color orbs referencing the Tangled lantern scene
- Hover effects on wish cards (scale, glow)
- Rapunzel's long golden hair as a decorative SVG/CSS element winding down the page
- Animated color powder/paint splashes floating across the screen
- Gradient background that cycles through Holi colors (pink, purple, yellow, green, orange, blue)
- Glowing text effects on main heading
- Fully responsive design

### Modify
- None

### Remove
- None

## Implementation Plan
1. Set up design tokens in index.css with Holi-themed OKLCH colors (pink, purple, yellow, green, orange, blue) and fairy-tale aesthetic
2. Configure tailwind.config.js with Fraunces (display) + Playfair Display (decorative) fonts
3. Build App.tsx as single-page experience with:
   - Canvas layer for particle/powder burst effects on click
   - Hero section with animated heading, golden hair SVG decoration
   - Personalized message section
   - Wish cards grid with hover effects
   - Quotes section
   - Floating lanterns/orbs component with CSS animation
   - "Throw Colors!" button wired to canvas explosion
4. Implement JS canvas particle system for color bursts (click-triggered + button-triggered)
5. CSS keyframe animations: floating powder, pulsing glow, gradient background shift, hair sway
6. Ensure responsive breakpoints (mobile-first)
