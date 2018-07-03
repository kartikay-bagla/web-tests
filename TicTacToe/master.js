var game_on = true;
var table = $("table tr");
var x = "X";
var o = "O";

function changeValue(rowInd, colInd, value) {
    /**
     * Changes the value at the specified indices to the specified value
     */
    var row = table.eq(rowInd); //Selecting the row
    var col_list = row.find("td"); //Getting list of columns in the row i.e. td
    var col = col_list.eq(colInd); //Getting the specific cell
    col.text(value); //Setting the value in the cell
}

function getValue(rowInd, colInd){
    /**
     * Gets the value at the specified indices
     */
    var row = table.eq(rowInd); //Selecting the row
    var col_list = row.find("td"); //Getting list of columns in the row i.e. td
    var col = col_list.eq(colInd); //Getting the specific cell
    return col.text(); //Return the value in the column
}

function checkValue(one, two, three){
    /**
     * Checks 3 values to see if they are same
     */
    return (one===two&&two===three&&one!="")
}

function horizontalCheck(){
    /**
     * Checks the grid horizontally
     */
    for (var row = 0; row < 3; row++){
        var one = getValue(row, 0)
        var two = getValue(row, 1)
        var three = getValue(row, 2)
        if (checkValue(one, two, three)){
            console.log("Horizontal")
            console.log("row", row)
            return true;
        }
        else{
            continue;
        }
    }
}

function verticalCheck(){
    /**
     * Checks the grid vertically
     */
    for (var col = 0; col < 3; col++){
        var one = getValue(0, col)
        var two = getValue(1, col)
        var three = getValue(2, col)
        console.log("vertical", col, one, two, three)
        if (checkValue(one, two, three)){
            console.log("Vertical")
            console.log("col", col)
            return true;
        }
        else{
            continue;
        }
    }
}

function diagonalCheck(){
    /**
     * Checks the grid diagonally
     */
    var one = getValue(0, 0)
    var two = getValue(1, 1)
    var three = getValue(2, 2)
    if (checkValue(one, two, three)){
        return true;
    } else{
        var one = getValue(0, 2)
        var two = getValue(1, 1)
        var three = getValue(2, 0)
        if (checkValue(one, two, three)){
            return true;
        }
    }   
}

function gameOver(winningPlayer){
    /**
     * Called when the game is over
     */
    $("h3").text(winningPlayer +" has won! Refresh to play again!");
    $(".board").fadeOut(2000);
}

var currentPlayer = 1;
var currentValue = x;
var count = 0 //Number of turns in the game

$("h5").text(currentValue + " to move!")

//on clicking a cell
$("td").on("click", function(){
    var col = $(this).index();
    var row = $(this).closest("tr").index();

    console.log("Current turn", currentValue)
    console.log("Chosen Value", row, col)

    if (getValue(row, col) == ""){
        //If the chosen cell is empty, fill it with the user's value
        changeValue(row, col, currentValue)
        if (horizontalCheck() || verticalCheck() || diagonalCheck()){
            //if check is successful, game over
            gameOver(currentValue)
        } else {
            //current player can now either be 1, or -1
            currentPlayer = currentPlayer * -1

            if (currentPlayer === 1){
                currentValue = x;
            } else {
                currentValue = o;
            }
    
            $("h3").text(currentValue+ " to move!")
            console.log("Turn Over")
            count++;
            if (count > 8){
                //Draw condition
                gameOver("Nobody")
            }
        }
    }
})