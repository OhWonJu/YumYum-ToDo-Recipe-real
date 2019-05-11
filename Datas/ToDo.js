import md5 from "md5";

class ToDo {
  constructor(contents, isTimer, second, recipeID) {
    this.contents = contents;
    this.isTimer = isTimer;
    this.second = second
    this.recipeID = recipeID;
    this.id = md5(contents + isTimer + second + recipeID);
  }

  setFromObject(ob) {
    this.contents = ob.contents;
    this.isTimer = ob.isTimer;
    this.second = ob.second;
    this.recipeID = ob.recipeID;
    this.id = ob.id;
  }

  static fromObject(ob) {
    //let t = new Card(ob.contents, ob.timer, ob.recipeID);
    let t = new ToDo(ob.contents, ob.isTimer, ob.second, ob.recipeID);
    t.setFromObject(ob);
    return t;
  }
}

export default ToDo;