// tabs.js
document.addEventListener('DOMContentLoaded', () => {

    // ===== ナビボタン（存在する場合のみ） =====
    const navButton = document.querySelector('.nav-button');
    if (navButton) {
        navButton.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }

    // ===== タブ切替 =====
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.job-section');

    if (tabs.length === 0 || sections.length === 0) return; // 存在しなければ処理終了

    function activate(targetId) {
        // タブの状態更新
        tabs.forEach(tab => {
            const isActive = tab.dataset.target === targetId;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        // セクションの表示切替
        sections.forEach(sec => {
            sec.classList.toggle('active', sec.id === targetId);
        });
    }

    // タブクリック・キーボード対応
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activate(tab.dataset.target));
        tab.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate(tab.dataset.target);
            }
        });
    });

    // ページロード時にハッシュがあれば反映
    const hash = window.location.hash.slice(1);
    if (hash) activate(hash);

});

document.addEventListener('DOMContentLoaded', () => {



    // ===== ハンバーガーメニュー =====
    const navButton = document.querySelector('.nav-button');
    const body = document.querySelector('body');

    if (navButton && body) {
        navButton.addEventListener('click', () => {
            body.classList.toggle('nav-open');
        });
    }

    // ===== タブ切替 =====
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.job-section');

    if (tabs.length > 0 && sections.length > 0) {
        function activate(targetId) {
            tabs.forEach(tab => {
                const isActive = tab.dataset.target === targetId;
                tab.classList.toggle('active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
            });
            sections.forEach(sec => {
                sec.classList.toggle('active', sec.id === targetId);
            });
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => activate(tab.dataset.target));
            tab.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate(tab.dataset.target);
                }
            });
        });

        const hash = window.location.hash.slice(1);
        if (hash) activate(hash);
    }

});


// ===== リクルート入力欄 =====
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.accordion-toggle');
    const content = document.querySelector('.accordion-content');

    toggleBtn.addEventListener('click', () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";
        if (isOpen) {
            content.style.maxHeight = "0";
            toggleBtn.textContent = "応募フォームを開く";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            toggleBtn.textContent = "応募フォームを閉じる";
        }
    });
});



document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        button.classList.toggle('active');
        if (button.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = 0;
        }
        
    });
});