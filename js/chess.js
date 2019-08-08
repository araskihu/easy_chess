var chess;
var chessText;
var rows = 10;
var columns = 6;
var chessTable = [];
var figureList =  [
	[0, 0, 'B', 'B'],
	[0, 1, 'F', 'B'],
	[0, 2, 'V', 'B'],
	[0, 3, 'K', 'B'],
	[0, 4, 'F', 'B'],
	[0, 5, 'B', 'B'],
	[1, 0, 'GY', 'B'],
	[1, 1, 'GY', 'B'],
	[1, 2, 'GY', 'B'],
	[1, 3, 'GY', 'B'],
	[1, 4, 'GY', 'B'],
	[1, 5, 'GY', 'B'],
	[8, 0, 'GY', 'W'],
	[8, 1, 'GY', 'W'],
	[8, 2, 'GY', 'W'],
	[8, 3, 'GY', 'W'],
	[8, 4, 'GY', 'W'],
	[8, 5, 'GY', 'W'],
	[9, 0, 'B', 'W'],
	[9, 1, 'F', 'W'],
	[9, 2, 'V', 'W'], 
	[9, 3, 'K', 'W'],
	[9, 4, 'F', 'W'],
	[9, 5, 'B', 'W'],
];
var clickCounter = 0;
var oldPositionData = [];
var teamPoints = [0, 0];
var maxRounds = 4;
var currentRound = 1;
var teamWonRounds = [0, 0];
var currentStepTeam = "W";
var chessTextInterval;

function startChess(){
	chessText = document.getElementById("trackText");
	var blackPoints = document.getElementById("blackPoints");
	var whitePoints = document.getElementById("whitePoints");
	blackPoints.innerHTML = 0;
	whitePoints.innerHTML = 0;
	startTextTimer("Játék!");

	var bgColor = "#dadfe1";
	for(var r = 0; r < rows; r++){
		chess = document.getElementById("palya").insertRow(r);
		chessTable[r] = [];
		for(var c = 0; c < columns; c++){

			if(r == 0){
				if(c % 2 == 0 || c == 0){
					bgColor = "#dadfe1";
				}else{
					bgColor = "#bdc3c7";
				}
			}else{
				if(chessTable[r - 1][0].style.backgroundColor == "rgb(218, 223, 225)"){
					if(c % 2 != 0 && c != 0){
						bgColor = "#dadfe1";
					}else if(c % 2 == 0 || c == 0){
						bgColor = "#bdc3c7";
					}
				}else if(chessTable[r - 1][0].style.backgroundColor == "rgb(189, 195, 199)"){
					if(c % 2 == 0 || c == 0){
						bgColor = "#dadfe1";
					}else{
						bgColor = "#bdc3c7";
					}
				}
			}

			chessTable[r][c] = chess.insertCell(c);
			chessTable[r][c].id = r * columns + c;
			chessTable[r][c].value = "";
			chessTable[r][c].maxStep = 1;
			chessTable[r][c].point = 0;
			chessTable[r][c].onclick = function(){cellClick(this);};
			chessTable[r][c].style.width = "52px";
			chessTable[r][c].style.height = "52px";
			chessTable[r][c].style.color = "#fcfcfc";
			chessTable[r][c].style.background = bgColor;
			chessTable[r][c].innerHTML = "";
			chessTable[r][c].fType = "cell";

			oldColumn = c;
		}
	}
        
	for (var i = 0; i < figureList.length; i++){
		var row = figureList[i][0];
		var column = figureList[i][1];
		var figureName = figureList[i][2];
		var figure = "";
		var figureType = figureList[i][3];

		if(figureType == "B"){
			figure = "b";
		}else{
			figure = "w";
		}

		if(figureName == 'GY'){
			figure = figure + "ped.png";
			chessTable[row][column].point = 1;
			chessTable[row][column].maxStep = 2;
		}else if(figureName == 'F'){
			figure = figure + "runner.png";
			chessTable[row][column].point = 2;
			chessTable[row][column].maxStep = 4;
		}else if(figureName == 'K'){
			figure = figure + "king.png";
			chessTable[row][column].point = 2;
			chessTable[row][column].maxStep = 1;
		}else if(figureName == 'B'){
			figure = figure + "tower.png";
			chessTable[row][column].point = 3;
			chessTable[row][column].maxStep = 4;
		}else if(figureName == 'V'){
			figure = figure + "lead.png";
			chessTable[row][column].point = 5;
			chessTable[row][column].maxStep = 4;
		}
		chessTable[row][column].innerHTML = '<img src="images/' + figure + '" width="45px" height="45px">';
		chessTable[row][column].value = figureName;
		chessTable[row][column].fType = figureType;
	}
}

