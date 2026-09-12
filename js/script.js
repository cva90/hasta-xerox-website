
/* =========================================================
   HASTA XEROX & DIGITAL SERVICES
   Main JavaScript
   ========================================================= */


/* =========================
   DOM ELEMENTS
   ========================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

const header = document.querySelector(".header");


/* =========================
   MOBILE MENU
   ========================= */

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const isOpen = navbar.classList.contains("active");

        menuBtn.setAttribute("aria-expanded", isOpen);

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

}


/* =========================
   CLOSE MOBILE MENU
   WHEN NAV LINK IS CLICKED
   ========================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuBtn) {

            menuBtn.setAttribute("aria-expanded", "false");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

});


/* =========================
   CLOSE MOBILE MENU
   WHEN CLICKING OUTSIDE
   ========================= */

document.addEventListener("click", (event) => {

    if (!navbar || !menuBtn) return;

    const clickedInsideMenu =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);

    if (
        navbar.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navbar.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

});


/* =========================
   ESCAPE KEY
   CLOSE MOBILE MENU
   ========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuBtn) {

            menuBtn.setAttribute("aria-expanded", "false");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    }

});


/* =========================
   SMOOTH SCROLL
   ========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length <= 1
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================
   ACTIVE NAVIGATION
   ========================= */

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


/* =========================
   UPDATE ACTIVE NAV ON SCROLL
   ========================= */

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================
   UPDATE ON PAGE LOAD
   ========================= */

window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================
   HEADER SHADOW ON SCROLL
   ========================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 8px 25px rgba(15, 23, 42, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================
   HANDLE RESIZE
   ========================= */

window.addEventListener("resize", () => {

    /*
     * Close mobile menu when
     * switching to desktop view.
     */

    if (
        window.innerWidth > 900 &&
        navbar
    ) {

        navbar.classList.remove("active");

        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    }

});


/* =========================
   INTERSECTION OBSERVER
   ========================= */

const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -80px 0px"
};


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        observerOptions
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================
   PREVENT EMPTY LINKS
   ========================= */

document.querySelectorAll('a[href="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});


/* =========================
   PHONE / WHATSAPP LINKS
   ========================= */

const contactLinks =
    document.querySelectorAll(
        'a[href^="tel:"], a[href^="https://wa.me/"]'
    );


contactLinks.forEach((link) => {

    link.addEventListener("click", () => {

        /*
         * Keep the interaction lightweight.
         * Browser handles phone/WhatsApp opening.
         */

        link.style.transform = "scale(0.98)";

        setTimeout(() => {

            link.style.transform = "";

        }, 150);

    });

});


/* =========================
   PAGE READY
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);

