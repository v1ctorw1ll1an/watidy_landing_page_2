import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../components/AppHeader.vue'

vi.mock('../composables/useModal.js', () => ({
  useModal: () => ({ openModal: vi.fn() }),
}))

describe('AppHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AppHeader, { attachTo: document.body })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  // ── nav links ─────────────────────────────────────────────────────────────

  it('renders all 4 links in desktop nav', () => {
    const nav = wrapper.find('nav')
    const links = nav.findAll('a')
    expect(links).toHaveLength(4)
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('#recursos')
    expect(hrefs).toContain('#depoimentos')
    expect(hrefs).toContain('#precos')
    expect(hrefs).toContain('#perguntas-frequentes')
  })

  // ── mobile menu toggle ────────────────────────────────────────────────────

  it('mobile menu is closed by default', () => {
    // The mobile dropdown div only renders when menuOpen is true
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(false)
  })

  it('clicking hamburger button opens the menu', async () => {
    await wrapper.find('button[aria-label="menu"]').trigger('click')
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(true)
  })

  it('clicking hamburger button again closes the menu', async () => {
    const btn = wrapper.find('button[aria-label="menu"]')
    await btn.trigger('click')
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(true)
    await btn.trigger('click')
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(false)
  })

  it('mobile menu renders all 4 nav links when open', async () => {
    await wrapper.find('button[aria-label="menu"]').trigger('click')
    const mobileMenu = wrapper.find('.shadow-lg.absolute')
    const links = mobileMenu.findAll('a')
    expect(links).toHaveLength(4)
  })

  it('clicking a mobile nav link closes the menu', async () => {
    await wrapper.find('button[aria-label="menu"]').trigger('click')
    const mobileLink = wrapper.find('.shadow-lg.absolute a')
    await mobileLink.trigger('click')
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(false)
  })

  // ── click outside ─────────────────────────────────────────────────────────

  it('clicking outside #mobile-menu-wrapper closes the menu', async () => {
    await wrapper.find('button[aria-label="menu"]').trigger('click')
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(true)
    // Simulate click on document body (outside the mobile menu wrapper)
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(false)
  })

  it('does nothing when menu is already closed and outside click fires', async () => {
    // menu is already closed; clicking outside should not throw or change anything
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.shadow-lg.absolute').exists()).toBe(false)
  })
})