function clearFigures(){
	var blackTeam = document.getElementById("blackTeam");
	var whiteTeam = document.getElementById("whiteTeam");
	blackTeam.innerHTML = "";
	whiteTeam.innerHTML = "";
	currentStepTeam = "W";
	for(var i2 = 0; i2 < rows; i2++){
		for(var j = 0; j < columns; j++){
			chessTable[i2][j].innerHTML = "";
		}
	}
	for (var i = 0; i < figureList.length; i++){
		var row = figureList[i][0];
		var column = figureList[i][1];
		var figureName = figureList[i][2];
		var figure = "";
		var figureType = figureList[i][3];

		if(figureType == "B"){
			figure = "b";
		}else{
			figure = "w";
		}

		if(figureName == 'GY'){
			figure = figure + "ped.png";
			chessTable[row][column].point = 1;
			chessTable[row][column].maxStep = 2;
		}else if(figureName == 'F'){
			figure = figure + "runner.png";
			chessTable[row][column].point = 2;
			chessTable[row][column].maxStep = 4;
		}else if(figureName == 'K'){
			figure = figure + "king.png";
			chessTable[row][column].point = 2;
			chessTable[row][column].maxStep = 1;
		}else if(figureName == 'B'){
			figure = figure + "tower.png";
			chessTable[row][column].point = 3;
			chessTable[row][column].maxStep = 4;
		}else if(figureName == 'V'){
			figure = figure + "lead.png";
			chessTable[row][column].point = 5;
			chessTable[row][column].maxStep = 4;
		}
		chessTable[row][column].innerHTML = '<img src="images/' + figure + '" width="45px" height="45px">';
		chessTable[row][column].value = figureName;
		chessTable[row][column].fType = figureType;
	}
}

function clearBackground(){
	var bgColor = "#dadfe1";
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < columns; j++){
			if(i == 0){
				if(j % 2 == 0 || j == 0){
					bgColor = "#dadfe1";
				}else{
					bgColor = "#bdc3c7";
				}
			}else{
				if(chessTable[i - 1][0].style.backgroundColor == "rgb(218, 223, 225)"){
					if(j % 2 != 0 && j != 0){
						bgColor = "#dadfe1";
					}else if(j % 2 == 0 || j == 0){
						bgColor = "#bdc3c7";
					}
				}else if(chessTable[i - 1][0].style.backgroundColor == "rgb(189, 195, 199)"){
					if(j % 2 == 0 || j == 0){
						bgColor = "#dadfe1";
					}else{
						bgColor = "#bdc3c7";
					}
				}
			}
			chessTable[i][j].style.background = bgColor;
		}
	}
}

