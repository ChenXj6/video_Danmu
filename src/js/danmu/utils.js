export function isObject (val) {
  const type = Object.prototype.toString.call(val)
  return type === '[Object Object]'
}

export function isArray (val) {
  return Array.isArray(val)
}

export function getTextWidth (content, fontSize) {
  let _span = document.createElement('span');
  _span.innerText = content;
  _span.style.fontSize = fontSize + 'px';
  _span.style.position = 'absolute';
  document.body.appendChild(_span);
  let width = _span.offsetWidth;
  document.body.removeChild(_span);
  return width
}

export function getTextPosition (canvas, fontSize, ctx) {
  let X = canvas.width, Y = canvas.height * Math.random()
  Y < fontSize && (Y = fontSize)
  Y > canvas.height - fontSize && (Y = canvas.height)

  // Y > canvas.height - fontSize && (Y = canvas.height);

  ctx.x = X;
  ctx.y = Y;
}