function playSound(key){
    var audio;
    switch(key){
        case 1:
            $("#green").addClass("pressed");
            audio = new Audio("./sounds/green.mp3");
            setTimeout(function(){
                $("#green").removeClass("pressed");
            }, 100);
            break;
        case 2:
            $("#red").addClass("pressed");
            audio = new Audio("./sounds/red.mp3");
            setTimeout(function(){
                $("#red").removeClass("pressed");
            }, 100);
            break;
        case 3:
            $("#yellow").addClass("pressed");
            audio = new Audio("./sounds/yellow.mp3");
            setTimeout(function(){
                $("#yellow").removeClass("pressed");
            }, 100);
            break;
        case 4:
            $("#blue").addClass("pressed");
            audio = new Audio("./sounds/blue.mp3");
            setTimeout(function(){
                $("#blue").removeClass("pressed");
            }, 100);
            break;
        case 5:
            $("body").addClass("game-over");
            $("h1").text("Game over!");
            audio = new Audio("./sounds/wrong.mp3");
            setTimeout(function(){
                $("body").removeClass("game-over");
                $("h1").text("Press to start");
            }, 1000);
            break;
        default:
            break;
    }
    audio.play();
}


let arr = [];
let level = 0;
let sol = [];
let play = true;

console.log(arr);

function startPlay(){
    if(!play) return;
    sol = [];
    for(let j = 0; j<=level ; j++){
        setTimeout(() => {
            $("h1").text("Level "+(level+1));
            playSound(arr[j]);
        }, j*1000);   
    }
}

function checkInput(key) {
    if (sol[key] != arr[key]) {
        play = false;
        arr = [];
        playSound(5);
        return false;
    }
    return true;
}

function startGame(){
    play = true;
    level = 0;
    startPlay();
}

$(".btn").click(function() {
    if(!play) return;

    var userInput;
    if ($(this).hasClass("green")) userInput = 1;
    if ($(this).hasClass("red")) userInput = 2;
    if ($(this).hasClass("yellow")) userInput = 3;
    if ($(this).hasClass("blue")) userInput = 4;

    sol.push(userInput);
    playSound(userInput);

    if(!checkInput(sol.length -1)) return;

    if (sol.length == level + 1) {
        level++;
        if (level < 50) {
            setTimeout(startPlay, 1000);
        } else {
            $("h1").text("You win!");
            play = false;
        }
    }
}); 


$("h1").click(function(event){
    for (let i = 0; i < 50; i++) {
        arr[i] = Math.floor(Math.random() * 4 + 1);
    }
    startGame();
});
