const screen = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let screenValue = "";

// Function to update the display screen
function updateDisplay(value) {
  screen.value = value;
}

// Function to handle button clicks
function handleButtonClick(buttonText) {
  if (buttonText === "X") {
    buttonText = "*";
  } else if (buttonText === "C") {
    screenValue = "";
  } else if (buttonText === "=") {
    try {
      const result = evaluateExpression(screenValue);
      screenValue = result.toString();
    } catch (error) {
      screenValue = "Expression error";
    }
  } else {
    screenValue += buttonText;
  }

  updateDisplay(screenValue);
}

// Function to evaluate the expression safely
function evaluateExpression(expression) {
  const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, ""); // Remove invalid characters
  return Function(`"use strict"; return (${sanitizedExpression})`)();
}

// Add event listeners to buttons
for (const button of buttons) {
  button.addEventListener("click", (e) => {
    const buttonText = e.target.innerText;
    handleButtonClick(buttonText);
  });
}
