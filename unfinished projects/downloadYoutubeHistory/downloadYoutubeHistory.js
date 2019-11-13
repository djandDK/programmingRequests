var btn = document.createElement("BUTTON");
btn.innerHTML = "Get history";
btn.addEventListener("click", scrollToBottom);
document.getElementById("header-container").appendChild(btn);
lastHeight = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToBottom() {
    window.scrollTo(0,document.documentElement.scrollHeight);
    setTimeout(function() {
        if (document.documentElement.scrollHeight != lastHeight) {
            lastHeight = document.documentElement.scrollHeight;
            scrollToBottom();
        } else {
            getHistory();
        }
     }, 7500)
}

function getHistory() {
    ytTitles = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-video-renderer[id="video-title"]');
    var jsonList = '{"WatchHistory":[]}';
    ytTitles.forEach(function(item, index) {
        var obj = JSON.parse(jsonList);
        obj["WatchHistory"].push({"Title": (item.innerHTML).trim(), "Url": item.href});
        jsonList = JSON.stringify(obj);
    });
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonList);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "WatchHistory.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
