import md5 from "md5";

class ToDo {
  constructor(contents, recipeID) {
    this.contents = contents;
    //this.timer = timer;
    this.recipeID = recipeID;
    this.id = md5(contents + recipeID);
  }

  setFromObject(ob) {
    this.contents = ob.contents;
    //this.timer = ob.timer;
    this.recipeID = ob.recipeID;
    this.id = ob.id;
  }

  static fromObject(ob) {
    //let t = new Card(ob.contents, ob.timer, ob.recipeID);
    let t = new ToDo(ob.contents, ob.recipeID);
    t.setFromObject(ob);
    return t;
  }
}

export default ToDo;