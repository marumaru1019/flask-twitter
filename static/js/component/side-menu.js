let side = document.getElementById("js-side");
let hamburger = document.getElementById("js-hamburger");

// humburgerにクラスを追加してsideメニュー開閉のキーとする
hamburger.onclick = function () {
    let sideHave = hamburger.classList.contains("js-open");
    let sideHaves = hamburger.className;
    // サイドメニューをとじる時
    if (sideHave == true) {
        hamburger.classList.remove("js-open");
        console.log(sideHave);
        sideClose();
        $(".side__menu").css("display", "none");

        // サイドメニューをひらく時
    } else if (sideHave != true) {
        hamburger.classList.add("js-open");
        console.log(sideHave);
        sideOpen();
        $(".side__menu").css("display", "block");
    }
};

let sideOpen = () => {
    console.log("open");
    side.classList.add("side-open");
};

let sideClose = () => {
    console.log("close");
    side.classList.remove("side-open");
};
