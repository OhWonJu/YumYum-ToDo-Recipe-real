import React, { Component } from "react";
import { 
View, 
Text, 
Image,
TouchableOpacity, 
StyleSheet,
Dimensions, 
TextInput
} from "react-native"; 

import PropTypes from "prop-types"; // prop 검증을 위해 import 했다.

// Dimensions.get('window'); 를 통해 화면의 크기를 가져온다
const { width, height } = Dimensions.get('window');

export default class renderToDo extends Component{
  constructor(props){ // App.js에서 보낸 props를 ??
    super(props); // 상위의  props를 받아오는겨 ?
    this.state = {
      // todo.js는 두가지 state를 가진다
      // 1. 수정 state  
      // 2. 일반 state
      isEditing: false, // 디폴트로 일반 state 
      // 투두리스트 단계의 완료 여부를 확인 하는 state
      isCompleted: false,
      toDoValue: this.props.contents // editing check시 해당 텍스트를 복사하여 state에 보내기 위해
    };
  }
  
  static propTypes = { // prop의 type을 static하기 위해 == 타입지정
    contents: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }; 

  render() {
    const { isEditing, toDoValue, isCompleted } = this.state;
    const { contents, id, editMode } = this.props; // 텍스트를 받아와 TODO를 만들기
    //console.log(id);
    //console.log(contents);
    return(
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput 
              style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]} 
              value={toDoValue} 
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={'done'}
              onBlur={this._finishEditing} // 해당 todo 리스트를 나가면 편집 종료
            />
          ) : (
            <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
              {contents}
            </Text> 
          )}
        </View>
        {this._editView(editMode, isEditing)}
      </View>
    );
  }

  _editView = (editMode, isEditing) => {
    if(editMode) {
      return(
        isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✔</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity >
              <View style={styles.actionContainer}>
                <Image 
                source={require('../../Styles/image/alarm-clock.png')} 
                style={{width: 18, height: 17, paddingTop: 18}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={(event) => {event.stopPropagation;}}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      ) 
    } else {
      return (
        <View><Text>Tic Toc!</Text></View>
      )
    }
  }

  _toggleComplete = () => {
    if(this.state.isCompleted){
      this.setState({isCompleted: false});
    } else {
      this.setState({isCompleted: true});
    }
  };
  // 연필 이모지를 눌렀을 때 수정 모드
  _startEditing = (event) => {
    event.stopPropagation(); 
    //const { text } = this.props;  // 다 상위 state에서 받아왔기 때문에 필요없음
    this.setState({
      isEditing: true
      //toDoValue: text // App.js <TODO text={""}/> 로 부터 온 props를 state에 복사
    });
  };
  // 체크 이모지를 눌렀을 때 수정 모드 종료
  _finishEditing = (event) => {
    event.stopPropagation(); 
    const { changedText } = this.state;
    const { id } = this.props;
    this.setState({
      isEditing: false,
      toDoValue: changedText
    });
  };
  _controlInput = (text) => {
    this.setState({ toDoValue: text });
  };
};

const styles = StyleSheet.create({
  // 컨테이너는 하나의 투두
  container: {
    width: width - 50,
    borderBottomColor: '#BBB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // 하나의 투두안에 컬럼형식으로 섹션을 나눔
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2.2,
    //justifyContent: 'space-between'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15, // 원이 되기 위해서는 width, height의 반 값
    borderWidth: 2,
    marginRight: 20
  },
  completedCircle: {
    borderColor: '#bbb'
  },
  uncompletedCircle: {
    borderColor: '#FFC300'
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through'
  },
  uncompletedText: {
    color: '#353535'
  },
  actions: {
    flexDirection: 'row'
  },
  actionContainer: { 
    // margin을 주는 이유. 사람이 아이콘만 누르기 힘들기 때문에 추가 영역을 주는 것
    marginVertical: 8,
    marginHorizontal: 8
  },
  input: {
    width: width / 2,
    marginVertical: 17.5,
  }
});