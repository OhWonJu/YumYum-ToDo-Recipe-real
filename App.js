import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './Reducers/index';

import { readRecipes } from './Storage/recipes';
import { loadData } from './Actions/creators';

import Logo from "./Components/Header/Logo";
//import DeckScreen from "./Components/DeckScreen";
import RecipeScreen from './Components/RecipeScreen';
//import NewCardScreen from "./Components/NewCardScreen";
import NewToDoScreen from './Components/NewToDoScreen';
//import ReviewScreen from "./Components/ReviewScreen";
import ReviewScreen from './Components/ReviewScreen';

let store = createStore(reducer);

readRecipes().then(recipes => {
  store.dispatch(loadData(recipes));
})

let headerOptions = {
  headerStyle: { backgroundColor: "#FFFFFF" },
  headerLeft: <Logo />
};

const navigator = createStackNavigator({
  Home: { screen: RecipeScreen },
  Review: { screen: ReviewScreen },
  ToDoCreation: { 
    screen: NewToDoScreen,
    paths: "createToDo/:recipeID", 
    navigationOptions: headerOptions }
});
const AppContainer = createAppContainer(navigator);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;