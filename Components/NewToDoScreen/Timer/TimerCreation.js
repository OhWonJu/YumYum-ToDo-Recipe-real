import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';

import { TimerSetterButton, TimerSetter } from './TimerSettingFields';

class TimerCreation extends Component {
    constructor(props) {
        super(props);
        this.state = { showingTimerField: false };
    }

    _setTimer = seconds => {
        //this.setState({ showingTimerField: false });
        this.props.setSeconds(seconds);
    }

    _showField = () => {    // 타이머셋팅을 한다면 
        this.setState({ showingTimerField: true });
        this.props.isTimerTodo(this.state.showingTimerField);
    }

    render() {
        let contents = this.state.showingTimerField 
        ? <TimerSetter setSeconds={this._setTimer} />    // NewToDoScreen의 handleSeconds(콜백)를 넘긴다.
        : <TimerSetterButton onPress={this._showField} />;  // 누르게 되면 타이머를 셋한다고 가정함.

        return contents;
    }
}

export default TimerCreation;