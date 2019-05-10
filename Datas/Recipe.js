import md5 from "md5";

class Recipe {
  constructor(name) {
    this.name = name;
    this.id = md5("recipe:" + name);
    this.todos = [];  // todo를 array형식으로 가진다. 즉 레시피만 저장하면 todo도 저장된다는 것.
  }

  setFromObject(ob) {
    this.name = ob.name;
    this.todos = ob.todos;
    this.id = ob.id;
  }

  static fromObject(ob) {
    let r = new Recipe(ob.name);
    r.setFromObject(ob);
    return r;
  }

  addToDo(todo) {
    this.todos = this.todos.concat(todo);
  }
}

export default Recipe