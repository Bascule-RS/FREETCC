import React from 'react';
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput,Button,Image} from 'react-native';

import {StatusBar} from "expo-status-bar";
import {auth } from "../Firebase"
//import {createUserWithEmailAndPassword } from "firebase/auth";
import {
    getAuth,
    createUserWithEmailAndPassword,
    inMemoryPersistence,
    setPersistence,
    signInWithEmailAndPassword
} from "firebase/auth";
import styles from "../Styles";

const Inscription = ({navigation}) => {
    //NB: j'ai ici viré les utilisations abusives du states ci-dessous.
    //const [email,setEmail]=useState("");
    //const[password,setPassword]=useState("");
    let email;
    let password;

    const register = () => {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log("********Inscritption Réussie*********");
            console.log("********userCredential.user:*********");
            console.log(userCredential.user);
            navigation.navigate('Home', {password : password});
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("L'erreur de creation d'utilisateur est :"+ errorCode +" "+ errorMessage);
            // ..
        });
}



    const _onChangeEmail = (emailText) => {
        email = emailText;
    }

    const _onChangePassword = (passwordText) => {
        password = passwordText;
    }

               // navigation.navigate({name :"Home", params:{passwordVar : password}});

    return (//KeyboardAvoidingView : comportement du clavier



        <View>
            <View style={styles.image}>

                <Image source={require('../images/FREETCCLOGO.png',)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Email" autoFocus type="email" value={email}
                           onChangeText={(emailText) => _onChangeEmail(emailText)}/>
                <TextInput placeholder="Password" secureTextEntry type="password" value={password}
                           onChangeText={(passwordText) => _onChangePassword(passwordText)}/>
            </View>


            <Button containerStyle={styles.button} onPress={register} title={"inscription"}/>
            <View style={{height: 100}}/>
        </View>


    );

};
export default Inscription;
