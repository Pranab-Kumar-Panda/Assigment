const techRow1 = [
  { name: "React" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "Node.js" },
  { name: "Figma" },
  { name: "AWS" },
  { name: "Docker" },
  { name: "TypeScript" },
  { name: "MongoDB" },
  { name: "Next.js" },
  { name: "Machine Learning" },
  { name: "Cybersecurity" },
];

const techRow2 = [
  { name: "GraphQL" },
  { name: "React Native" },
  { name: "Tailwind CSS" },
  { name: "Data Science" },
  { name: "Kubernetes" },
  { name: "Redis" },
  { name: "PostgreSQL" },
  { name: "REST APIs" },
  { name: "System Design" },
  { name: "Testing & QA" },
  { name: "DSA & Algorithms" },
  { name: "DevOps" },
];

function buildMarquee(items) {
  return [...items, ...items]
    .map(
      (t) =>
        `<div class="tech-tag"><span class="t-icon">${t.icon}</span>${t.name}</div>`,
    )
    .join("");
}

document.getElementById("row1").innerHTML = buildMarquee(techRow1);
document.getElementById("row2").innerHTML = buildMarquee(techRow2);

const loginModal = document.getElementById("loginModal");
document.getElementById("loginBtn").addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.add("active");
});
document
  .getElementById("modalClose")
  .addEventListener("click", () => loginModal.classList.remove("active"));
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.classList.remove("active");
});

const mobileLoginBtn = document.getElementById("mobileLoginBtn");
if (mobileLoginBtn)
  mobileLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.add("active");
    document.getElementById("mobileMenu").classList.remove("open");
  });

document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("open");
});

const navbar = document.getElementById("navbar");
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});

scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

function toggleCourse(btn) {
  const extra = btn.nextElementSibling;
  const isOpen = extra.classList.contains("open");
  extra.classList.toggle("open");
  btn.innerHTML = isOpen
    ? "View Topics <span>▾</span>"
    : "Hide Topics <span>▴</span>";
}

function toggleFaq(el) {
  const item = el.parentElement;
  const answer = el.nextElementSibling;
  const wasOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach((i) => {
    i.classList.remove("open");
    i.querySelector(".faq-answer").classList.remove("open");
  });
  if (!wasOpen) {
    item.classList.add("open");
    answer.classList.add("open");
  }
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();
  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("en-IN");
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString("en-IN");
  };
  requestAnimationFrame(update);
}

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".counter").forEach((el) => counterObs.observe(el));
