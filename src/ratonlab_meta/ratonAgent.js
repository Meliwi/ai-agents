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
     * In this array we'll save the corresponding distances of each possible box the
     * mouse can go
     */
    this.distances = [];
  }

  setup(state0) {
    this.x = state0.raton.x;
    this.y = state0.raton.y;
    this.queso0 = state0.queso;
  }

  /**
   * We override the send method.
   * In this case, the state is just obtained as the join of the perceptions
   */
  send() {
    console.log(this.queso0.x);
    //This is the case when the mouse takes the cheese
    if (this.perception[4] == 1) {
      return "TAKE";
    }
    /*
        These are the cases when that box indicated is free and the mouse hasn't 
        passed by through by that box.
    */
    if (this.perception[0] == 0 && this.oldPositionX !== this.x - 1) {
      this.ways.push("LEFT");
    }
    if (this.perception[1] == 0 && this.oldPositionY !== this.y - 1) {
      this.ways.push("UP");
    }
    if (this.perception[2] == 0 && this.oldPositionX !== this.x + 1) {
      this.ways.push("RIGHT");
    }
    if (this.perception[3] == 0 && this.oldPositionY !== this.y + 1) {
      this.ways.push("DOWN");
    }
    /**
     * These are the cases when the mouse falls in an alley and needs to turn back, since it's
     * their only option.
     */
    if (this.ways.length === 0) {
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
    }

    for (var i = 0; i < this.ways.length; i++) {
      switch (this.ways[i]) {
        case "LEFT":
          this.distances.push(Math.abs(this.queso0.x - (this.x - 1)));
          break;
        case "UP":
          this.distances.push(Math.abs(this.queso0.y - (this.y - 1)));
          break;
        case "RIGHT":
          this.distances.push(Math.abs(this.queso0.x - (this.x + 1)));
          break;
        case "DOWN":
          this.distances.push(Math.abs(this.queso0.y - (this.y + 1)));
          break;
      }
    }
    let minIndex = this.distances.indexOf(Math.min.apply(null, this.distances));
    let action = this.ways[minIndex];
    if (action == "LEFT") {
      /*
       * here, we save the actual position before we change the position of mouse.
       */
      this.oldPositionX = this.x;
      this.oldPositionY = this.y;
      this.x -= 1;
      this.ways = [];
      this.distances = [];
      return "LEFT";
    }

    //In this case the mouse goes up
    if (action == "UP") {
      this.oldPositionX = this.x;
      this.oldPositionY = this.y;
      this.y -= 1;
      this.ways = [];
      this.distances = [];
      return "UP";
    }

    //In this case the mouse goes right
    if (action == "RIGHT") {
      this.oldPositionX = this.x;
      this.oldPositionY = this.y;
      this.x += 1;
      this.ways = [];
      this.distances = [];
      return "RIGHT";
    }
    //In this case the mouse goes down
    if (action == "DOWN") {
      this.oldPositionX = this.x;
      this.oldPositionY = this.y;
      this.y += 1;
      this.ways = [];
      this.distances = [];
      return "DOWN";
    }
  }
}

module.exports = CleanerAgent;
