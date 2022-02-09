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
            result = (memory + numberTwo).toString();
            break;
        case 2:
            result = (memory - numberTwo).toString();
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
            result = (memory * numberTwo).toString();
            break;
    
        default:
            break;
    }
    if(!(numberTwo == 0 && lastAction == 3)){
    
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

