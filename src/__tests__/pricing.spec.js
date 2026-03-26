import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PricingSection from '../components/PricingSection.vue'

vi.mock('../composables/useModal.js', () => ({
  useModal: () => ({ openModal: vi.fn() }),
}))

vi.mock('../composables/useTracking.js', () => ({
  getCheckoutUrlsWithTracking: (urls) => urls,
}))

function fmt(price) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

async function setQty(wrapper, qty) {
  const input = wrapper.find('input[type="range"]')
  await input.setValue(qty)
}

describe('PricingSection', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PricingSection)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  // ── progressPercent ────────────────────────────────────────────────────────

  describe('progressPercent', () => {
    it.each([
      [1, '0%'],
      [2, '20%'],
      [3, '40%'],
      [4, '60%'],
      [5, '80%'],
      [6, '100%'],
    ])('quantity %i → progress width %s', async (qty, expected) => {
      await setQty(wrapper, qty)
      const progressBar = wrapper.find('.bg-\\[var\\(--color-primary\\)\\].h-2')
      expect(progressBar.attributes('style')).toContain(`width: ${expected}`)
    })
  })

  // ── quantityText ──────────────────────────────────────────────────────────

  describe('quantityText', () => {
    it('shows "1 assinatura" for quantity 1', async () => {
      await setQty(wrapper, 1)
      expect(wrapper.text()).toContain('1 assinatura')
    })

    it.each([2, 3, 4, 5])('shows "%i assinaturas" for quantity %i', async (qty) => {
      await setQty(wrapper, qty)
      expect(wrapper.text()).toContain(`${qty} assinaturas`)
    })

    it('shows "6+ assinaturas" for quantity 6', async () => {
      await setQty(wrapper, 6)
      expect(wrapper.text()).toContain('6+ assinaturas')
    })
  })

  // ── isConsultorMode ───────────────────────────────────────────────────────

  describe('isConsultorMode', () => {
    it.each([1, 2, 3, 4, 5])('is false for quantity %i (shows ASSINAR AGORA)', async (qty) => {
      await setQty(wrapper, qty)
      expect(wrapper.text()).toContain('ASSINAR AGORA')
      expect(wrapper.text()).not.toContain('FALAR COM O CONSULTOR')
    })

    it('is true for quantity 6 (shows FALAR COM O CONSULTOR)', async () => {
      await setQty(wrapper, 6)
      expect(wrapper.text()).toContain('FALAR COM O CONSULTOR')
      expect(wrapper.text()).not.toContain('ASSINAR AGORA')
    })

    it('hides price section when quantity is 6', async () => {
      await setQty(wrapper, 6)
      // price section has v-if="!isConsultorMode", should not render
      expect(wrapper.text()).not.toContain('12x')
    })
  })

  // ── hasExtraDiscount ──────────────────────────────────────────────────────

  describe('hasExtraDiscount', () => {
    it.each([1, 2, 3])('no "5% DESCONTO" badge for quantity %i', async (qty) => {
      await setQty(wrapper, qty)
      expect(wrapper.text()).not.toContain('5% DESCONTO')
    })

    it.each([4, 5])('shows "5% DESCONTO" badge for quantity %i', async (qty) => {
      await setQty(wrapper, qty)
      expect(wrapper.text()).toContain('5% DESCONTO')
    })
  })

  // ── exact prices ──────────────────────────────────────────────────────────

  describe('exact prices per quantity', () => {
    const cases = [
      { qty: 1, orig: 588, cash: 347.0, inst: 49.0 },
      { qty: 2, orig: 1176, cash: 694.0, inst: 98.0 },
      { qty: 3, orig: 1764, cash: 1041.0, inst: 147.0 },
      { qty: 4, orig: 2234.4, cash: 1318.6, inst: 186.2 },
      { qty: 5, orig: 2793, cash: 1648.25, inst: 232.75 },
    ]

    for (const { qty, cash, inst } of cases) {
      it(`quantity ${qty}: cash ${cash}, installment ${inst}`, async () => {
        await setQty(wrapper, qty)
        expect(wrapper.text()).toContain(fmt(cash))
        expect(wrapper.text()).toContain(fmt(inst))
      })
    }
  })

  // ── checkoutUrl ───────────────────────────────────────────────────────────

  describe('checkoutUrl', () => {
    const urlCases = [
      [1, 'https://go.watidy.com.br/subscribe/watidy-1-usuario'],
      [2, 'https://go.watidy.com.br/subscribe/watidy-2-usuarios'],
      [3, 'https://go.watidy.com.br/subscribe/watidy-3-usuarios'],
      [4, 'https://go.watidy.com.br/subscribe/watidy-4-usuarios'],
      [5, 'https://go.watidy.com.br/subscribe/watidy-5-usuarios'],
    ]

    it.each(urlCases)('quantity %i uses correct subscribe URL', async (qty, expectedUrl) => {
      await setQty(wrapper, qty)
      const link = wrapper.find('a[rel="noopener noreferrer"]')
      expect(link.attributes('href')).toBe(expectedUrl)
    })

    it('quantity 6 shows WhatsApp consultor URL', async () => {
      await setQty(wrapper, 6)
      const link = wrapper.find('a[href^="https://wa.me/"]')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toContain('wa.me/+553129424122')
    })
  })

  // ── quantity labels ───────────────────────────────────────────────────────

  describe('slider labels', () => {
    it('renders labels 1–5 as their numbers and 6th as "+6"', () => {
      const labels = wrapper.findAll('.flex.justify-between.text-xs span')
      const texts = labels.map((l) => l.text())
      expect(texts).toEqual(['1', '2', '3', '4', '5', '+6'])
    })
  })
})