function cellClick(obj){

	var fullEndedGame = isGameEnded();

	if(fullEndedGame){
		return
	}

	var row = parseInt(obj.id / columns);
	var column = obj.id % columns;
	var cellText = chessTable[row][column].innerHTML;
	if(clickCounter == 0 && cellText != "" && chessTable[row][column].fType == currentStepTeam){
		clearBackground();
		chessTable[row][column].style.background = "#89c4f4";
		oldPositionData = [row, column, chessTable[row][column].innerHTML, chessTable[row][column].value, chessTable[row][column].fType, chessTable[row][column].maxStep, chessTable[row][column].point];
		clickCounter = 1;

		showSteps(row, column, chessTable[row][column].value);
	}else if(clickCounter == 1){
		if((cellText == oldPositionData[2] && chessTable[oldPositionData[0]][oldPositionData[1]].fType == chessTable[row][column].fType && oldPositionData[0] == row && oldPositionData[1] == column) || currentStepTeam == chessTable[row][column].fType){
			clickCounter = 0;
			clearBackground();
			return;
		}
		var canChange = checkStep(oldPositionData, row, column);
		if(canChange){
			if(currentStepTeam == "W"){
				currentStepTeam = "B";
				startTextTimer("A sötét következik!");
			}else{
				currentStepTeam = "W";
				startTextTimer("A világos következik!");
			}
			if(cellText == ""){
				moveFigure(oldPositionData, row, column);
			}else{
				destroyFigure(oldPositionData, row, column);
			}
		}
	}
}

function moveFigure(pTable, row, column){
	clearBackground();
	chessTable[pTable[0]][pTable[1]].value = 0;
	chessTable[pTable[0]][pTable[1]].maxStep = 0;
	chessTable[pTable[0]][pTable[1]].fType = "";
	chessTable[pTable[0]][pTable[1]].innerHTML = "";
	chessTable[row][column].innerHTML = pTable[2];
	chessTable[row][column].value = pTable[3];
	chessTable[row][column].fType = pTable[4];
	chessTable[row][column].maxStep = pTable[5];
	chessTable[row][column].point = pTable[6];
	if(pTable[5] == 2 && pTable[3] == "GY"){
		chessTable[row][column].maxStep = 1;
	}
	clickCounter = 0;
	var isRoundEndBlack = checkEnd("W");
	var isRoundEndWhite = checkEnd("B");
	if(isRoundEndBlack){
		startTextTimer("Sötét csapat nyert!");
		teamWonRounds[0]++;
		currentRound++;
		clearFigures();
	}else if(isRoundEndWhite){
		startTextTimer("Világos csapat nyert!");
		teamWonRounds[1]++;
		currentRound++;
		clearFigures();
	}
	if(currentRound > maxRounds + 1){
		if(teamPoints[0] > teamPoints[1]){
			startTextTimer("Sötét csapat nyert véglegesen!");
			return
		}else if(teamPoints[1] > teamPoints[0]){
			startTextTimer("Világos csapat nyert véglegesen!");
			return
		}else if(teamPoints[0] == teamPoints[1]){
			startTextTimer("Döntetlen!");
			return
		}
	}
}

function destroyFigure(pTable, row, column){
	clearBackground();
	var blackTeam = document.getElementById("blackTeam");
	var whiteTeam = document.getElementById("whiteTeam");
	var blackPoints = document.getElementById("blackPoints");
	var whitePoints = document.getElementById("whitePoints");
	if(chessTable[row][column].fType == "B"){
		whiteTeam.innerHTML = whiteTeam.innerHTML + chessTable[row][column].innerHTML;
		teamPoints[1] = teamPoints[1] + chessTable[row][column].point;
		whitePoints.innerHTML = teamPoints[1];
	}else{
		blackTeam.innerHTML = blackTeam.innerHTML + chessTable[row][column].innerHTML;
		teamPoints[0] = teamPoints[0] + chessTable[row][column].point;
		blackPoints.innerHTML = teamPoints[0];
	}
	moveFigure(pTable, row, column);
}

function checkEnd(type){
	var figureCounter = 0;
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < columns; j++){
			if(chessTable[i][j].innerHTML != "" && chessTable[i][j].fType == type){
				figureCounter++;
			}
		}
	}

	if(figureCounter == 0){
		return true
	}
}

function isGameEnded(){
	if(currentRound > maxRounds + 1){
		return true
	}
}

