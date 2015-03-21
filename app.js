/**
 * Created by Yongrui on 2015/3/21.
 */

var stage = new createjs.Stage("gameView");

var grids = [[], [], []];
var step = 0;
var gameOver = false;

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        // 初始化格子
        grids[i][j] = new Grid(i, j);
        grids[i][j].x = i * 55;
        grids[i][j].y = j * 55;
        stage.addChild(grids[i][j]);
        stage.update();

        grids[i][j].addEventListener("click", handleClick);
    }
}

function handleClick(event) {
    var grid = event.target;
    if (grid.getGridType() == Grid.TYPE_EMPTY && !gameOver) {
        grid.setGridType(Grid.TYPE_ME);
        stage.update();
        step++;

        if (check(grid.X, grid.Y)) {
            gameOver = true;
            console.log("You win!");
            return;
        }

        if (isEnd()) {
            gameOver = true;
            console.log("Game over!");
            return;
        }

        ai();
    }
}

function check(x, y) {
    if (Math.abs(grids[x][0].getGridType() + grids[x][1].getGridType() + grids[x][2].getGridType()) == 3) {
        return true;
    }

    if (Math.abs(grids[0][y].getGridType() + grids[1][y].getGridType() + grids[2][y].getGridType()) == 3) {
        return true;
    }

    if (Math.abs(grids[0][0].getGridType() + grids[1][1].getGridType() + grids[2][2].getGridType()) == 3) {
        return true;
    }

    if (Math.abs(grids[2][0].getGridType() + grids[1][1].getGridType() + grids[0][2].getGridType()) == 3) {
        return true;
    }

    return false;
}

function isEnd() {
    if (step >= 9) {
        return true;
    }

    return false;
}

function ai() {
    var b = best();
    var x = b.x;
    var y = b.y;
    grids[x][y].setGridType(Grid.TYPE_YOU);
    stage.update();
    step++;

    if (check(x, y)) {
        gameOver = true;
        console.log("You lose!");
        return;
    }

    if (isEnd()) {
        gameOver = true;
        console.log("Game over!");
        return;
    }
}

function best() {
    var bestX;
    var bestY;
    var bestV = 0;

    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            if (grids[x][y].getGridType() == Grid.TYPE_EMPTY) {
                grids[x][y].setGridType(Grid.TYPE_YOU);
                step++;
                if (check(x, y)) {
                    step--;
                    grids[x][y].setGridType(Grid.TYPE_EMPTY);
                    return {'x':x,'y':y,'v':1000};
                } else if (isEnd()) {
                    step--;
                    grids[x][y].setGridType(Grid.TYPE_EMPTY);
                    return {'x':x,'y':y,'v':0};
                } else {
                    var val = worst().v;
                    step--;
                    grids[x][y].setGridType(Grid.TYPE_EMPTY);
                    if (bestX == null || val >= bestV) {
                        bestX = x;
                        bestY = y;
                        bestV = val;
                    }
                }
            }
        }
    }
    return {'x':bestX, 'y':bestY, 'v':bestV};
}

function worst() {
    var bestX;
    var bestY;
    var bestV = 0;

    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            if (grids[x][y].getGridType() == Grid.TYPE_EMPTY) {
                grids[x][y].setGridType(Grid.TYPE_ME);
                step++;
                if (check(x, y)) {
                    step--;
                    grids[x][y].setGridType(Grid.TYPE_EMPTY);
                    return {'x':x,'y':y,'v':-1000};
                } else if (isEnd()) {
                    step--;
                    grids[x][y].setGridType(Grid.TYPE_EMPTY);
                    return {'x':x,'y':y,'v':0};
                } else {
                    var val = best().v;
                    step--;
                    grids[x][y].setGridType(Grid.TYPE_EMPTY);
                    if (bestX == null || val <= bestV) {
                        bestX = x;
                        bestY = y;
                        bestV = val;
                    }
                }
            }
        }
    }
    return {'x':bestX, 'y':bestY, 'v':bestV};
}
