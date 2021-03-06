import React,{Component}from 'react';
import {View,Text,TextInput,Modal,KeyboardAvoidingView,Image,TouchableOpacity,Alert,ScrollView} from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';
import firebase from 'firebase';
import styles from '../styles';

export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false',
      isModalVisibleL:'false',
      img:'data:image/jpeg;base64,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'
    }
  }

    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
        return Alert.alert("Password doesn't match\nCheck your password.")
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailId, password).then(()=>{
            db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                contact:this.state.contact,
                email_id:this.state.emailId,
                address:this.state.address
            })
            return  Alert.alert(
                'User Added Successfully',
                '',
                [
                {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                ]
            );
            }).catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            });
        }
    }

    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
        Alert.alert("Successfully Login");
        this.props.navigation.navigate('Home');
    }).catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    });
    }

    showModalLogin = ()=>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisibleL}
            >   
            <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView>
                    <Text
                        style={styles.modalTitle}
                    >LOGIN</Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Email"}
                        keyboardType ={'email-address'}
                        onChangeText={(text)=>{
                            this.setState({
                            emailId: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Password"}
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                                password: text
                            })
                        }}
                    />
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={()=>
                            this.userLogin(this.state.emailId, this.state.password)
                        }
                    >
                    <Text style={styles.registerButtonText}>Login</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={()=>this.setState({"isModalVisibleL":false})}
                    >
                    <Text style={{color:'#FE7F2D',fontWeight:'bold'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                </View>
            </Modal>
        )
    }

    showModal = ()=>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView>
                    <Text
                        style={styles.modalTitle}
                    >REGISTRATION</Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"First Name"}
                        maxLength ={8}
                        onChangeText={(text)=>{
                            this.setState({
                            firstName: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Last Name"}
                        maxLength ={8}
                        onChangeText={(text)=>{
                            this.setState({
                            lastName: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Contact"}
                        maxLength ={10}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{
                            this.setState({
                            contact: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Address"}
                        multiline = {true}
                        onChangeText={(text)=>{
                            this.setState({
                            address: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Email"}
                        keyboardType ={'email-address'}
                        onChangeText={(text)=>{
                            this.setState({
                            emailId: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Password"}
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                            password: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Confrim Password"}
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                            confirmPassword: text
                            })
                        }}
                    />
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={()=>
                            this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                        }
                    >
                    <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={()=>this.setState({"isModalVisible":false})}
                    >
                    <Text style={{color:'#FE7F2D',fontWeight:'bold'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                </View>
            </Modal>
        )
    }
    render(){
        return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>

            </View>
            {
                this.showModal()
            }
            {
                this.showModalLogin()
            }
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <AppHeader />
                <Image source={{uri:this.state.img}} style={{width:350, height:200}} />
            </View>
            <View>
            <TouchableOpacity
                style={[styles.button,{marginBottom:20, marginTop:20}]}
                onPress = {()=>{
                    this.setState({
                        isModalVisibleL:true,
                    })
                }}
            >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={()=>
                    this.setState({
                        isModalVisible:true,
                    })
                }
            >
            <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
        </View>
        </View>
        )
    }
}