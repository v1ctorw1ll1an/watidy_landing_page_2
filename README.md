# waTidy — Landing Page

Site institucional e de conversão do [waTidy](https://watidy.com.br), CRM para WhatsApp via extensão de Chrome.

## Stack

- **Astro 6** com islands architecture
- **Vue 3** (Composition API, `<script setup>`) — apenas para componentes interativos
- **Tailwind CSS v4** via `@tailwindcss/vite` (sem `tailwind.config.js`)
- **Biome** para lint e formatação
- **Vitest** + `@vue/test-utils` para testes unitários
- **Bun** como package manager e runtime

## Desenvolvimento

```bash
bun install
bun run dev       # http://localhost:5173
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | Build de produção (`dist/`) |
| `bun run preview` | Preview do build de produção |
| `bun run test` | Testes unitários (Vitest) |
| `bun run test:watch` | Testes em modo watch |
| `bun run test:coverage` | Cobertura de testes (HTML em `coverage/`) |
| `bun run lint` | Verificação com Biome |
| `bun run lint:fix` | Correção automática com Biome |
| `bun run format` | Formatação com Biome |

## Testes

```bash
bun run test                                        # todos os testes
bunx vitest run src/__tests__/pricing.spec.js       # arquivo específico
bun run test:coverage                               # com cobertura
```

Os testes cobrem a lógica crítica de negócio: cálculo de preços, validação do formulário de captação de leads, composables de estado e tracking.

> **Atenção:** `bun test` executa o runner nativo do Bun, não o Vitest. Use sempre `bun run test`.

## Estrutura

```
src/
├── pages/
│   └── index.astro       # Página principal — head, GTM, composição das seções
├── components/
│   ├── *.astro           # Seções estáticas (zero JS no browser)
│   └── *.vue             # Seções interativas (hidratadas como islands)
├── composables/
│   ├── useModal.js       # Estado global do modal (singleton ref)
│   └── useTracking.js    # Captura de UTMs, IP e URLs de checkout com tracking
├── utils/
│   ├── color.js          # hexToRgb
│   └── device.js         # getDeviceType (UA regex)
├── __tests__/            # Testes Vitest
└── main.css              # Token --color-primary: #09ef8d
```

### Islands — componentes Vue hidratados

| Componente | Diretiva | Motivo |
|---|---|---|
| `AppHeader.vue` | `client:load` | Menu mobile, click-outside |
| `AppModal.vue` | `client:load` | Formulário, validação, webhooks |
| `HeroSection.vue` | `client:load` | Canvas particles, IntersectionObserver |
| `PricingSection.vue` | `client:idle` | Slider de quantidade, preços computados |
| `IntegrationsSection.vue` | `client:visible` | Carrossel Swiper |
| `FaqSection.vue` | `client:visible` | Accordion |

## Deploy

A aplicação é servida via Nginx em container Docker. Consulte o `docker-compose.yml` e o `Dockerfile` na raiz para configuração do ambiente de produção.
