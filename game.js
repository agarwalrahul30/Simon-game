var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level "+level);
        setTimeout(function() {
            nextSequence();
        }, 500);
        //To make sure game doesnt restart by accidental keypress
        started = true;
    }
});

function nextSequence() {
    //Array for pool
    var randomNumber = Math.floor(Math.random()*4);

    //Choosing Color
    var randomChosenColor = buttonColors[randomNumber];

    //Showing that the Color is pressed to user
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

    //Storing the chosen color in backend
    gamePattern.push(randomChosenColor);

    //Level-up
    level++;
    $("#level-title").text("Level "+level);
}


$(".btn").click(function() {
    //Getting to know which button he has pressed
    var userChosenColor = $(this).attr("id");
    
    //Playing sound and animation for that button
    playSound(userChosenColor);
    animatePress(userChosenColor);

    //Storing that info in backend
    userClickedPattern.push(userChosenColor);
    
    checkSequence(userClickedPattern.length);
});

function checkSequence(numberOftimesClicked) {
    
    if(userClickedPattern[numberOftimesClicked-1] === gamePattern[numberOftimesClicked-1]) {
        console.log("success");

        if(numberOftimesClicked === level) {
                
                setTimeout(function() {
                    nextSequence()
                }, 1000);

                userClickedPattern = [];
        }
    }
    else {
        console.log("failed");
        wrongEffects();
        startOver();
    }
}

function playSound(colorName) {
    //Playing a sound
    var audio = new Audio("sounds/"+colorName+".mp3");
    audio.play();
    //Making the button Flash
    $("#"+colorName).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 200);
}

function wrongEffects() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game over, Press any key to Restart.");
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}