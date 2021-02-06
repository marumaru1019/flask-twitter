// スクロールトップのアニメーション
$(function () {
    let Top = $("#page-top");
    Top.hide();
    // スクロールがある場所に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            Top.fadeIn(1000);
        } else {
            Top.fadeOut(500);
        }
    });

    // スクロールしてトップ
    Top.click(function () {
        $("body,html").animate(
            {
                scrollTop: 0,
            },
            500
        );
        return false;
    });
});
