// ============================================
// TERMINAL TYPING ANIMATION
// ============================================
const terminalLines = [
  { prompt: "carlos@servidor", path: "~/produccion", cmd: "docker ps" },
  { output: "CONTAINER ID   IMAGE        STATUS" },
  { output: "a3f9c1         mysql:8.0    Exited (1) 2 minutes ago" },
  { prompt: "carlos@servidor", path: "~/produccion", cmd: "tail -n 5 mysql.log" },
  { output: "ERROR: connection refused, port 3306" },
  { prompt: "carlos@servidor", path: "~/produccion", cmd: "docker-compose restart mysql_db" },
  { ok: "✓ mysql_db restaurado — 0 datos perdidos" },
  { prompt: "carlos@servidor", path: "~/produccion", cmd: "_" },
];

function typeTerminal() {
  const body = document.getElementById("terminalBody");
  if (!body) return;
  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;

  function nextLine() {
    if (lineIndex >= terminalLines.length) return;
    const line = terminalLines[lineIndex];
    currentLineEl = document.createElement("div");
    body.appendChild(currentLineEl);

    if (line.cmd !== undefined) {
      typeCommand(line);
    } else {
      currentLineEl.innerHTML = line.ok
        ? `<span class="ok">${line.ok}</span>`
        : `<span>${line.output}</span>`;
      lineIndex++;
      setTimeout(nextLine, line.ok ? 500 : 260);
    }
  }

  function typeCommand(line) {
    const prefix = `<span class="prompt">${line.prompt}</span> <span class="path">${line.path}</span> $ `;
    if (charIndex === 0) {
      currentLineEl.innerHTML = prefix;
    }
    if (charIndex < line.cmd.length) {
      currentLineEl.innerHTML = prefix + line.cmd.slice(0, charIndex + 1) + '<span class="cursor"></span>';
      charIndex++;
      setTimeout(() => typeCommand(line), 38 + Math.random() * 40);
    } else {
      currentLineEl.innerHTML = prefix + line.cmd;
      charIndex = 0;
      lineIndex++;
      setTimeout(nextLine, 380);
    }
  }

  nextLine();
}

// ============================================
// SCROLL REVEAL
// ============================================
function setupReveal() {
  const candidates = document.querySelectorAll(
    ".about__grid, .stack-card, .cert-card, .timeline__item, .project, .contact__inner"
  );
  candidates.forEach(el => el.setAttribute("data-reveal", ""));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
}

// ============================================
// MOBILE MENU
// ============================================
function setupBurger() {
  const burger = document.getElementById("burger");
  const links = document.querySelector(".nav__links");
  if (!burger || !links) return;

  burger.addEventListener("click", () => {
    const isOpen = links.classList.toggle("nav__links--open");
    burger.classList.toggle("nav__burger--open", isOpen);
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("nav__links--open");
      burger.classList.remove("nav__burger--open");
    });
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeTerminal, 500);
  setupReveal();
  setupBurger();
});
