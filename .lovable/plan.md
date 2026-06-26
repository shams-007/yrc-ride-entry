## Plan: Hero layout fixes

### Goal
Vertically center the hero content within the full viewport height, remove top padding from the left column, make the right image placeholder stretch to match the hero column height, and tighten the text spacing on the left column.

### Changes

1. **Hero grid container (`src/components/Hero.tsx`)**
   - Keep `minHeight: 100vh` on the `<section>`.
   - Change the inner grid wrapper from `min-h-screen` with `pt-24 pb-16` to `min-h-screen items-center` with **zero vertical padding** (`py-0`), so flexbox/grid centering positions the content exactly in the middle of the available viewport (below the fixed navbar).
   - Keep the existing `gap-12 lg:gap-10` horizontal spacing.

2. **Right image placeholder (`src/components/Hero.tsx`)**
   - Replace the fixed `aspectRatio: 560 / 480` / `max-w-[560px]` wrapper with a full-height placeholder.
   - Apply `h-full`, `self-stretch`, and `w-full` so the placeholder fills the entire right column height.
   - Preserve the parallelogram `clip-path` on desktop and the rounded corners on mobile.
   - Keep the motorcycle icon, "PHOTO COMING SOON" text, shimmer overlay, and rotating ring behind it.

3. **Left column spacing (`src/components/Hero.tsx`)**
   - Badge → headline: reduce from `mt-6` to `mt-4` (16px).
   - Headline → subtext: reduce from `mt-6` to `mt-5` (20px).
   - Subtext → buttons: keep `mt-8` (32px).

4. **Verification**
   - Run a build check to confirm no Tailwind/class errors.
   - Confirm no console errors and that the mobile layout still stacks correctly.