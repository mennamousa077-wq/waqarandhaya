---
name: "Waqar & Hayaa"
description: "A dignified, serene, and ultra-modest Islamic luxury e-commerce design system tailored for Niqabi and Mukhtamara women."
---

## Overview

**Waqar & Hayaa (وقار وحياء)** is an ethical, serene, and dignified modest fashion design system created specifically for Niqabi and Mukhtamara women who seek complete Islamic modesty without compromising on garment quality, fabric opacity, or shopping comfort. 

The aesthetic is characterized by generous whitespace, soft warm cream tones, muted olive and warm taupe surfaces, deep forest green and mocha brown CTAs, and delicate champagne gold accents. The design language honors Islamic modesty standards: loose silhouettes, zero transparency, graceful drapes, and high legibility across both Arabic (RTL native) and English. Visual clutter, tight or figure-hugging cuts, and loud distracting colors are deliberately avoided in favor of peace, piety, and quiet luxury.

## Colors

The palette balances warm alabaster backdrops with muted botanical earth tones, deep contemplative greens, and champagne gold for understated grace.

- **Primary (Forest Green):** Represents timeless modesty, calm, and grounded dignity.
- **Secondary (Mocha Brown):** Evokes rich, natural textile roots and deep comfort.
- **Accent (Champagne Gold):** Subtle, refined luxury used for badges, verification marks, and key highlights.
- **Surface (Alabaster & Soft Sage):** Serene, low-fatigue backgrounds that let fabric textures and drape speak clearly.

```yaml
colors:
  champagne-gold: "#C5A880"
  soft-sage: "#E2E8DF"
  warm-taupe: "#D8CEC4"
  mocha-brown: "#5C4033"
  forest-green: "#2F4F4F"
  light:
    primary: "#2F4F4F"
    on-primary: "#FFFFFF"
    secondary: "#5C4033"
    on-secondary: "#FFFFFF"
    surface: "#FAF8F5"
    on-surface: "#2C2A29"
    surface-container-low: "#F4EFEA"
    surface-container: "#EAE3DC"
    surface-container-high: "#E2D9D0"
    outline: "#A3978B"
    outline-variant: "#D8CEC4"
    accent: "#C5A880"
    on-accent: "#2C2A29"
  dark:
    primary: "#8DB4AD"
    on-primary: "#112B26"
    secondary: "#D4B5A5"
    on-secondary: "#2F1E16"
    surface: "#1C1B19"
    on-surface: "#EDE8E3"
    surface-container-low: "#252421"
    surface-container: "#2E2C28"
    surface-container-high: "#383632"
    outline: "#827C75"
    outline-variant: "#474440"
    accent: "#DFCAA6"
    on-accent: "#2C2A29"
```

## Typography

The typography pairs **Amiri** for stately, classical Arabic headlines with **Plus Jakarta Sans** and **Noto Kufi Arabic** for clean, legible body text and interface controls across both RTL and LTR orientations.

```yaml
typography:
  display-lg:
    fontFamily: "Amiri"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 58px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Amiri"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 40px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Amiri"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 44px
    letterSpacing: -0.25px
  headline-lg-mobile:
    fontFamily: "Amiri"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 36px
  headline-md:
    fontFamily: "Amiri"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 36px
  headline-md-mobile:
    fontFamily: "Amiri"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 30px
  headline-sm:
    fontFamily: "Amiri"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 30px
  title-lg:
    fontFamily: "Noto Kufi Arabic"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
  title-md:
    fontFamily: "Noto Kufi Arabic"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
  body-lg:
    fontFamily: "Noto Kufi Arabic"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 26px
  body-md:
    fontFamily: "Noto Kufi Arabic"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
  label-lg:
    fontFamily: "Noto Kufi Arabic"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  label-md:
    fontFamily: "Noto Kufi Arabic"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 18px
  label-sm:
    fontFamily: "Noto Kufi Arabic"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 16px
```

## Layout & Spacing

Layout operates primarily in native Right-to-Left (`dir="rtl"`) with dual-language capability. It uses a flexible 12-column grid on desktop (max 1280px container) and a single-column rhythm on mobile with generous 24px margins.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 56px
  page-margin: 24px
```

## Elevation & Depth

Visual depth is achieved through gentle tonal stacking and soft, diffused warm shadows (`0 8px 24px -4px rgba(44, 42, 41, 0.05)`). Glassmorphism, aggressive drop shadows, and high-contrast borders are intentionally excluded to keep the aesthetic peaceful, dignified, and organic.

## Shapes

Shapes reflect modesty, soft flow, and gentle drapes: soft rounded corners (8px to 16px) with pill tags for modesty badges and measurement chips.

```yaml
rounded:
  sm: 6px
  DEFAULT: 10px
  md: 14px
  lg: 20px
  xl: 28px
  full: 9999px
```

## Motion & Micro-interaction

Motion is smooth, reverent, and deliberate—reminiscent of heavy silk or crepe moving gracefully with the breeze.

```yaml
motion:
  state-change:
    duration: 150ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 280ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
  surface-exit:
    duration: 180ms
    delay: 0ms
    timingFunction: cubic-bezier(0.3, 0, 1, 1)
```

## Voice & Content Strategy

The voice is warm, respectful, reassuring, and reverent. It speaks naturally to sisters seeking dignified modesty (وقار، حشمة، طمأنينة). 

- **Key Principles:**
  - Absolute transparency in product modesty: every piece clearly states total length, fabric weight (GSM), opacity level, and draping style.
  - Zero judgment, warm sisterhood: "أهلاً بكِ في واحة الحشمة والوقار" (Welcome to the sanctuary of modesty and dignity).
  - Verifiable promises: "ضمان عدم الشفافية بنسبة 100%" (100% Non-see-through Guarantee) and detailed height matching.

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html`: `input-field-text`, `input-field-icon`
- **Tabs** → `@components/tabs.html`: `tabs-horizontal`, `tabs-with-icon`
