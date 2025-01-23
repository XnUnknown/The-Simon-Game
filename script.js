let boxes = $('.box');
let mem = [];
let gameLevel = 1;
let boxaudio = [new Audio('./audios/blue.mp3'),
    new Audio('./audios/red.mp3'),
    new Audio('./audios/yellow.mp3'),
    new Audio('./audios/green.mp3'),
];
let wrong = new Audio('./audios/wrong.mp3');
// Defined A function For Click in Any Parent Elements
function clickEffect(element)
{
    var g=boxes.index(element);
    element.css('opacity','50%');
    setTimeout(function() {
        element.css('opacity','100%');
    }, 200);
    boxaudio[g].play();
}
var ch = $('.box');
ch.on('click',function(event){
    clickEffect($(event.target));
});
//Defining Game Functions
$(document).on('keypress',function(){
    $('.instructions').html('');
    var gen = Math.floor(Math.random()*4);
    mem.push(boxes[gen]);
    startgame();
});
function startgame()
{
    $('.instructions').html(`LEVEL:${gameLevel}`);
    $(document).off('keypress');
    displaybox();
    var i=0;
    console.log(mem);
    $('.box').on('click',function(event){
        clickEffect($(event.target));
        if(mem[i]==event.target)
        {
            i++;
            
            if(i===gameLevel)
            {
                setTimeout(function(){levelUp();},1000);
            }
        }
        else
        {
            wrong.play();
            endGame()
        }
    });
}
function levelUp(){
    $('.box').off('click');
    var gen = Math.floor(Math.random()*4);
    mem.push(boxes[gen]);
    gameLevel++;
    startgame();
}
function endGame()
{

    $('.box').off('click');
    $('.instructions').html('You Lost Press Any Key to restart');
    gameLevel=1;
    mem = [];
    console.log("Endgame-1"+mem);
    var gen = Math.floor(Math.random()*4);
    mem.push(boxes[gen]);
    console.log("Endgame-2"+mem);
    $(document).on('keypress',function(){
        $('.instructions').html('');
        startgame();
    });
}
function displaybox()
{
    clickEffect($(mem[gameLevel-1]));
}
