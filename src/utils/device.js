export function getDeviceType() {
  return /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
    navigator.userAgent.toLowerCase(),
  )
    ? 'Mobile'
    : 'Desktop'
}
