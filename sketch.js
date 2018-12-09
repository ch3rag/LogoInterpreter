let turtle;
let textArea;
function setup() {
    const canvas = createCanvas(800, 800);
    canvas.parent("sketch-holder");
    smooth();
    strokeWeight(2);
    stroke(0);
    noFill();
    textArea = select("#command");
    textArea.input(run);
    turtle = new Turtle(width/2,  height/2, 0);
    run();
}

function run() {
    background(255);
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