// ---- DATA ----
const PORT = [
  {cat:'Wedding',title:'Sarah & James',img:'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80'},
  {cat:'Portrait',title:'Golden Hour',img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80'},
  {cat:'Fashion',title:'Vogue Noir',img:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80'},
  {cat:'Wildlife',title:'Serengeti',img:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80'},
  {cat:'Travel',title:'Santorini Dusk',img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80'},
  {cat:'Events',title:'Gala Night',img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80'},
  {cat:'Wedding',title:'Emma & Lucas',img:'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&q=80'},
  {cat:'Portrait',title:'Urban Soul',img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=80'},
  {cat:'Fashion',title:'Monochrome',img:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80'},
];

const TESTI = [
  {name:'Priya Sharma',role:'Bride, 2024',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',text:'Absolutely breathtaking work. Every photo tells a story so beautifully. We will cherish these memories for a lifetime.'},
  {name:'Arjun Mehta',role:'CEO, TechVentures',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',text:'The product shots completely transformed our brand presence. Professional, incredibly creative, and always on time.'},
  {name:'Ananya Reddy',role:'Fashion Blogger',img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',text:'My portfolio photos got me signed with three agencies. The artistry and attention to detail here is truly unmatched.'},
  {name:'Rahul Kapoor',role:'Event Manager',img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',text:'Our annual gala was captured perfectly. The candid moments and creative compositions were simply spectacular.'},
];

// ---- LOADING ----
window.addEventListener('load', ()=>{
  setTimeout(()=>{
    document.getElementById('loading').classList.add('done');
    setTimeout(()=>{
      document.getElementById('loading').style.display='none';
      initReveal();
      initStats();
    },650);
  },2600);
});

// ---- HERO SLIDESHOW ----
let slide=0;
function setSlide(n){
  document.getElementById('slide'+slide).classList.remove('active');
  document.querySelectorAll('.hero-dot')[slide].classList.remove('active');
  slide=n;
  document.getElementById('slide'+slide).classList.add('active');
  document.querySelectorAll('.hero-dot')[slide].classList.add('active');
}
setInterval(()=>setSlide((slide+1)%3),5500);

// ---- NAVBAR ----
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('solid',window.scrollY>70);
  document.getElementById('back-top').classList.toggle('show',window.scrollY>400);
});

// ---- HAMBURGER ----
const hmbgr=document.getElementById('hmbgr');
const mobMenu=document.getElementById('mob-menu');
hmbgr.addEventListener('click',()=>{
  hmbgr.classList.toggle('open');
  mobMenu.style.display=mobMenu.style.display==='flex'?'none':'flex';
});
function closeMob(){hmbgr.classList.remove('open');mobMenu.style.display='none';}

// ---- PORTFOLIO ----
function renderPort(filter){
  const m=document.getElementById('masonry');
  const items=filter==='All'?PORT:PORT.filter(p=>p.cat===filter);
  m.innerHTML=items.map(p=>`
    <div class="port-item" onclick="openLb('${p.img.replace('w=700','w=1400')}','${p.cat}','${p.title}')">
      <img src="${p.img}" alt="${p.title}" loading="lazy"/>
      <div class="port-overlay">
        <p class="port-cat">${p.cat}</p>
        <p class="port-title">${p.title}</p>
      </div>
    </div>`).join('');
}
renderPort('All');

function filterPort(cat,btn){
  document.querySelectorAll('.flt-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const m=document.getElementById('masonry');
  m.style.opacity='0';
  setTimeout(()=>{renderPort(cat);m.style.opacity='1';m.style.transition='opacity .4s';},300);
}

// ---- LIGHTBOX ----
function openLb(img,cat,title){
  document.getElementById('lb-img').src=img;
  document.getElementById('lb-cat').textContent=cat;
  document.getElementById('lb-title').textContent=title;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLb(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('lightbox').addEventListener('click',function(e){if(e.target===this)closeLb();});

// ---- TESTIMONIALS ----
let tIdx=0;
function buildTesti(){
  const dotsEl=document.getElementById('testi-dots');
  dotsEl.innerHTML=TESTI.map((_,i)=>`<button class="t-dot ${i===0?'active':''}" onclick="setTesti(${i})"></button>`).join('');
}
function setTesti(n){
  tIdx=n;
  const t=TESTI[n];
  const card=document.getElementById('testi-card');
  card.style.opacity='0';
  setTimeout(()=>{
    document.getElementById('testi-text').textContent=t.text;
    document.getElementById('testi-img').src=t.img;
    document.getElementById('testi-img').alt=t.name;
    document.getElementById('testi-name').textContent=t.name;
    document.getElementById('testi-role').textContent=t.role;
    document.querySelectorAll('.t-dot').forEach((d,i)=>d.classList.toggle('active',i===n));
    card.style.opacity='1';card.style.transition='opacity .5s';
  },300);
}
buildTesti();
setTesti(0);
setInterval(()=>setTesti((tIdx+1)%TESTI.length),4500);

// ---- SCROLL REVEAL ----
function initReveal(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');}});
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

// ---- STATS COUNTER ----
let statsRan=false;
function initStats(){
  const statsRow=document.getElementById('stats-row');
  if(!statsRow)return;
  const obs=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting&&!statsRan){
      statsRan=true;
      count('s-clients',500,2000);
      count('s-shoots',1200,2200);
      count('s-years',10,1400);
    }
  },{threshold:.3});
  obs.observe(statsRow);
}
function count(id,target,dur){
  const el=document.getElementById(id);
  let v=0;
  const step=Math.ceil(target/(dur/16));
  const t=setInterval(()=>{v=Math.min(v+step,target);el.textContent=v+(target>=100?'+':'+');if(v>=target)clearInterval(t);},16);
}

// ---- SEND ----
function handleSend(){
  const msg=document.getElementById('send-msg');
  msg.style.display='block';
  setTimeout(()=>{msg.style.display='none';},4500);
}

//mail

function sendMail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const eventType = document.getElementById("eventType").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent("Photography Booking Request");
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Event Type: ${eventType}\n\n` +
        `Message:\n${message}`
    );

    window.location.href =
        `mailto:hussainsonoor@gmail.com?subject=${subject}&body=${body}`;
}

// ---- DARK TOGGLE ----
let dark=true;
document.getElementById('dark-toggle').addEventListener('click',function(){
  dark=!dark;
  document.documentElement.style.setProperty('--bg',dark?'#0B0B0B':'#F2EFE8');
  document.documentElement.style.setProperty('--bg2',dark?'#111':'#E8E4D8');
  document.documentElement.style.setProperty('--bg3',dark?'#161616':'#DDD8CC');
  document.documentElement.style.setProperty('--fg',dark?'#F5F5F0':'#1A1A16');
  document.documentElement.style.setProperty('--muted',dark?'rgba(245,245,240,.55)':'rgba(26,26,22,.5)');
  document.documentElement.style.setProperty('--border',dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.1)');
  document.body.style.background=dark?'#0B0B0B':'#F2EFE8';
  this.textContent=dark?'☀':'🌙';
});
