// Global Variables
const links = document.querySelector(".links");
const ul = document.querySelector(".links ul");
const header = document.querySelector("div.header");
const sections = document.querySelectorAll("div.section");
const scrollToTop = document.querySelector("a.scroll-to-top");
const settingsBox = document.querySelector(".settings-box");
let gearicon = document.querySelector(".settings .gear");
let closeIcon = document.querySelector(".settings .settings-box .close");
const colors = document.querySelectorAll(".colors-list li");
let mainColors = localStorage.getItem("color_option");
const sectionHeader = document.querySelectorAll(".speacil-heading");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  colors.forEach((color) => {
    color.classList.remove("active");
    color.dataset.color === mainColors && color.classList.add("active");
  });
}

gearicon.addEventListener("click", () => {
  settingsBox.classList.toggle("open");
});

// Switch colors
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);

    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

// Close settings box
closeIcon.onclick = () => {
  settingsBox.classList.remove("open");
};

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 160) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollY = window.scrollY;
});

// Create navbar & click to target section
sections.forEach((section) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.innerHTML = section.id;
  a.classList.add("anchor");
  a.href = `#${section.id}`;

  a.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all links
    ul.querySelectorAll(".anchor").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to the clicked link
    e.target.classList.add("active");

    // Scroll to the section smoothly
    section.scrollIntoView({ behavior: "smooth" });

    // Highlight the corresponding section header
    sectionHeader.forEach((h) => h.classList.remove("highlight-header"));
    sectionHeader.forEach((h) => {
      if (h.dataset.id === e.target.innerHTML) {
        h.classList.add("highlight-header");
      }
    });
  });

  li.appendChild(a);
  ul.appendChild(li);
});

// Click to view links
links.addEventListener("click", () => {
  ul.classList.toggle("open");
});

// Control the visibility of the scroll-to-top button
const controlSrollToTop = () => {
  if (window.scrollY > 160) {
    scrollToTop.style.transform = "translateX(0)";
  } else {
    scrollToTop.style.transform = "translateX(200%)";
  }
};

window.addEventListener("scroll", controlSrollToTop);

scrollToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add color to section header when in view and highlight active navigation link
function makeActive() {
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add("active");

      const activeLink = ul.querySelector(`a[href="#${section.id}"]`);
      ul.querySelectorAll(".anchor").forEach((link) => {
        link.classList.remove("active");
      });
      activeLink.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  }
}
window.addEventListener("scroll", makeActive);
