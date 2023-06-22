
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;


$(document).on("keyup", () => {
    if (!gameStarted) {
        $("#level-title").html("Level " + level);
        nextSequence();
        gameStarted = true;
    }
})


$(".btn").click(function () {
    if (gameStarted) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    }
})

// Next level of the game
function nextSequence() {
    // Empty the user clicked pattern
    userClickedPattern = [];
    
    // Increment the level & update it in the screen 
    level++;
    $("#level-title").html("Level " + level);
    
    // Choose randomely a color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Show the chosen color to the user
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function checkAnswer(currentLevel) {
    // If the user choose the right button
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // The user completed the game pattern : go to the next sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( () => {
                nextSequence();
            }, 1000);
        }
    }

    // If the user choose the wrong button : restart the game
    else {
        $("#level-title").html("Game Over, Press Any Key to Restart !");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// Reset the data of the game
function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}

// Play a sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate the clicked button
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => { 
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
