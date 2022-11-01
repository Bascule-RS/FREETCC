import React, {useLayoutEffect} from 'react';
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, Button , KeyboardAvoidingView} from 'react-native';
//import {Button, Input, Image} from "react-native-elements"
import {StatusBar} from "expo-status-bar";
import {auth} from "../Firebase";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {db} from "../Firebase";
import {getDatabase, ref, child, get, set} from "firebase/database";
//import {objet_global} from "./Home";

const GraphInput = ({navigation, route}) => {


    return (//KeyboardAvoidingView : comportement du clavier

        <View style={styles.container}>
            <KeyboardAvoidingView>


                <Button containerStyle={styles.button} onPress={() => navigation.navigate('Home')}
                        containerStyle={styles.button}
                        title={"Retour Home"}/>
                <Button containerStyle={styles.button} onPress={()=>navigation.navigate('PointInput')}
                        containerStyle={styles.button}
                        title={"Nouveau Point"}/>
            </KeyboardAvoidingView>
            <Text> Graph1:</Text>

        </View>

    );

};

export default GraphInput;

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