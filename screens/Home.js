import React from 'react';
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput} from 'react-native';
//import {Button, Input, Image} from "react-native-elements"
import {StatusBar} from "expo-status-bar";
import {auth} from "../Firebase"


const Home = ({navigation}) => {
    //NB: j'ai ici viré les utilisations abusives du states ci-dessous.
    //const [email,setEmail]=useState("");
    //const[password,setPassword]=useState("");
    let email;
    let password;

    return (//KeyboardAvoidingView : comportement du clavier

            <View style={styles.container}>
      <Text> Bien inscrit sur Firebase!</Text>
            </View>

    );

};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", //tout est centré
        justifyContent: "center",
        padding: 10,
    },
    inputContainer: {
        marginTop: 50,
        width: 300, //la largeur des cases d'input

    },
    button: {
        width: 200, //largeur des bouttons
        marginTop: 10,
        color: "#99991a",

    },
});