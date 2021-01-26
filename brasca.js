document.getElementById('button').addEventListener("click", function() {
    var stack = [];
    var reg_a = 0;
    var reg_b = 0;

    var string_mode = false;
    var already_printed = false;
    var while_loops = {};

    var code_pointer = 0;
    var code = document.getElementById('code').value

    var input = document.getElementById('stdin').value;
    
    //Get input and push to stack
    for (let i = 0; i < input.length; i++) {
        stack.push(input.codePointAt(i));
    }

    //Populate the while loop object
    var temp = []
    for (let i = 0; i < code.length; i++) {
        let j = code.codePointAt(i);
        if (j == "[") {
            temp.push(i);
        }
        else if (j == "]") {
            let start = temp.pop()
            while_loops[start] = i;
            while_loops[i] = start;
        }
    }

    document.getElementById('stdout').value = "";
    while (code_pointer < code.length) {
        try {
            let command = code.charAt(code_pointer);
            if (string_mode == false) {

                //Numbers
                if (command == "0") {
                    stack.push(0);
                }
                else if (command == "1") {
                    stack.push(1)
                }
                else if (command == "2") {
                    stack.push(2)
                }
                else if (command == "3") {
                    stack.push(3)
                }
                else if (command == "4") {
                    stack.push(4)
                }
                else if (command == "5") {
                    stack.push(5)
                }
                else if (command == "6") {
                    stack.push(6)
                }
                else if (command == "7") {
                    stack.push(7)
                }
                else if (command == "8") {
                    stack.push(8)
                }
                else if (command == "9") {
                    stack.push(9)
                }
                else if (command == "l") {
                    stack.push(10)
                }
                else if (command == "L") {
                    stack.push(13)
                }
                else if (command == "e") {
                    stack.push(26)
                }
                else if (command == "E") {
                    stack.push(32)
                }
                else if (command == "d") {
                    stack.push(48)
                }
                else if (command == "D") {
                    stack.push(65)
                }
                else if (command == "h") {
                    stack.push(97)
                }
                else if (command == "H") {
                    stack.push(100)
                }
                else if (command == "K") {
                    stack.push(1000)
                }

                //Strings/chars
                else if (command == "`") {
                    string_mode = true;
                }
                else if (command == "'") {
                    stack.push(code.codePointAt(code_pointer+1));
                    code_pointer++;
                }

                //Math
                else if (command == "+") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(b+a);
                }
                else if (command == "-") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(b-a);
                }
                else if (command == "*") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(b*a);
                }
                else if (command == "/") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(Math.floor(b/a));
                }
                else if (command == "%") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(b%a);
                }
                else if (command == "^") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(Math.pow(b,a));
                }
                else if (command == "s") {
                    let a = stack.pop();
                    stack.push(Math.floor(Math.sqrt(a)));
                }

                //Bitwise
                else if (command == "~") {
                    let a = stack.pop();
                    stack.push(~a);
                }
                else if (command == "&") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(b&a);
                }
                else if (command == "|") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(b|a);
                }
                else if (command == "_") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(b^a);
                }

                //Stack
                else if (command == "a") {
                    reg_a = stack.pop();
                }
                else if (command == "b") {
                    reg_b = stack.pop();
                }
                else if (command == "A") {
                    stack.push(reg_a);
                    reg_a = 0;
                }
                else if (command == "B") {
                    stack.push(reg_b);
                    reg_b = 0;
                }
                else if (command == ",") {
                    stack.reverse();
                }
                else if (command == ":") {
                    let a = stack.pop();
                    stack.push(a);
                    stack.push(a);
                }
                else if (command == ";") {
                    let a = stack.shift();
                    stack.unshift(a);
                    stack.unshift(a);
                }
                else if (command == "m") {
                    let a = stack.pop();
                    stack.unshift(a);
                }
                else if (command == "M") {
                    let a = stack.shift();
                    stack.push(a);
                }
                else if (command == "p") {
                    let amount = stack.pop();
                    for (const x of Array(amount).keys()) {
                        let val = stack.pop();
                        stack.unshift(val);
                    }
                }
                else if (command == "P") {
                    let amount = stack.pop();
                    for (const x of Array(amount).keys()) {
                        let val = stack.shift();
                        stack.push(val);
                    }
                }
                else if (command == "?") {
                    stack.push(Math.floor(Math.random() * 128));
                }
                else if (command == "!") {
                    stack.push(stack.length);
                }
                else if (command == "$") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push(a);
                    stack.push(b);
                }
                else if (command == "R") {
                    let a = stack.pop();
                    let b = stack.pop();
                    let c = stack.pop();
                    stack.push(a);
                    stack.push(c);
                    stack.push(b);
                }
                else if (command == "S") {
                    let a = stack.pop();
                    let b = stack.pop();
                    stack.push("" + b + a);
                }
                else if (command == "g") {
                    let temp = stack.join('');
                    let amount = stack.length;
                    for (const x of Array(amount).keys()) {
                        stack.pop();
                    }
                    stack.push(temp);
                }
                else if (command == "i") {
                    let amount = stack.length;
                    for (const x of Array(amount).keys()) {
                        if (stack[x] >= 48 && stack[x] <= 57) {
                            stack[x] -= 48;
                        }
                    }
                }
                else if (command == "I") {
                    let amount = stack.length;
                    for (const x of Array(amount).keys()) {
                        if (stack[x] >= 0 && stack[x] <= 9) {
                            stack[x] += 48;
                        }
                    }
                }
                else if (command == "x") {
                    stack.pop();
                }
                else if (command == "X") {
                    stack.shift();
                }

                //I/O
                else if (command == "o") {
                    if (already_printed == false) {
                        already_printed = true;
                    }
                    document.getElementById('stdout').value += String.fromCodePoint(stack.pop());
                }
                else if (command == "O") {
                    if (already_printed == false) {
                        already_printed = true;
                    }
                    document.getElementById('stdout').value += String.fromCodePoint(stack.shift());
                }
                else if (command == "n") {
                    if (already_printed == false) {
                        already_printed = true;
                    }
                    document.getElementById('stdout').value += stack.pop();
                }
                else if (command == "N") {
                    if (already_printed == false) {
                        already_printed = true;
                    }
                    document.getElementById('stdout').value += stack.shift();
                }




            }
            else if (string_mode == true) {
                if (command == "`") {
                    string_mode = false;
                }
                else {
                    stack.push(command.codePointAt(0))
                }
            }




            code_pointer++;
        }
        catch {
            alert("ERROR: Something went wrong")
            break;
        }
    }



    if (already_printed == false) {
        stack.reverse()
        var l = stack.length;
        for (let i = 0; i < l; i++) {
            document.getElementById('stdout').value += String.fromCodePoint(stack.pop());
        }
        
        
    }



});