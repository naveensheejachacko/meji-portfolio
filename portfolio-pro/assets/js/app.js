/* Renders the portfolio from data.js and wires up the interactions. */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const visible = (list) => list.filter((x) => !x.placeholder || SITE.showPlaceholders);
  const phBadge = (x) => (x.placeholder ? '<span class="ph-badge">To add</span>' : "");
  const phClass = (x) => (x.placeholder ? " is-placeholder" : "");

  const ICON = {
    mail: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.01l-2.2 2.2z",
    li: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
    gh: "M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z",
    pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
    dl: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
    star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  };
  const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICON[name]}"/></svg>`;
  const tags = (list) => `<div class="tags">${list.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`;

  /* ---------------- Career cards ---------------- */
  $("[data-careers]").innerHTML = CAREERS.map((c) => {
    const current = c.status === "Current role";
    const cta = c.cta.filter
      ? `<button class="btn btn-outline" type="button" data-goto-filter="${c.cta.filter}">${esc(c.cta.label)} &rarr;</button>`
      : `<a class="btn btn-outline" href="${c.cta.href}">${esc(c.cta.label)} &rarr;</a>`;
    return `<article class="card focus-card reveal" data-id="${c.id}">
      <span class="status ${current ? "current" : "open"}">${esc(c.status)}</span>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.summary)}</p>
      ${tags(c.skills)}
      <p class="highlight">${esc(c.highlight)}</p>
      ${cta}
    </article>`;
  }).join("");

  /* ---------------- Experience ---------------- */
  $("[data-experience]").innerHTML = visible(EXPERIENCE).map((e) => `
    <li class="tl-item reveal">
      <article class="card tl-card${phClass(e)}">
        <div class="tl-top"><h3>${esc(e.title)}${phBadge(e)}</h3><span class="dates">${esc(e.dates)}</span></div>
        <p class="org"><strong>${esc(e.org)}</strong> · ${esc(e.place)}</p>
        <div class="tl-cols">
          <div><h4>Responsibilities</h4><ul>${(e.responsibilities || []).map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
          ${e.achievements || e.tools ? `<div>
            ${e.achievements ? `<h4>Key achievements</h4>${e.achievements.map((a) => `<div class="achievement">${svg("star")}<span>${esc(a)}</span></div>`).join("")}` : ""}
            ${e.tools ? `<h4 style="margin-top:18px">Tools &amp; areas</h4>${tags(e.tools)}` : ""}
          </div>` : ""}
        </div>
      </article>
    </li>`).join("");

  /* ---------------- Skills ---------------- */
  $("[data-skills]").innerHTML = SKILLS.map((g) => `
    <article class="card skill-card reveal">
      <h3><span class="dot" aria-hidden="true"></span>${esc(g.group)}</h3>
      <ul class="skill-list">
        ${visible(g.items).map((s) => `<li class="${s.placeholder ? "muted" : ""}"><span>${esc(s.name)}${phBadge(s)}</span><span class="lvl">${esc(s.level)}</span></li>`).join("")}
      </ul>
    </article>`).join("");

  /* ---------------- Projects ---------------- */
  const projects = visible(PROJECTS);
  // Simple drawn mock-up used until a real screenshot is added
  const mock = (p) => {
    const lines = '<i></i><i></i><i class="short"></i>';
    if (/mobile/i.test(p.type)) return `<div class="mock mock-phone" aria-hidden="true"><b></b><div class="mock-screen"><em></em>${lines}<div class="mock-tiles"><span></span><span></span></div></div></div>`;
    if (/web/i.test(p.type)) return `<div class="mock mock-browser" aria-hidden="true"><div class="mock-bar"><span></span><span></span><span></span></div><div class="mock-screen"><em></em>${lines}<div class="mock-tiles"><span></span><span></span><span></span></div></div></div>`;
    return `<div class="mock mock-doc" aria-hidden="true"><div class="mock-screen"><em></em>${lines}${lines}</div></div>`;
  };
  const cover = (p) => `<div class="cover">
      ${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy">` : mock(p)}
      <span class="type">${esc(p.type)}</span>
    </div>`;
  const linkHtml = (p) => [
    p.links.github ? `<a class="link-btn" href="${esc(p.links.github)}" target="_blank" rel="noopener">GitHub</a>` : "",
    p.links.demo ? `<a class="link-btn" href="${esc(p.links.demo)}" target="_blank" rel="noopener">Live demo</a>` : "",
  ].join("");

  function renderProjects(filter) {
    const list = projects.filter((p) => filter === "all" || p.categories.includes(filter));
    $("[data-projects]").innerHTML = list.length
      ? list.map((p) => `
        <article class="card project-card${phClass(p)}">
          ${cover(p)}
          <div class="project-body">
            <h3>${esc(p.title)}${phBadge(p)}</h3>
            <p>${esc(p.description)}</p>
            ${tags(p.tech)}
            <div class="project-actions">
              <button class="link-btn" type="button" data-open="${projects.indexOf(p)}">View details &rarr;</button>
              ${linkHtml(p)}
            </div>
          </div>
        </article>`).join("")
      : `<p class="empty">No projects in this category yet.</p>`;
  }
  renderProjects("all");

  function setFilter(f) {
    $$(".filter").forEach((b) => {
      const on = b.dataset.filter === f;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on);
    });
    renderProjects(f);
  }
  $$(".filter").forEach((b) => b.addEventListener("click", () => setFilter(b.dataset.filter)));
  $$("[data-goto-filter]").forEach((b) => b.addEventListener("click", () => {
    setFilter(b.dataset.gotoFilter);
    $("#projects").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));

  /* Project details modal */
  const modal = $("#project-modal");
  $("[data-projects]").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    const p = projects[+btn.dataset.open];
    const row = (label, val) => (val ? `<div><dt>${label}</dt><dd>${esc(val)}</dd></div>` : "");
    $("[data-modal-body]").innerHTML = `
      <button class="icon-btn modal-close" type="button" aria-label="Close" data-close>${svg("close")}</button>
      ${cover(p)}
      <div class="modal-content">
        <h2 id="modal-title">${esc(p.title)}${phBadge(p)}</h2>
        <p class="lead">${esc(p.description)}</p>
        <dl>
          ${row("Problem", p.problem)}
          ${row("My contribution", p.contribution)}
          ${row("Testing approach", p.testing)}
          <div><dt>Technologies</dt><dd>${tags(p.tech)}</dd></div>
        </dl>
        <div class="project-actions">${linkHtml(p) || '<span class="muted">GitHub and live demo links coming soon.</span>'}</div>
      </div>`;
    modal.showModal();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) modal.close();
  });

  /* ---------------- Education & development ---------------- */
  $("[data-education]").innerHTML = EDUCATION.map((e) => `
    <article class="card edu-card reveal"><h3>${esc(e.title)}</h3><span class="when">${esc(e.dates)}</span>
      <span class="sub">${esc(e.org)}${e.note ? " · " + esc(e.note) : ""}</span></article>`).join("");
  const dev = visible(DEVELOPMENT);
  $("[data-development]").innerHTML = dev.length
    ? dev.map((d) => `
      <article class="card edu-card reveal${phClass(d)}"><span class="kind">${esc(d.kind)}</span>
        <h3>${d.link ? `<a href="${esc(d.link)}" target="_blank" rel="noopener">${esc(d.title)}</a>` : esc(d.title)}${phBadge(d)}</h3>
        <span class="when">${esc(d.dates)}</span><span class="sub">${esc(d.org)}</span></article>`).join("")
    : `<p class="muted">Certifications and training will be listed here.</p>`;

  /* ---------------- Contact details & resumes ---------------- */
  const contacts = [
    { icon: "mail", label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: "li", label: "LinkedIn", value: "linkedin.com/in/meji-a-g", href: SITE.linkedin, ext: true },
    SITE.github ? { icon: "gh", label: "GitHub", value: SITE.github.replace(/^https?:\/\//, ""), href: SITE.github, ext: true } : null,
    { icon: "phone", label: "Phone", value: SITE.phone, href: `tel:${SITE.phoneHref}` },
    SITE.location ? { icon: "pin", label: "Location", value: SITE.location } : null,
  ].filter(Boolean);
  $("[data-contact]").innerHTML = contacts.map((c) => `
    <li><span class="ci">${svg(c.icon)}</span><div><small>${c.label}</small>
      ${c.href ? `<a href="${esc(c.href)}"${c.ext ? ' target="_blank" rel="noopener"' : ""}>${esc(c.value)}</a>` : `<span class="v">${esc(c.value)}</span>`}
    </div></li>`).join("");

  $("[data-resume-list]").innerHTML = SITE.resumes.map((r) => `<a href="${esc(r.file)}" download>${svg("dl")}${esc(r.label)}</a>`).join("");
  $("[data-resume-menu]").innerHTML = SITE.resumes.map((r) => `<a role="menuitem" href="${esc(r.file)}" download><strong>${esc(r.label)}</strong><span>${esc(r.note)}</span></a>`).join("");

  /* Resume dropdown */
  const dd = $("#resume-dd"), ddBtn = $("button", dd);
  const setDD = (open) => { dd.classList.toggle("open", open); ddBtn.setAttribute("aria-expanded", open); };
  ddBtn.addEventListener("click", (e) => { e.stopPropagation(); setDD(!dd.classList.contains("open")); });
  document.addEventListener("click", (e) => { if (!dd.contains(e.target)) setDD(false); });
  dd.addEventListener("keydown", (e) => { if (e.key === "Escape") { setDD(false); ddBtn.focus(); } });

  /* ---------------- Theme toggle (light by default) ---------------- */
  const root = document.documentElement, themeBtn = $("#theme-toggle");
  const syncThemeLabel = () => themeBtn.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  syncThemeLabel();
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    syncThemeLabel();
  });

  /* ---------------- Mobile menu & nav state ---------------- */
  const menuBtn = $("#menu-btn"), links = $("#nav-links");
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("a", links).forEach((a) => a.addEventListener("click", () => { links.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }));

  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Highlight the nav link for the section in view
  if ("IntersectionObserver" in window) {
    const navMap = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navMap.forEach((a) => a.classList.remove("active"));
          const a = navMap.get(en.target.id);
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------------- Reveal on scroll ---------------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------------- Contact form ---------------- */
  const form = $("#contact-form"), status = $("#form-status");
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
    subject: (v) => (v.trim().length >= 3 ? "" : "Please add a short subject."),
    message: (v) => (v.trim().length >= 10 ? "" : "Please write a message of at least 10 characters."),
  };
  const check = (name) => {
    const el = form.elements[name], msg = rules[name](el.value);
    el.closest(".field").classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", !!msg);
    $(`#e-${name}`).textContent = msg;
    return !msg;
  };
  Object.keys(rules).forEach((n) => form.elements[n].addEventListener("blur", () => check(n)));
  const setStatus = (cls, text) => { status.className = "form-status " + cls; status.textContent = text; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { setStatus("err", "Please fix the highlighted fields."); form.querySelector(".invalid input, .invalid textarea")?.focus(); return; }
    const data = Object.fromEntries(new FormData(form));

    if (SITE.formEndpoint) {
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const res = await fetch(SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        setStatus("ok", "Thank you! Your message has been sent. I'll get back to you soon.");
      } catch (err) {
        setStatus("err", `Sorry, the message could not be sent. Please email me directly at ${SITE.email}.`);
      } finally {
        btn.disabled = false; btn.textContent = "Send message";
      }
    } else {
      // No form service configured: hand the message to the visitor's email app.
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      setStatus("info", `Your email app should open with this message ready to send. If it doesn't, please write to ${SITE.email}.`);
    }
  });

  $("#year").textContent = new Date().getFullYear();
})();
