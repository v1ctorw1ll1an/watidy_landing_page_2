import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FaqSection from '../components/FaqSection.vue'

describe('FaqSection', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(FaqSection)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders all 5 FAQ questions', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(5)
  })

  it('first item is open by default', () => {
    const firstAnswer = wrapper.find('[id="faq-content-item-1"]')
    expect(firstAnswer.exists()).toBe(true)
  })

  it('other items are closed by default', () => {
    expect(wrapper.find('[id="faq-content-item-2"]').exists()).toBe(false)
    expect(wrapper.find('[id="faq-content-item-3"]').exists()).toBe(false)
  })

  it('clicking another item opens it', async () => {
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.find('[id="faq-content-item-2"]').exists()).toBe(true)
  })

  it('only one item is open at a time', async () => {
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // open item-2
    expect(wrapper.find('[id="faq-content-item-1"]').exists()).toBe(false)
    expect(wrapper.find('[id="faq-content-item-2"]').exists()).toBe(true)
  })

  it('clicking an already-open item closes it', async () => {
    // item-1 is open by default
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click') // toggle item-1 off
    expect(wrapper.find('[id="faq-content-item-1"]').exists()).toBe(false)
  })

  it('clicking item-1 when item-3 is open closes item-3 and opens item-1', async () => {
    const buttons = wrapper.findAll('button')
    await buttons[2].trigger('click') // open item-3
    expect(wrapper.find('[id="faq-content-item-3"]').exists()).toBe(true)
    await buttons[0].trigger('click') // open item-1
    expect(wrapper.find('[id="faq-content-item-1"]').exists()).toBe(true)
    expect(wrapper.find('[id="faq-content-item-3"]').exists()).toBe(false)
  })

  it('aria-expanded is true on the open item button', async () => {
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // open item-2
    expect(buttons[1].attributes('aria-expanded')).toBe('true')
  })

  it('aria-expanded is false on closed item buttons', async () => {
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // open item-2
    // item-1 should be closed
    expect(buttons[0].attributes('aria-expanded')).toBe('false')
    // item-3 should be closed
    expect(buttons[2].attributes('aria-expanded')).toBe('false')
  })

  it('renders the correct answer text when an item is open', async () => {
    const buttons = wrapper.findAll('button')
    await buttons[2].trigger('click') // open item-3
    const answer = wrapper.find('[id="faq-content-item-3"]')
    expect(answer.text()).toContain('Google')
  })
})
