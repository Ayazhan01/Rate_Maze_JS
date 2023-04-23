let easy = [
    [1, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1]
]

let medium = [
    [1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1]
]
let hard = [
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 1]
]

let mazearray = easy;
let timer = 0;
let record = Infinity;

let Level = document.getElementById("level_select");
Level.addEventListener("change", function() {
    let level = Level.value;
    // console.log(level);
    if (level == 1) {
        mazearray = easy;
    }
    if (level == 2) {
        mazearray = medium;
    }
    if (level == 3) {
        mazearray = hard;
    }
    maze.innerHTML =
        `<img src="img/rat.png" id ="rat" width="50px" height="50px" alt="rat" >
        <img src="img/food.png" alt="rat" width="50px" height="50px" id="food">`
    createMaze();
})

function startTimer() {
    setInterval(function() {
        timer++;
        document.getElementById("timer").innerHTML = "Time: " + timer + " seconds";
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}
let maze = document.getElementById("maze-container");
let rat = document.getElementById("rat");
let food = document.getElementById("food");

function setratposition(x, y) {
    rat.style.top = x + "px";
    rat.style.left = y + "px";
}

function setfoodposition(x, y) {
    food.style.bottom = x + "px";
    food.style.right = y + "px";
}


function createMaze() {
    for (let i = 0; i < mazearray.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < mazearray[i].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (mazearray[i][j] == 0) {
                cell.classList.add("wall");
            }
            row.appendChild(cell);



            // rat = 2 , replace 2 with 0,0 of mazearray ---------------------------------
            if (i == 0 && j == 0) {
                mazearray[i][j] = 2;
            }
        }
        maze.appendChild(row);
    }

    setratposition(0, 0)
    setfoodposition(0, 0)
    startTimer();
    // console.log(mazearray);
}


function getratposition() {
    // find 2 in mazearray and return its position
    let position = [-1, -1];
    for (let i = 0; i < mazearray.length; i++) {
        for (let j = 0; j < mazearray[i].length; j++) {
            if (mazearray[i][j] == 2) {
                position[0] = i;
                position[1] = j;
            }
        }
    }
    console.log(position);
    return position;
}


document.addEventListener("keydown", function(e) {
    let rat = document.getElementById("rat");
    let food = document.getElementById("food");
    let ratleft = rat.offsetLeft;
    let rattop = rat.offsetTop;
    let foodleft = food.offsetLeft;
    let foodtop = food.offsetTop;
    let ratposition = getratposition();




    // console.log(ratleft, rattop);
    if (e.key == "ArrowRight" && ratleft < (mazearray.length - 1) * 50 && mazearray[ratposition[0]][ratposition[1] + 1] == 1) {
        ratleft += 50;
        rat.style.left = ratleft + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0]][ratposition[1] + 1] = 2;
    }


    if (e.key == "ArrowLeft" && ratleft > 0 && mazearray[ratposition[0]][ratposition[1] - 1] == 1) {
        ratleft -= 50;
        rat.style.left = ratleft + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0]][ratposition[1] - 1] = 2;
    }

    if (e.key == "ArrowUp" && rattop > 0 && mazearray[ratposition[0] - 1][ratposition[1]] == 1) {
        rattop -= 50;
        rat.style.top = rattop + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0] - 1][ratposition[1]] = 2;
    }


    if (e.key == "ArrowDown" && rattop < (mazearray.length - 1) * 50 && mazearray[ratposition[0] + 1][ratposition[1]] == 1) {
        rattop += 50;
        rat.style.top = rattop + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0] + 1][ratposition[1]] = 2;
    }


    if (ratleft == foodleft && rattop == foodtop) {
        alert("You Won");
        if (timer < record) {
            record = timer;
            document.getElementById("record").innerHTML = "Record: " + record + " seconds";
        }
    }
})