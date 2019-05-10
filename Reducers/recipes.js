import { ADD_RECIPE, ADD_TODO, LOAD_DATA } from "../Actions/types";
import Recipe from "../Datas/Recipe";
import { writeRecipes } from "../Storage/recipes";

function RecipesWithNewToDo(oldRecipes, todo) {
  let newState = oldRecipes.map(recipe => {
    if (recipe.id === todo.recipeID) {
      recipe.addToDo(todo);
      return recipe;
    } else {
      return recipe;
    }
  });
  saveRecipes(newState);
  return newState;
}

function saveRecipes(state) {
  writeRecipes(state);
  return state;
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_DATA:
      return action.data;
    case ADD_RECIPE:
      let newState = state.concat(action.data);
      saveRecipes(newState);
      return newState;
    case ADD_TODO:
      return RecipesWithNewToDo(state, action.data);

  }
  return state;
};

export default reducer;