import { REVIEW_RECIPE, STOP_REVIEW, FIND_RECIPE } from "../Actions/types";

export const mkReviewState = (
  recipeID = null,
) => {
  return { recipeID };
};

function findRecipe(recipes, id) {
  return recipes.find(r => {
    return r.id === id;
  });
}

function generateReviews(recipe) {
  return mkReviewState(recipe.id);
}

const reducer = (state = mkReviewState(), action, recipes) => {
  switch (action.type) {
    case REVIEW_RECIPE:
      return generateReviews(findRecipe(recipes, action.data.recipeID));
    case STOP_REVIEW:
      return mkReviewState(); // recipeID 를 null
    case FIND_RECIPE:
      return findRecipe(recipes, action.data.recipeID);
  }
  return state;
};

export default reducer;