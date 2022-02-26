
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, TouchableOpacity, Text,
} from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import useToken from "./useToken";
import localData from "./localData";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("u4@gmail.com");
    const [password, setPassword] = useState("pass");
    const [data, setData] = useState([]);
    const {token, removeToken, setToken} = useToken();
    const {currGroup, removeCurrGroup, setCurrGroup, userId, removeUserId, setUserId} = localData();
return (
    
    <View style={styles.container}>
      <Text style={styles.grocyTextHeader}>Login</Text>
      <StatusBar style= "auto" />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        onChangeText={(email) => setEmail(email)}
        value={email}
        textContentType={"emailAddress"}
        autocomplete={"email"}
        keyboardType={"email-address"}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor="#444941"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
      />

      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => {
          fetch('http://192.168.1.159:5000/login', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          })
          .then((response) => {
              if(!response.ok) throw new Error(response.status);
              else return response.json();
          })
          .then((json) => {
            setData(json);
            console.log(data.access_token);
            setToken(data.access_token);
            console.log(userId);
            navigation.navigate("GrocyStack");
          })
          .catch((error) => console.error(error))
        }}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {navigation.navigate("Signup")}}
      >
        <Text style={styles.signUpButton}>Click to Signup</Text>
      </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FC8A9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image :{
      marginBottom: 40,
  },
  textInput: {
    backgroundColor: "#D5EEBB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  signUpButton: {
    height: 30,
    marginBottom: 30,
    color: "floralwhite",
    marginTop: 50,
    fontSize: 15,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#5F7A61",
  },
  grocyTextHeader: {
    color: "floralwhite",
    fontSize: 50,
    textAlign: "center",
    margin: 100,
  },
  loginText: {
    color: "floralwhite",
    fontSize: 20,
  },
});

export default Login;
