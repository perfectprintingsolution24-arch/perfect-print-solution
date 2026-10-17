(function(){
  const WA='918892034849';
  const selectors=['.item .placeholder','.featured-item .product-placeholder','.featured-item .placeholder','.collection-card .collection-art','.item .product-placeholder','.product-card .product-placeholder'];
  function text(el,sel){const n=el.querySelector(sel);return n?n.textContent.trim():''}
  function createModal(){
    if(document.getElementById('productDetailOverlay')) return;
    const overlay=document.createElement('div');overlay.id='productDetailOverlay';overlay.className='product-detail-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Product details');
    overlay.innerHTML='<div class="product-detail-dialog"><button class="product-detail-close" type="button" aria-label="Close details">×</button><div class="product-detail-visual"><div class="product-detail-image" id="productDetailImage" role="img" aria-label="Product photo"></div><div class="zoom-controls"><button type="button" id="zoomOut" aria-label="Zoom out">−</button><button type="button" id="zoomReset" aria-label="Reset zoom">↺</button><button type="button" id="zoomIn" aria-label="Zoom in">+</button></div></div><div class="product-detail-copy"><span class="product-detail-code" id="productDetailCode"></span><h2 id="productDetailTitle"></h2><p id="productDetailDescription"></p><div class="product-detail-meta" id="productDetailMeta">Ask us about available sizes, paper/material, finishes, quantity and price.</div><a class="product-detail-cta" id="productDetailWhatsApp" href="#" target="_blank" rel="noopener">Ask price / Order on WhatsApp ↗</a><p class="product-detail-hint">This opens WhatsApp with this product name and code. Review the message and press Send. Final price and availability are confirmed by our team.</p></div></div>';
    document.body.appendChild(overlay);
    const close=()=>{overlay.classList.remove('is-open');document.body.classList.remove('modal-open');};
    overlay.querySelector('.product-detail-close').addEventListener('click',close);
    overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    let scale=1;const image=overlay.querySelector('#productDetailImage');
    function setScale(v){scale=Math.max(1,Math.min(3,v));image.style.transform='scale('+scale+')';image.classList.toggle('is-zoomed',scale>1)}
    overlay.querySelector('#zoomIn').addEventListener('click',()=>setScale(scale+.25));
    overlay.querySelector('#zoomOut').addEventListener('click',()=>setScale(scale-.25));
    overlay.querySelector('#zoomReset').addEventListener('click',()=>setScale(1));
    image.addEventListener('click',()=>setScale(scale>1?1:1.5));
    image.addEventListener('wheel',e=>{e.preventDefault();setScale(scale+(e.deltaY<0?.15:-.15))},{passive:false});
    overlay._open=(card,visual)=>{
      const title=text(card,'.info h3')||text(card,'.product-copy h3')||text(card,'.collection-copy h3')||text(card,'h3')||'Printing Product';
      const desc=text(card,'.info p')||text(card,'.product-copy p')||text(card,'.collection-copy p')||'Contact us for product details and customization options.';
      const code=text(card,'.model')||text(card,'.product-tag')||text(card,'.product-code')||'PERFECT PRINT SOLUTION';
      const bg=getComputedStyle(visual).backgroundImage;
      const childImg=visual.querySelector('img');
      image.style.backgroundImage=(childImg?'none':(bg&&bg!=='none'?bg:'linear-gradient(145deg,#f5eee5,#e4d4c2)'));
      image.innerHTML=childImg?'<img alt="'+title.replace(/"/g,'&quot;')+'" src="'+childImg.src+'">':'';
      image.setAttribute('aria-label',title+' product image');setScale(1);
      overlay.querySelector('#productDetailCode').textContent=code;
      overlay.querySelector('#productDetailTitle').textContent=title;
      overlay.querySelector('#productDetailDescription').textContent=desc;
      overlay.querySelector('#productDetailMeta').textContent='Ask us about available sizes, paper/material, print options, finish, quantity and price for '+title+'.';
      const msg='Hello PERFECT PRINT SOLUTION, I would like details and a quotation for this product.\nProduct: '+title+'\nProduct code: '+code+'\nPlease share available sizes, customization options, minimum quantity, price and delivery time.';
      overlay.querySelector('#productDetailWhatsApp').href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
      overlay.classList.add('is-open');document.body.classList.add('modal-open');
    };
  }
  function init(){
    createModal();
    document.querySelectorAll(selectors.join(',')).forEach(visual=>{
      visual.classList.add('product-openable');visual.setAttribute('tabindex','0');visual.setAttribute('role','button');visual.setAttribute('aria-label','View product details and zoom image');
      const card=visual.closest('.item,.featured-item,.collection-card,.product-card')||visual.parentElement;
      const open=()=>document.getElementById('productDetailOverlay')._open(card,visual);
      visual.addEventListener('click',open);visual.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
    });
    document.querySelectorAll('.item .info a,.featured-item a.quote-link,.collection-card a,.product-card a').forEach(a=>{if(!a.dataset.keepDirectLink){a.addEventListener('click',e=>{if(a.closest('.item')||a.closest('.featured-item')){e.preventDefault();const card=a.closest('.item,.featured-item');const visual=card.querySelector('.placeholder,.product-placeholder');if(visual)document.getElementById('productDetailOverlay')._open(card,visual)}})}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
