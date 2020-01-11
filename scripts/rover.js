function marsRover(commands) {
    this.degree = 0;
    this.startPosX = document.getElementById("startPos").value.split("")[0];
    this.startPosY = document.getElementById("startPos").value.split("")[1];
    this.positionY = parseInt(this.startPosY);
    this.positionX = parseInt(this.startPosX);
    this.direction = document.getElementById("startPos").value.split("")[2];
    this.route = null;
    this.mapGrid = null;
    this.mapGridX = document.getElementById("mapGrid").value.split(",")[0];
    this.mapGridY = document.getElementById("mapGrid").value.split(",")[1];
    this.mapGridX++;
    this.mapGridY++;
    this.travelPath = [];
    this.limitGridAlert = false;
    this.roverLogs;
    switch (this.direction) {
        case 'W':
            this.degree = -90;
            break;
        case 'S':
            this.degree = -180;
            break;
        case 'E':
            this.degree = 90;
            break;
        default:
            this.degree = 0;

    }
    this.roverHeight = 55;
    this.roverWidth = 50;
}

//Function create map
marsRover.prototype.createMap = function () {
    var validDirections = ["N", "E", "S", "W"]
    if (!(document.getElementById("mapGrid").value.split(",").length > 1) || this.mapGridX != this.mapGridY || parseInt(this.mapGridX) > 9 || parseInt(this.mapGridY) > 9) {
        alert("Invalid Grid Value  E.g.: 5,5 \nMax value = 9");
    } else if (validDirections.indexOf(this.direction) < 0 || this.positionX >= this.mapGridX || this.positionY >= this.mapGridY || typeof this.positionX != "number" || typeof this.positionY != "number") {
        alert("Invalid Initial Value  E.g.: 0 0 N \nMax value = Grid Values");
    } else {
        let cells = [];
        for (let i = this.mapGridX - 1; i >= 0; i--) {
            for (let j = 0; j < this.mapGridX; j++) {
                cells.push(j + "-" + i);
            }
        }

        document.querySelector(".parent").setAttribute("style", "grid-template-columns: repeat(" + parseInt(this.mapGridX) + ", " + 500 / parseInt(this.mapGridX) + "px);grid-template-rows: repeat(" + parseInt(this.mapGridY) + ", " + 500 / parseInt(this.mapGridY) + "px);");
        this.mapGrid = parseInt(this.mapGridX) * parseInt(this.mapGridY);
        for (let i = 1; i <= this.mapGrid; i++) {
            mapGrid[i] = document.createElement("div");
            mapGrid[i].className = "div" + [i];
            mapGrid[i].innerHTML = "<span>(" + cells[i - 1] + ")</span>";
            document.querySelector(".parent").appendChild(mapGrid[i]);
        }

        if (document.querySelector(".parent")) {
            document.getElementById("btnSetMap").setAttribute("disabled", "disabled");
        }

        if (document.getElementById("btnClearMap").addEventListener("click", () => {
                this.clearMapFunc();
            }));

        if (document.getElementById("mapGrid").addEventListener("focus", () => {
                this.clearMapFunc();
            }));
        let deg = this.degree;
        let rover = document.getElementById('rover');
        if (rover) {
            let posx = this.positionX;
            let posy = this.positionY;
            rover.style.opacity = "1";
            rover.style.bottom = (posy + 0.5) * (500 / parseInt(this.mapGridY)) - this.roverHeight / 2 + "px";
            rover.style.left = (posx + 0.5) * (500 / parseInt(this.mapGridX)) - this.roverWidth / 2 + "px";
            rover.style.transform = "rotate(" + deg + "deg)";
        }

    }
}

//Function clear map
marsRover.prototype.clearMapFunc = function () {
    document.querySelector(".parent").innerHTML = "";
    document.getElementById("mapGrid").value = "";
    document.getElementById("btnSetMap").removeAttribute("disabled", "disabled");
}


//Funtion Left
marsRover.prototype.roverTurnLeft = function (delay) {

    this.degree -= 90;
    var rover = document.getElementById('rover');
    var deg = this.degree;
    setTimeout(function () {
        rover.style.transform = "rotate(" + deg + "deg)";
    }, delay * 1000);

    switch (this.direction) {

        case 'N':
            this.direction = 'W';
            break;
        case 'W':
            this.direction = 'S';
            break;
        case 'S':
            this.direction = 'E';
            break;
        case 'E':
            this.direction = 'N';
            break;
    }
    console.log("roverTurnLeft was called!" + " " + this.direction);
}


