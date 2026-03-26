import { getDeviceType } from '../utils/device.js'

function getScreenResolution() {
  return `${screen.width}x${screen.height}`
}

async function getUserIP() {
  try {
    const r = await fetch('https://api.ipify.org?format=json')
    const d = await r.json()
    return d.ip || ''
  } catch (_) {
    return ''
  }
}

function getCookieOrParam(name, urlParams) {
  for (const c of document.cookie.split(';')) {
    const [k, v] = c.trim().split('=')
    if (k === name) return decodeURIComponent(v || '')
  }
  return urlParams.get(name) || ''
}

export async function captureTrackingData() {
  const urlParams = new URLSearchParams(window.location.search)
  const get = name => getCookieOrParam(name, urlParams)
  const userIP = await getUserIP()

  return {
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    gad_campaign: get('gad_campaign'),
    gad_source: get('gad_source'),
    utm_term: get('utm_term'),
    utm_content: get('utm_content'),
    utm_id: get('utm_id'),
    utm_adgroup: get('utm_adgroup'),
    utm_creative: get('utm_creative'),
    utm_network: get('utm_network'),
    gclid: get('gclid'),
    gbraid: get('gbraid'),
    fbclid: get('fbclid'),
    ttclid: get('ttclid'),
    ttp: get('ttp'),
    wbraid: get('wbraid'),
    sck: get('sck'),
    user_ip: userIP,
    page_url: window.location.href,
    referrer: document.referrer || '',
    screen_resolution: getScreenResolution(),
    device: getDeviceType(),
    user_agent: navigator.userAgent,
  }
}

export function getCheckoutUrlsWithTracking(baseUrls) {
  const urlParams = new URLSearchParams(window.location.search)
  const trackedParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'gad_source',
    'utm_term',
    'utm_content',
    'utm_id',
    'utm_adgroup',
    'utm_creative',
    'utm_network',
    'gclid',
    'gbraid',
    'fbclid',
    'screen_resolution',
    'user_ip',
    'page_url',
    'referrer',
    'device',
    'user_agent',
  ]

  const allParams = {}
  urlParams.forEach((value, key) => {
    if (trackedParams.includes(key)) allParams[key] = value
  })

  if (!allParams['utm_source'] && document.referrer) {
    try {
      const domain = new URL(document.referrer).hostname
      allParams['utm_source'] = domain
      allParams['utm_medium'] = 'referencia'
    } catch (_) {}
  }

  return baseUrls.map(url => {
    try {
      const urlObj = new URL(url)
      Object.entries(allParams).forEach(([key, value]) => {
        if (value) urlObj.searchParams.append(key, value)
      })
      return urlObj.toString()
    } catch (_) {
      return url
    }
  })
}
