import {
    ADD_RECIPE,
    ADD_TODO,
    REVIEW_RECIPE,
    FIND_RECIPE,
    STOP_REVIEW,
    START_TIMER,
    RESTART_TIMER,
    LOAD_DATA
} from './types';

import ToDo from '../Datas/ToDo';
import Recipe from '../Datas/Recipe';


export const addRecipe = name => {
    return { type: ADD_RECIPE, data: new Recipe(name) };
};
export const addToDo = (contents, isTimer, second, recipeID) => {
    return { type: ADD_TODO, data: new ToDo(contents, isTimer, second, recipeID) };
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
export const startTimer = () => {
    return { type: START_TIMER };
};
export const restartTimer = () => {
    return {type: RESTART_TIMER};
};
export const loadData = data => {
    return { type: LOAD_DATA, data: data };
};