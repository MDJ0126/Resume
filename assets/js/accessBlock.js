// ───────────────────────────────────────────────────────────
// 접근 차단 목록
// 방문자 IP의 조직/ISP 이름에 아래 문자열이 포함되면 페이지를 차단합니다.
// 차단하고 싶은 회사명을 여기에 추가하세요. (대소문자 무시)
// ───────────────────────────────────────────────────────────
const BLOCKED_ORGS = ["해긴", "Haegin"];

(function () {
    // 방문자의 네트워크 정보 조회 (무료 IP API, 키 불필요)
    fetch("https://ipwho.is/")
        .then((res) => res.json())
        .then((data) => {
            if (!data || data.success === false) return;

            const conn = data.connection || {};
            const haystack = [data.org, data.isp, conn.org, conn.isp, conn.domain]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const isBlocked = BLOCKED_ORGS.some((name) =>
                haystack.includes(name.toLowerCase())
            );

            if (isBlocked) {
                // 페이지 내용을 비우고 차단 안내로 교체
                document.documentElement.innerHTML =
                    '<head><meta charset="UTF-8"><title>접근 제한</title></head>' +
                    '<body style="margin:0;display:flex;align-items:center;justify-content:center;' +
                    'height:100vh;font-family:sans-serif;color:#555;background:#fff;text-align:center;padding:24px;">' +
                    '<div>접근이 제한된 페이지입니다.</div></body>';
                if (window.stop) window.stop();
            }
        })
        .catch(() => {
            /* 조회 실패 시에는 정상 노출 (차단 안 함) */
        });
})();
