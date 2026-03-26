import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { captureTrackingData, getCheckoutUrlsWithTracking } from '../composables/useTracking.js'

const BASE_URLS = [
  'https://go.watidy.com.br/subscribe/watidy-1-usuario',
  'https://go.watidy.com.br/subscribe/watidy-2-usuarios',
  'https://go.watidy.com.br/subscribe/watidy-3-usuarios',
  'https://go.watidy.com.br/subscribe/watidy-4-usuarios',
  'https://go.watidy.com.br/subscribe/watidy-5-usuarios',
  'https://wa.me/+553129424122?text=Ol%C3%A1',
]

function setLocation(search = '', href = 'http://localhost/') {
  vi.stubGlobal('location', { search, href, host: 'localhost' })
}

function setReferrer(value) {
  Object.defineProperty(document, 'referrer', { configurable: true, get: () => value })
}

describe('getCheckoutUrlsWithTracking', () => {
  beforeEach(() => {
    setLocation()
    setReferrer('')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    setReferrer('')
  })

  it('returns same number of URLs as input', () => {
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    expect(result).toHaveLength(BASE_URLS.length)
  })

  it('returns base URLs unchanged when no tracking params and no referrer', () => {
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    expect(result).toEqual(BASE_URLS)
  })

  it('appends utm_source to each URL when present in search', () => {
    setLocation('?utm_source=google')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    for (const url of result) {
      const parsed = new URL(url)
      expect(parsed.searchParams.get('utm_source')).toBe('google')
    }
  })

  it('appends multiple tracking params to each URL', () => {
    setLocation('?utm_source=google&utm_medium=cpc&gclid=abc123')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    for (const url of result) {
      const parsed = new URL(url)
      expect(parsed.searchParams.get('utm_source')).toBe('google')
      expect(parsed.searchParams.get('utm_medium')).toBe('cpc')
      expect(parsed.searchParams.get('gclid')).toBe('abc123')
    }
  })

  it('does not append empty-value params', () => {
    setLocation('?utm_source=google&utm_medium=')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    for (const url of result) {
      const parsed = new URL(url)
      expect(parsed.searchParams.has('utm_medium')).toBe(false)
    }
  })

  it('does not append non-tracked params', () => {
    setLocation('?foo=bar&utm_source=test')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    for (const url of result) {
      const parsed = new URL(url)
      expect(parsed.searchParams.has('foo')).toBe(false)
    }
  })

  it('preserves original URL path and origin', () => {
    setLocation('?utm_source=google')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    result.slice(0, 5).forEach((url, i) => {
      expect(url).toContain(new URL(BASE_URLS[i]).pathname)
    })
  })

  it('sets utm_source from referrer domain when no UTM in URL', () => {
    setReferrer('https://google.com/search')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    for (const url of result) {
      const parsed = new URL(url)
      expect(parsed.searchParams.get('utm_source')).toBe('google.com')
      expect(parsed.searchParams.get('utm_medium')).toBe('referencia')
    }
  })

  it('does not override utm_source with referrer when UTM is in URL', () => {
    setLocation('?utm_source=paid')
    setReferrer('https://google.com/search')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    for (const url of result) {
      const parsed = new URL(url)
      expect(parsed.searchParams.get('utm_source')).toBe('paid')
    }
  })

  it('handles WhatsApp URL (6th URL): preserves text= param', () => {
    setLocation('?utm_source=test')
    const result = getCheckoutUrlsWithTracking(BASE_URLS)
    const waUrl = new URL(result[5])
    expect(waUrl.searchParams.has('text')).toBe(true)
    expect(waUrl.searchParams.get('utm_source')).toBe('test')
  })

  it('returns malformed URL unchanged', () => {
    const malformed = ['not-a-valid-url']
    const result = getCheckoutUrlsWithTracking(malformed)
    expect(result[0]).toBe('not-a-valid-url')
  })
})

describe('captureTrackingData', () => {
  beforeEach(() => {
    setLocation()
    setReferrer('')
    vi.mocked(global.fetch).mockResolvedValue({ ok: true, json: async () => ({ ip: '1.2.3.4' }) })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    setReferrer('')
  })

  it('extracts utm_source from URL search params', async () => {
    setLocation('?utm_source=google', 'http://localhost/?utm_source=google')
    const data = await captureTrackingData()
    expect(data.utm_source).toBe('google')
  })

  it('extracts utm_medium from URL search params', async () => {
    setLocation('?utm_medium=cpc')
    const data = await captureTrackingData()
    expect(data.utm_medium).toBe('cpc')
  })

  it('extracts gclid from URL search params', async () => {
    setLocation('?gclid=abc123')
    const data = await captureTrackingData()
    expect(data.gclid).toBe('abc123')
  })

  it('extracts fbclid from URL search params', async () => {
    setLocation('?fbclid=fb_abc')
    const data = await captureTrackingData()
    expect(data.fbclid).toBe('fb_abc')
  })

  it('returns empty string for params not in URL or cookies', async () => {
    const data = await captureTrackingData()
    expect(data.utm_source).toBe('')
    expect(data.utm_campaign).toBe('')
  })

  it('returns user IP from ipify fetch', async () => {
    const data = await captureTrackingData()
    expect(data.user_ip).toBe('1.2.3.4')
  })

  it('returns empty string for user_ip when fetch fails', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))
    const data = await captureTrackingData()
    expect(data.user_ip).toBe('')
  })

  it('captures page_url from window.location.href', async () => {
    setLocation('', 'https://watidy.com.br/')
    const data = await captureTrackingData()
    expect(data.page_url).toBe('https://watidy.com.br/')
  })

  it('captures referrer from document.referrer', async () => {
    setReferrer('https://google.com')
    const data = await captureTrackingData()
    expect(data.referrer).toBe('https://google.com')
  })

  it('returns empty string when document.referrer is empty', async () => {
    const data = await captureTrackingData()
    expect(data.referrer).toBe('')
  })

  it('captures user_agent from navigator.userAgent', async () => {
    const data = await captureTrackingData()
    expect(data.user_agent).toBe(navigator.userAgent)
  })
})
