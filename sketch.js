let turtle;
let textArea;
_BG_COLOR_ = "#ffffff";


const bgColorSelector = document.querySelector("#bg-color");
bgColorSelector.addEventListener("change", () => {
    _BG_COLOR_ = bgColorSelector.value; 
    console.log(_BG_COLOR_);
    run();
});

function setup() {
    const canvas = createCanvas(windowWidth * 0.98, windowHeight * 0.8);
    background(0);
    canvas.parent("sketch-holder");
    smooth();
    angleMode(DEGREES);
    strokeWeight(2);
    stroke(0);
    noFill();
    textArea = select("#command");
    textArea.input(run);
    turtle = new Turtle(width/2,  height/2, 0);
    run();
}

function run() {
    background(_BG_COLOR_);
    push();
    turtle.reset();
    let command = parse(textArea.value());
    turtle.run(command);
    triangle(0,-5,25,0,0,5);
    pop();
}

function parse(string) {
    string = string.trim();
    string = string.toUpperCase();
    string = string.replace(/(\[)/g, "$1 ");
    string = string.replace(/(\])/g, " $1");
    string = string.replace(/(\s{2,}|\n)/g, " ");
    return string.split(" ");
}