import React, { Component } from 'react';
import {Text,View,TextInput,TouchableOpacity} from 'react-native';
import AppHeader from '../components/AppHeader';
import styles from '../styles';
import firebase from 'firebase';
import db from '../config';

export default class ExchangeScreen extends Component {
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            name:'',
            description:'',
            
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addItems(name,description){
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('Exchange_Request').doc().set({
            "user_id": userId,
            'ItemName':name,
            'Description':description,
            "request_id"  : randomRequestId,
        }).then(function(){
            alert('Your item has been successfully added and it is ready for exchange.');
            this.setState({
                name :'',
                description : ''
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <AppHeader />
                <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'Item Name'}
                    multiline = {true}
                    textAlignVertical = 'top'
                    editable
                    onChangeText={(text)=>{
                        this.setState({
                            name: text
                        })
                    }}
                    value ={this.state.name}
                />
                <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'Item Description'}
                    editable
                    multiline = {true}
                    textAlignVertical = 'top'
                    onChangeText={(text)=>{
                        this.setState({
                            description: text
                        })
                    }}
                    value ={this.state.description}
                />

                <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>{this.addItems(this.state.name,this.state.description)}}
                >
                        <Text style = {styles.buttonText}>Add Items</Text>
                </TouchableOpacity>
            </View>
        )
    }
}