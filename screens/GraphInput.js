import React, {useLayoutEffect} from 'react';
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, Button, KeyboardAvoidingView} from 'react-native';
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
import styles from "../Styles";

const GraphInput = ({navigation, route}) => {

    let nomGraph;

    const _onChangenomGraph = (nomGraphText) => {
        nomGraph = nomGraphText;
        console.log(nomGraph);
    }

    /*ici j'ai choisi de construire un graph directement avec le nom
    //et de passer la structure:
    {
        0: nomDuGraph
    }
    C'était plus facile pour le code de Home
    Qui gerera la retour de cet écran, GraphInput
    et celui de Graph, qui renvoie egalement un Graph*/
    const handleNomGraph = () => {
        let graph = {};
        graph[0] = nomGraph;
        console.log(nomGraph);
        console.log("****************-GraphInput-***********************");
        console.log("Graph (ou nom de Graph) transféré:");
        console.log("***************************************************");
        console.log(graph);
        navigation.navigate('Home', {graph: graph})
    }

    return (//KeyboardAvoidingView : comportement du clavier


        <View sd>
            <KeyboardAvoidingView>
                <Text  style={styles.title_text}>Nouveau Graph:</Text>
                <TextInput placeholder="Nom du graph" autoFocus value={nomGraph}
                           onChangeText={(nomGraphText) => _onChangenomGraph(nomGraphText)}/>


                <Button containerStyle={styles.button} onPress={handleNomGraph}
                        title={"Transfert de graph à Home"}/>

            </KeyboardAvoidingView>


        </View>

    );

};

export default GraphInput;

