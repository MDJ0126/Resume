function copyToClipboard(element) {
    const text = element.innerText || element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert(`\"${text}\"가 클립보드에 복사되었습니다.`);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".copy").forEach(element => {
        element.setAttribute("onclick", "copyToClipboard(this)");
        element.innerHTML += '<div class="copy-icon"></div>';
    });
});