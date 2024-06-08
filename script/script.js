const colorSquares = document.querySelectorAll('.color-square');
const colorCodeDisplay = document.getElementById('colorCode')
const nextButton = document.getElementById('nextButton');
const resultMessage = document.getElementById('resultMsg');

// Generate color of square
function generateRandomColor() {
  const letters = '0123456789ABCDEF'; 
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Display color on the screen squares and return the answer from one of square colors
function displayColors(){
  resultMsgReset();
  const colors = [];
  for (let i = 0; i < colorSquares.length; i++) {
    const randomColor = generateRandomColor();
    while(colors.includes(randomColor)){
      randomColor = generateRandomColor();
    }
    colors.push(randomColor);
    colorSquares[i].style.backgroundColor = randomColor;
  }
  const randomIndex = Math.floor(Math.random() * colors.length);
  colorCodeDisplay.innerHTML = colors[randomIndex];
  return colors[randomIndex];
}

// Give response depends on player's guess 
function resultMsgResponse(guess, resultColor){
  if (guess == resultColor) {
    resultMessage.innerHTML = 'Correct! Well Done!';
    resultMessage.style.backgroundColor = 'darkgreen';
    resultMessage.style.color = 'white';
  } else {
    resultMessage.innerHTML = 'Oops, try again~~';
    resultMessage.style.backgroundColor = 'darkred';
    resultMessage.style.color = '#ffcefc';
  }
}

// Reset result Msg
function resultMsgReset(){
  resultMessage.innerHTML = "Click on color of your guess";
  resultMessage.style.backgroundColor = 'transparent';
  resultMessage.style.color = 'black';
}

// Convert RGB to Hex color code string
var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}


let resultColor = displayColors();

colorSquares.forEach((square, index) => {
  square.addEventListener('click', () => {
    const guess = rgb2hex(colorSquares[index].style.backgroundColor).toUpperCase();
    resultMsgResponse(guess, resultColor);
  })
});

nextButton.addEventListener('click', () =>{
  resultColor = displayColors();
});