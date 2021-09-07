window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // document.getElementsByClassName("box").style.height = '120px';
    let width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    width = Math.min(width, 480);
    let elements = document.getElementsByClassName('box');
    for(var i=0; i<elements.length; i++) { 
        elements[i].style.height = (width-20)/4 - 14 + 'px';
        elements[i].style.width = (width-20)/4 - 14 + 'px';
    }
});

window.addEventListener('resize', function(event) {
    let width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    width = Math.min(width, 480);
    let elements = document.getElementsByClassName('box');
    for(var i=0; i<elements.length; i++) { 
        elements[i].style.height = (width-20)/4 - 14 + 'px';
        elements[i].style.width = (width-20)/4 - 14 + 'px';
    }
}, true);

let ids = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7", "btn8", "btn9", "btn10", "btn11", "btn12", "btn13", "btn14", "btn15", "btn16"];
let cnt = 0;

function startGame(){
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    numbers = shuffle(numbers);
    cnt = 0;
    document.getElementById("cnt").innerText = cnt;
    for (let i=0; i<16; i++){
        if (numbers[i] == 16){
            document.getElementById(ids[i]).innerText = "";
            continue;
        }
        document.getElementById(ids[i]).innerText = numbers[i];
    }
    
    for (let i=0; i<16; i++){
        document.getElementById(ids[i]).onclick = function(){
            let m = Math.floor(i/4);
            let n = i%4;
            if (n >= 1 && numbers[m*4+(n-1)] == 16){
                numbers = swap(numbers, i, m*4+n-1);
            }
            if (n <= 2 && numbers[m*4+(n+1)] == 16){
                numbers = swap(numbers, i, m*4+n+1);
            }
            if (m >= 1 && numbers[(m-1)*4+n] == 16){
                numbers = swap(numbers, i, (m-1)*4+n);
            }
            if (m <= 2 && numbers[(m+1)*4+n] == 16){
                numbers = swap(numbers, i, (m+1)*4+n);
            }
            
            document.getElementById("cnt").innerText = cnt;
            let k=1;
            for (let i=0; i<16; i++){
                if (numbers[i] != k) break;
                k++;
            }
            if (k == 17) {
                alert("Congrats!");
            }
        };
    }



}

function swap(numbers, i, j){
    cnt++;
    numbers[j] = numbers[i];
    document.getElementById(ids[j]).innerText = numbers[i];
    numbers[i] = 16; 
    document.getElementById(ids[i]).innerText = "";
    return numbers;
}

function shuffle(array) {
    var currentIndex = array.length;
    var randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }