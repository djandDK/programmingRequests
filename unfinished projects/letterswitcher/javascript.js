function removeFields() {

    $("#fieldContainer").empty();
    createField();

}

function removeLastField() {

    if ($('#fieldContainer').children().length != 1) {
        $('#fieldContainer').children().last().remove();
    }

}

function createField() {

    $("#fieldContainer").append(
        '<div class="row d-flex justify-content-center mb-3">' +
            '<div class="col-6">' +
                '<label for="a">Character:</label>' +
                '<input type="text" class="form-control">' +
            '</div>' +
            '<div class="col-6">' +
                '<label for="a">Character to insert instead:</label>' +
                '<input type="text" class="form-control">' +
            '</div>' +
        '</div>'
    );

}

function getChars() {

    charObj = {};

    $('#fieldContainer .row.d-flex.justify-content-center.mb-3').each(function(index) {
        var char = $(this).find('input')[0].value;
        var newChar = $(this).find('input')[1].value;
        charObj[char] = newChar;
    });

    return charObj;

}

function switchChar() {

    charObj = getChars();

    outputText = "";
    inputText = $('#inputText').val();

    for (var i = 0; i < inputText.length; i++) {
        if (charObj[inputText.charAt(i)]) {
            outputText += charObj[inputText.charAt(i)];
        } else {
            outputText += inputText.charAt(i);
        }
    }

    $('#outputText').val(outputText);

}

function saveSetup() {

    jsonChars = JSON.stringify(getChars());
    var charsSTR = "data:text/json;charset=utf-8," + encodeURIComponent(jsonChars);
    var link = document.createElement('a');
    link.setAttribute("href", charsSTR);
    link.setAttribute("download", "jsonChars.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
    
}

function fillField(key, value) {

    $("#fieldContainer div.row:last-child div input")[0].value = key;
    $("#fieldContainer div.row:last-child div input")[1].value = value;

}

function loadSetup() {
    
    $("#fieldContainer").empty();
    var setupFile = document.getElementById('setupInput').files[0];

    var reader = new FileReader();
    reader.onload = function(fileLoadedEvent) {
        var jsonString = fileLoadedEvent.target.result;
        jsonVar = JSON.parse(jsonString);

        $.each(jsonVar, function(key, value){
            createField();
            fillField(key, value);
        })
    }
    
    reader.readAsText(setupFile, 'UTF-8');

}