// todos에 대한 실질적인 뷰를 만드는 js 
// ToDo 컴포넌트들을 mapping 한다.
// 구현 목표. Recipe의 todo정보를 받아와 mapping    clear
import React, { Component } from "react";
import { 
  StyleSheet, 
  View, 
  Image, 
  ScrollView, 
  Dimensions, 
  Platform, 
  StatusBar, 
  TouchableOpacity,
  Text 
} from "react-native";

import { connect } from "react-redux";
import ToDoModel from "../../Datas/ToDo";
import ToDo from './RenderToDo';
import colors from "../../Styles/colors";
import { stopReview } from '../../Actions/creators';

import Button from "./../Button";
import NormalText from "./../NormalText";

import { AntDesign } from '@expo/vector-icons';


const { height, width } = Dimensions.get('window')

class ReviewScreen extends Component {
  static displayName = "ReviewScreen";

  static navigationOptions = { 
    headerLeft: <Image 
    source={require('../../Styles/image/dish.png')} 
    style={{width: 40, height: 40}}
    />,
    headerLeftContainerStyle: {paddingLeft: 20},
    headerRight: <View></View>,
    headerRightContainerStyle: {paddingRight: 20},
    title: "My Recipe",
    headerTitleContainerStyle: { justifyContent: 'center', textAlign: 'center'},
    headerStyle: { backgroundColor: "#FFFFFF" }
  };

  constructor(props) {
    super(props);

    this.state = { 
      recipeID: this.props.navigation.state.params.recipeID, 
      todos: this.props.navigation.state.params.recipe.todos,
      editMode: false 
    };
  }

  
  _activateEidtMode = () => {
    if( this.state.editMode ) {
      this.setState({ editMode: false });
    } else {
      this.setState({ editMode: true });
    }
  }
  
  _quitReviewing = () => {
    this.props.stopReview();
    this.props.navigation.goBack();
  };

  _recipe = () => {
    return this.props.navigation.state.params.recipe;
  };

  _refresh = () => {
    this.setState({todos: this.props.navigation.state.params.recipe.todos});
  }

  _addToDos = (recipeID) => {
    this.props.navigation.navigate("ToDoCreation", {recipe: this._recipe(), recipeID: recipeID, refresh: this._refresh});
  };


  render() {
    const { editMode, recipeID } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.title}>{this.props.navigation.state.params.recipe.name}</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity>
              <AntDesign name='edit' size={28} onPress={this._activateEidtMode}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.toDos}>
            {Object.values(this.state.todos).map((todo) => {
              return ( 
                <ToDo 
                  key={todo.id}
                  id={todo.id}
                  contents={todo.contents}
                  quit={this._quitReviewing}
                  editMode={editMode}
                  {...todo} 
                />
              )}
            )}
            {editMode ? (
              <View>
                <Button style={styles.editButton} onPress={() => this._addToDos(recipeID)}>
                  <AntDesign name='pluscircleo' size={28} color='#FFC300'/>
                </Button>
              </View>
            ) : (
              <View></View>
            )}
          </ScrollView>
        </View>
      </View>
    ); 
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center'
  },
  topView: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center'
  },
  title: {
    color: '#000',
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    fontWeight: '200'
  },
  actionContainer: { 
    // margin을 주는 이유. 사람이 아이콘만 누르기 힘들기 때문에 추가 영역을 주는 것
    marginVertical: 10,
    marginHorizontal: 10,
    paddingTop: 20
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25, // 화면의 전체 width 크기 - 25
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //elevation: 5  // 안드로이드 환경에서 쉐도우 생성
    // 플랫폼에 따른 css 선택 구문
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          heigth: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  toDos: {
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: "#fff",
    width: width - 45,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  }
});

const mapDispatchToProps = dispatch => {
  return {
    stopReview: () => {
      dispatch(stopReview());
    }
  };
};

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);