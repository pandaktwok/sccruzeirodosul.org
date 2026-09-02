import { useState, useEffect, useRef } from 'react';

const TWEAK_DEFAULTS = {
  heroStyle: 'split',
  titleFont: "'Playfair Display', serif",
};

// ── Icons ──────────────────────────────────────────────────────────────────
const IconChevron = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconBuilding = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="8" y="10" width="20" height="22" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M13 32V22h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="12" y="14" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="20" y="14" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M18 4l-10 6h20z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const IconPerson = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="10" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M8 32c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="26" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M22 23l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconWhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconMail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);
const IconInstagram = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const IconPin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

// ── useScrollReveal ─────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ font }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Projetos', href: '#projetos' },
    { label: 'Nossa História', href: '#depoimentos' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? 'rgba(253,252,249,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(14px)' : 'none',
    borderBottom: scrolled ? '1px solid oklch(0 0 0 / 0.07)' : 'none',
    transition: 'all 0.4s ease',
    padding: '0 clamp(20px,5vw,80px)',
  };
  const innerStyle = { maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 };
  const linkStyle = { color: scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' };

  return (
    <>
      <nav style={navStyle}>
        <div style={innerStyle}>
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="https://bimagem.sccruzeirodosul.org/logo_sccs/favicon.png" alt="Sociedade Cultural Cruzeiro do Sul" style={{ height: 48, width: 'auto', filter: scrolled ? 'none' : 'brightness(0) invert(1)', transition: 'filter 0.4s' }} />
          </a>
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-links-desktop">
            {links.map(l => (
              <a key={l.label} href={l.href} style={linkStyle}
                onMouseEnter={e => e.target.style.color = scrolled ? 'var(--green-deep)' : 'white'}
                onMouseLeave={e => e.target.style.color = scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.85)'}
              >{l.label}</a>
            ))}
            <a href="#doacao" style={{ background: 'var(--bordo)', color: 'white', padding: '10px 22px', borderRadius: 100, textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.target.style.opacity = '0.85'} onMouseLeave={e => e.target.style.opacity = '1'}>
              Apoiar Agora
            </a>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? 'var(--green-deep)' : 'white' }}
            className="nav-mobile-btn">
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div style={{ position: 'fixed', top: 72, left: 0, right: 0, bottom: 0, zIndex: 999, background: 'var(--warm-white)', display: 'flex', flexDirection: 'column', padding: '32px 28px', gap: 24 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-dark)', textDecoration: 'none', fontSize: 24, fontFamily: font, fontWeight: 600 }}>{l.label}</a>
          ))}
          <a href="#doacao" onClick={() => setMobileOpen(false)} style={{ background: 'var(--bordo)', color: 'white', padding: '16px 28px', borderRadius: 100, textDecoration: 'none', fontSize: 18, fontWeight: 600, textAlign: 'center', marginTop: 8 }}>Apoiar Agora</a>
        </div>
      )}
    </>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero({ font, heroStyle }) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = [{ set: setCount1, target: 3200 }, { set: setCount2, target: 84 }, { set: setCount3, target: 37 }];
    if (reduced) { targets.forEach(({ set, target }) => set(target)); return; }
    targets.forEach(({ set, target }) => {
      let start = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { set(target); clearInterval(timer); }
        else set(Math.floor(start));
      }, 25);
    });
  }, []);

  const centered = heroStyle === 'centered';

  return (
    <section style={{ minHeight: '100vh', background: 'var(--green-deep)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '100px clamp(20px,5vw,80px) 60px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://bimagem.sccruzeirodosul.org/bmcs/%40eduardo%20delgado/SCCS_05_06_2022_11.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, oklch(0.15 0.08 148 / 0.88) 0%, oklch(0.20 0.09 148 / 0.75) 50%, oklch(0.25 0.10 14 / 0.70) 100%)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 48, background: 'var(--warm-white)', clipPath: 'ellipse(60% 48px at 50% 48px)' }} />

      <div className="hero-content-grid" style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: centered ? '1fr' : 'clamp(300px,55%,640px) 1fr', gap: 60, alignItems: 'center' }}>
        <div style={{ textAlign: centered ? 'center' : 'left' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'oklch(1 0 0 / 0.12)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sociedade Cultural</span>
          </div>
          <h1 style={{ fontFamily: font, fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: 'white', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Transformando vidas<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>através da cultura.</em>
          </h1>
          <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginBottom: 40, maxWidth: centered ? 520 : '100%', margin: centered ? '0 auto 40px' : '0 0 40px' }}>
            Há décadas construímos espaços de cuidado, aprendizado e pertencimento. Sua contribuição chega diretamente a quem mais precisa.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: centered ? 'center' : 'flex-start' }}>
            <a href="#doacao" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: 'var(--green-deep)', padding: '16px 32px', borderRadius: 100, fontWeight: 700, fontSize: 16, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 24px oklch(0 0 0 / 0.18)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px oklch(0 0 0 / 0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px oklch(0 0 0 / 0.18)'; }}>
              ✦ Fazer uma doação
            </a>
            <a href="#projetos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'oklch(1 0 0 / 0.1)', color: 'white', padding: '16px 32px', borderRadius: 100, fontWeight: 500, fontSize: 16, textDecoration: 'none', border: '1px solid oklch(1 0 0 / 0.25)', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'oklch(1 0 0 / 0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'oklch(1 0 0 / 0.1)'}>
              Conhecer projetos →
            </a>
          </div>
          <div style={{ display: 'flex', gap: 36, marginTop: 56, flexWrap: 'wrap', justifyContent: centered ? 'center' : 'flex-start' }}>
            {[
              { val: count1.toLocaleString('pt-BR'), suffix: '+', label: 'Vidas impactadas' },
              { val: count2, suffix: ' anos', label: 'De história' },
              { val: count3, suffix: ' projetos', label: 'executados' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: font, fontSize: 36, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>{s.val}<span style={{ fontSize: 20 }}>{s.suffix}</span></div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {!centered && (
          <div className="hero-photo-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, position: 'relative' }}>
            {[
              { src: 'https://bimagem.sccruzeirodosul.org/bmcs/%40eduardo%20delgado/SCCS_05_06_2022.jpg', gridColumn: '1', height: 280 },
              { src: 'https://bimagem.sccruzeirodosul.org/bmcs/SCCS_06_11_2021.jpg', gridColumn: '2', height: 280 },
              { src: 'https://bimagem.sccruzeirodosul.org/bmcs/SCCS_03_07_2022.jpg', gridColumn: '1 / -1', height: 120 },
            ].map((card, i) => (
              <div key={i} style={{ gridColumn: card.gridColumn, borderRadius: 20, overflow: 'hidden', height: card.height, border: '1px solid oklch(1 0 0 / 0.12)', boxShadow: '0 8px 32px oklch(0 0 0 / 0.3)' }}>
                <img src={card.src} alt="" role="presentation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Social Proof ────────────────────────────────────────────────────────────
function SocialProof() {
  const logos = [
    { name: 'Anjo', url: 'https://bimagem.sccruzeirodosul.org/logos/Anjo.png' },
    { name: 'Bramatal', url: 'https://bimagem.sccruzeirodosul.org/logos/Bramatal.png' },
    { name: 'Carvão+', url: 'https://bimagem.sccruzeirodosul.org/logos/CARVAO+.png' },
    { name: 'CMDCA', url: 'https://bimagem.sccruzeirodosul.org/logos/CMDCA.png' },
    { name: 'DEXCO', url: 'https://bimagem.sccruzeirodosul.org/logos/DEXCO.png' },
    { name: 'Dicave', url: 'https://bimagem.sccruzeirodosul.org/logos/Dicave.png' },
    { name: 'FCC', url: 'https://bimagem.sccruzeirodosul.org/logos/FCC.png' },
    { name: 'Mercado Livre', url: 'https://bimagem.sccruzeirodosul.org/logos/Mercado%20Livre.png' },
    { name: 'Mercado Pago', url: 'https://bimagem.sccruzeirodosul.org/logos/Mercado_Pago_Vertical.png' },
    { name: 'Prefeitura Criciúma', url: 'https://bimagem.sccruzeirodosul.org/logos/prefeitura_criciuma.png' },
    { name: 'Secretaria de Educação', url: 'https://bimagem.sccruzeirodosul.org/logos/Secretaria%20Municipal%20de%20Educa%C3%A7%C3%A3o.png' },
    { name: 'Shimano', url: 'https://bimagem.sccruzeirodosul.org/logos/Shimano.png.png' },
    { name: 'Giassi', url: 'https://bimagem.sccruzeirodosul.org/logos/giassi.png' },
    { name: 'Camil', url: 'https://bimagem.sccruzeirodosul.org/logos/logo_Camil.png' },
    { name: 'Scherer Autopeças', url: 'https://bimagem.sccruzeirodosul.org/logos/scherer_autope%C3%A7as.png' },
    { name: 'Viveo', url: 'https://bimagem.sccruzeirodosul.org/logos/viveo.png' },
    { name: 'TSA Química', url: 'https://bimagem.sccruzeirodosul.org/logos/tsaquimica.webp' },
    { name: 'Empresa Icon', url: 'https://bimagem.sccruzeirodosul.org/logos/Empresa%20Icon.png' },
  ];
  const all = [...logos, ...logos];

  return (
    <section style={{ background: 'var(--warm-white)', padding: '56px 0' }}>
      <p className="reveal" style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-light)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 32 }}>Apoio</p>
      <div className="reveal reveal-delay-1 marquee-wrap">
        <div className="marquee-track">
          {all.map((logo, i) => (
            <div key={i} style={{ flexShrink: 0, margin: '0 8px', padding: '12px 24px', background: 'var(--cream)', borderRadius: 16, border: '1px solid oklch(0 0 0 / 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140, minWidth: 220, transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = '0 4px 20px oklch(0 0 0 / 0.08)'; e.currentTarget.style.borderColor = 'oklch(0 0 0 / 0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'oklch(0 0 0 / 0.06)'; }}>
              <img src={logo.url} alt={logo.name}
                style={{ height: logo.name === 'Mercado Pago' ? 110 : 80, maxWidth: logo.name === 'Mercado Pago' ? 160 : 200, objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.6, transition: 'all 0.25s', display: 'block' }}
                onMouseEnter={e => { e.target.style.filter = 'none'; e.target.style.opacity = '1'; }}
                onMouseLeave={e => { e.target.style.filter = 'grayscale(1)'; e.target.style.opacity = '0.6'; }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── IRCard ──────────────────────────────────────────────────────────────────
function IRCard({ font, delay, bg, bgHover, icon, pct, title, shortDesc, detailTitle, detailItems, detailExtra, detailNote }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={`reveal reveal-delay-${delay}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? bgHover : bg, borderRadius: 24, padding: '32px', display: 'flex', flexDirection: 'column', gap: 16, color: 'white', transition: 'all 0.45s cubic-bezier(0.34, 1.2, 0.64, 1)', boxShadow: hovered ? '0 24px 60px oklch(0 0 0 / 0.3)' : 'none', transform: hovered ? 'translateY(-4px)' : 'none', cursor: 'default', overflow: 'hidden', position: 'relative', minHeight: hovered ? 460 : 340, height: hovered ? 'auto' : 340 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', transition: 'opacity 0.35s, transform 0.35s', opacity: hovered ? 0 : 1, transform: hovered ? 'translateY(-12px)' : 'none', position: hovered ? 'absolute' : 'relative', inset: hovered ? '24px 28px' : undefined, pointerEvents: 'none' }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'oklch(1 0 0 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ fontSize: 'clamp(52px,6vw,72px)', fontFamily: font, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em' }}>{pct}</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>{title}</div>
        <p style={{ fontSize: 14, color: 'oklch(1 0 0 / 0.72)', lineHeight: 1.65 }}>{shortDesc}</p>
      </div>
      <div style={{ transition: 'opacity 0.35s 0.1s, transform 0.35s 0.1s', opacity: hovered ? 1 : 0, transform: hovered ? 'none' : 'translateY(16px)', pointerEvents: hovered ? 'auto' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'oklch(1 0 0 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'oklch(1 0 0 / 0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{title}</div>
            <div style={{ fontFamily: font, fontSize: 28, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>{pct} do IR</div>
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'oklch(1 0 0 / 0.6)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>{detailTitle}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {detailItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'oklch(1 0 0 / 0.1)', borderRadius: 10, padding: '10px 14px' }}>
              <span style={{ fontSize: 12, color: 'oklch(1 0 0 / 0.6)', fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{item.value}</span>
            </div>
          ))}
        </div>
        {detailExtra && detailExtra.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'oklch(1 0 0 / 0.6)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>Benefícios adicionais</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {detailExtra.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ marginTop: 2, flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: 'oklch(1 0 0 / 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'oklch(1 0 0 / 0.82)', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <p style={{ fontSize: 13, color: 'oklch(1 0 0 / 0.7)', lineHeight: 1.65, borderTop: '1px solid oklch(1 0 0 / 0.12)', paddingTop: 14 }}>{detailNote}</p>
      </div>
    </div>
  );
}

// ── BankCard ────────────────────────────────────────────────────────────────
function BankCard({ card, font, delay, copiedIdx, cardIdx, onCopy }) {
  const [hovered, setHovered] = useState(false);
  const fields = [
    { label: 'Banco', value: card.bank },
    { label: 'Agência', value: card.ag },
    { label: 'Conta', value: card.cc },
    ...(card.cnpj ? [{ label: 'CNPJ', value: card.cnpj }] : []),
  ];

  return (
    <div className={`reveal reveal-delay-${delay}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 24, overflow: 'hidden', background: 'oklch(0.20 0.03 148)', border: `1px solid ${hovered ? card.accent + '55' : 'oklch(1 0 0 / 0.07)'}`, boxShadow: hovered ? `0 16px 48px oklch(0 0 0 / 0.35), inset 0 1px 0 ${card.accent}22` : 'none', transform: hovered ? 'translateY(-4px)' : 'none', transition: 'all 0.35s ease' }}>
      <div style={{ background: card.bg, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'oklch(1 0 0 / 0.07)' }} />
        <div style={{ width: 56, height: 56, borderRadius: 14, background: hovered ? 'oklch(1 0 0 / 0.9)' : 'oklch(1 0 0 / 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, flexShrink: 0, backdropFilter: 'blur(4px)', transition: 'background 0.35s ease' }}>
          <img src={card.logo} alt={card.label} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: hovered ? 'none' : 'brightness(0) invert(1)', transition: 'filter 0.35s ease' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'oklch(1 0 0 / 0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Conta vinculada</span>
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: 20, color: 'white', lineHeight: 1.1 }}>{card.label}</div>
          <div style={{ fontSize: 12, color: 'oklch(1 0 0 / 0.6)', lineHeight: 1.45, marginTop: 4 }}>{card.sublabel}</div>
        </div>
      </div>

      {card.hoverInfo && (
        <div style={{ background: card.bg, maxHeight: hovered ? '220px' : '0', opacity: hovered ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>
          <div style={{ padding: '0 28px 20px', borderTop: '1px solid oklch(1 0 0 / 0.12)' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.65, margin: '14px 0' }}>{card.hoverInfo.intro}</p>
            <div style={{ borderTop: '1px solid oklch(1 0 0 / 0.12)', paddingTop: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'oklch(1 0 0 / 0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{card.hoverInfo.council}</div>
              <span style={{ color: 'white', fontWeight: 600, fontSize: 13, fontFamily: font, lineHeight: 1.35 }}>{card.hoverInfo.project}</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {fields.map((f, fi) => {
          const copyKey = `${cardIdx}-${fi}`;
          const copied = copiedIdx === copyKey;
          return (
            <button key={fi} onClick={() => onCopy(f.value, copyKey)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '10px 14px', borderRadius: 12, background: copied ? `${card.accent}22` : 'oklch(1 0 0 / 0.05)', border: `1px solid ${copied ? card.accent + '66' : 'oklch(1 0 0 / 0.08)'}`, transition: 'all 0.2s', width: '100%', textAlign: 'left' }}
              onMouseEnter={e => { if (!copied) e.currentTarget.style.background = 'oklch(1 0 0 / 0.09)'; }}
              onMouseLeave={e => { if (!copied) e.currentTarget.style.background = 'oklch(1 0 0 / 0.05)'; }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'oklch(1 0 0 / 0.38)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 2 }}>{f.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: copied ? card.accent : 'white', fontVariantNumeric: 'tabular-nums', transition: 'color 0.2s' }}>{f.value}</div>
              </div>
              <span style={{ fontSize: 11, color: copied ? card.accent : 'oklch(1 0 0 / 0.3)', fontWeight: 700, letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                {copied ? '✓ copiado' : 'copiar'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Donation ────────────────────────────────────────────────────────────────
function Donation({ font }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  function copyText(text, idx) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1800);
    });
  }

  const dirCards = [
    { key: 'fia', label: 'FIA', logo: 'https://bimagem.sccruzeirodosul.org/logos/FIA.png', bg: 'oklch(0.38 0.13 320)', img: 'https://bimagem.sccruzeirodosul.org/logo_uteis/livro_lana.png', title: 'Fundo da Infância e Adolescência', desc: 'Apoie projetos que promovem a qualidade de vida, o desenvolvimento e o bem-estar de crianças e adolescentes.' },
    { key: 'direta', label: 'DIRETA', logo: 'https://bimagem.sccruzeirodosul.org/logo_sccs/favicon.png', bg: 'var(--bordo)', img: 'https://bimagem.sccruzeirodosul.org/bmcs/SCCS_06_11_2021_2.jpg', title: 'Doação Direta', desc: 'Tem um instrumento parado ou quer nos apoiar? Doe instrumentos ou contribua financeiramente para que a SCCS continue transformando vidas através da música.' },
    { key: 'fmi', label: 'FMI', logo: 'https://bimagem.sccruzeirodosul.org/logos/Fundo%20Municipal%20FMDPI.png', bg: 'oklch(0.34 0.10 240)', img: 'https://bimagem.sccruzeirodosul.org/chorinho_carvoeiro/Chorinho_16_12_2024_4.png', title: 'Fundo Municipal do Idoso', desc: 'Apoie projetos que promovem a qualidade de vida e o bem-estar das pessoas idosas.' },
  ];

  const bankCards = [
    { key: 'fia-bank', label: 'FIA', sublabel: 'Fundo da Infância e Adolescência', logo: 'https://bimagem.sccruzeirodosul.org/logos/FIA.png', bg: 'oklch(0.38 0.13 320)', accent: 'oklch(0.75 0.12 320)', bank: 'Banco do Brasil', ag: '3226-3', cc: '18.892-1', cnpj: '17.704.824/0001-45', hoverInfo: { intro: 'Deposite para a Sociedade Cultural Cruzeiro do Sul via FIA. Sua participação garante a continuidade de projetos voltados ao bem-estar e proteção de crianças e adolescentes.', council: 'Projeto aprovado pelo CMDCA:', project: 'CRIAR II: "LANA – UMA HISTÓRIA SOBRE O AUTISMO"' } },
    { key: 'fmdpi-bank', label: 'FMDPI', sublabel: 'Fundo Municipal dos Direitos da Pessoa Idosa de Criciúma', logo: 'https://bimagem.sccruzeirodosul.org/logos/Fundo%20Municipal%20FMDPI.png', bg: 'oklch(0.34 0.10 240)', accent: 'oklch(0.75 0.10 240)', bank: 'Banco do Brasil', ag: '3226-3', cc: '20.910-93', cnpj: '20.744.798/0001-45', hoverInfo: { intro: 'Deposite para a Sociedade Cultural Cruzeiro do Sul via FMI. Sua participação garante a continuidade de projetos que promovem respeito, integração e cultura para nossa comunidade.', council: 'Projeto aprovado pela CMDPI:', project: 'Cultura e Informação para a Pessoa Idosa – Tema II "Violências"' } },
    { key: 'sccs-bank', label: 'SCCS', sublabel: 'Sociedade Cultural Cruzeiro do Sul', logo: 'https://bimagem.sccruzeirodosul.org/logo_sccs/favicon.png', bg: 'var(--bordo)', accent: 'oklch(0.75 0.10 14)', bank: 'Caixa Econômica Federal', ag: '0415', cc: '576426409-6', cnpj: '83.729.103/0001-14' },
  ];

  return (
    <section id="doacao" style={{ background: 'var(--warm-white)', padding: '100px clamp(20px,5vw,80px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'var(--bordo-pale)', border: '1px solid var(--bordo-light)', borderRadius: 100, padding: '5px 18px', marginBottom: 16, opacity: 0.8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--bordo)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Faça parte</span>
          </div>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(32px,4vw,54px)', fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Apoie a Sociedade Cultural<br /><em style={{ color: 'var(--bordo)', fontStyle: 'italic' }}>Cruzeiro do Sul</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-mid)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>Direcione sua doação e ajude a transformar vidas através da cultura, da música e do cuidado com as pessoas.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 48 }}>
          {dirCards.map((c, i) => (
            <div key={c.key} className={`reveal reveal-delay-${i + 1}`} style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', background: c.bg, minHeight: 440, boxShadow: '0 8px 30px oklch(0 0 0 / 0.15)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35, zIndex: 0 }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 0%, ${c.bg} 80%, ${c.bg} 100%)`, zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2, padding: 36, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, marginBottom: 24, boxShadow: '0 4px 16px oklch(0 0 0 / 0.1)' }}>
                  <img src={c.logo} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'oklch(1 0 0 / 0.8)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Doação via</div>
                <h3 style={{ fontFamily: font, fontSize: 26, fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>{c.title}</h3>
                <p style={{ fontSize: 16, color: 'oklch(1 0 0 / 0.9)', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <a href="#beneficios" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--text-dark)', color: 'white', padding: '18px 36px', borderRadius: 100, fontSize: 16, fontWeight: 600, textDecoration: 'none', transition: 'background 0.3s ease, transform 0.3s ease', boxShadow: '0 8px 24px oklch(0 0 0 / 0.15)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'var(--bordo)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--text-dark)'; }}>
            Conhecer benefícios e dados bancários
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </a>
        </div>

        <div id="beneficios" style={{ background: 'var(--cream)', borderRadius: 32, padding: 'clamp(40px,5vw,64px) clamp(24px,5vw,64px)', marginBottom: 0, scrollMarginTop: 100 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: 'var(--green-pale)', border: '1px solid var(--green-soft)', borderRadius: 100, padding: '5px 18px', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-deep)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Benefício fiscal</span>
            </div>
            <h3 style={{ fontFamily: font, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Doe e deduza no<br />Imposto de Renda
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 760, margin: '0 auto' }}>
            <IRCard font={font} delay={1} bg="oklch(0.34 0.10 240)" bgHover="oklch(0.28 0.12 240)" icon={<IconBuilding />} pct="1%" title="Pessoa Jurídica"
              shortDesc={<>Empresas podem deduzir até <strong style={{ color: 'white' }}>1% do IR devido</strong> ao destinar recursos ao FIA ou FMI.</>}
              detailTitle="Como funciona para empresas?"
              detailItems={[{ label: 'Percentual', value: 'Até 1% do IR devido' }, { label: 'Destinação', value: 'FIA ou FMI de Criciúma' }, { label: 'Declaração', value: 'Modelo completo (IRPJ)' }, { label: 'Prazo', value: 'Até o encerramento do ano fiscal' }]}
              detailExtra={['Sua logo em todos os materiais de divulgação do projeto', 'Presença no site da SCCS e no hotsite do projeto', 'Divulgação nas redes sociais da SCCS']}
              detailNote="A empresa faz a doação direcionada Sociedade Cultural Cruzeiro do Sul direto na conta do fundo e abate o valor no IR a pagar. Receba o comprovante e deduza sem complicação." />
            <IRCard font={font} delay={2} bg="var(--bordo)" bgHover="oklch(0.30 0.13 14)" icon={<IconPerson />} pct="6%" title="Pessoa Física"
              shortDesc={<>Pessoas físicas podem deduzir até <strong style={{ color: 'white' }}>6% do IR devido</strong> ao contribuir com o FIA ou FMI.</>}
              detailTitle="Como funciona para você?"
              detailItems={[{ label: 'Percentual', value: 'Até 6% do IR devido' }, { label: 'Destinação', value: 'FIA ou FMI de Criciúma' }, { label: 'Declaração', value: 'Modelo completo (IRPF)' }, { label: 'Prazo', value: 'Até 30 de abril do ano seguinte' }]}
              detailNote="Doe ao longo do ano e informe na declaração anual do IR. O valor doado é abatido diretamente do imposto a pagar ou somado à restituição." />
          </div>
          <p className="reveal" style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-light)', marginTop: 24, maxWidth: 500, margin: '24px auto 0' }}>
            * Válido para doações destinadas ao Fundo da Infância e Adolescência (FIA) e ao Fundo Municipal do Idoso (FMI). Consulte seu contador.
          </p>
        </div>

        <div style={{ background: 'var(--text-dark)', margin: '0 -clamp(20px,5vw,80px)', padding: '80px clamp(20px,5vw,80px) 100px', borderTop: '1px solid oklch(0 0 0 / 0.08)' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-block', background: 'var(--bordo-pale)', border: '1px solid var(--bordo-light)', borderRadius: 100, padding: '5px 18px', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--bordo)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Dados bancários</span>
            </div>
            <h3 style={{ fontFamily: font, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15 }}>Contas vinculadas</h3>
            <p style={{ fontSize: 15, color: 'oklch(1 0 0 / 0.45)', marginTop: 12 }}>Clique nos dados para copiar</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {bankCards.map((b, i) => (
              <BankCard key={b.key} card={b} font={font} delay={i + 1} copiedIdx={copiedIdx} cardIdx={i} onCopy={copyText} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Nossa História ──────────────────────────────────────────────────────────
function NossaHistoria({ font }) {
  const slides = [
    { year: '1942', label: 'A origem solidária', img: 'https://bimagem.sccruzeirodosul.org/SCCS_Antiga/BMCS_sede.jpg', caption: 'A Sociedade Cultural Cruzeiro do Sul nasce em Criciúma durante a Segunda Guerra Mundial. Um grupo de empresários locais mobiliza a comunidade na campanha nacional para arrecadar fundos destinados à compra de uma aeronave para a Força Aérea Brasileira (FAB).' },
    { year: '1945', label: 'Da arrecadação à cultura', img: 'https://bimagem.sccruzeirodosul.org/SCCS_Antiga/Apresenta%C3%A7%C3%A3o%20SCCS_1900.jpg', caption: 'Com o fim da Segunda Guerra, a verba reunida é redirecionada para a aquisição de instrumentos musicais e para a criação da Banda Sinfônica Cruzeiro do Sul — um gesto patriótico que se transforma em legado cultural.' },
    { year: 'Maestro Jacó', label: 'Primeiro regente', img: 'https://bimagem.sccruzeirodosul.org/SCCS_Antiga/Jaco.jpg%20-%20Editado.jpg', caption: 'A Sociedade Cultural Cruzeiro do Sul teve a honra de ter Jacob "Jacó" Vitório como seu primeiro maestro, à frente da formação original da Banda Sinfônica. Por sua regência passaram gerações de músicos, e seu nome ficou marcado na história musical de Criciúma.' },
    { year: '2015', label: 'Nova gestão, novo compromisso', img: 'https://bimagem.sccruzeirodosul.org/bmcs/SCCS_13_12_2015.jpg', caption: 'Sob a presidência de Rui César Sombrio e Mirella Sombrio, a instituição vive um marco de renovação. Renomeada para Sociedade Cultural Cruzeiro do Sul, expande sua atuação e oficializa seu impacto comunitário ao integrar o CMDPI e o CMDCA.' },
    { year: 'Hoje', label: '84 anos de história', img: 'https://bimagem.sccruzeirodosul.org/bmcs/SCCS_30_11_2023.jpg', caption: 'A SCCS segue em expansão, com novos projetos aprovados em editais municipais e estaduais, reafirmando seu compromisso com a democratização da cultura em Criciúma.' },
  ];
  const palettes = [
    { bg: 'oklch(0.28 0.08 148)', accent: 'var(--gold)' },
    { bg: 'oklch(0.32 0.07 200)', accent: '#a8d8ea' },
    { bg: 'oklch(0.30 0.09 14)', accent: '#f4b8a0' },
    { bg: 'oklch(0.26 0.06 260)', accent: '#c9b8f4' },
    { bg: 'oklch(0.22 0.06 148)', accent: 'var(--gold)' },
  ];
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const isPaused = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const interval = setInterval(() => {
      if (isPaused.current) return;
      setDir(1);
      setAnimating(true);
      setTimeout(() => { setActive(prev => (prev + 1) % slides.length); setAnimating(false); }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function advance(d) {
    if (animating) return;
    setDir(d);
    setAnimating(true);
    setTimeout(() => { setActive(prev => (prev + d + slides.length) % slides.length); setAnimating(false); }, 400);
  }

  const { bg, accent } = palettes[active];

  return (
    <section id="depoimentos" style={{ background: 'var(--green-deep)', padding: '100px clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'oklch(1 0 0 / 0.03)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'var(--bordo)', opacity: 0.2 }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'oklch(1 0 0 / 0.1)', border: '1px solid oklch(1 0 0 / 0.15)', borderRadius: 100, padding: '5px 18px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Nossa história</span>
          </div>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Banda Musical<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Cruzeiro do Sul</em>
          </h2>
        </div>
        <div className="reveal historia-grid" style={{ display: 'grid', gridTemplateColumns: 'clamp(280px,55%,600px) 1fr', gap: 40, alignItems: 'center' }}>
          <div onMouseEnter={() => { isPaused.current = true; }} onMouseLeave={() => { isPaused.current = false; }}
            style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', aspectRatio: '4/3', background: bg, transition: 'background 0.6s ease', boxShadow: '0 24px 60px oklch(0 0 0 / 0.4)' }}>
            <img src={slides[active].img} alt={slides[active].label} loading="lazy"
              onError={e => { e.currentTarget.style.display = 'none'; }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: animating ? 0 : 1, transition: 'opacity 0.5s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, oklch(0 0 0 / 0.35) 0%, transparent 30%, transparent 70%, oklch(0 0 0 / 0.2) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 20, left: 20, background: 'oklch(0 0 0 / 0.4)', backdropFilter: 'blur(12px)', borderRadius: 100, padding: '8px 20px', fontFamily: font, fontWeight: 700, fontSize: 18, color: accent, border: `1px solid ${accent}44`, opacity: animating ? 0 : 1, transition: 'opacity 0.4s ease' }}>{slides[active].year}</div>
            <button onClick={() => advance(-1)} aria-label="Slide anterior" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'oklch(0 0 0 / 0.35)', backdropFilter: 'blur(8px)', color: 'white', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.6)'}
              onMouseLeave={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.35)'}>‹</button>
            <button onClick={() => advance(1)} aria-label="Próximo slide" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'oklch(0 0 0 / 0.35)', backdropFilter: 'blur(8px)', color: 'white', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.6)'}
              onMouseLeave={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.35)'}>›</button>
          </div>
          <div style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${dir * 20}px)` : 'none', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{slides[active].label}</div>
            <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, marginBottom: 32 }}>{slides[active].caption}</p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                  aria-label={`Slide ${i + 1}: ${slides[i].year}`}
                  aria-pressed={i === active}
                  className="dot-btn">
                  <span className="dot-btn-inner" style={{ width: i === active ? 28 : 10, background: i === active ? 'var(--gold)' : 'oklch(1 0 0 / 0.25)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ────────────────────────────────────────────────────────────────
const SQRT_5000 = Math.sqrt(5000);

const PROJECT_DATA = [
  { id: 0, tempId: 0, category: 'Crianças e Adolescentes', name: 'Atividades Socioculturais para Crianças e Adolescentes', description: 'Fortalecer o futuro de crianças e adolescentes em situação de vulnerabilidade em Criciúma. O projeto garante a continuidade de atividades socioculturais essenciais, profissionalizando a gestão e expandindo o alcance da instituição.' },
  { id: 1, tempId: 1, category: 'Terceira Idade', name: 'Direito à Cultura e ao Lazer da Pessoa Idosa', description: 'Conectar a terceira idade ao mundo digital e cultural. Unimos contação de histórias à inclusão tecnológica, capacitando idosos para plataformas digitais e combatendo o isolamento social.' },
  { id: 2, tempId: 2, category: 'Educação', name: 'CRIAR — Tema I — Cyberbullying', description: 'Combater o cyberbullying no ambiente escolar através da arte e da conscientização. O projeto distribui 3.000 livros "Lana" e realiza palestras mobilizando alunos, pais e professores em prol de um ambiente escolar seguro.', link: 'https://criar.sccruzeirodosul.org/' },
  { id: 3, tempId: 3, category: 'Público 60+', name: 'Cultura e Informação para a Pessoa Idosa', description: 'Promover cidadania e inclusão digital para o público 60+. Oficinas práticas de tecnologia democratizam o acesso a ferramentas modernas, garantindo que o idoso seja protagonista na era da informação.' },
  { id: 4, tempId: 4, category: 'Escolas Municipais', name: 'Harmonia Educacional', description: 'Transformar a educação pública através da música. Concertos didáticos em 62 escolas municipais integram alunos, professores e comunidade numa rede colaborativa de desenvolvimento artístico e cultural.' },
  { id: 5, tempId: 5, category: 'Jovens', name: 'Músicos do Futuro', description: 'Formar novas gerações de talentos musicais no contraturno escolar. Oficinas de percussão e sopro criam bandas marciais e fanfarras na rede municipal, preparando jovens para as celebrações oficiais da cidade.' },
];

function Projects({ font }) {
  const [list, setList] = useState(PROJECT_DATA);
  const [cardSize, setCardSize] = useState(365);

  useEffect(() => {
    const update = () => setCardSize(window.matchMedia('(min-width: 640px)').matches ? 365 : 270);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  function handleMove(steps) {
    if (steps === 0) return;
    const next = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(next);
  }

  return (
    <section id="projetos" style={{ background: 'var(--warm-white)', padding: '100px clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'var(--green-pale)', border: '1px solid var(--green-soft)', borderRadius: 100, padding: '5px 18px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-deep)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Nossos projetos</span>
          </div>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Onde seu apoio<br /><em style={{ color: 'var(--green-mid)', fontStyle: 'italic' }}>chega.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-light)', letterSpacing: '0.01em' }}>
            Clique nos cards ou use as setas para explorar
          </p>
        </div>

        <div className="reveal" style={{ position: 'relative', width: '100%', overflow: 'hidden', height: 620 }}>
          {list.map((project, index) => {
            const total = list.length;
            const position = total % 2
              ? index - (total + 1) / 2
              : index - total / 2;
            const isCenter = position === 0;

            return (
              <div
                key={project.tempId}
                onClick={() => handleMove(position)}
                style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: cardSize, height: cardSize, padding: 32,
                  cursor: isCenter ? 'default' : 'pointer',
                  border: `2px solid ${isCenter ? 'var(--green-deep)' : 'oklch(0 0 0 / 0.08)'}`,
                  background: isCenter ? 'var(--green-deep)' : 'white',
                  clipPath: 'polygon(48px 0%, calc(100% - 48px) 0%, 100% 48px, 100% 100%, calc(100% - 48px) 100%, 48px 100%, 0 100%, 0 0)',
                  transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  zIndex: isCenter ? 10 : 5 - Math.abs(position),
                  boxShadow: isCenter ? '0px 8px 0px 4px oklch(0 0 0 / 0.10)' : 'none',
                  display: 'flex', flexDirection: 'column', overflow: 'hidden',
                }}
              >
                <span style={{ position: 'absolute', display: 'block', transformOrigin: 'top right', transform: 'rotate(45deg)', background: isCenter ? 'oklch(1 0 0 / 0.18)' : 'oklch(0 0 0 / 0.08)', right: -2, top: 46, width: SQRT_5000, height: 2 }} />
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isCenter ? 'oklch(1 0 0 / 0.6)' : 'var(--text-light)', marginBottom: 14 }}>{project.category}</div>
                <h3 style={{ fontFamily: font, fontSize: cardSize > 300 ? 20 : 17, fontWeight: 700, color: isCenter ? 'white' : 'var(--text-dark)', lineHeight: 1.25, marginBottom: 16, letterSpacing: '-0.02em' }}>{project.name}</h3>
                <p style={{ fontSize: 13, color: isCenter ? 'oklch(1 0 0 / 0.75)' : 'var(--text-mid)', lineHeight: 1.65, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: isCenter ? 7 : 4, WebkitBoxOrient: 'vertical' }}>{project.description}</p>
                {isCenter && (
                  <a
                    href={project.link || "#contato"}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--gold)', textDecoration: 'none', letterSpacing: '0.02em' }}
                  >
                    Saiba mais →
                  </a>
                )}
              </div>
            );
          })}

          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 20 }}>
            {[{ d: -1, label: 'Projeto anterior', arrow: '‹' }, { d: 1, label: 'Próximo projeto', arrow: '›' }].map(({ d, label, arrow }) => (
              <button key={d} onClick={() => handleMove(d)} aria-label={label}
                style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: 'var(--warm-white)', border: '2px solid oklch(0 0 0 / 0.10)', cursor: 'pointer', color: 'var(--text-dark)', transition: 'all 0.2s', lineHeight: 1 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-deep)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--green-deep)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--warm-white)'; e.currentTarget.style.color = 'var(--text-dark)'; e.currentTarget.style.borderColor = 'oklch(0 0 0 / 0.10)'; }}>
                {arrow}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ({ font }) {
  const [openIndex, setOpenIndex] = useState(null);
  const lnk = { color: 'var(--green-deep)', fontWeight: 600, textDecoration: 'none' };
  const faqs = [
    { q: 'Minha doação é dedutível do Imposto de Renda?', a: (<div><p style={{ marginBottom: 12 }}>Sim. Doações destinadas ao Fundo Municipal do Idoso (FMI) e ao Fundo Municipal da Criança e do Adolescente (FMCA) são dedutíveis do Imposto de Renda:</p><ul style={{ paddingLeft: 20, marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 4 }}><li><strong>Pessoa física:</strong> dedução de até 6% do IR devido;</li><li><strong>Pessoa jurídica:</strong> dedução de até 1% do IR devido.</li></ul><p>Para obter o recibo, solicite diretamente aos conselhos responsáveis ou entre em contato pelo e-mail <a href="mailto:contato@sccruzeiro.org" style={lnk}>contato@sccruzeiro.org</a>.</p></div>) },
    { q: 'Como sei que minha doação chegou ao destino certo?', a: (<p>Prezamos pela transparência em todas as nossas ações. Você pode acompanhar nossos projetos pelas redes sociais e, se preferir, realizar uma visita presencial à instituição. Também é possível consultar a Sociedade Cultural Cruzeiro do Sul no <a href="https://transparencia.criciuma.sc.gov.br" target="_blank" rel="noopener" style={lnk}>Portal da Transparência de Criciúma →</a></p>) },
    { q: 'Quais são as formas de doações aceitas?', a: (<p>Para doações diretas à Sociedade Cultural Cruzeiro do Sul (SCCS), aceitamos Pix, TED bancária e boleto. Para doações via Fundo Municipal do Idoso (FMI) ou Fundo Municipal da Criança e do Adolescente (FMCA), o repasse deve ser realizado por TED para as contas vinculadas à instituição.</p>) },
    { q: 'Posso visitar a instituição antes de realizar uma doação?', a: (<div><p style={{ marginBottom: 12 }}>Sim, você é muito bem-vindo! Confira nossos horários de atendimento:</p><ul style={{ paddingLeft: 20, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 4 }}><li><strong>Segunda-feira:</strong> das 13h às 17h</li><li><strong>Terça a quinta-feira:</strong> das 9h às 17h</li><li><strong>Sábados às 11h:</strong> ensaio aberto da Banda Musical Cruzeiro do Sul</li></ul><p style={{ marginBottom: 10 }}>Para agendar sua visita ou tirar dúvidas, entre em contato:</p><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span>✉ <a href="mailto:contato@sccruzeirodosul.org" style={lnk}>contato@sccruzeirodosul.org</a></span><span>💬 <a href="https://wa.me/5548999022337" target="_blank" rel="noopener" style={lnk}>(48) 99902-2337 via WhatsApp</a></span><span>📷 <a href="https://instagram.com/cruzeirodosul.cric" target="_blank" rel="noopener" style={lnk}>@cruzeirodosul.cric no Instagram</a></span></div></div>) },
    { q: 'A instituição aceita doações em bens?', a: (<div><p style={{ marginBottom: 12 }}>Sim. Caso você possua um instrumento musical que deseja doar, entre em contato antes de trazer o item para verificarmos a necessidade atual:</p><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span>✉ <a href="mailto:contato@sccruzeirodosul.org" style={lnk}>contato@sccruzeirodosul.org</a></span><span>💬 <a href="https://wa.me/5548999022337" target="_blank" rel="noopener" style={lnk}>(48) 99902-2337 via WhatsApp</a></span></div></div>) },
  ];

  return (
    <section id="faq" style={{ background: 'var(--cream)', padding: '100px clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'var(--green-pale)', border: '1px solid var(--green-soft)', borderRadius: 100, padding: '5px 18px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-deep)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Perguntas frequentes</span>
          </div>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(32px,4vw,48px)', fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Ainda tem dúvidas?</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`} style={{ background: 'white', borderRadius: 18, overflow: 'hidden', border: openIndex === i ? '1.5px solid var(--green-soft)' : '1.5px solid oklch(0 0 0 / 0.07)', transition: 'border-color 0.25s' }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 28px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                <span style={{ fontFamily: font, fontWeight: 600, fontSize: 16, color: 'var(--text-dark)', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: 'var(--green-mid)', flexShrink: 0 }}><IconChevron open={openIndex === i} /></span>
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 28px 24px', fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.75 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: 14, color: 'var(--text-light)' }}>
            Não encontrou o que procura?{' '}
            <a href="mailto:contato@sccruzeirodosul.org" style={{ color: 'var(--green-deep)', fontWeight: 600 }}>Fale com a gente →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── FinalCTA ────────────────────────────────────────────────────────────────
function FinalCTA({ font }) {
  const contacts = [
    { icon: <IconWhatsApp />, label: 'WhatsApp', value: '(48) 99902-2337', href: 'https://wa.me/5548999022337', color: 'oklch(0.38 0.14 145)', iconBg: 'oklch(0.94 0.07 145)' },
    { icon: <IconMail />, label: 'E-mail', value: 'contato@sccruzeirodosul.org', href: 'mailto:contato@sccruzeirodosul.org', color: 'var(--green-deep)', iconBg: 'var(--green-pale)' },
    { icon: <IconInstagram />, label: 'Instagram', value: '@cruzeirodosul.cric', href: 'https://instagram.com/cruzeirodosul.cric', color: 'oklch(0.44 0.15 330)', iconBg: 'oklch(0.95 0.05 330)' },
  ];
  return (
    <section id="contato" style={{ background: 'var(--warm-white)', padding: '100px clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'var(--green-pale)', border: '1px solid var(--green-soft)', borderRadius: 100, padding: '5px 18px', marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-deep)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Contato &amp; Localização</span>
          </div>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Estamos aqui<br /><em style={{ color: 'var(--green-deep)', fontStyle: 'italic' }}>para você.</em>
          </h2>
          <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: 'var(--text-mid)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>Venha nos visitar, fale pelo WhatsApp ou acompanhe nossa história nas redes sociais.</p>
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'white', borderRadius: 20, padding: '24px 28px', boxShadow: '0 2px 20px oklch(0 0 0 / 0.07)', border: '1px solid oklch(0 0 0 / 0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-deep)', flexShrink: 0 }}><IconPin /></div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Endereço</div>
                  <div style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.7 }}>Rua Marcelo Lodetti, 156<br />Centro — CEP 88801-510<br />Criciúma - SC</div>
                </div>
              </div>
            </div>
            {contacts.map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'white', borderRadius: 20, padding: '22px 28px', boxShadow: '0 2px 20px oklch(0 0 0 / 0.07)', border: '1px solid oklch(0 0 0 / 0.06)', textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px oklch(0 0 0 / 0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px oklch(0 0 0 / 0.07)'; e.currentTarget.style.transform = ''; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>{c.label}</div>
                  <div style={{ fontSize: 15, color: c.color, fontWeight: 600 }}>{c.value}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--text-light)', fontSize: 16 }}>→</div>
              </a>
            ))}
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 24px oklch(0 0 0 / 0.10)', border: '1px solid oklch(0 0 0 / 0.06)', height: 480 }}>
            <iframe
              src="https://maps.google.com/maps?q=Rua+Marcelo+Lodetti,+156,+Centro,+Criciuma,+SC,+Brasil&output=embed&z=16"
              title="Mapa — Localização da Sociedade Cultural Cruzeiro do Sul"
              width="100%" height="100%"
              style={{ border: 0, display: 'block', height: '100%' }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer({ font }) {
  return (
    <footer style={{ background: 'var(--text-dark)', padding: '64px clamp(20px,5vw,80px) 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>
          <div>
            <img src="https://bimagem.sccruzeirodosul.org/logo_sccs/favicon.png" alt="Sociedade Cultural Cruzeiro do Sul" style={{ height: 56, width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: 16, opacity: 0.9 }} />
            <p style={{ fontSize: 14, color: 'oklch(1 0 0 / 0.5)', lineHeight: 1.7, marginBottom: 20 }}>Sociedade Cultural Cruzeiro do Sul<br />CNPJ: 83.729.103/0001-14</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Instagram', 'Facebook', 'YouTube'].map(s => (
                <a key={s} href="#" style={{ fontSize: 12, color: 'oklch(1 0 0 / 0.4)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.05em' }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: 'Institucional', links: [{ label: 'Quem somos', href: '#' }, { label: 'Nossa história', href: '#depoimentos' }, { label: 'Equipe', href: '#' }, { label: 'Transparência', href: 'https://transparencia.criciuma.sc.gov.br/' }] },
            { title: 'Projetos', links: [{ label: 'Atividades Socioculturais', href: '#projetos' }, { label: 'Direito à Cultura 60+', href: '#projetos' }, { label: 'CRIAR - Cyberbullying', href: '#projetos' }, { label: 'Harmonia Educacional', href: '#projetos' }] },
            { title: 'Apoiar', links: [{ label: 'Fundo do Idoso (FMI)', href: '#doacao' }, { label: 'Fundo da Criança (FMCA)', href: '#doacao' }, { label: 'Doação Direta', href: '#doacao' }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'oklch(1 0 0 / 0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined}
                  style={{ display: 'block', color: 'oklch(1 0 0 / 0.6)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'oklch(1 0 0 / 0.6)'}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid oklch(1 0 0 / 0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'oklch(1 0 0 / 0.3)' }}>© {new Date().getFullYear()} Sociedade Cultural Cruzeiro do Sul. Todos os direitos reservados.</span>
          <span style={{ fontSize: 13, color: 'oklch(1 0 0 / 0.3)' }}>
            <a href="#" style={{ color: 'oklch(1 0 0 / 0.4)', textDecoration: 'none' }}>Política de Privacidade</a> · <a href="#" style={{ color: 'oklch(1 0 0 / 0.4)', textDecoration: 'none' }}>Termos de Uso</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [tweaks] = useState(TWEAK_DEFAULTS);
  useScrollReveal();
  const font = tweaks.titleFont;
  return (
    <>
      <Nav font={font} />
      <Hero font={font} heroStyle={tweaks.heroStyle} />
      <SocialProof />
      <Donation font={font} />
      <NossaHistoria font={font} />
      <Projects font={font} />
      <FAQ font={font} />
      <FinalCTA font={font} />
      <Footer font={font} />
    </>
  );
}

export default App;
