import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
        }
    }

    LoginDetails = async(email, password)=>{
        if(email && password){
            try{
                const response = firebase.auth().signInWithEmailAndPassword(email, password)
                if(response){
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        alert("User does not exist")
                        console.log("Doesn't exist")
                        break
                    case 'auth/invalid-email':
                        alert("Incorrect Email Id or password")
                        console.log("Invalid email id")
                        break
                }
            }
        }
        else{
            alert("Enter your email id and password")
        }
    }


  render() {
      return (
        <KeyboardAvoidingView style={styles.container}>
            <View>

            <Image 
            style={{alignSelf:"center", width:250, height:250}}
            source={require('../assets/booklogo.jpg')}
            />

            <TextInput 
                style={styles.textInputView}
                placeholder="User name"
                keyboardType="email-address"
                onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                }}
            />
            
            <TextInput 
                style={styles.textInputView}
                placeholder="Password"
                secureTextEntry = {true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}
            />

            <TouchableOpacity
            style = {styles.navigator}
            onPress={()=>{this.LoginDetails(this.state.emailId, this.state.password)}}>
                <Text>Login</Text>
            </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    );
  }
  }
  
  
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 20,
        backgroundColor:"pink",
        padding:50
      },
      textInputView:{
          width:250,
          backgroundColor:'lightblue',
          alignSelf:"center",
          marginTop:50,
          height:30,
          padding:20,
          borderRadius:20
      },
      navigator:{
          border:'2px solid black',
          width:100,
          alignSelf:"center",
          alignItems:"center",
          marginTop:50,
          padding:5,
          borderRadius:20,
          backgroundColor:"orange"
      }
    })