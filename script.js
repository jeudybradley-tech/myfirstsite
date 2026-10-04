/* ============================================================
   Arcline AI — site scripts
   ============================================================ */

// Where contact form messages are sent. Change this to your own email address.
const CONTACT_EMAIL = "hello@example.com";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Header: add a border once the page scrolls ---------- */
const header = document.querySelector(".site-header");
const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 8);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* ---------- Mobile menu ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navMenu.classList.toggle("open", open);
}

navToggle.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});
navMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("open")) {
    setMenu(false);
    navToggle.focus();
  }
});

/* ---------- Reveal sections as they scroll into view ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el, i) => {
    // Small stagger for items that sit side by side in a grid
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ---------- Use-case tabs ---------- */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function selectTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
  });
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    let next = null;
    if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
    if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (e.key === "Home") next = tabs[0];
    if (e.key === "End") next = tabs[tabs.length - 1];
    if (next) {
      e.preventDefault();
      selectTab(next);
      next.focus();
    }
  });
});

/* ---------- Hero "agent console" animation ---------- */
const TASKS = [
  { tag: "support", cls: "", msg: "Answered order question for Maria K.", mins: 6 },
  { tag: "crm", cls: "t-crm", msg: "Logged new lead + enriched company data", mins: 9 },
  { tag: "email", cls: "t-mail", msg: "Drafted follow-up to 14 warm leads", mins: 35 },
  { tag: "calendar", cls: "t-cal", msg: "Booked discovery call — Thu 2:30 PM", mins: 8 },
  { tag: "invoice", cls: "", msg: "Matched 23 invoices to payments", mins: 46 },
  { tag: "support", cls: "", msg: "Resolved refund request, notified team", mins: 7 },
  { tag: "content", cls: "t-mail", msg: "Wrote 5 product descriptions", mins: 40 },
  { tag: "crm", cls: "t-crm", msg: "Qualified inbound lead: score 92/100", mins: 12 },
  { tag: "report", cls: "t-cal", msg: "Sent weekly sales summary to Slack", mins: 25 },
];

const consoleBody = document.getElementById("console-body");
const statTasks = document.getElementById("stat-tasks");
const statHours = document.getElementById("stat-hours");
const MAX_LINES = 6;
let taskIndex = 0;
let tasksDone = 0;
let minutesSaved = 0;

function makeLine(task, done) {
  const line = document.createElement("div");
  line.className = "log-line";
  line.innerHTML = `
    <span class="tag ${task.cls}"></span>
    <span class="msg"></span>
    <span class="status ${done ? "" : "pending"}">${done ? "✓ done" : "running…"}</span>`;
  line.querySelector(".tag").textContent = task.tag;
  line.querySelector(".msg").textContent = task.msg;
  return line;
}

function recordDone(task) {
  tasksDone += 1;
  minutesSaved += task.mins;
  statTasks.textContent = tasksDone.toLocaleString();
  statHours.textContent = (minutesSaved / 60).toFixed(1);
}

function runNextTask() {
  const task = TASKS[taskIndex % TASKS.length];
  taskIndex += 1;

  const line = makeLine(task, false);
  consoleBody.appendChild(line);
  while (consoleBody.children.length > MAX_LINES) consoleBody.firstElementChild.remove();

  setTimeout(() => {
    const status = line.querySelector(".status");
    status.textContent = "✓ done";
    status.classList.remove("pending");
    recordDone(task);
    setTimeout(runNextTask, 900);
  }, 1100);
}

if (consoleBody) {
  // Start with a few finished tasks so the console never looks empty
  const seed = prefersReducedMotion ? MAX_LINES : 3;
  TASKS.slice(0, seed).forEach((task) => {
    consoleBody.appendChild(makeLine(task, true));
    recordDone(task);
  });
  taskIndex = seed;
  if (!prefersReducedMotion) setTimeout(runNextTask, 600);
}

/* ---------- Pricing buttons pre-select the plan in the form ---------- */
const interestSelect = document.querySelector('#contact-form select[name="interest"]');
document.querySelectorAll("[data-plan]").forEach((btn) => {
  btn.addEventListener("click", () => {
    interestSelect.value = btn.dataset.plan;
  });
});

/* ---------- Contact form ---------- */
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.className = "form-status";

  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((field) => {
    const valid = field.checkValidity() && field.value.trim() !== "";
    field.classList.toggle("invalid", !valid);
    field.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    formStatus.textContent = "Please fill in your name, a valid email and a short message.";
    formStatus.classList.add("error");
    firstInvalid.focus();
    return;
  }

  const data = new FormData(form);
  const subject = `New inquiry from ${data.get("name")}${data.get("company") ? ` (${data.get("company")})` : ""}`;
  const body = [
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Company: ${data.get("company") || "—"}`,
    `Interested in: ${data.get("interest")}`,
    "",
    data.get("message"),
  ].join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formStatus.textContent = "Thanks! Your email app should open with your message ready to send.";
  formStatus.classList.add("ok");
  form.reset();
});

form.addEventListener("input", (e) => {
  if (e.target.classList.contains("invalid") && e.target.checkValidity()) {
    e.target.classList.remove("invalid");
    e.target.setAttribute("aria-invalid", "false");
  }
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
