let display = "0";
let memory = 0;
let lastAction = 0;
let afterOperation = false;
let numberofAction = 0;


function addNumber(letter){
    if(display.length == 10 && (!afterOperation)){

    } else if((display == "0" && letter != '.') || (afterOperation)){
        display = letter;
        afterOperation = false;
    }else{
        display = display.concat(letter);
    }
    
    $('#display').text(display);
    
}
function addAction(option) {
    let result;
    if(numberofAction > 0 && option <5){
        result =  getResult();
        display = result;
        $('#display').text(result);
        if(numberofAction == 0){
            return;
        }
    }

    switch (option) {
        case 1:
        case 2:
        case 3:
        case 4://math operations
            lastAction = option;
            memory = parseFloat(display);
            numberofAction ++;
            afterOperation = true;

            break;
        case 5: // 
             if (display.slice(0,1) == '-'){
                 display.slice(1);
             }else{
                 display = '-'+ display;
             }
             $('#display').text(display);
            break;
        case 6: // result
            result = getResult();
            display = result;
            $('#display').text(result);
            afterOperation = false;
            numberofAction = 0;
            memory = 0;
            
            break;
        case 7: // delete last character
            if( (display.length == 2 && display.slice(0,1) == '-') ||(display.length == 1 && display.slice(0,1) != '-') ){
                display = '0';
            }else{
                display = display.slice(0,-1);
            }

            $('#display').text(display);
            break;
        case 8: // clear memory
            display = '0';
            memory = 0;
            lastAction = 0;
            numberofAction = 0;
            $('#display').text(display);
            break;
    
        
    }
}

function getResult(){
    let numberTwo = parseFloat(display);
    let result;
    switch (lastAction) {
        case 1:
            result = (memory + numberTwo);
            break;
        case 2:
            result = (memory - numberTwo);
            break;
        case 3:
            if (numberTwo == 0 ) {
                afterOperation = false;
                numberofAction = 0;
                memory =0;
                $('#display').text("You can't!");

                break
            }
            result = (memory / numberTwo);
            break;
        case 4:   
            result = (memory * numberTwo);

            break;
    
        default:
            break;
    }
    if(!(numberTwo == 0 && lastAction == 3)){
        memory = result;
        let stringResult = result.toString();
        let indexDot = stringResult.indexOf("\.");
        if(stringResult.length >10  && (indexDot < 0 || indexDot>10) ){
            result = "Result is too big";
            memory = 0;
            lastAction = 0;
            numberofAction = 0;
        }else if (indexDot > 0  && indexDot < 10 && stringResult.length >10 ){
            result = stringResult.slice(0,10);
        }
        
    }
    return result;
}
$( document ).ready(function() {
    $(document).keypress(function (event) { 
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            addNumber(String.fromCharCode(event.which));
           
        }
        if(event.keyCode == 42){ 
            addAction(4);
        }
        if(event.keyCode == 43){ 
            addAction(1);
        }
        if(event.keyCode == 45){ 
            addAction(2);
        }
        if(event.keyCode == 47){ 
            addAction(3);
        }
        if(event.keyCode == 46){ 
            addNumber(String.fromCharCode(event.which));
        }
        if(event.keyCode == 61){ 
            addAction(6);
        }
        if(event.keyCode == 8){ 
            addAction(7);
        }
        if(event.keyCode == 27){ 
            addAction(8);
        }

     });
});
