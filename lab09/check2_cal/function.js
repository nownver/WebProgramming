document.addEventListener("DOMContentLoaded", function() {
    const resultE = document.getElementById("result");
    let displayString = "";
    const keys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/"];
    document.addEventListener("keydown", function(e) {
        if (e.key == "<" || e.key == "Backspace") {
            e.preventDefault(); // Prevent the default behavior for Delete/Backspace
            displayString = displayString.slice(0, -1);
        } else if (e.key == "c") {
            displayString = "";
        } else if (e.key == "=" || e.key == "Enter") {
            displayString = eval(displayString); 
        } else if (keys.includes(e.key)) {
            displayString += e.key;
        } else {
            return;
        }
        resultE.innerHTML = displayString;
    });
});