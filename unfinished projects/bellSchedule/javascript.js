function switchBell(day) {

    // variables to contain the time the class starts and the description of the class
    classtime = "0";
    classdesc = "";

    // Get class schedule from a json document
    $.getJSON("schedule.json", function (result) {

        // get the classtimes for the specific day
        times = result[day];

        // Get current time in minutes
        timeInMinutes = (new Date().getHours() * 60) + new Date().getMinutes();

        // Loop through the times object getting the key and converting that into minutes
        // Then compare the key and current time, finding the first one that hasn't started yet
        // move the data of the unstarted one into classtime and classdesc
        $.each(times, function (key, value) {
            keyInMinutes = (key.split(":")[0] * 60) + parseInt(key.split(":")[1]);
            if (keyInMinutes - timeInMinutes > 0) {
                classtime = key;
                classdesc = value;
                return false;
            }
        })

        // if classtime has been set to something else than 0 a timer will be created
        if (classtime != "0") {

            endtime = new Date((new Date().getMonth() + 1) + " " + new Date().getDate() + " " + new Date().getFullYear() + " " + classtime).getTime();
    
            // Update the count down every 1 second
            var x = setInterval(function () {
    
                // Get today's date and time
                var now = new Date().getTime();
    
                // Find the distance between now and the count down date
                var distance = endtime - now;
    
                // Time calculations for hours, minutes and seconds
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                // Display the result in the element with id="countDown"
                $("#countDown").html(hours + "h " +
                    minutes + "m " + seconds + "s till <br>" + classdesc);
    
                // If the count down is finished
                if (distance < 0) {
                    switchDay();
                }
    
            }, 1000);
        } else {
            $("#countDown").html("No classes for the rest of the day");
    
        }
        
    });

    
}

// function that activates switchBell with a value corresponding to the current day.
function switchDay() {

    switch (new Date().getDay()) {
        case 0:
        case 6:
            $("#countDown").html("Have a good weekend");
            break;
        case 1:
            switchBell("Monday");
            break;
        case 2:
            switchBell("Tuesday");
            break;
        case 3:
            switchBell("Wednesday");
            break;
        case 4:
            switchBell("Thursday");
            break;
        case 5:
            switchBell("Friday");
            break;
    }

}

// Activates switchday after page has loaded.
$( document ).ready(function() {
    switchDay();
});