import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import Button from "./../Button";
import NormalText from "./../NormalText";
import Input from "./../Input";

import colors from "../../Styles/colors";

class CreateRecipeButton extends Component {
  render() {
    return (
      <Button style={styles.createRecipe} onPress={this.props.onPress}>
        <NormalText>Create Recipe</NormalText>
      </Button>
      // 해당 버튼을 누르면 상위 컴포넌트에서 상속한 props.onPress가 실행 된다 . 이 경우 {this._showField}
    );
  }
}

class EnterRecipe extends Component { // 레시피의 이름을 입력받고 그것을 인자로 전달하여 레시피를 생성하게 하는 펑션
  constructor(props) {
    super(props);
    this.state = { text: "" };  // 레시피 명 디폴트
  }

  _create = () => {
    this.props.create(this.state.text); // index.js의 _createRecipe에 this.state.text를 인자로 넘긴다
  };

  render() {
    return (
      <View>
        <Input  // TextInput 컴포넌트에 기능을 추가한 컴포넌트
          onEntry={this.props.create}   // index.js의 _createRecipe를 onEntry라는 이름으로 넘긴다.
          // 이 경우 Input에서 입력된 text를 인자로 넘기게 된다.
          onChange={text => {
            this.setState({ text });
            // 현재 state의 text의 상태를 바꾼다 
          }}
        />
        <CreateRecipeButton onPress={this._create} /> 
      </View>
      // 그런 다음 CreacteDeckButton 컴포넌트 생성 누르게 되면 index.js의 _createRecipe 실행
    );
  }
}

const styles = StyleSheet.create({
  createRecipe: { backgroundColor: colors.green }
});

export { CreateRecipeButton, EnterRecipe };