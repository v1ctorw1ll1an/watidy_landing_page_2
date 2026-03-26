import { describe, it, expect } from 'vitest'
import { hexToRgb } from '../utils/color.js'

describe('hexToRgb', () => {
  it('converts black to "0,0,0"', () => {
    expect(hexToRgb('#000000')).toBe('0,0,0')
  })

  it('converts white to "255,255,255"', () => {
    expect(hexToRgb('#ffffff')).toBe('255,255,255')
  })

  it('converts pure red to "255,0,0"', () => {
    expect(hexToRgb('#ff0000')).toBe('255,0,0')
  })

  it('converts pure green to "0,255,0"', () => {
    expect(hexToRgb('#00ff00')).toBe('0,255,0')
  })

  it('converts pure blue to "0,0,255"', () => {
    expect(hexToRgb('#0000ff')).toBe('0,0,255')
  })

  it('converts brand color #09ef8d to "9,239,141"', () => {
    expect(hexToRgb('#09ef8d')).toBe('9,239,141')
  })

  it('converts #1a2b3c to "26,43,60"', () => {
    expect(hexToRgb('#1a2b3c')).toBe('26,43,60')
  })

  it('handles uppercase hex values', () => {
    expect(hexToRgb('#FF8800')).toBe('255,136,0')
  })

  it('handles mixed case hex', () => {
    expect(hexToRgb('#aAbBcC')).toBe('170,187,204')
  })
})
