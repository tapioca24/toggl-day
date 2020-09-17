const hexColor2Brightness = hexColor => {
  let hex = hexColor.replace(/^\s*#|\s*$/g, '')

  // convert 3 char codes => 6, e.g. 'E0F' => 'EE00FF'
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1')
  }

  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // grayscale by NTSC coefficient
  const brightness = 0.298912 * r + 0.586611 * g + 0.114478 * b
  return brightness
}

module.exports = {
  hexColor2Brightness
}
