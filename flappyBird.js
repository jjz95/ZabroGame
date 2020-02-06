var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/edux.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/zabro.png";
pipeSouth.src = "images/zabro.png";


// some variables

var gap = 250;
var constant;
let yDiff = 0
let isYExceededThreshold = false;
let isFirstUserInteraction = true;

var bX = 10;
var bY = 40;

var gravity = 3;

// audio files

var soundtrack = new Audio();

soundtrack.src = "sounds/pink floyd - another brick in the wall.mp3"

// on key down

document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);


function moveUp() {
    bY -= 60;
    if (isFirstUserInteraction){
        soundtrack.play();
        isFirstUserInteraction = false;
    }
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

// draw images

function draw() {

    ctx.drawImage(bg, 0, 0);


    for (var i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        // for (var j = pipe[i].y; j > 0; j -= pipeNorth.height) {
        //     ctx.drawImage(pipeNorth, pipe[i].x, j);
        // }

        // for (var j = pipe[i].y; j < cvs.height - fg.height; j += pipeNorth.height) {
        //     // ctx.drawImage(pipeSouth, pipe[i].x, j + constant);
        // }
        // ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y - pipeNorth.height);
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y + yDiff);
        if (pipe[i].y > (cvs.height - fg.height) / 2) {
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y - constant - yDiff);
        } else {
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y + constant + yDiff);
        }

        // ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        // ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant + pipeSouth.height);

        pipe[i].x--;

        if (pipe[i].x == 1100) {
            pipe.push({
                x: cvs.width,
                // y: Math.floor(Math.random() * (cvs.height - fg.height))
                y: Math.floor(Math.random() * (cvs.height - fg.height - pipeNorth.height / 2) + pipeNorth.height / 2)
            });
        }

        // detect collision

        // if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height) || bY + bird.height >= cvs.height - fg.height) {
        //     location.reload(); // reload the page
        // }

        if ((bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && bY + bird.height >= pipe[i].y && bY <= pipe[i].y + pipeNorth.height) || bY + bird.height >= cvs.height - fg.height || bY <= 0) {

            // setTimeout(function () {
            //     document.getElementById("ITN").style.visibility = "visible";
            //     cvs.style.visibility = "hidden";
                location.reload(); // reload the page

            // }, 2000);
        }



    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    requestAnimationFrame(draw);

    let threshold = 60
    if (yDiff > threshold) {
        isYExceededThreshold = true;
    } else if (yDiff < -threshold) {
        isYExceededThreshold = false;
    }

    if (isYExceededThreshold) {
        yDiff--;
    } else {
        yDiff++;
    }
}

draw();
























