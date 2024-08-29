var inputField = document.getElementById("input-field");

function showNumber(userInput){
    var currentExpression = inputField.value;
    inputField.value = currentExpression + userInput;
}

function susaLento(empty){
    inputField.value= empty;
}

function isNumber(char){
    return char >= 0 && char <= 9;
}

function isExpressionValid(expression){
    for(let char of expression){
        if(!isNumber(Number(char)) && !['+', '-', '*', '/'].includes(char)){
            return false;    
        }
    }

    return true;
}

function evaluateExpression(){
    var expression = inputField.value
    expression = expression.replaceAll(" ", "");

    if(expression.indexOf('=') > -1){
        return
    }
    
    var result = 0;

    if(isExpressionValid(expression)){
        result = eval(expression)
    }else{
        inputField.value = "invalid char in expression";
        return;
    }

    inputField.value  =expression + ' = '+ result;
    
}

function backspace(){
    var currentExpression = inputField.value;
    var truncated = ""
    
    if(currentExpression.indexOf('=') > -1){
        var index = currentExpression.indexOf('=');
        truncated = currentExpression.substring(0, index);
    }else{
        truncated = currentExpression.substring(0, currentExpression.length-1);
    }

    inputField.value = truncated;

}
