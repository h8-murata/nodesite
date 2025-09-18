// style.js
document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // ローディング画面
    // ======================
    const loadingScreen = document.getElementById("loading");
    const navEntries = performance.getEntriesByType("navigation") || [];
    const navigationType = navEntries[0]?.type ?? performance.navigation?.type;
    const hasVisited = sessionStorage.getItem("visited");

    if (!hasVisited || navigationType === "reload" || navigationType === 1) {
        const startTime = Date.now();
        window.addEventListener("load", () => {
            const elapsedTime = Date.now() - startTime;
            const minDisplayTime = 1500;
            const remainingTime = minDisplayTime - elapsedTime;

            const hideLoadingScreen = () => {
                loadingScreen.classList.add("loaded");
                sessionStorage.setItem("visited", "true");
            };

            if (remainingTime > 0) {
                setTimeout(hideLoadingScreen, remainingTime);
            } else {
                hideLoadingScreen();
            }
        });
    } else if (loadingScreen) {
        loadingScreen.style.display = "none";
    }

    // ======================
    // 現在ページのナビ強調
    // ======================
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const navItems = document.querySelectorAll(".head-nav ul li");
    navItems.forEach((item) => {
        const link = item.querySelector("a");
        if (link) {
            const linkPath = link.pathname.replace(/\/$/, "");
            if (
                linkPath === currentPath ||
                (currentPath === "" && linkPath.endsWith("/index.html"))
            ) {
                item.classList.add("current");
            }
        }
    });

    // ======================
    // トップに戻るボタンを生成
    // ======================
    const toTopBtn = document.createElement("a");
    toTopBtn.id = "to-top-btn";
    toTopBtn.href = "#";
    toTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="feather feather-arrow-up">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
`;
    document.body.appendChild(toTopBtn);

    // ボタン用のスタイルをJSで追加
    const style = document.createElement("style");
    style.textContent = `
    #to-top-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: #fff;
    border-radius: 50%;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 9999;
    }
    #to-top-btn.show {
    opacity: 1;
    pointer-events: auto;
    }
    #to-top-btn svg {
    stroke: #fff;
    }
`;
    document.head.appendChild(style);

    // スクロールで表示/非表示
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.add("show");
        } else {
            toTopBtn.classList.remove("show");
        }
    });

    // クリックでスムーズスクロール
    toTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // === ナビゲーションスライダー (PC版) ===
    const nav = document.querySelector('.head-nav ul');

    // PC表示の時だけ機能を有効にする
    if (nav && window.matchMedia('(min-width: 768px)').matches) {
        const currentItem = nav.querySelector('.current');

        const setSliderPosition = (targetItem) => {
            if (!targetItem) {
                return;
            }
            const rect = targetItem.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            const height = 40; // スライダーの高さ
            nav.style.setProperty('--slider-width', `${rect.width}px`);
            nav.style.setProperty('--slider-left', `${rect.left - navRect.left}px`);
            nav.style.setProperty('--slider-height', `${height}px`);
        };

        // 初期位置を設定
        if (currentItem) {
            setTimeout(() => setSliderPosition(currentItem), 100);
        }

        // ホバー時のイベント
        nav.querySelectorAll('li:not(.contact-link)').forEach(item => {
            item.addEventListener('mouseover', () => {
                setSliderPosition(item);
            });
        });

        // マウスが離れた時のイベント
        nav.addEventListener('mouseleave', () => {
            if (currentItem) {
                setSliderPosition(currentItem);
            } else {
                // `current`クラスがない場合はスライダーを非表示にする
                nav.style.setProperty('--slider-width', `0px`);
            }
        });

        // ウィンドウのリサイズ時に再計算
        window.addEventListener('resize', () => {
            if (currentItem) {
                setSliderPosition(currentItem);
            }
        });
    }

    // === ハンバーガーメニュー (モバイル版) ===
    const navButton = document.querySelector('.nav-button');
    const body = document.body;
    
    if (navButton) {
        navButton.addEventListener('click', () => {
            body.classList.toggle('nav-open');
        });
    }
});

