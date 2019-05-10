// 레시피의 생성을 컨트롤하는 js
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { CreateRecipeButton, EnterRecipe } from "./RecipeCreationFields";

class RecipeCreation extends Component {
  constructor(props) {
    super(props);
    this.state = { showingNameField: false };
  }

  _newRecipe = name => {
      this.setState({ showingNameField: false });
      this.props.create(name); // index.js의 _createRecipe를 호출 name에 해당하는 Recipe를 생성
  }

  _showField = () => {
    this.setState({ showingNameField: true });
  };

  render() {
    let contents = this.state.showingNameField // false or true it's mean is 레시피명이 입력 됬는지 안됬는지?
    // 즉 이름 입력받고 레시피를 생성하고 그 레시피에 들어간다.
      ? <EnterRecipe create={this._newRecipe} />  // 입력 된 경우 -> 만들어진 레시피 내부로 들어간다.
      : <CreateRecipeButton onPress={this._showField} />;   // 입력 되지 않은 경우 -> createRecipeButton 컴포넌트 생성
      // onPress하면 true 로 state 변경
    return contents;
  }
}

export default RecipeCreation;