import ToDoModel from './ToDo';
import RecipeModel, { addToDo } from './Recipe';

let MockToDos = [
  new ToDoModel("1. Ingredient: Sin Ramen and Egg",),
  new ToDoModel("2. Boiling 500ml water: 03:30",),
  new ToDoModel("3. Put en egg in the water and Boiling: 00:30",),
  new ToDoModel("4. Put a Ramen in a bowl",),
  new ToDoModel("5. Enjoy 🍜",)
];

let MockToDo = MockToDos[0];
let MockRecipes = [new RecipeModel("1. RAMEN"), new RecipeModel("2. BULLDARK RAMEN")];

MockRecipes.map(recipe => {
  recipe.addToDo(new ToDoModel("1. Ingredient: Sin Ramen and Egg", recipe.id)),
  recipe.addToDo(new ToDoModel("2. Boiling 500ml water: 05:00", recipe.id)),
  recipe.addToDo(new ToDoModel("3. Put the Soup and Noodles in the water and Boiling: 03:30", recipe.id)),
  recipe.addToDo(new ToDoModel("4. Put an egg in the water and Boiling: 00:30", recipe.id)),
  recipe.addToDo(new ToDoModel("5. Put a Ramen in a bowl", recipe.id)),
  recipe.addToDo(new ToDoModel("6. Enjoy 🍜", recipe.id))
  return recipe;
});

let MockRecipe = MockRecipes[0];

export { MockToDos, MockToDo, MockRecipes, MockRecipe };