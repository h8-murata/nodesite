document.addEventListener('DOMContentLoaded', () => {

// 送信ボタンの設定
const applicationForm = document.querySelector('.contact-application-form');
const popup = document.getElementById('popup');

applicationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {
        showPopup('送信完了しました', 'success');
        applicationForm.reset();
    } else {
        showPopup('送信に失敗しました', 'error');
    }
});

function showPopup(message, type) {
    popup.textContent = message;

    // hidden と色クラスをリセットしてから type を付与
    popup.classList.remove('hidden', 'success', 'error', 'show');
    popup.classList.add(type);

    // 少し遅延させてアニメーション用 show クラスを付与
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    // 3秒後に非表示
    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 3000);
}

// お問い合わせ内容欄の設定
const textarea = document.querySelector('.contact-application-form textarea');

textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

});

