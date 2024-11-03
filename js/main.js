// Global Variable

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

// switch colors

colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    // set color on root
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
// close settings box
closeIcon.onclick = () => {
  settingsBox.classList.remove("open");
};

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 160) {
    // Scrolling down
    header.classList.add("hide");
  } else {
    // Scrolling up
    header.classList.remove("hide");
  }
  lastScrollY = window.scrollY;
});

// make scroll behavior smooth
document.documentElement.style.scrollBehavior = "smooth";

// create navbar && click to target section

sections.forEach((section) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.innerHTML = section.id;
  a.href = `#${section.id}`;
  li.appendChild(a);
  ul.appendChild(li);
});

// click to view links

links.addEventListener("click", () => {
  ul.classList.toggle("open");
});

const controlNavbar = () => {
  if (window.scrollY > 160) {
    scrollToTop.style.transform = "translateX(0)";
  } else {
    scrollToTop.style.transform = "translateX(200%)";
  }
};

window.addEventListener("scroll", controlNavbar);

//  add border to section when in view
function makeActive() {
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  }
}
window.addEventListener("scroll", makeActive);
