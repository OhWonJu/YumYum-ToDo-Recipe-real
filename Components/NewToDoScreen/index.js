// new ToDo를 만드는 화면
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import RecipeModel from '../../Datas/Recipe';
import { addToDo, reviewRecipe } from '../../Actions/creators';
import { connect } from "react-redux";

import Button from "../Button";
import LabeledInput from "../LabeledInput";
import NormalText from "../NormalText";
import colors from "../../Styles/colors";

class NewToDo extends Component {
  static navigationOptions = { title: "Create ToDo" };

  static instialState = { contents: "" };

  constructor(props) {
    super(props);
    this.state = this.instialState;
  }

  _recipe = () => {
    return this.props.navigation.state.params.recipe;
  };
  _recipeID = () => {
    return this.props.navigation.state.params.recipeID; // 해당 경로의 state의 파라메터중 recipeID? 
    // RecipeScreen의 _addToDos 의 params중 하나인 recipeID?
  };

  _handelContents = text => {
      this.setState({ contents: text });
  }

  _handleTimer = text => {
      this.setState({ timer: text });
  }

  _createToDo = () => {
      //this.props.createToDo(this.state.contents, this.state.timer, this._recipeID());
      this.props.createToDo(this.state.contents, this._recipeID());
      this.props.navigation.navigate("ToDoCreation", { recipeID: this._recipeID() });
  }

  /*
  _reviewToDo = () => {
    const refresh = this.props.navigation.state.params.refresh;
    refresh();
    this.props.reviewRecipe(this._recipeID());
    this.props.navigation.navigate("Review", {recipe: this._recipe(), recipeID: this._recipeID()});
  } */

  _doneCreating = () => {
    const refresh = this.props.navigation.state.params.refresh;
    refresh();
    //this.props.navigation.navigate("Home");
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View>
        <LabeledInput
          label="CONTENTS"
          clearOnSubmit={true}
          onEntry={this._handelContents}
          onChange={this._handelContents}
        />

        <Button style={styles.createButton} onPress={this._createToDo}>
          <NormalText>Create ToDo</NormalText>
        </Button>

        <View style={styles.buttonRow}>
          <Button style={styles.secondaryButton} onPress={this._doneCreating}>
            <NormalText>Done</NormalText>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  createButton: { backgroundColor: colors.green },
  secondaryButton: { backgroundColor: colors.blue },
  buttonRow: { 
    flexDirection: 'row', 
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return { recipes: state.recipes };
};

const mapDispatchToProps = dispatch => {
  return {
    //createToDo: (contents, timer, recipeID) => {
    //    dispatch(addToDo(contents, timer, recipeID));
    //}
    createToDo: (contents, recipeID) => {
      dispatch(addToDo(contents, recipeID));
    },
    reviewRecipe: recipeID => {
      dispatch(reviewRecipe(recipeID));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewToDo);