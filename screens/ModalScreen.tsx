import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet,TextInput,TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { useNavigation } from '@react-navigation/core';


export default function ModalScreen() {
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [error,setError]=React.useState('');
  const [message,setMessage]=React.useState('');
  const navigation=useNavigation();
    
  const registerUrl="";
  const loginUrl="";


  const onLoginIN =() =>{
    if(email.trim()==='' || password.trim()==='')
    {
      setError('all fields need to be filled');
    }

    const requestConfig={
      headers:{
        'x-api-key':""
      }
    }


    const requestBody={
      "name":email,
      "password":password

    }

    axios.post(loginUrl,requestBody,requestConfig)
    .then(response=>{
        token=response.data.token;
        consumername=response.data.user;
      console.log(token);
      console.log(consumername);
      setMessage('login up successful');
      setError('');

    }).catch(error => {
        if(error.response.status===401)
        { 
          setError(error.response.data.message);
        }
        else
        {
          setError('there is some server issue');
        }

    })


   

  }   

  const onSignUP = () =>{
    
    if(email.trim()==='' || password.trim()==='')
    {
      setError('all fields need to be filled');
    }
    

    const requestConfig={
      headers:{
        'x-api-key':"your api key for APIGateway"
      }
    }


    const requestBody={
      "name":email,
      "password":password

    }

    axios.post(registerUrl,requestBody,requestConfig)
    .then(response=>{
      setMessage('sign up successful');
      setError('');

    }).catch(error => {
        if(error.response.status===401)
        { 
          setError(error.response.data.message);
        }
        else
        {
          setError('there is some server issue');
        }

    })



   

  }
  const renderView = ()=>{
      if (token==='') {
        return(
        
          <View style={styles.container}>
          <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Email..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => setEmail(text) }/>
            </View>
    
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Password..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => setPassword(text) }/>
            </View>
     
            <Text style={{color:'green',padding:25,}} >{message}</Text>
     
            <Text style={{color:'red',padding:25,}} >{error}</Text>
     
    
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.loginBtn}  onPress={onSignUP}>
              <Text style={styles.loginText}>SIGNUP</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.loginBtn}  onPress={onLoginIN}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            </View>

        );
      } else {
        return (
          <View style={styles.container}>
       
          <Text>ALready logged in</Text>
          </View>
        );
      }
    


  }



  return (
          renderView()
         
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  logo:{
  fontSize:25,
  fontWeight:'bold',
  paddingBottom:25

  }


});