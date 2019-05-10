import {
    ADD_RECIPE,
    ADD_TODO,
    REVIEW_RECIPE,
    FIND_RECIPE,
    STOP_REVIEW,
    LOAD_DATA
} from './types';

import ToDo from '../Datas/ToDo';
import Recipe from '../Datas/Recipe';


export const addRecipe = name => {
    return { type: ADD_RECIPE, data: new Recipe(name) };
};
export const addToDo = (contents, recipeID) => {
    return { type: ADD_TODO, data: new ToDo(contents, recipeID) };
};
export const reviewRecipe = recipeID => {
    return { type: REVIEW_RECIPE, data: {recipeID: recipeID} };
};
export const findRecipe = (recipes, recipeID) => {
    return { type: FIND_RECIPE, data: {recipes, recipeID}}
}
export const stopReview = () => {
    return { type: STOP_REVIEW, data: {} };
};
export const loadData = data => {
    return { type: LOAD_DATA, data: data };
}