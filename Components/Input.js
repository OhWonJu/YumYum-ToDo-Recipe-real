import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import colors from "./../Styles/colors";
import { fonts } from "./../Styles/fonts";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  _create = () => {
    this.props.onEntry(this.state.text); // onEntry라는 이름으로 넘겨진 펑션에 this.state.text의 데이터를 인자로 넘긴다
    this.setState({ text: "" });
  };

  _onSubmit = ev => {
    this.props.onEntry(ev.nativeEvent.text);
    if (this.props.clearOnSubmit) {
      this.setState({ text: "" });
    }
  };

  _onChange = text => { // 텍스트를 인자로 받고
    this.setState({ text: text }); // 해당 텍스트를 state
    if (this.props.onChange) {  // 
      this.props.onChange(text);
    }
  };

  render() {
    return (
      <TextInput
        style={[
          styles.nameField,
          styles.wideButton,
          fonts.normal,
          this.props.style
        ]}
        ref="newDeckInput"
        multiline={false}
        autoCorrect={false}
        onChangeText={this._onChange} // 텍스트 입력이 변경 될 때마다 호출 되는 콜백에 this._onChange를 넘긴다.
        onSubmitEditing={this._onSubmit}
      />
    );
  }
}

// Default props are used if not otherwise specified
Input.defaultProps = { clearOnSubmit: true };

export default Input;

const styles = StyleSheet.create({
  nameField: { backgroundColor: colors.tan, height: 60 },
  wideButton: { justifyContent: "center", padding: 10, margin: 10 }
});