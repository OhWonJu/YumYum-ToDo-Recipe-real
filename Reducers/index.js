import { MockRecipes, MockToDos } from "../Datas/Mocks";

import RecipesReducer from "./recipes";
import ReviewReducer, { mkReviewState } from "./reviews";

const initialState = () => {
  return { recipes: MockRecipes, currentReview: mkReviewState() };
};

export const reducer = (state = initialState(), action) => {
  let recipes = RecipesReducer(state.recipes, action);

  return {
    recipes: recipes,
    currentReview: ReviewReducer(state.currentReview, action, recipes)
  };
};