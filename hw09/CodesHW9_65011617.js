const π = Math.PI;

let memory = 0;

document.addEventListener("DOMContentLoaded", function() {
    const resultE = document.getElementById("result");
    let displayString = "";

    // Function to update the display and displayString
    function updateDisplay(value) {
        const operators = ["+", "-", "*", "/"];

        if (!(operators.includes(value) && operators.includes(displayString.charAt(displayString.length - 1)))){
            if (displayString == "0"){
                displayString = value;
            }
            else{
                displayString += value;
            }
        }
        resultE.innerHTML = displayString;
    }

    // Add click event listeners to the calculator buttons
    const calculatorButtons = document.querySelectorAll("#myTable td");
    calculatorButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const buttonId = button.id;

            switch (buttonId) {
                case "Enter":
                    displayString = eval(displayString).toString();
                    break;
                case "c":
                    displayString = "0";
                    break;
                case "sqrt":
                    displayString = Math.sqrt(parseFloat(displayString)).toString();
                    break;
                case "Backspace":
                    displayString = displayString.slice(0, -1);
                    break;
                case "square":
                    displayString = Math.pow(parseFloat(displayString), 2.0).toString();
                    break;
                case "1/x":
                    displayString = Math.pow(parseFloat(displayString), -1.0).toString();
                    break;
                case "sin":
                    displayString = Math.sin(parseFloat(displayString)).toString();
                    break;
                case "cos":
                    displayString = Math.cos(parseFloat(displayString)).toString();
                    break;
                case "tan":
                    displayString = Math.tan(parseFloat(displayString)).toString();
                    break;
                case "factorial":
                    displayString = factorialize(parseInt(displayString)).toString();
                    break;
                case "pi":
                    if (displayString === "0") {
                        displayString = pi.toString();
                    } else {
                        // Check if the last character in displayString is an operator
                        const lastChar = displayString[displayString.length - 1];
                        if (["+", "-", "*", "/"].includes(lastChar)) {
                            // If the last character is an operator, append "pi"
                            displayString += "π";
                        } else {
                            // If not, treat it as multiplication and append "*pi"
                            displayString += "*π";
                        }
                    }
                    break;
                    

                case "mc":
                    memory = 0;
                    localStorage.setItem("memory",memory.toString());
                    break;
                case "m+":
                    memory = parseFloat(localStorage.getItem('memory'));
                    memory += eval(displayString);
                    localStorage.setItem("memory",memory.toString());
                    break;
                case "m-":
                    memory = parseFloat(localStorage.getItem('memory'));
                    memory -= eval(displayString);
                    localStorage.setItem("memory",memory.toString());
                    break;
                case "mr":
                    memory = parseFloat(localStorage.getItem('memory'));
                    displayString = memory;
                    break;
                default:
                    updateDisplay(buttonId);
                    break;
            }

            resultE.innerHTML = displayString;
        });
    });

    // Keyboard event listener (similar to your existing code)
    const keys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/"];
    document.addEventListener("keydown", function(e) {
        if (e.key == "<" || e.key == "Backspace") {
            e.preventDefault(); // Prevent the default behavior for Delete/Backspace
            displayString = displayString.slice(0, -1);
        } else if (e.key == "c") {
            displayString = "0";
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

function factorialize(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
  }
