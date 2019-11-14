//
// Create a input field to enter the milliseconds to wait before each page scroll
//
var input = document.createElement("INPUT");
input.setAttribute("style", "font-family: Roboto, Arial, sans-serif; font-size: 25px; border-width: 1px; border-style: solid; background-color: #FFFFFF;");
input.setAttribute("placeholder", "time between scrolls in ms");
input.setAttribute("id", "scrollWait"); 
document.getElementById("header-container").appendChild(input);

//
// Create a button to activate the plugin on https://www.youtube.com/feed/history
//
var btn = document.createElement("BUTTON");
btn.innerHTML = "Get history";
btn.addEventListener("click", getScrollWait);
btn.setAttribute("style", "font-family: Roboto, Arial, sans-serif; font-size: 25px; border-width: 1px; border-style: solid; background-color: #F1F1F1;");

btn.addEventListener('mouseenter', e => {
    btn.setAttribute("style", "font-family: Roboto, Arial, sans-serif; font-size: 25px; border-width: 1px; border-style: solid; background-color: #d6d6d6;");
});
  
btn.addEventListener('mouseleave', e => {
    btn.setAttribute("style", "font-family: Roboto, Arial, sans-serif; font-size: 25px; border-width: 1px; border-style: solid; background-color: #F1F1F1;");
});

document.getElementById("header-container").appendChild(btn);

//
// variable starting at 0, that contains the last height of the document.
//
lastHeight = 0;

//
// Function that scrolls the page until it can't scroll anymore.
//
function getScrollWait() {
    scrollWait = document.getElementById("scrollWait").value;
    if (scrollWait == null || scrollWait == "") {
        if (confirm("You didn't select a value for scroll wait, are you fine with the default value of 30000 milliseconds being used?\n\n30000 milliseconds is the same as 30 seconds.")) {
            scrollToBottom(30000)
        }
    } else {
        if (confirm("You entered a scroll wait time of " + scrollWait + " milliseconds, are you fine with that wait time?\n\nyour entered time is the same as " + scrollWait/1000 + " seconds.")) {
            scrollToBottom(scrollWait)
        }
    }
}


//
// Function that scrolls the page until it can't scroll anymore.
//
function scrollToBottom(wait) {
    window.scrollTo(0,document.documentElement.scrollHeight);
    setTimeout(function() {
        if (document.documentElement.scrollHeight != lastHeight) {
            lastHeight = document.documentElement.scrollHeight;
            scrollToBottom(wait);
        } else {
            getHistory();
        }
     }, wait)
}


//
// When it has reached the bottom, search the html and extract titles, links and thumbnailurls, then offer to save it as json
//
function getHistory() {
    alert("Please wait while the plugin converts your watch history to json.\n\nFirefox may become unresponsive during this task, that isn't a problem and if you wait it will finish the task.");
    ytTitles = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-video-renderer[id="video-title"]');
    ytThumbnails = document.querySelectorAll('yt-img-shadow.style-scope.ytd-thumbnail.no-transition');
    var jsonList = '{"WatchHistory":[]}';
    ytTitles.forEach(function(item, index) {
        var obj = JSON.parse(jsonList);
        obj["WatchHistory"].push({"Title": (item.innerHTML).trim(), "Url": item.href, "Thumbnail": ytThumbnails[index].querySelector('img[id="img"]').getAttribute('src')});
        jsonList = JSON.stringify(obj);
    });
    var WatchHistorySTR = "data:text/json;charset=utf-8," + encodeURIComponent(jsonList);
    var link = document.createElement('a');
    link.setAttribute("href", WatchHistorySTR);
    link.setAttribute("download", "WatchHistory.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
    alert("The plugin has now finished, and you may do as you please.");
}

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.oldValue = "";
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

setInputFilter(document.getElementById("scrollWait"), function(value) {
    return /^\d*$/.test(value); // Integer >= 0
});