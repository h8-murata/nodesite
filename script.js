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
