document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalInnerImage");
    const closeBtn = document.getElementById("closeBtn");
    if (!modal || !modalImg) return;

    function open(src) {
        modalImg.src = "";
        modalImg.src = src;
        modal.style.display = "flex";
        // 프로젝트 모달 등으로 이미 페이지가 잠겨 있으면 그대로 두고, 아니면 잠금
        if (!document.documentElement.classList.contains("modal-open")) {
            document.documentElement.classList.add("img-modal-open");
        }
    }

    function close() {
        modal.style.display = "none";
        document.documentElement.classList.remove("img-modal-open");
    }

    // 갤러리 이미지(.modal) 클릭 → 확대
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal")) open(event.target.src);
    });

    if (closeBtn) closeBtn.addEventListener("click", close);

    // 배경 클릭 시 닫기
    modal.addEventListener("click", (event) => {
        if (event.target === modal) close();
    });
});
