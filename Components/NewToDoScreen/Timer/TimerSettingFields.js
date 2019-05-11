import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { WheelPicker } from 'react-native-wheel-picker-android';

import Button from '../../Button';
import NormalText from '../../NormalText';
import Input from '../../Input';

import colors from '../../../Styles/colors';

class TimerSetterButton extends Component {
  render() {
    return (
      <Button style={styles.createTimer} onPress={this.props.onPress}>
        <NormalText>Timer ON</NormalText>
      </Button>
    );
  }
}

const minuteData = [ 
{'00': 0 }, {'01': 1 }, {'02': 2 }, {'03': 3 }, {'04': 4 }, {'05': 5 }, {'06': 6 }, {'07': 7 }, {'08': 8 }, {'09': 9 }, 
{'10': 10 }, {'11': 11 }, {'12': 12 }, {'13': 13 }, {'14': 14 }, {'15': 15 }, {'16': 16 }, {'17': 17 }, {'18': 18 }, {'19': 19 }, 
{'20': 20 }, {'21': 21 }, {'22': 22 }, {'23': 23 }, {'24': 24 }, {'25': 25 }, {'26': 26 }, {'27': 27 }, {'28': 28 }, {'29': 29 },
{'30': 30 }, {'31': 31 }, {'32': 32 }, {'33': 33 }, {'34': 34 }, {'35': 35 }, {'36': 36 }, {'37': 37 }, {'38': 38 }, {'39': 39 },
{'40': 40 }, {'41': 41 }, {'42': 42 }, {'43': 43 }, {'44': 44 }, {'45': 45 }, {'46': 46 }, {'47': 47 }, {'48': 48 }, {'49': 49 },
{'50': 50 }, {'51': 51 }, {'52': 52 }, {'53': 53 }, {'54': 54 }, {'55': 55 }, {'56': 56 }, {'57': 57 }, {'58': 58 }, {'59': 59 },
{'60': 60 }
]
const secondData = [ 
  {'00': 0 }, {'05': 5 }, {'10': 10 }, {'15': 15 }, {'20': 20 }, {'25': 25 }, 
  {'30': 30 }, {'35': 35 }, {'40': 40 }, {'45': 45 }, {'50': 50 }, {'55': 55 }, 
  ]
/*
const secondData = [ 
  {'00': 0 }, {'01': 1 }, {'02': 2 }, {'03': 3 }, {'04': 4 }, {'05': 5 }, {'06': 6 }, {'07': 7 }, {'08': 8 }, {'09': 9 }, 
  {'10': 10 }, {'11': 11 }, {'12': 12 }, {'13': 13 }, {'14': 14 }, {'15': 15 }, {'16': 16 }, {'17': 17 }, {'18': 18 }, {'19': 19 }, 
  {'20': 20 }, {'21': 21 }, {'22': 22 }, {'23': 23 }, {'24': 24 }, {'25': 25 }, {'26': 26 }, {'27': 27 }, {'28': 28 }, {'29': 29 },
  {'30': 30 }, {'31': 31 }, {'32': 32 }, {'33': 33 }, {'34': 34 }, {'35': 35 }, {'36': 36 }, {'37': 37 }, {'38': 38 }, {'39': 39 },
  {'40': 40 }, {'41': 41 }, {'42': 42 }, {'43': 43 }, {'44': 44 }, {'45': 45 }, {'46': 46 }, {'47': 47 }, {'48': 48 }, {'49': 49 },
  {'50': 50 }, {'51': 51 }, {'52': 52 }, {'53': 53 }, {'54': 54 }, {'55': 55 }, {'56': 56 }, {'57': 57 }, {'58': 58 }, {'59': 59 },
  ] */

class TimerSetter extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedMItem: 0, selectedSItem: 0,minute: 0, second: 0 };
  }

  _reset = () => {
    this.setState({ selectedMItem: 0 });
    this.setState({ selectedSItem: 0 });
  }

  _onItemSelected = selectedItem => {
    this.setState({ selectedItem })
  }

  _onMinuteSelected = (m) => {
    this.setState({minute: m});
  }
  _onSecondSelected = (s) => {
    this.setState({secomd: s});
  }

  _set = () => {
    this.setState({minute: minuteData[selectedMItem].value});
    this.setState({second: secondData[selectedSItem].value});
    this.props.setSeconds(this.state.minute * 60 + this.state.second);
    this._reset;
  };

  render() {
    return(
      <View style={styles.container}>
        <WheelPicker 
          selectedItem={this.state.minute}
          data={minuteData}
          onItemSelected={this._onItemSelected}
        />
        <WheelPicker 
          selectedItem={this.state.second}
          data={secondData}
          onItemSelected={this._onItemSelected}
        />
        <Button style={styles.createTimer} onPress={this._set}>
          <NormalText>Set</NormalText>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  createTimer: { backgroundColor: colors.green }
});

export { TimerSetterButton, TimerSetter };