import { AsyncStorage } from "react-native";
//import Deck from "../Datas/Deck";
import Recipe from '../Datas/Recipe';
//export const DECK_KEY = "App:decks";
export const RECIPE_KEY = 'App:recipes';
//import { MockDecks } from "../Datas/Mocks";
import { MockRecipes } from '../Datas/Mocks';

async function read(key, deserializer) {
  try {
    let val = await AsyncStorage.getItem(key);
    if (val !== null) {
      let readValue = JSON.parse(val).map(serialized => {
        return deserializer(serialized);
      });
      return readValue;
    } else {
      console.info(`${key} not found on disk.`);
      return [];
    }
  } catch (error) {
    console.warn("AsyncStorage error: ", error.message);
  }
}

async function write(key, item) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error("AsyncStorage error: ", error.message);
  }
}

export const readRecipes = () => {
  return read(RECIPE_KEY, Recipe.fromObject);
};

export const writeRecipes = recipes => {
  return write(RECIPE_KEY, recipes);
};

// For debug/test purposes.
const replaceData = writeRecipes(MockRecipes);