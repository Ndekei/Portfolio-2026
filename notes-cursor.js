/* Figma-style multiplayer cursor — Notes pages only */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const OWNER = { name: 'Victor · Note Taker', color: '#004CFF' };

  // Inject cursor styles
  const style = document.createElement('style');
  style.textContent = `
    body, body * { cursor: none !important; }
    .fig-cursor {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 99999;
      will-change: transform;
      opacity: 0;
    }
    .fig-cursor svg {
      display: block;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));
    }
    .fig-cursor .fig-label {
      position: absolute;
      top: 18px;
      left: 14px;
      padding: 3px 8px 4px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.3;
      color: #fff;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      user-select: none;
      font-family: Inter, -apple-system, sans-serif;
    }
  `;
  document.head.appendChild(style);

  function createCursor({ name, color }) {
    const el = document.createElement('div');
    el.className = 'fig-cursor';
    el.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 3.2 L18.6 11.4 L11.9 12.7 L8.4 18.8 Z"
              fill="${color}" stroke="#ffffff" stroke-width="1.4"
              stroke-linejoin="round"/>
      </svg>
      <span class="fig-label" style="background:${color}">${name}</span>
    `;
    document.body.appendChild(el);
    return el;
  }

  const me = createCursor(OWNER);
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX, y = targetY;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    me.style.opacity = '1';
  });

  window.addEventListener('mouseleave', () => { me.style.opacity = '0'; });
  window.addEventListener('mouseenter', () => { me.style.opacity = '1'; });

  function tick() {
    x += (targetX - x) * 0.35;
    y += (targetY - y) * 0.35;
    me.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
