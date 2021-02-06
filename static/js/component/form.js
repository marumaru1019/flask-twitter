const title = document.getElementById("js-title");
let downloadButton = $(".js-submit-download");
let getButton = $(".js-submit-get");

// domの読み込み時に実行
window.onload = function () {
    let titleText = title.innerText;
    console.log(titleText);
    // テキストがCompliteだったら Get button をdownloadに変更する
    if (titleText === "Complete") {
        console.log("after");
        downloadButton.addClass("js-submit-show");
        console.log(getButton.css("display"));
        getButton.addClass("js-submit-hide");
        console.log(downloadButton.css("display"));
    } else {
        console.log("before");
        getButton.addClass("js-submit-show");
        console.log(getButton.css("display"));
        downloadButton.addClass("js-submit-hide");
        console.log(downloadButton.css("display"));
    }
};
