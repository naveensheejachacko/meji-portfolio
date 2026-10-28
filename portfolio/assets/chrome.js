(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const root = document.documentElement;
  try {
    if (localStorage.getItem("theme") === "dark") root.setAttribute("data-theme", "dark");
  } catch (e) {}

  const themeBtn = $("#theme-toggle");
  if (themeBtn) {
    const sync = () => themeBtn.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    sync();
    themeBtn.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      sync();
    });
  }

  const menuBtn = $("#menu-btn");
  const links = $("#nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$("a", links).forEach((a) => a.addEventListener("click", () => {
      links.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    }));
  }

  const nav = $(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = $("#contact-form");
  if (!form) return;
  const status = $("#form-status");
  const email = form.dataset.email || "";
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
    subject: (v) => (v.trim().length >= 3 ? "" : "Please add a short subject."),
    message: (v) => (v.trim().length >= 10 ? "" : "Please write a message of at least 10 characters."),
  };
  const check = (name) => {
    const el = form.elements[name];
    const msg = rules[name](el.value);
    el.closest(".field").classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", String(!!msg));
    const err = document.getElementById("e-" + name);
    if (err) err.textContent = msg;
    return !msg;
  };
  Object.keys(rules).forEach((n) => form.elements[n].addEventListener("blur", () => check(n)));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) {
      status.className = "form-status err";
      status.textContent = "Please fix the highlighted fields.";
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    const body = data.message + "\n\n— " + data.name + " (" + data.email + ")";
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(data.subject) + "&body=" + encodeURIComponent(body);
    status.className = "form-status info";
    status.textContent = "Your email app should open with this message ready to send. If it doesn't, write to " + email + ".";
  });
})();
