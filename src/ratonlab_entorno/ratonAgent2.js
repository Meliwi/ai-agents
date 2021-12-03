const Agent = require("../core/Agent");
class CleanerAgent extends Agent {
  constructor(value) {
    super(value);
    this.mapEnv = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    /*
     * Mouse's position 
       x = columna, y = fila (x,y)
     */
    this.position = [1, 1];
    /*
     * These variables were created to save the old position of mouse
     */
    this.oldPositionX = 1;
    this.oldPositionY = 1;
    /*
     * In this array we'll save the ways where mouse can go
     */
    this.ways = [];
    /*
     * In this array we'll save the corresponding times the mouse passed through each way
     */
    this.nWays = [];
  }

  /**
   * We override the send method.
   * In this case, the state is just obtained as the join of the perceptions
   */
  send() {
    //This is the case when the mouse takes the cheese
    if (this.perception[4] == 1) {
      return "TAKE";
    }
    //These are cases for every directions
    if (this.perception[0] == 0) {
      this.ways.push("LEFT");
    }
    if (this.perception[1] == 0) {
      this.ways.push("UP");
    }
    if (this.perception[2] == 0) {
      this.ways.push("RIGHT");
    }
    if (this.perception[3] == 0) {
      this.ways.push("DOWN");
    }
    for (var i = 0; i < this.ways.length; i++) {
      switch (this.ways[i]) {
        case "LEFT":
          if (this.position[0] - 1 >= 0) {
            /*
            here, we're saving the value that is in mapEnv, that indicates number of times
            the mouse has passed over that position.
            */
            this.nWays.push(
              this.mapEnv[this.position[1]][this.position[0] - 1]
            );
          } else {
            /**
             * In this case the mouse is on the edge of our matrix(mapEnv), that means they haven't
             * visited that position
             */
            this.nWays.push(0);
          }
          break;
        case "UP":
          if (this.position[1] - 1 >= 0) {
            this.nWays.push(
              this.mapEnv[this.position[1] - 1][this.position[0]]
            );
          } else {
            this.nWays.push(0);
          }
          break;
        case "RIGHT":
          if (this.position[0] + 1 <= this.mapEnv[0].length - 1) {
            this.nWays.push(
              this.mapEnv[this.position[1]][this.position[0] + 1]
            );
          } else {
            this.nWays.push(0);
          }
          break;
        case "DOWN":
          if (this.position[1] + 1 <= this.mapEnv.length - 1) {
            this.nWays.push(
              this.mapEnv[this.position[1] + 1][this.position[0]]
            );
          } else {
            this.nWays.push(0);
          }
          break;
      }
    }
    let minIndex = this.nWays.indexOf(Math.min.apply(null, this.nWays));
    let action = this.ways[minIndex];
    if (action == "LEFT") {
      /*here, we're looking that mouse isn't in the limit of our matrix (mapEnv), 
          that is that the mouse is not in the left border. if it is we look for the other condition
         */
      if (this.position[0] - 1 >= 0) {
        /*And now we look that this position is free, and if it is, mouse moves to left
          and we update value in mapEnv to add 1
          */
        this.mapEnv[this.position[1]][this.position[0] - 1] += 1;
        /*
         * here, we save the actual position before we change the position of mouse.
         */
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] -= 1;
        this.ways = [];
        this.nWays = [];
        return "LEFT";
      } else {
        /*
          The mouse has reached the limit of their inner map of the world (mapEnv), 
          thus we have to add a new column in the left.  
          */
        this.mapEnv = this.mapEnv.map((e) => [0].concat(e));
        this.mapEnv[this.position[1]][this.position[0]] += 1;
        /*
          the old position was 1, because now the mouse is in x=0
          */
        this.oldPositionX = 1;
        this.ways = [];
        this.nWays = [];
        return "LEFT";
      }
    }

    //In this case the mouse goes up
    if (action == "UP") {
      if (this.position[1] - 1 >= 0) {
        this.mapEnv[this.position[1] - 1][this.position[0]] += 1;
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] -= 1;
        this.ways = [];
        this.nWays = [];
        return "UP";
      } else {
        this.mapEnv.unshift(Array(this.mapEnv[0].length).fill(0));
        this.mapEnv[this.position[1]][this.position[0]] += 1;
        this.oldPositionY = 1;
        this.ways = [];
        this.nWays = [];
        return "UP";
      }
    }

    //In this case the mouse goes right
    if (action == "RIGHT") {
      if (this.position[0] + 1 <= this.mapEnv[0].length - 1) {
        this.mapEnv[this.position[1]][this.position[0] + 1] += 1;
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] += 1;
        this.ways = [];
        this.nWays = [];
        return "RIGHT";
      } else {
        this.mapEnv = this.mapEnv.map((e) => e.concat([0]));
        this.mapEnv[this.position[1]][this.position[0] + 1] += 1;
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] += 1;
        this.ways = [];
        this.nWays = [];
        return "RIGHT";
      }
    }
    //In this case the mouse goes down
    if (action == "DOWN") {
      if (this.position[1] + 1 <= this.mapEnv.length - 1) {
        this.mapEnv[this.position[1] + 1][this.position[0]] += 1;
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] += 1;
        this.ways = [];
        this.nWays = [];
        return "DOWN";
      } else {
        this.mapEnv.push(Array(this.mapEnv[0].length).fill(0));
        this.mapEnv[this.position[1] + 1][this.position[0]] += 1;
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] += 1;
        this.ways = [];
        this.nWays = [];
        return "DOWN";
      }
    }
  }
}
module.exports = CleanerAgent;
