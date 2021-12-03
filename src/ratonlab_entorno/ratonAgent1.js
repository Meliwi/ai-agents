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
    /* In this case the mouse goes left
     * if in the box of the left is free, then we go and look the other condition
     */
    if (this.perception[0] == 0) {
      /*here, we're looking that mouse isn't in the limit of our matrix (mapEnv), 
        that is that the mouse is not in the left border. if it is we look for the other condition
       */
      if (this.position[0] - 1 >= 0) {
        /*And now we look that this position is free, and if it is, mouse moves to left
        and we update value in mapEnv to 1, that means mouse passed through that position 
        */
        if (this.mapEnv[this.position[1]][this.position[0] - 1] == 0) {
          this.mapEnv[this.position[1]][this.position[0] - 1] = 1;
          /*
           * here, we save the actual position before we change the position of mouse.
           */
          this.oldPositionX = this.position[0];
          this.oldPositionY = this.position[1];
          this.position[0] -= 1;
          return "LEFT";
        }
      } else {
        /*
        The mouse has reached the limit of their inner map of the world (mapEnv), 
        thus we have to add a new column in the left.  
        */
        this.mapEnv = this.mapEnv.map((e) => [0].concat(e));
        this.mapEnv[this.position[1]][this.position[0]] = 1;
        /*
        the old position was 1, because now the mouse is in x=0
        */
        this.oldPositionX = 1;
        return "LEFT";
      }
    }

    //In this case the mouse goes up
    if (this.perception[1] == 0) {
      //here, we're looking that mouse isn't in the limit of our matrix (mapEnv) in y
      if (this.position[1] - 1 >= 0) {
        /*And now we look that this position is free, and if it is free, mouse moves to up
          and we update value in mapEnv to 1, that means mouse passed through that position 
          */
        if (this.mapEnv[this.position[1] - 1][this.position[0]] == 0) {
          this.mapEnv[this.position[1] - 1][this.position[0]] = 1;
          this.oldPositionX = this.position[0];
          this.oldPositionY = this.position[1];
          this.position[1] -= 1;
          return "UP";
        }
      } else {
        /*The mouse has reached the limit of their inner map of the world (mapEnv), 
        thus we have to add a new row on top */
        this.mapEnv.unshift(Array(this.mapEnv[0].length).fill(0));
        this.mapEnv[this.position[1]][this.position[0]] = 1;
        this.oldPositionY = 1;
        return "UP";
      }
    }

    //In this case the mouse goes right
    if (this.perception[2] == 0) {
      //here, we're looking that mouse isn't in the limit of our matrix (mapEnv)
      if (this.position[0] + 1 <= this.mapEnv[0].length - 1) {
        /*And now we look that this position is free, and if it is free, mouse moves to right
        and we update value in mapEnv to 1, that means mouse passed through that position 
        */
        if (this.mapEnv[this.position[1]][this.position[0] + 1] == 0) {
          this.mapEnv[this.position[1]][this.position[0] + 1] = 1;
          this.oldPositionX = this.position[0];
          this.oldPositionY = this.position[1];
          this.position[0] += 1;
          return "RIGHT";
        }
      } else {
        /*The mouse has reached the limit of their inner map of the world (mapEnv), 
      thus we have to add a new column in the right.  */
        this.mapEnv = this.mapEnv.map((e) => e.concat([0]));
        this.mapEnv[this.position[1]][this.position[0] + 1] = 1;
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] += 1;
        return "RIGHT";
      }
    }
    //In this case the mouse goes down
    if (this.perception[3] == 0) {
      //here, we're looking that mouse isn't in the limit of our matrix (mapEnv) in y
      if (this.position[1] + 1 <= this.mapEnv.length - 1) {
        /*And now we look that this position is free, and if it is free, mouse moves to down
          and we update value in mapEnv to 1, that means mouse passed through that position 
          */
        if (this.mapEnv[this.position[1] + 1][this.position[0]] == 0) {
          this.mapEnv[this.position[1] + 1][this.position[0]] = 1;
          this.oldPositionX = this.position[0];
          this.oldPositionY = this.position[1];
          this.position[1] += 1;
          return "DOWN";
        }
      } else {
        /*The mouse has reached the limit of their inner map of the world (mapEnv), 
        thus we have to add a new row on top */
        this.mapEnv.push(Array(this.mapEnv[0].length).fill(0));
        this.mapEnv[this.position[1] + 1][this.position[0]] = 1;
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] += 1;
        return "DOWN";
      }
    }
    /*
    It is checked that the old position is different from the previous position to which 
    the mouse is. This is done so that it cannot be returned. And then it cheks the 
    condition when the mouse has already passed though the positions. 
    */
    if (this.oldPositionX !== this.position[0] - 1) {
      if (this.perception[0] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] -= 1;
        return "LEFT";
      }
    }
    if (this.oldPositionX !== this.position[0] + 1) {
      if (this.perception[2] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] += 1;
        return "RIGHT";
      }
    }
    if (this.oldPositionY !== this.position[1] - 1) {
      if (this.perception[1] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] -= 1;
        return "UP";
      }
    }
    if (this.oldPositionY !== this.position[0] + 1) {
      if (this.perception[3] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] += 1;
        return "DOWN";
      }
    }

    //These are in case we dont have any other choice but to turnback
    if (this.oldPositionX == this.position[0] - 1) {
      if (this.perception[0] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] -= 1;
        return "LEFT";
      }
    }
    if (this.oldPositionX == this.position[0] + 1) {
      if (this.perception[2] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[0] += 1;
        return "RIGHT";
      }
    }
    if (this.oldPositionY == this.position[1] - 1) {
      if (this.perception[1] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] -= 1;
        return "UP";
      }
    }
    if (this.oldPositionY == this.position[0] + 1) {
      if (this.perception[3] == 0) {
        this.oldPositionX = this.position[0];
        this.oldPositionY = this.position[1];
        this.position[1] += 1;
        return "DOWN";
      }
    }
  }
}
module.exports = CleanerAgent;
