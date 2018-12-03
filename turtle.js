function Turtle(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.pen = true;
    this.vars = {};

    this.reset = function() {
        translate(this.x, this.y);
        rotate(this.angle);  
        this.pen = true;      
        this.vars = {};
        stroke(255,255,255);
    }

    this.setColor = function(color) {
        stroke(color);
    }
    
    this.run = function(tokens) {
        let index = 0;
        let amt = 0;
        let angle = 0;
        //console.log(tokens);
        while(index < tokens.length) {
            switch(tokens[index]) {
                case "LET":
                    this.vars[tokens[index += 2]] = literalOrVar(tokens[++index]);
                    index++;
                    break;
                case "SETCOLOR":
                    let red = literalOrVar(tokens[index += 2]);
                    let green = literalOrVar(tokens[++index]);
                    let blue = literalOrVar(tokens[++index]);
                    let alpha = literalOrVar(tokens[++index]);
                    stroke(red, green, blue, alpha);
                    //console.log(red, green, blue);
                    index++;
                    break;
                case "FORWARD":
                    amt = literalOrVar(tokens[++index]);
                    this.move(amt);
                    break;
                case "BACKWARD":
                    amt = literalOrVar(tokens[++index]);
                    this.move(-amt);
                    break;
                case "LEFT":
                    angle = literalOrVar(tokens[++index]);
                    this.rotate(-angle);
                    break;
                case "RIGHT":
                    angle = literalOrVar(tokens[++index]);
                    this.rotate(angle);
                    break;
                case "PENUP":
                    this.pen = false;
                    break;
                case "PENDOWN":
                    this.pen = true;
                    break;
                case "REPEAT":
                    let subTokens = ["["];
                    let times = literalOrVar(tokens[++index]);
                    let numBrackets = 1;
                    let token = true;
                    index += 2;
                    while(numBrackets && token) {
                        token = tokens[index++];
                        subTokens.push(token);
                        if(token === "]") 
                            numBrackets--;
                        if(token === "[") 
                            numBrackets++;           
                    }
                     while(times--) {
                         this.run(subTokens);
                     }
                     continue;
            }   
            index++;
        }
    }

    this.move = function(amt) {
        //console.log("MOVING: " + String(amt));
        amt = amt? amt : 0;
        if(this.pen) {
            line(0, 0, amt, 0);
        }
        translate(amt, 0);
    }

    this.rotate = function(angle) {
        //console.log("ROTATING: " + String(angle));
        angle = angle? angle : 0;
        rotate(radians(angle));
    }   
}

literalOrVar = function(string = "") {
    string = string.replace(/([A-Z]+)/g, "turtle.vars.$1");
    let result;
    //console.log(string);
    try {
        result = eval(string);
    } catch (e) {

    }
    return result;
}
