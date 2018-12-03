let turtle;
let textArea;
function setup() {
    createCanvas(800, 800);
    background(0, 0, 0);
    //colorMode(HSB);
    smooth();
    strokeWeight(2);
    stroke(255);
    textArea = select("#command");
    textArea.input(run);
    turtle = new Turtle(width/2,  height/2, 0);
    run();
}

function run() {
    background(0);
    push();
    turtle.reset();
    let command = parse(textArea.value());
    turtle.run(command);
    pop();
}

function parse(string) {
    string = string.trim();
    string = string.toUpperCase();
    string = string.replace(/(\[)/g, "$1 ");
    string = string.replace(/(\])/g, " $1");
    string = string.replace(/(\s{2,}|\n)/g, " ");
    //console.log(string);
    return string.split(" ");
}