var player_one_name = prompt('Enter the name of Player One')
var player_one_color = "rgb(255, 0, 0)"
var player_two_name = prompt('Enter the name of Player Two')
var player_two_color = "rgb(0, 0, 255)"
var game_on = true
var table = $("table tr");

function changeColor(rowInd, colInd, color){
    return table.eq(rowInd).find("td").eq(colInd).find("button").css("background-color", color)
}

function getColor(rowInd, colInd){
    // if (rowInd === 4 && colInd === 1){
    //     changeColor(rowInd, colInd, "rgb(0, 0, 0)")
    // }
    var a = table.eq(rowInd).find("td").eq(colInd)
    var b = a.find("button").css("background-color")
    return b;
}

function getBottomRow(colInd){
    for(var row = 5; row > -1; row--){
        var color = getColor(row, colInd);
        if (color === "rgb(255, 255, 255)"){
            return row
        }
    }
    return null
}

function checkColors(one, two, three, four){
    return (one===two&&two===three&&three===four&&one!="rgb(255, 255, 255)"&&one!=undefined);
}

function horizontalCheck(){
    for (var row = 0; row < 6; row++){
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
    for (var col = 0; col < 7; col++){
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
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 6; row++){
            one = getColor(row, col)
            two = getColor(row + 1, col + 1)
            three = getColor(row + 2, col + 2)
            four = getColor(row + 3, col + 3)
            if (checkColors(one, two, three, four)){
                console.log("Diag")
                console.log(row)
                console.log(col)
            } else {
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
    alert(winningPlayer +" has won! Refresh to play again!")
}
var currentPlayer = 1;
var currentName = player_one_name;
var currentcolor = player_one_color;

$("h5").text(currentName+": Its your turn to move")

$(".board button").on("click", function(){
    var col = $(this).closest("td").index();

    var bottomFree = getBottomRow(col)

    changeColor(bottomFree, col, currentcolor)
    console.log("COlor changed")
    setTimeout(function(){
        if (horizontalCheck() || verticalCheck() || diagonalCheck()) {
            gameOver(currentName)
        }
    }, 10)
    

    currentPlayer = currentPlayer * -1

    if (currentPlayer === 1){
        currentName = player_one_name;
        currentcolor = player_one_color
    } else{
        currentName = player_two_name
        currentcolor = player_two_color;
    }
    $("h5").text(currentName+": Its your turn to move")
    console.log("Next turn")
})