//Function Right
marsRover.prototype.roverTurnRight = function (delay) {

    this.degree += 90;
    var deg = this.degree;
    var rover = document.getElementById('rover');
    setTimeout(function () {
        rover.style.transform = "rotate(" + deg + "deg)";
    }, delay * 1000);

    switch (this.direction) {

        case 'N':
            this.direction = 'E';
            break;
        case 'E':
            this.direction = 'S';
            break;
        case 'S':
            this.direction = 'W';
            break;
        case 'W':
            this.direction = 'N';
            break;
    }
}

//Function rover move
marsRover.prototype.roverMove = function (delay) {

    var rover = document.getElementById('rover');

    switch (this.direction) {
        case 'N':
            if (this.positionY < 0 || this.positionY >= parseInt(this.mapGridY - 1)) {
                this.limitGridAlert = true;
            } else {
                this.positionY++;
                console.log(this.mapGridY);
            }
            break;

        case 'E':
            if (this.positionX < 0 || this.positionX >= parseInt(this.mapGridX - 1)) {
                this.limitGridAlert = true;
            } else {
                this.positionX++;
            }
            break;

        case 'S':
            if (this.positionY <= 0 || this.positionY > this.mapGridY) {
                this.limitGridAlert = true;
            } else {
                this.positionY--;
            }
            break;

        case 'W':
            if (this.positionX <= 0 || this.positionX > this.mapGridX) {
                this.limitGridAlert = true;
            } else {
                this.positionX--;
            }
            break;
    }


    var posx = this.positionX;
    var posy = this.positionY;
    setTimeout(() => {
        rover.style.bottom = (posy + 0.5) * (500 / parseInt(this.mapGridY)) - this.roverHeight / 2 + "px";
        rover.style.left = (posx + 0.5) * (500 / parseInt(this.mapGridX)) - this.roverWidth / 2 + "px";
    }, delay * 1000);
}

//Function commands
marsRover.prototype.commandsRover = function () {
    if (document.querySelector(".parent > div")) {

        let str = document.getElementById("startPos").value;
        let patt = new RegExp('[0-9][0-9][NEWS]');
        let res = patt.test(str);

        if (res) {

            var inputVal = document.getElementById("routePath").value;
            this.route = inputVal;

            if (this.route.indexOf('M') >= 0 || this.route.indexOf('R') >= 0 || this.route.indexOf('L') >= 0) {
                var newRoute = this.route.split("");
                console.log("Rover's route: " + this.route);
                for (var i = 0; i < newRoute.length; i++) {

                    switch (this.route[i]) {
                        case 'L':
                            this.roverTurnLeft(i);
                            break;
                        case 'R':
                            this.roverTurnRight(i);
                            break;
                        case 'M':
                            this.roverMove(i);
                            break;
                    }

                    var position = [this.positionX, this.positionY];
                    this.travelPath.push(position);
                    this.roverLogs = document.getElementById("roverLogs");
                    if (this.limitGridAlert) {
                        this.roverLogs.innerHTML = "<div class='error'>ERROR: Rover reached limit grid. Can not move beyond the boundaries of Mars</div>";
                        break;
                    } else {
                        this.roverLogs.innerHTML += "Step " + [i + 1] + ": <br>" +
                            "Rover's current location: " + position + "<br>" + "Rover's current direction: " + this.direction + "<br> --------- <br>";
                    }

                } //End of Forloop
            } else {
                alert("Enter a valid command!!");
                commandsRover(); //prompt poup-up again if input doesnt match.
            }
        } else {
            alert("Enter a valid Start Position. E.g.: 1 3 N. This's mean X: 1, Y: 3, Direction: North.");
        }
    } else {
        alert("Firstly create Mars map grid.");
    }
}

//Function add move to path
enteranceMove = () => {
    if (document.querySelector(".parent > div"))
        document.getElementById("routePath").value += "M";
}

//Function add turn left move to path
enteranceLeft = () => {
    if (document.querySelector(".parent > div"))
        document.getElementById("routePath").value += "L";
}

//Function add turn right to path
enteranceRight = () => {
    if (document.querySelector(".parent > div"))
        document.getElementById("routePath").value += "R";
}


marsRover.prototype.clearPath = function () {
    document.getElementById("clearPath").addEventListener("click", () => {
        document.getElementById("routePath").value = "";
    });

}


marsRover.prototype.setCommand = function (commands) {
    for (var i = 0; i < Object.keys(commands).length; i++) {
        this[Object.keys(commands)[i]] = commands[Object.keys(commands)[i]];
    }
    this.commandsRover();
    this.clearPath();
}