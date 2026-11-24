// Speelt een <video data-speed="..."> af zodra die dia actief is, met de opgegeven snelheid,
// en zet hem bij het verlaten stil en terug naar het begin.
// Marp zet de dia's in een SVG, waar inline scripts niet draaien. Daarom staat dit los
// en voegt build.sh het onderaan de HTML toe.
(() => {
  const sync = () => document.querySelectorAll('video[data-speed]').forEach((v) => {
    const svg = v.closest('svg');
    const actief = svg && svg.classList.contains('bespoke-marp-active');
    if (actief && !v.dataset.speelt) {
      v.dataset.speelt = '1';
      v.currentTime = 0;
      v.playbackRate = Number(v.dataset.speed) || 1;
      v.play().catch(() => {});
    } else if (!actief && v.dataset.speelt) {
      delete v.dataset.speelt;
      v.pause();
      v.currentTime = 0;
    }
  });
  setInterval(sync, 200);
})();
