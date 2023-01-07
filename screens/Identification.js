import React from 'react';
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {auth} from "../Firebase"

import {signInWithEmailAndPassword, setPersistence, inMemoryPersistence} from "firebase/auth";
import styles from "../Styles";

const Identification = ({navigation}) => {
    //NB: j'ai ici viré les utilisations abusives du states ci-dessous.
    //const [email,setEmail]=useState("");
    //const[password,setPassword]=useState("");
    let email;
    let password;


    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
       .then(() => {
            navigation.navigate('Home', {password: password});
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Erreur de 'Sign In' :" + errorCode + " : " + errorMessage);
        });
    }

    const _onChangeEmail = (emailText) => {
        email = emailText;
    }

    const _onChangePassword = (passwordText) => {
        password = passwordText;
    }


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


            <Button style={styles.button} onPress={signIn} title={"Login"}/>
            <Button onPress={() => navigation.navigate('Inscription')} containerStyle={styles.button} type="outline"
                    title={"Inscription"}/>
            <View style={{height: 100}}/>
        </View>

    )
        ;

};

export default Identification;
