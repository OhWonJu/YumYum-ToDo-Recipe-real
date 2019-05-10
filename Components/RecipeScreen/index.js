// 레시피들의 뷰를 생성하는 js
import React, { Component } from "react";
import { View, Image } from "react-native";

import { connect } from 'react-redux';

import { MockRecipes } from '../../Datas/Mocks';
import { addRecipe, reviewRecipe } from '../../Actions/creators';
import Recipe from './Recipe';
import RecipeCreation from './RecipeCreation';

class RecipesScreen extends Component {
  static displayName = "RecipesScreen";

  static navigationOptions = { 
    headerLeft: <Image 
    source={require('../../Styles/image/dish.png')} 
    style={{width: 40, height: 40}}
    />,
    headerLeftContainerStyle: {paddingLeft: 20},
    headerRight: <View></View>,
    headerRightContainerStyle: {paddingRight: 20},
    title: "My Recipes",
    headerTitleContainerStyle: { justifyContent: 'center', textAlign: 'center'},
    headerStyle: { backgroundColor: "#FFFFFF" }
  };
  
  constructor(props) {
    super(props); // 상위 props를 모두 받아온다. 쓰는 이유가 있었는데.. 여튼 모든 저장되는 state는 redux에서 관리
    this.state = { recipees: MockRecipes }; // state에 목업 데이터(더미) 를 recipes라는 state로 받아온다.
  }

  _createRecipe = (name) => {
    let createRecipeAction = addRecipe(name); // type: ADD_RECIPE, data: new Recipe(name) [Datas/Recipe.js]
    this.props.createRecipe(createRecipeAction);  // 액션을 디스패치
    /*
    this.props.navigation.navigate("ToDoCreation", {  // ToDoCreation으로 넘어가게 된다. 이때 레시피 아이디를 넘긴다
      recipeID: createRecipeAction.data.id
    }); */
  }; 

  /*
  _addToDos = (recipe, recipeID) => {
    this.props.navigation.navigate("ToDoCreation", {recipe: recipe, recipeID: recipeID});
  }; */

  _review = (recipe, recipeID) => { // 레시피 내부를 보겠다는 것
    this.props.reviewRecipe(recipeID);
    this.props.navigation.navigate("Review", {recipe: recipe, recipeID: recipeID}); // navigation.navigate(routeName, params, action)
  };

  _mkRecipeViews() {  // 직접적인 레시피에 대한 뷰를 만드는 평션
    if (!this.props.recipes) {  // 레시피에 대한 정보가 없을 경우
      return null;
    }

    return this.props.recipes.map(recipe => { // 레시피에 대한 정보가 있을 경우 모든 레시피를 맵핑해서 뷰를 구현
      return (
      <Recipe // 개별적인 레시피 컴포넌트를 리턴
        recipe={recipe} // 맵핑된 레시피 정보를 바탕으로 레시피 컴포넌트 생성 [/Datas/Mocks]에서 온다 즉 Datas/Recipe.js 인 셈
        key={recipe.id}
        review={() => {
          this._review(recipe, recipe.id);
        }}
        />
      );
    });
  }

  render() {
    return (
      <View>
        {this._mkRecipeViews()}
        <RecipeCreation create={this._createRecipe} /> 
      </View>
      // RecipeCreation에 create{this._crateRecipe} 속성을 props로 넘긴다. 
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRecipe: recipeAction => {  // createRecipeAction 를 인자로 넘김
      dispatch(recipeAction);
    },
    reviewRecipe: recipeID => {
      dispatch(reviewRecipe(recipeID));
    }
  };
};
const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesScreen);