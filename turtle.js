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
        this.vars =  {
            "SIN": function(x) {return Math.sin(radians(x))},
            "COS": function(x) {return Math.cos(radians(x))},
            "RANDOM": Math.random
        };
        stroke(0);
        fill(0);
    }

    this.setColor = function(color) {
        stroke(color);
    }
    
    this.run = function(tokens) {
        let index = 0;
        let amt = 0;
        let angle = 0;
        let red;
        let blue;
        let green;
        let alpha;
        while(index < tokens.length) {
            switch(tokens[index]) {
                case "LET":
                    this.vars[tokens[index += 2]] = literalOrVar(tokens[++index]);
                    index++;
                    break;
                case "SETCOLOR":
                     red = literalOrVar(tokens[index += 2]);
                     green = literalOrVar(tokens[++index]);
                     blue = literalOrVar(tokens[++index]);
                     alpha = literalOrVar(tokens[++index]);
                    stroke(red, green, blue, alpha);
                    fill(red, green, blue, alpha);
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
        amt = amt? amt : 0;
        if(this.pen) {
            line(0, 0, amt, 0);
        }
        translate(amt, 0);
    }

    this.rotate = function(angle) {
        angle = angle? angle : 0;
        rotate(angle);
    }   
}

literalOrVar = function(string = "") {
    string = string.replace(/([A-Z]+)/g, "turtle.vars.$1")
    let result = 0;
    try {
        result = eval(string);
    } catch (e) {

    }
    return result;
}