function showSteps(row, column, type){
	var maxStep = chessTable[row][column].maxStep;

	if(type == "GY"){
		var startColumn = column - 1;
		if(chessTable[row][column].fType == "B"){

			if(maxStep == 2 && chessTable[row + 1][column].innerHTML != ""){
				maxStep = 1;
			}

			for(var i = row - 1; i < row + maxStep + 1; i++){
				if(i < 0){
					return
				}
				if(chessTable[i][column].value == ""){
					chessTable[i][column].style.background = "#d64541";
				}
			}
			for(var j = startColumn; j < column + 2; j++){
				if(j == column && chessTable[row + 1][column].value != ""){
					j = column + 1;
				}
				if(j >= 0 && j <= columns - 1 && chessTable[row + 1][j].fType != chessTable[row][column].fType && chessTable[row + 1][j].value != ""){
					chessTable[row + 1][j].style.background = "#d64541";
				}
				if(j >= columns - 1){
					return;
				}
			}
		}else{
			if(maxStep == 2 && chessTable[row - 1][column].innerHTML != ""){
				maxStep = 1;
			}
			for(var i = row + 1; i > row - maxStep - 1; i--){
				if(i < 0){
					return
				}
				if(chessTable[i][column].value == ""){
					chessTable[i][column].style.background = "#d64541";
				}
			}
			for(var j = startColumn; j < column + 2; j++){
				if(j == column && chessTable[row - 1][column].value != ""){
					j = column + 1;
				}
				if(j >= 0 && j <= columns - 1 && chessTable[row - 1][j].fType != chessTable[row][column].fType && chessTable[row - 1][j].value != ""){
					chessTable[row - 1][j].style.background = "#d64541";
				}
				if(j >= columns - 1){
					return;
				}
			}
		}
	}else if(type == "B"){
		var upperMaxRow = 0;
		var leftMaxColumn = 0;
		if(chessTable[row][column].fType == "B"){
			upperMaxRow = calcUpper(row, column, "B");
			leftMaxColumn = calcLeft(row, column, "B");

			drawFromLeft(row, column, leftMaxColumn, "W");
			drawFromUp(row, column, upperMaxRow, "W");
		}else{ 
			upperMaxRow = calcUpper(row, column, "W");
			leftMaxColumn = calcLeft(row, column, "W");

			drawFromLeft(row, column, leftMaxColumn, "B");
			drawFromUp(row, column, upperMaxRow, "B");
		}
	}else if(type == "F"){
		if(chessTable[row][column].fType == "B"){
			drawToUpRight(row, column, maxStep, "B");
			drawToDownLeft(row, column, maxStep, "B");
			drawToUpLeft(row, column, maxStep, "B");
			drawToDownRight(row, column, maxStep, "B");
		}else{
			drawToUpRight(row, column, maxStep, "W");
			drawToDownLeft(row, column, maxStep, "W");
			drawToUpLeft(row, column, maxStep, "W");
			drawToDownRight(row, column, maxStep, "W");
		}
	}else if(type == "V"){
		if(chessTable[row][column].fType == "B"){
			upperMaxRow = calcUpper(row, column, "B");
			leftMaxColumn = calcLeft(row, column, "B");

			drawFromLeft(row, column, leftMaxColumn, "W");
			drawFromUp(row, column, upperMaxRow, "W");
			drawToUpRight(row, column, maxStep, "B");
			drawToDownLeft(row, column, maxStep, "B");
			drawToUpLeft(row, column, maxStep, "B");
			drawToDownRight(row, column, maxStep, "B");
		}else{
			upperMaxRow = calcUpper(row, column, "W");
			leftMaxColumn = calcLeft(row, column, "W");

			drawFromLeft(row, column, leftMaxColumn, "B");
			drawFromUp(row, column, upperMaxRow, "B");
			drawToUpRight(row, column, maxStep, "W");
			drawToDownLeft(row, column, maxStep, "W");
			drawToUpLeft(row, column, maxStep, "W");
			drawToDownRight(row, column, maxStep, "W");
		}
	}else if(type == "K"){
		if(chessTable[row][column].fType == "B"){
			upperMaxRow = calcUpper(row, column, "B");
			leftMaxColumn = calcLeft(row, column, "B");

			drawFromLeft(row, column, leftMaxColumn, "W");
			drawFromUp(row, column, upperMaxRow, "W");
			drawToUpRight(row, column, maxStep, "B");
			drawToDownLeft(row, column, maxStep, "B");
			drawToUpLeft(row, column, maxStep, "B");
			drawToDownRight(row, column, maxStep, "B");
		}else{
			upperMaxRow = calcUpper(row, column, "W");
			leftMaxColumn = calcLeft(row, column, "W");

			drawFromLeft(row, column, leftMaxColumn, "B");
			drawFromUp(row, column, upperMaxRow, "B");
			drawToUpRight(row, column, maxStep, "W");
			drawToDownLeft(row, column, maxStep, "W");
			drawToUpLeft(row, column, maxStep, "W");
			drawToDownRight(row, column, maxStep, "W");
		}
	}
}

