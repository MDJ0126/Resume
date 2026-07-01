let gallerys = {};

// 갤러리 업데이트 함수
function updateGallery(index) {
    const container = document.querySelector("#gallery-container-" + index);
    const gallery = container.querySelector(".gallerys");
    gallery.style.transform = `translateX(-${gallerys[index] * 100}%)`;
    updateGalleryMedia(index); // 현재 슬라이드 영상만 재생, 나머지는 정지
}

// 현재 보이는 슬라이드의 유튜브만 재생하고 그 외 영상은 정지
function updateGalleryMedia(index) {
    const container = document.querySelector("#gallery-container-" + index);
    if (!container) return;

    const items = container.querySelectorAll(".gallery-item");
    const current = gallerys[index] || 0;

    items.forEach((item, i) => {
        const iframe = item.querySelector("iframe");
        if (!iframe || !iframe.contentWindow) return;

        const func = (i === current) ? "playVideo" : "pauseVideo";
        iframe.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: func, args: [] }),
            "*"
        );
    });
}

// 'next' 버튼 클릭 시
function nextSlide(index) {
    if (!(index in gallerys)) {
        gallerys[index] = 0;
    }
    const container = document.querySelector("#gallery-container-" + index);
    const images = container.querySelectorAll(".gallery-item");

    gallerys[index] = (gallerys[index] + 1) % images.length; // index 값 증가
    updateGallery(index);  // 갤러리 업데이트
}

// 'prev' 버튼 클릭 시
function prevSlide(index) {
    if (!(index in gallerys)) {
        gallerys[index] = 0;
    }

    const container = document.querySelector("#gallery-container-" + index);
    const images = container.querySelectorAll(".gallery-item");

    gallerys[index] = (gallerys[index] - 1 + images.length) % images.length; // index 값 감소
    updateGallery(index);  // 갤러리 업데이트
}

// 드래그(스와이프)로 슬라이드 넘기기 — 이미지 슬라이드에서만 동작 (유튜브 제외)
(function enableDragSlide() {
    let drag = null;
    let suppressClick = false;
    const MOVE_THRESHOLD = 5;   // 드래그로 판정할 최소 이동량(px)
    const SLIDE_THRESHOLD = 40; // 슬라이드를 넘기는 최소 이동량(px)

    document.addEventListener("pointerdown", (e) => {
        if (e.button && e.button !== 0) return; // 좌클릭/터치만 처리

        const galleryEl = e.target.closest(".gallerys");
        if (!galleryEl) return;
        if (e.target.closest(".youtube-container")) return; // 유튜브 위에서는 드래그 비활성

        const container = e.target.closest(".gallery-container");
        if (!container) return;

        const items = container.querySelectorAll(".gallery-item");
        if (items.length <= 1) return; // 슬라이드가 하나면 무시

        const index = container.id.replace("gallery-container-", "");
        if (!(index in gallerys)) gallerys[index] = 0;

        drag = {
            index: index,
            el: galleryEl,
            startX: e.clientX,
            slideWidth: items[0].offsetWidth, // 슬라이드 한 칸 너비
            base: gallerys[index],            // 드래그 시작 시점의 슬라이드 번호
            count: items.length,
            moved: false,
        };
        galleryEl.style.transition = "none";
    });

    document.addEventListener("pointermove", (e) => {
        if (!drag) return;
        let delta = e.clientX - drag.startX;
        if (Math.abs(delta) > MOVE_THRESHOLD) drag.moved = true;

        // 양 끝에선 저항감
        const atStart = drag.base === 0 && delta > 0;
        const atEnd = drag.base === drag.count - 1 && delta < 0;
        if (atStart || atEnd) delta *= 0.3;

        const offset = -(drag.base * drag.slideWidth) + delta;
        drag.el.style.transform = `translateX(${offset}px)`;
    });

    function endDrag(e) {
        if (!drag) return;
        const delta = e.clientX - drag.startX;

        // 양 끝에서 멈춤 (순환 없음)
        let target = drag.base;
        if (delta <= -SLIDE_THRESHOLD) target = Math.min(drag.base + 1, drag.count - 1);
        else if (delta >= SLIDE_THRESHOLD) target = Math.max(drag.base - 1, 0);

        gallerys[drag.index] = target;
        drag.el.style.transition = "transform 0.3s ease-in-out";
        drag.el.style.transform = `translateX(-${target * 100}%)`;
        updateGalleryMedia(drag.index); // 드래그로 넘긴 경우에도 영상 재생/정지 갱신

        if (drag.moved) {
            // 드래그 직후 클릭 무시
            suppressClick = true;
            setTimeout(() => { suppressClick = false; }, 0);
        }
        drag = null;
    }

    document.addEventListener("pointerup", endDrag);
    document.addEventListener("pointercancel", endDrag);

    // 드래그 직후 클릭 차단 (캡처 단계)
    document.addEventListener("click", (e) => {
        if (suppressClick) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);

    // 이미지의 기본 드래그(고스트 이미지) 방지
    document.addEventListener("dragstart", (e) => {
        if (e.target.closest(".gallerys")) e.preventDefault();
    });
})();