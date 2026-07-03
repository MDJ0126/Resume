function initializeCompanyToggles() {
    document.querySelectorAll(".company .company-box-container").forEach((company, index) => {
        if (company.dataset.companyToggleReady === "true") return;

        const header = company.querySelector(".title-container");
        const content = company.querySelector(".content-container");
        if (!header || !content) return;

        const contentId = content.id || `company-content-${index + 1}`;
        content.id = contentId;

        header.setAttribute("role", "button");
        header.setAttribute("tabindex", "0");
        header.setAttribute("aria-controls", contentId);
        header.setAttribute("aria-expanded", "false");
        header.setAttribute("title", "경력 상세 펼치기");

        company.classList.add("is-collapsed");
        content.style.height = "0px";
        company.dataset.companyToggleReady = "true";

        content.addEventListener("transitionend", event => {
            if (event.propertyName !== "height") return;
            if (!company.classList.contains("is-collapsed")) {
                content.style.height = "auto";
            }
        });

        const toggle = () => {
            const isCollapsed = company.classList.contains("is-collapsed");

            if (isCollapsed) {
                content.style.height = "0px";
                company.classList.remove("is-collapsed");
                header.setAttribute("aria-expanded", "true");
                header.setAttribute("title", "경력 상세 접기");
                requestAnimationFrame(() => {
                    content.style.height = `${content.scrollHeight}px`;
                });
                return;
            }

            content.style.height = `${content.scrollHeight}px`;
            content.offsetHeight;
            company.classList.add("is-collapsed");
            header.setAttribute("aria-expanded", "false");
            header.setAttribute("title", "경력 상세 펼치기");
            requestAnimationFrame(() => {
                content.style.height = "0px";
            });
        };

        header.addEventListener("click", toggle);
        header.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            toggle();
        });
    });
}

document.addEventListener("DOMContentLoaded", initializeCompanyToggles);
document.addEventListener("postsloaded", initializeCompanyToggles);
window.addEventListener("resize", () => {
    document.querySelectorAll(".company .company-box-container:not(.is-collapsed) .content-container").forEach(content => {
        content.style.height = "auto";
    });
});
