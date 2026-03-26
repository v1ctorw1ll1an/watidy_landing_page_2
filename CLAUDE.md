# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # start dev server (localhost:5173)
bun run build        # production build
bun run preview      # preview production build

bun run test         # run all tests (vitest)
bun run test:watch   # watch mode
bun run test:coverage  # coverage report (HTML at coverage/index.html)

bun run lint         # check with Biome
bun run lint:fix     # auto-fix Biome issues
bun run format       # format with Biome
```

Run a single test file:
```bash
bunx vitest run src/__tests__/pricing.spec.js
```

## Architecture

Single-page marketing/landing site for waTidy (WhatsApp CRM Chrome extension). No router, no store — just a static Vue 3 app mounted at `#app`.

### Component loading strategy

`App.vue` eager-loads the above-the-fold components (`AppHeader`, `HeroSection`, `AppModal`) and lazy-loads everything else via `defineAsyncComponent`. This is intentional for performance — do not change eager components without considering LCP impact.

### Global modal pattern

`src/composables/useModal.js` exports a **module-level singleton** `ref`. Any component can call `openModal()` / `closeModal()` and all consumers share the same `isOpen` state. `AppModal` is always mounted (outside `<main>`) and renders its content conditionally with `v-if="isOpen"`.

### Pricing logic (`PricingSection.vue`)

All business-critical values live here. Key details:
- Tiers 1–5 use `originalPrices`, `cashPrices`, `installmentPrices` arrays (index = quantity - 1)
- Quantity 6+ triggers `isConsultorMode` — hides price display entirely and swaps the CTA to a WhatsApp link
- Quantity 4+ triggers `hasExtraDiscount` — shows a "5% DESCONTO" badge
- `checkoutUrls` starts as `BASE_CHECKOUT_URLS` and is overwritten on `onMounted` with tracking params appended via `getCheckoutUrlsWithTracking`
- Price formatting uses `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`

### Lead capture flow (`AppModal.vue`)

On valid submit, the form:
1. Calls `captureTrackingData()` from `useTracking.js` (async — fetches IP from ipify)
2. POSTs to **two** n8n webhooks sequentially
3. Sets a `uid` cookie (domain `.watidy.com.br`, 180 days) if `user_id` is returned
4. Pushes a `lead_form_success` event to `window.dataLayer`
5. Redirects — mobile UA → `mobile.watidy.com.br`, desktop → Chrome Web Store or `auth_download_plugin` URL

The phone input uses a custom mask (`applyPhoneMask`) via `:value` + `@input` (not `v-model`). The mask caps at 11 digits, so the validation branch for >15 digits is unreachable in normal use.

### Tracking (`src/composables/useTracking.js`)

- `captureTrackingData()` — reads UTM params preferring cookie values over URL params, fetches user IP async
- `getCheckoutUrlsWithTracking(baseUrls)` — appends UTM/tracking params from the current URL to each checkout URL; falls back to `document.referrer` hostname as `utm_source` if no UTM params present

### Utility modules

- `src/utils/color.js` — `hexToRgb(hex)` (extracted from `HeroSection` for testability)
- `src/utils/device.js` — `getDeviceType()` regex against `navigator.userAgent` (shared by `AppModal` and `useTracking`)

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin. The single custom token is `--color-primary: #09ef8d` (brand green), defined in `src/main.css` and referenced throughout as `var(--color-primary)` or `[var(--color-primary)]` in Tailwind class strings. There is no `tailwind.config.js` — configuration is done in CSS.

### Testing

Tests use Vitest + `@vue/test-utils` with `jsdom`. Vitest config is in `vitest.config.js` (no Tailwind plugin — CSS is excluded from tests). Global stubs for `IntersectionObserver`, `ResizeObserver`, canvas, and `fetch` are in `src/__tests__/setup.js`.

When mocking `useModal.js` in component tests, provide `{ useModal: () => ({ isOpen: ref(true/false), openModal: vi.fn(), closeModal: vi.fn() }) }` — the singleton ref means tests that import the real module must reset state in `beforeEach`.

The `bun test` command runs Bun's native runner, **not** Vitest — always use `bun run test` (or `bunx vitest run`) to run the test suite.
