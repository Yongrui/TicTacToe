/**
 * Created by Yongrui on 2015/3/21.
 */

function Grid(x, y) {
    createjs.Shape.call(this);
    this.setGridType(Grid.TYPE_EMPTY);
    this.X = x || 0;
    this.Y = y || 0;
}

Grid.prototype = new createjs.Shape();

Grid.TYPE_EMPTY = 0;
Grid.TYPE_ME = 1;
Grid.TYPE_YOU = -1;

Grid.prototype.setColor = function(colorString) {
    this.graphics.clear();
    this.graphics.beginFill(colorString);
    this.graphics.drawRect(0, 0, 50, 50);
    this.graphics.endFill();
}

Grid.prototype.setGridType = function(gridType) {
    this._gridType = gridType;
    switch (this._gridType) {
        case Grid.TYPE_EMPTY:
            this.setColor("#000");
            break;
        case Grid.TYPE_ME:
            this.setColor("#0f0");
            break;
        case Grid.TYPE_YOU:
            this.setColor("#f00");
            break;
    }
}

Grid.prototype.getGridType = function() {
    return this._gridType;
}