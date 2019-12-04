import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get('window')

export default class ToDo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    };


    render () {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;
        return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View 
                    style={[
                        styles.circle,
                        isCompleted ? styles.completedCircle : styles.uncompletedCircle
                        ]}>
                    </View>
                </TouchableOpacity>
                {isEditing ? (
                <TextInput 
                    style={[
                        styles.input, 
                        styles.text,
                        isCompleted ? styles.completedText : styles.uncompletedText
                    ]} 
                    value = {toDoValue}
                    multiline = {true}
                    onChangeText = {this._controllInput}
                    returnKeyType = {'done'}
                    onBlur = {this._finishEditing}
                />
                ): (
                    <Text style={[
                        styles.text, 
                        isCompleted ? styles.completedText : styles.uncompletedText
                        ]}>
                    </Text>
                )}
            </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style = {styles.actionText}>✔</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style = {styles.actionText}>✏</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style = {styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
        </View>
        )
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        });
    }
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    }
    _controllInput = text => {
        this.setState({toDoValue : text});
    }
}

const styles = StyleSheet.create({
    container: {
        width : '100%',
        borderBottomColor: "#f5f5f5",
        borderBottomWidth: 1,
        flexDirection : "row",
        alignItems: "center",
        justifyContent : "space-between"

    },
    text: {
        fontWeight: "600",
        fontSize : 20,
        marginVertical : 20,
        color:'red',
        width : width / 2 
    },
    circle: {
        width : 30,
        height : 30,
        borderRadius : 15,
        borderWidth : 5,
        marginRight : 20
    },
    completedCircle : {
        borderColor: "#ffb3b9"
    },
    uncompletedCircle : {
        borderColor: "#ff3848"
    },
    completedText : {
        color:"#a6a6a6",
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: "#2d2d2d"
    },
    column: {
        width : width / 2,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : "space-between"
    },
    actions: {
        flexDirection : "row"
    },
    actionContainer : {
        marginVertical : 10,
        marginHorizontal : 10,
    },
    actionText : {
        fontSize : 20
    },
    input : {
        //marginVertical : 15,
        width : width /2 

    }

})