document.addEventListener("DOMContentLoaded", () => {
    // 모달 관련 변수들
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalInnerImage");
    var closeBtn = document.getElementById("closeBtn");

    // 이미지 클릭 이벤트를 부모 요소에 위임하기
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal")) {
            const modal = document.getElementById("imageModal");
            const modalImg = document.getElementById("modalInnerImage");
            document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`; // 스크롤바 자리에 공간 채우기
            document.body.style.overflow = "hidden"; // 모달 열 때 페이지 스크롤 비활성화

            modal.style.display = "flex";
            modalImg.src = "";  // 먼저 src를 비워서 이전 이미지 제거
            modalImg.src = event.target.src; // 새로운 이미지 설정
        }
    });


    // 모달 닫기
    closeBtn.onclick = function () {
        modal.style.display = "none"; // 모달 닫기
        document.body.style.paddingRight = "0"; // 스크롤바 자리에 공간 비우기
        document.body.style.overflow = "auto"; // 모달 닫을 때 페이지 스크롤 활성화
    };

    // 모달 밖을 클릭하면 모달 닫기
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"; // 모달 닫기
            document.body.style.paddingRight = "0"; // 스크롤바 자리에 공간 비우기
            document.body.style.overflow = "auto"; // 모달 닫을 때 페이지 스크롤 활성화
        }
    };
});