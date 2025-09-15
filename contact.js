document.addEventListener('DOMContentLoaded', () => {

    // 送信ボタンの設定
    const applicationForm = document.querySelector('.contact-application-form');
    const popup = document.getElementById('popup');

    applicationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const isSuccess = Math.random() > 0.3;

        if (isSuccess) {
            showPopup('送信完了しました', 'success');

            // 選択中のラジオボタンを保存
            const selectedType = document.querySelector('input[name="type"]:checked').value;

            // フォームをリセット
            applicationForm.reset();

            // 選択状態を保持
            document.getElementById(selectedType).checked = true;

            // フォーム表示も保持
            if (selectedType === 'personal') {
                document.getElementById('form-personal').style.display = 'block';
                document.getElementById('form-corporate').style.display = 'none';
            } else {
                document.getElementById('form-personal').style.display = 'none';
                document.getElementById('form-corporate').style.display = 'block';
            }

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

    // お問い合わせ内容欄の自動リサイズ
    const textarea = document.querySelector('.contact-application-form textarea');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // 個人/法人フォーム切り替え
    document.querySelectorAll('input[name="type"]').forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'personal') {
                document.getElementById('form-personal').style.display = 'block';
                document.getElementById('form-corporate').style.display = 'none';
            } else {
                document.getElementById('form-personal').style.display = 'none';
                document.getElementById('form-corporate').style.display = 'block';
            }
        });
    });

});

// 電話ボタンのPC用制御
document.addEventListener("DOMContentLoaded", function () {
    const telBtn = document.querySelector(".tel-btn");
    const isMobile = /iPhone|Android.+Mobile/.test(navigator.userAgent);

    if (!isMobile) {
        telBtn.addEventListener("click", function (e) {
            e.preventDefault();
            alert("お電話は 03-6261-9388 にお願いします（PCからは発信できません）");
        });
    }
});
