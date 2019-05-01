import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Logo from "./Components/Header/Logo";
import DeckScreen from "./Components/DeckScreen";
import NewCardScreen from "./Components/NewCardScreen";
import ReviewScreen from "./Components/ReviewScreen";

let headerOptions = {
  headerStyle: { backgroundColor: "#FFFFFF" },
  headerLeft: <Logo />
};

let navigator = createStackNavigator({
  Home: { screen: DeckScreen, navigationOptions: headerOptions },
  Review: { screen: ReviewScreen, navigationOptions: headerOptions },
  CardCreation: { screen: NewCardScreen, navigationOptions: headerOptions }
});
let AppContainer = createAppContainer(navigator);

export default AppContainer;