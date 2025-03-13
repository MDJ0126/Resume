let gallerys = {};

// 갤러리 업데이트 함수
function updateGallery(index) {
    const container = document.querySelector("#gallery-container-" + index);
    const gallery = container.querySelector(".gallery");
    gallery.style.transform = `translateX(-${gallerys[index] * 100}%)`;
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