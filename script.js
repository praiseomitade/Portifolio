'use strict';
const el = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url = input => { const value = String(input ?? '').trim(); if (!value) return ''; if (/^(https?:\/\/|mailto:)/i.test(value) || (/^(assets\/|projects\/|#)/.test(value) && !value.includes('..'))) return esc(value); return ''; };
const tags = list => (list || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');
function heading(data) { return `<span class="eyebrow">${esc(data.eyebrow)}</span><h2>${esc(data.title)}</h2>${data.intro ? `<p>${esc(data.intro)}</p>` : ''}`; }
function render(d) {
  document.title = `${d.site.name} | Data Analytics & Business Intelligence`;
  el('site-nav').innerHTML = (d.navigation || []).map(n => `<a href="#${esc(n.id)}">${esc(n.label)}</a>`).join('');
  const h = d.hero;
  const resume = url(d.contact?.resume);
  const resumeButton = resume ? `<a class="btn btn-secondary" href="${resume}" download>${esc(h.secondaryButton)} <span aria-hidden="true">↓</span></a>` : `<span class="btn btn-secondary btn-disabled" title="Resume download will activate when the CV file is added" aria-disabled="true">${esc(h.secondaryButton)} <span aria-hidden="true">↓</span></span>`;
  el('hero-copy').innerHTML = `<div class="eyebrow">${esc(h.eyebrow)}</div><h1>${h.greeting ? `<span class="hero-greeting">${esc(h.greeting)}</span>` : ''}${esc(h.name)}</h1><div class="hero-title">${esc(h.title)}</div>${h.description ? `<p class="hero-description">${esc(h.description)}</p>` : ''}<div class="hero-actions"><a class="btn btn-primary" href="#projects">${esc(h.primaryButton)} <span aria-hidden="true">↗</span></a>${resumeButton}</div><a class="hero-tertiary" href="#contact">${esc(h.tertiaryButton || "Let's Connect")} <span aria-hidden="true">→</span></a><div class="hero-caption">${esc(d.site.availability)}</div>`;
  el('hero-visual').innerHTML = `<div class="portrait-outline"></div><div class="portrait-box"><img src="${url(h.image)}" alt="${esc(h.imageAlt)}" /></div><div class="photo-badge"><span class="symbol">✦</span><strong>${esc(h.tagline)}</strong><small>Data • Insight • Impact</small></div>`;
  el('metrics').innerHTML = (d.metrics || []).map(m => `<div class="metric"><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join('');
  el('expertise-heading').innerHTML = heading(d.expertise);
  el('expertise-cards').innerHTML = (d.expertise.cards || []).map(c => `<article class="card"><div class="card-icon" aria-hidden="true">${esc(c.icon)}</div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><div class="tags">${tags(c.tags)}</div></article>`).join('');
  el('tools-heading').innerHTML = heading(d.tools);
  
const toolIcons = {
  'microsoft excel': ['excel.png', 'EX'],
  'mysql': ['MySQL.png', 'SQL'],
  'sql / mysql': ['MySQL.png', 'SQL'],
  'power bi': ['Microsoft Power BI.png', 'BI'],
  'tableau': ['tableau.png', 'TB'],
  'ibm spss': ['IBM.png', 'SP']
};

  el('tool-cloud').innerHTML = (d.tools.items || []).map(tool => {
    const name = String(tool).trim();
    const icon = toolIcons[name.toLowerCase()];
    const visual = icon
      ? `<img src="assets/icons/${icon[0]}" alt="" loading="lazy" />`
      : `<span class="tool-fallback" aria-hidden="true">${esc(name.slice(0,2).toUpperCase())}</span>`;
    return `<div class="tool-card"><div class="tool-icon" aria-hidden="true">${visual}</div><span class="tool-name">${esc(name)}</span></div>`;
  }).join('');
  if (d.services) {
    el('services-heading').innerHTML = heading(d.services);
    el('services-grid').innerHTML = (d.services.items || []).map(item => `<article class="service-card"><div class="service-icon" aria-hidden="true">${esc(item.icon)}</div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="tags">${tags(item.tags)}</div></article>`).join('');
  }
  el('projects-heading').innerHTML = heading(d.projects);
  el('project-grid').innerHTML = (d.projects.items || []).length ? d.projects.items.map(p => `<article class="project"><div class="project-visual">${url(p.image) ? `<img src="${url(p.image)}" alt="${esc(p.title)} preview" />` : `<div class="dashboard-placeholder"><span class="placeholder-icon" aria-hidden="true">▥</span><span>Dashboard screenshot</span><small>Add a real project image in the content editor</small></div>`}</div><div class="project-body"><div class="project-category">${esc(p.category)}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><div class="tags">${tags(p.tags)}</div>${url(p.link) ? `<a class="project-link project-button" href="${url(p.link)}" target="_blank" rel="noopener noreferrer">View Project <span aria-hidden="true">↗</span></a>` : `<span class="project-link project-button project-button-disabled" aria-disabled="true" title="Available after the project link is added">View Project <span aria-hidden="true">↗</span></span>`}</div></article>`).join('') : '<p class="empty-message">Project case studies will be added here.</p>';
  const a = d.about;
  el('about-content').innerHTML = `<span class="eyebrow">${esc(a.eyebrow)}</span><h2>${esc(a.title)}</h2>${(a.paragraphs || []).map(p => `<p>${esc(p)}</p>`).join('')}<div class="check-grid">${(a.highlights || []).map(t => `<div class="check">${esc(t)}</div>`).join('')}</div>`;
  el('cert-heading').innerHTML = heading(d.certifications);
  el('cert-list').innerHTML = (d.certifications.items || []).map(c => {
    const item = typeof c === 'string' ? {title:c,issuer:'',image:'',link:''} : c;
    const preview = url(item.image) ? `<img src="${url(item.image)}" alt="Certificate preview: ${esc(item.title)}" loading="lazy" />` : `<div class="cert-preview-fallback" aria-hidden="true"><span>✦</span><span>Certificate</span></div>`;
    const action = url(item.link) ? `<a class="cert-action" href="${url(item.link)}" target="_blank" rel="noopener noreferrer">View Certificate ↗</a>` : `<span class="cert-action cert-action-disabled" aria-disabled="true" title="Certificate file has not been added">Certificate coming soon</span>`;
    return `<article class="cert-card"><div class="cert-preview">${preview}</div><div class="cert-card-body"><span class="cert-label">PROFESSIONAL CERTIFICATION</span><h3>${esc(item.title)}</h3><p>Issued by ${esc(item.issuer || 'Issuing organization not specified')}</p>${action}</div></article>`;
  }).join('');
  const c = d.contact;
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(c.email || '').trim()) ? String(c.email).trim() : '';
  const contactLinks = [
    ['Email Me', email ? `mailto:${email}` : ''],
    ['LinkedIn', c.linkedin],
    ['GitHub', c.github],
    ['Upwork', c.upwork]
  ].filter(([, destination]) => url(destination));
  // Only allow Formspree HTTPS endpoints. Never publish a fake working contact form.
  const formEndpoint = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(String(c.formEndpoint || '').trim()) ? String(c.formEndpoint).trim() : '';
  const formHtml = `<div class="contact-form-card"><h3>Send a Message</h3><p class="form-intro">Tell me a little about your project or inquiry.</p><form id="inquiry-form" ${formEndpoint ? `action="${esc(formEndpoint)}"` : ''} method="POST">
    <label for="inquiry-name">Your name</label><input id="inquiry-name" name="name" autocomplete="name" required maxlength="120" placeholder="Your name" />
    <label for="inquiry-email">Email address</label><input id="inquiry-email" type="email" name="email" autocomplete="email" required maxlength="200" placeholder="you@example.com" />
    <label for="inquiry-message">Your message</label><textarea id="inquiry-message" name="message" rows="5" required maxlength="5000" placeholder="How can I help?"></textarea>
    <button class="btn btn-primary" type="submit" ${formEndpoint ? '' : 'disabled aria-disabled="true"'}>Send Message ↗</button>
    <p id="form-status" class="form-status" role="status" aria-live="polite">${formEndpoint ? 'Your message will be sent securely through the form provider.' : 'The contact form is being set up. Please use the available links to connect.'}</p>
  </form></div>`;
  el('contact-content').innerHTML = `<div class="contact-details"><span class="eyebrow">${esc(c.eyebrow)}</span><h2>${esc(c.title)}</h2><p>${esc(c.description)}</p><div class="contact-links">${contactLinks.map(([label, link]) => `<a href="${url(link)}" ${link.startsWith('mailto:') ? '' : 'target="_blank" rel="noopener noreferrer"'}>${esc(label)} <span aria-hidden="true">↗</span></a>`).join('')}</div></div>${formHtml}`;
  if (formEndpoint) {
    el('inquiry-form').addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const button = form.querySelector('button[type="submit"]');
      const status = el('form-status');
      button.disabled = true; status.textContent = 'Sending your message…';
      try {
        const response = await fetch(formEndpoint, {method:'POST', body:new FormData(form), headers:{'Accept':'application/json'}});
        if (!response.ok) throw new Error('Your message could not be sent. Please try again.');
        form.reset(); status.textContent = 'Thank you! Your message has been sent.';
      } catch (error) {
        status.textContent = 'Sending failed. Please try again or use another contact link.';
      } finally {button.disabled = false;}
    });
  }
  el('footer-text').textContent = d.site.footer;
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => { el('site-nav').classList.remove('is-open'); document.querySelector('.menu-toggle').setAttribute('aria-expanded','false'); }));
}
fetch('content.json', {cache:'no-store'}).then(r => {if (!r.ok) throw new Error('Could not load content.json'); return r.json();}).then(render).catch(err => {el('hero-copy').textContent = `Unable to load website content: ${err.message}. Open this website through a local server or GitHub Pages, not directly as a file.`;});
document.querySelector('.menu-toggle').addEventListener('click', e => {const n = el('site-nav'); const open = n.classList.toggle('is-open');e.currentTarget.setAttribute('aria-expanded',String(open));});
