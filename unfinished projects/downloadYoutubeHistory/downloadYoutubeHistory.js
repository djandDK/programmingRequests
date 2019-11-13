var btn = document.createElement("BUTTON");
btn.innerHTML = "Get history";
btn.addEventListener("click", getHistory);
document.getElementById("header-container").appendChild(btn);

//virker ikke da queryselector all går til toppen igen
function getHistory() {
    ytTitle = "";
    while (ytTitle != ytTitles[ytTitles.length - 1].innerHTML) {
        ytTitles = document.querySelectorAll('[id="video-title"]');
        window.scrollTo(0,document.documentElement.scrollHeight);
        ytTitle = ytTitles[ytTitles.length - 1].innerHTML;
    }
}