function checkStep(t, row, column){
	if(chessTable[row][column].style.backgroundColor == "rgb(214, 69, 65)"){
		return true
	}
}


function drawFromLeft(row, column, startLeft, type){
	var type2 = type;
	if(type2 == "B"){
		type2 == "W";
	}else{
		type2 = "B";
	}
	var maxRight = calcRight(row, column, type2);
	console.log(maxRight);
	var columns2 = columns;
	if(column < columns - 2){
		columns2 = columns + 1;
	}
	for(var l = startLeft; l < maxRight; l++){
		if(l == column){
			chessTable[row][l].style.background = "#89c4f4";
			l++;
		}
		if(chessTable[row][l].value == "" || chessTable[row][l].fType == type){
			chessTable[row][l].style.background = "#d64541";
		}else if(chessTable[row][l].value != "" && chessTable[row][l].fType == type2){
			return
		}
	}
}

function drawFromUp(row, column, startUp, type){
	var type2 = type;
	if(type2 == "B"){
		type2 == "W";
	}else{
		type2 = "B";
	}
	var maxDown = calcDown(row, column, type2);
	for(var u = startUp; u < maxDown + 1; u++){
		if(u == row){
			chessTable[u][column].style.background = "#89c4f4";
			u++;
		}
		if(u > rows - 1){
			return
		}
		if(chessTable[u][column].innerHTML == "" || chessTable[u][column].fType == type){
			chessTable[u][column].style.background = "#d64541";
		}else if(chessTable[u][column].innerHTML != "" && chessTable[u][column].fType == type2){
			return
		}
	}
}

function drawToUpRight(row, column, maxStep, type){
	var type2 = type;
	if(type2 == "B"){
		type2 == "W";
	}else{
		type2 = "B";
	}

	if(row == 0){
		return
	}

	for(var ru = 1; ru < maxStep + 1; ru++){
		if((row - ru < 0 || column + ru > columns - 1) || (chessTable[row - ru][column + ru].innerHTML != "" && chessTable[row - ru][column + ru].fType == type)){
			return
		}
		if(chessTable[row - ru][column + ru].innerHTML == ""){
			chessTable[row - ru][column + ru].style.background = "#d64541";
		}else{
			chessTable[row - ru][column + ru].style.background = "#d64541";
			return
		}
	}
}

function drawToDownLeft(row, column, maxStep, type){
	var type2 = type;
	if(type2 == "B"){
		type2 == "W";
	}else{
		type2 = "B";
	}
	for(var ld = 1; ld < maxStep + 1; ld++){
		if((row + ld > rows - 1 || column - ld < 0) || chessTable[row + ld][column - ld].innerHTML != "" && chessTable[row + ld][column - ld].fType == type){
			return
		}
		if(chessTable[row + ld][column - ld].innerHTML == ""){
			chessTable[row + ld][column - ld].style.background = "#d64541";
		}else{
			chessTable[row + ld][column - ld].style.background = "#d64541";
			return
		}
	}
}

