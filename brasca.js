document.getElementById('button').addEventListener("click", function() {
    var stack = [];
    var a = 0;
    var b = 0;

    var string_mode = false;
    var already_printed = false;
    var while_loops = {};

    var code_pointer = 0;
    var code = document.getElementById('code').value

    var input = document.getElementById('stdin').value;
    
    //Get input and push to stack
    for (let i = 0; i < input.length; i++) {
        stack.push(input.charAt(i));
    }

    //Populate the while loop object
    var temp = []
    for (let i = 0; i < code.length; i++) {
        let j = code.charAt(i);
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