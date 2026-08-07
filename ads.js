/* Shared AdSense loader.
   Every .adslot on the page gets a unit, in document order, from SLOTS.
   With no slot ids set, nothing loads and no external request is made —
   the pages work identically with ads off, blocked, or unsold. */
(function(){
  var CLIENT = 'ca-pub-5619507936329297';
  var SLOTS  = [];        // <-- paste display ad unit slot ids, e.g. ['1234567890','0987654321']

  if(!SLOTS.length) return;

  var boxes = [].slice.call(document.querySelectorAll('.adslot'));
  if(!boxes.length) return;

  var s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENT;
  s.onerror = function(){ boxes.forEach(function(b){ b.style.display = 'none'; }); };
  document.head.appendChild(s);

  boxes.forEach(function(box, i){
    var slot = SLOTS[i % SLOTS.length];
    if(!slot){ box.style.display = 'none'; return; }
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', CLIENT);
    ins.setAttribute('data-ad-slot', slot);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    box.appendChild(ins);
    try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }
    catch(e){ box.style.display = 'none'; }
    setTimeout(function(){
      if(ins.getAttribute('data-ad-status') === 'unfilled') box.style.display = 'none';
    }, 4000);
  });
})();
