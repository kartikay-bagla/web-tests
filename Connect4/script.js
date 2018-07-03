var player_one_name = prompt('Enter the name of Player One')
var player_one_color = "rgb(255, 0, 0)"

var player_two_name = prompt('Enter the name of Player Two')
var player_two_color = "rgb(0, 0, 255)"

var game_on = true
var table = $("table tr"); //list of all the rows in the table

function changeColor(rowInd, colInd, color){
    /**
     * Changes the color at the specified indices to the specified color
     */

    var row = table.eq(rowInd) //selecting the specified row from the list
    var list_cells = row.find("td")//selecting the list of cells in a row

    var cell = list_cells.eq(colInd) //selecting the specified cell
    var button = cell.find("button") //selecting the button inside the cell

    return button.css("background-color", color) //changing its color
}

function getColor(rowInd, colInd){
    /**
     * Getting the color of the cell at the specified indices
     */

    var cell = table.eq(rowInd).find("td").eq(colInd) //selecting the cell
    var color = cell.find("button").css("background-color") //getting the color
    return color;
}

function getBottomRow(colInd){
    /**
     * Getting the index of the lowest available (i.e. blank colored row) in a column
     */

     //iterating from [-5, 0]
    for(var row = 5; row > -1; row--){
        var color = getColor(row, colInd);

        //if the color is white i.e. rgb(255, 255, 255) return the indices
        if (color === "rgb(255, 255, 255)"){
            return row
        }
    }
    return null //else return null i.e. the row is full
}

function checkColors(one, two, three, four){
    /**
     * Check four colors to see if they are same
     */
    return (one===two&&two===three&&three===four&&one!="rgb(255, 255, 255)"&&one!=undefined);
}

function horizontalCheck(){
    /**
     * Check each row to see if there are 4 consecutive tokens of the same player
     */
    for (var row = 0; row < 6; row++){
        //iterating from columns 0 to 3 as when col = 3, 
        //the function will check for the line cols 3, 4, 5, 6 i.e the last cols in a row
        for (var col = 0; col < 4; col++){
            one = getColor(row, col)
            two = getColor(row, col + 1)
            three = getColor(row, col + 2)
            four = getColor(row, col + 3)
            if (checkColors(one, two, three, four)){
                console.log("Horizontal")
                console.log(row)
                console.log(col)
                return true;
            } else {
                continue;
            }
        }
    }
}

function verticalCheck(){
    /**
     * Check each column to see if there are 4 consecutive tokens of the same player
     */
    for (var col = 0; col < 7; col++){
        //iterating rows from 0 to 3 as when row = 2,
        //the function will check for rows 2, 3, 4, 5 i.e. the last rows
        for (var row = 0; row < 3; row++){
            one = getColor(row, col)
            two = getColor(row + 1, col)
            three = getColor(row + 2, col)
            four = getColor(row + 3, col)
            if (checkColors(one, two, three, four)){
                console.log("Vertical")
                console.log(row)
                console.log(col)
                return true;
            } else {
                continue;
            }
        }
    }
}

function diagonalCheck(){
    /**
     * Check the board to see if there are 4 consecutive tokens of the same player
     * in a diagonal fashion
     */
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 6; row++){
            //getColor returns none if they row and col indices are not in the table
            //and checkColors has a condition for null arguments
            //So we iterate the columns and rows to the end.

            //This is a moving leftwards and downward diagonal
            one = getColor(row, col)
            two = getColor(row + 1, col + 1)
            three = getColor(row + 2, col + 2)
            four = getColor(row + 3, col + 3)
            if (checkColors(one, two, three, four)){
                console.log("Diag")
                console.log(row)
                console.log(col)
                return true
            } else {
                //This is a moving leftwards and upward diagonal
                one = getColor(row, col)
                two = getColor(row - 1, col + 1)
                three = getColor(row - 2, col + 2)
                four = getColor(row - 3, col + 3)
                if (checkColors(one, two, three, four)){
                    console.log("Diag")
                    console.log(row)
                    console.log(col)
                    return true
                }
                else{
                    continue;
                }
            }
        }
    }
}

function gameOver(winningPlayer) {
    /**
     * Runs when the game is over and fades out the board
     */
    $("h5").text(winningPlayer +" has won! Refresh to play again!")
    $(".board").fadeOut(3000);
}
var currentPlayer = 1; //Player number or identifier
var currentName = player_one_name;
var currentcolor = player_one_color;

function isNull(value){
    /**
     * Checks whether a value is null and return true if it is. 
    */
    return value == null
}


$("h5").text(currentName+": Its your turn to move")

var flag = false;
$(".board button").on("touchstart click", function(e){
    //For touch precision in mobile devices
    e.stopPropagation(); e.preventDefault();
    
    var col = $(this).closest("td").index(); //gets the column in which the mouse was clicked.

    //list of all lowest free cells in each column
    bottom_rows = []
    for (var i = 0; i < 7; i++){
        bottom_rows.push(getBottomRow(i))
    }

    var bottomFree = bottom_rows[col] //gets the lowest free cell in the column
    console.log("Current turn", currentName)
    changeColor(bottomFree, col, currentcolor) //changes the color of that cell
    
    //game over checking condition
    if (horizontalCheck() || verticalCheck() || diagonalCheck()) {
        gameOver(currentName)
    }
    //Draw condition i.e. all columns have no free cells
    else if(bottom_rows.every(isNull)){
        gameOver("Nobody")
    }
    //Switch the player
    else{
        currentPlayer = currentPlayer * -1

        if (currentPlayer === 1){
            currentName = player_one_name;
            currentcolor = player_one_color
        } else{
            currentName = player_two_name
            currentcolor = player_two_color;
        }
        console.log("Color changed")
        $("h5").text(currentName+": Its your turn to move")
        console.log("Next turn")
    }
})