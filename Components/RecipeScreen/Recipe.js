import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import RecipeModel from "../../Datas/Recipe";
import Button from "./../Button";
import NormalText from "./../NormalText";
import colors from "../../Styles/colors";

class Recipe extends Component {
  static displayName = "Recipe";

  _review = () => {
    this.props.review();
  };

  /*
  _addToDos = () => {
    this.props.add();
  }; */

  render() {
    return (
      <View style={styles.recipeGroup}>
        <Button style={styles.recipeButton} onPress={this._review}>
          <NormalText>
            {this.props.recipe.name}
          </NormalText>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recipeGroup: {
    flexDirection: "row",
    alignItems: "stretch",
    padding: 10,
    marginBottom: 5
  },
  recipeButton: { backgroundColor: colors.pink, padding: 10, margin: 0, flex: 1 },
  editButton: {
    width: 60,
    backgroundColor: colors.pink2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 0,
    flex: 0
  }
});

export default Recipe;