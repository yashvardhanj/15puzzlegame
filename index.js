// index.js
var format = 5;
var moves=0;
  
let hour = 0; 
let minute = 0; 
let second = 0; 
let count = 0;

function getRandomPermutation(n) {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function match(id) {
    document.getElementById(id).style.backgroundColor = "green";
}

function check(totalElements){
    for(i=1;i<totalElements;i++){
        el=document.getElementById(i)
        if(el.style.backgroundColor!="green"){
            return false;
        }
    }
    return true;
}

function clicked(id, text) {
    id = Number(id);
    format = Number(format);
    moves++;
    document.getElementById("moves").innerHTML=moves;
    const directions = [format, -format, 1, -1];
    for (let dir of directions) {
        const adjacentId = id + dir;
        const adjacentElement = document.getElementById(adjacentId);
        if (adjacentElement && adjacentElement.innerHTML === "*") {
            adjacentElement.innerHTML = text;
            document.getElementById(id).innerHTML = "*";
            break;
        }
    }

    // Call match function after every change
    updateMatchedElements();
}

function getSelectedValue() {
    format = Number(document.getElementById("myDropdown").value);
    const grid = document.getElementById("grid");
    moves=0;
    document.getElementById("moves").innerHTML=moves;
    timer = true; 
    stopWatch(); 
    // Clear the existing grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    // Update grid based on selected format
    grid.style.gridTemplateColumns = `repeat(${format}, auto)`;

    const totalElements = format * format;
    const permutation = getRandomPermutation(totalElements);

    for (let i = 1; i <= totalElements; i++) {
        const gridItem = document.createElement("div");
        gridItem.className = `grid-item ${format}`;
        gridItem.id = i;
        gridItem.onclick = function() {
            clicked(this.id, this.innerHTML);
        };
        gridItem.innerHTML = permutation[i - 1];
        grid.appendChild(gridItem);
    }
    for(i=1;i<=totalElements;i++){
        if(document.getElementById(i).innerHTML==format*format){
            document.getElementById(i).innerHTML="*";
        }
    }
    // Set the largest number as the empty space
    

    // Mark correctly positioned elements
    updateMatchedElements();
}

function updateMatchedElements() {
    const totalElements = format * format;
    for (let i = 1; i <= totalElements; i++) {
        const element = document.getElementById(i);
        if (element.innerHTML == i) {
            element.style.backgroundColor = "green";
        } else if (i == totalElements && element.innerHTML == "*") {
            element.style.backgroundColor = "green";
        } else {
            element.style.backgroundColor = ""; // Reset color if not matched
        }
    }
    console.log(check(totalElements));
    if(check(totalElements)){
        timer = false; 
    }
}

function stopWatch() { 
    if (timer) { 
        count++; 
  
        if (count == 100) { 
            second++; 
            count = 0; 
        } 
  
        if (second == 60) { 
            minute++; 
            second = 0; 
        } 
  
        if (minute == 60) { 
            hour++; 
            minute = 0; 
            second = 0; 
        } 
  
        let hrString = hour; 
        let minString = minute; 
        let secString = second; 
        let countString = count; 
  
       
  
        if (minute < 10) { 
            minString = "0" + minString; 
        } 
  
        if (second < 10) { 
            secString = "0" + secString; 
        } 
  
        if (count < 10) { 
            countString = "0" + countString; 
        } 
        document.getElementById('min').innerHTML = minString; 
        document.getElementById('sec').innerHTML = secString; 
        document.getElementById('count').innerHTML = countString; 
        setTimeout(stopWatch, 10); 
    } 
}
// Initialize the grid with the default format
getSelectedValue();
