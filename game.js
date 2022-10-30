var buttonColor=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedpattern=[];

var started=false;
var level=0;
        // events
$("body").keydown(function(){
    if(!started){
        level=0;
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
    }
});
$(".btn").click(function(){
    userChosencolor=$(this).attr("id");
    userClickedpattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkanswer(userClickedpattern.length-1);
    
    

});
function nextSequence(){
     userClickedpattern=[];
    level++;
    $("h1").text("Level "+level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosencolor=buttonColor[randomNumber];
    gamePattern.push(randomChosencolor);
    $("#"+randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosencolor);
    
}
function checkanswer(currentlevel){
    if(gamePattern[currentlevel]===userClickedpattern[currentlevel]){
        console.log("success");
    
    if(userClickedpattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startover();
    
}

}
//   playing sound and animation
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
      }, 100);
}
    // function to start over
function startover(){
    gamePattern=[];
    level=0;
    started=false;
}