function drawToUpLeft(row, column, maxStep, type){
	var type2 = type;
	if(type2 == "B"){
		type2 == "W";
	}else{
		type2 = "B";
	}

	if(row == 0){
		return
	}

	for(var lu = 1; lu < maxStep + 1; lu++){
		if((row - lu < 0 || column - lu < 0) || chessTable[row - lu][column - lu].innerHTML != "" && chessTable[row - lu][column - lu].fType == type){
			return
		}
		if(chessTable[row - lu][column - lu].innerHTML == ""){
			chessTable[row - lu][column - lu].style.background = "#d64541";
		}else{
			chessTable[row - lu][column - lu].style.background = "#d64541";
			return
		}
	}
}

function drawToDownRight(row, column, maxStep, type){
	var type2 = type;
	if(type == "B"){
		type2 == "W";
	}else{
		type2 = "B";
	}
	for(var rd = 1; rd < maxStep + 1; rd++){
		if((row + rd > rows - 1 || column + rd > columns - 1) || (chessTable[row + rd][column + rd].innerHTML != "" && chessTable[row + rd][column + rd].fType == type)){
			return
		}
		if(chessTable[row + rd][column + rd].innerHTML == ""){
			chessTable[row + rd][column + rd].style.background = "#d64541";
		}else{
			chessTable[row + rd][column + rd].style.background = "#d64541";
			return
		}
	}
}

function calcUpper(row, column, type){
	var maxStep = chessTable[row][column].maxStep;
	if(row == 0){
		return 0;
	}
	for(var i = row - 1; i >= row - maxStep; i--){
		if(chessTable[i][column].innerHTML != "" && chessTable[i][column].fType == type){
			return i + 1;
		}else if(chessTable[i][column].innerHTML != "" && chessTable[i][column].fType != type){
			return i;
		}else if(i == row - maxStep){
			return row - maxStep;
		}else if(chessTable[i][column].innerHTML == "" && i == 0){
			return 0;
		}
	}
}

function calcDown(row, column, type){
	var maxStep = chessTable[row][column].maxStep;
	if(row == rows - 1){
		return row;
	}
	for(var i = row + 1; i <= row + maxStep; i++){
		if(chessTable[i][column].value != "" && chessTable[i][column].fType == type){
			return i;
		}else if(chessTable[i][column].value != "" && chessTable[i][column].fType != type){
			return i;
		}else if(i == row + maxStep){
			return row + maxStep;
		}else if(chessTable[i][column].value == "" && i == rows - 1){
			return i;
		}
	}
}

function calcLeft(row, column, type){
	var maxStep = chessTable[row][column].maxStep;
	if(column == 0){
		return 0;
	}
	for(var i = column - 1; i >= column - maxStep; i--){
		if(chessTable[row][i].value != "" && chessTable[row][i].fType == type){
			return i + 1;
		}else if(chessTable[row][i].value != "" && chessTable[row][i].fType != type){
			return i;
		}else if(i == column - maxStep){
			return column - maxStep;
		}else if(chessTable[row][i].value == "" && i == 0){
			return 0;
		}
	}
}

function calcRight(row, column, type){
	var maxStep = chessTable[row][column].maxStep;
	if(column == columns - 1){
		return column;
	}
	for(var i = column + 1; i <= column + maxStep + 1; i++){
		if(chessTable[row][i].value != "" && chessTable[row][i].fType == type){
			return i;
		}else if(chessTable[row][i].value != "" && chessTable[row][i].fType != type){
			return i - 1;
		}else if(i == column + maxStep + 1){
			return column + maxStep + 1;
		}else if(chessTable[row][i].value == "" && i == columns - 1){
			return columns;
		}
	}
}

function startTextTimer(newText){
	clearInterval(chessTextInterval);
	chessText.innerHTML = newText;
	chessText.classList.remove("fadeOut");
	chessText.classList.add("slideInDown");
	chessTextInterval = setInterval(function(){
		chessText.classList.remove("slideInDown");
		chessText.classList.add("fadeOut");
		if(currentRound > maxRounds + 1){
			chessText.classList.remove("fadeOut");
			chessText.innerHTML = "Ha szeretnéd újrakezdeni a játékot kattints <b onclick='currentRound = 1;' class='restart'>ide</b>.";
		}
	}, 1500);
}

startChess();