
document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();
    initializeProjectFilters();
    updateCopyrightYear();

});


/* =========================
   DARK / LIGHT MODE
========================= */

function initializeTheme() {

    const themeButton = document.querySelector(".theme-toggle");

    if (!themeButton) return;

    // Restore the user's previous choice.
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    updateThemeButton(themeButton);

    // Toggle theme when clicked.
    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeButton(themeButton);

    });

}


function updateThemeButton(button) {

    const isLight = document.body.classList.contains("light-mode");

    button.textContent = isLight ? "☾" : "☀";

    button.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

}


/* =========================
   PROJECT FILTERING
========================= */

function initializeProjectFilters() {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(
        ".projects-section .project-card"
    );
    const projectCount = document.querySelector(".project-count");

    // Homepage has no filter buttons.
    if (filterButtons.length === 0) return;

    function applyFilter(category) {

        let visibleCount = 0;

        projects.forEach(project => {

            const categories = (
                project.dataset.category || ""
            ).split(/\s+/);

            const matches =
                category === "all" ||
                categories.includes(category);

            project.hidden = !matches;

            if (matches) {
                visibleCount++;
            }

        });

        if (projectCount) {
            projectCount.textContent =
                `Showing ${visibleCount} project` +
                (visibleCount === 1 ? "" : "s");
        }

        filterButtons.forEach(button => {

            const isActive = button.dataset.filter === category;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));

        });

    }

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            applyFilter(button.dataset.filter);

        });

    });

    // Start with all projects visible.
    applyFilter("all");

    // Make direct links to individual projects work.
    function revealLinkedProject() {

        const id = decodeURIComponent(
            window.location.hash.slice(1)
        );

        const linkedProject = Array.from(projects).find(
            project => project.id === id
        );

        if (linkedProject) {
            applyFilter("all");
        }

    }

    revealLinkedProject();

    window.addEventListener("hashchange", revealLinkedProject);

}


/* =========================
   COPYRIGHT YEAR
========================= */

function updateCopyrightYear() {

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

}
