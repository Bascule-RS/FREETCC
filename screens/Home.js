import React from 'react';

import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, Button, KeyboardAvoidingView} from 'react-native';
import {auth } from "../Firebase";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {db} from "../Firebase";
import {getDatabase, ref, child, get,query, set,OrderByChild} from "firebase/database";




const Home = ({navigation}) => {

    const [objet_global,setObjet_global] = useState({'0':0});

    let situ;
    let emotion;
    let pens_auto;
    let conf;
    let preuves_cont;
    let pens_adapt;
    let emo_resu;



    const _onChangeSitu = (situText) => {
        console.log("ituation:" + situ);
        situ = situText;
    }

    const _onChangeEmotion = (emotionText) => {
        console.log("emotion:");
        emotion = emotionText;
    }
    const _onChangePens_auto = (pens_autoText) => {
        pens_auto = pens_autoText;
    }
    const _onChangeConf = (confText) => {
        conf = confText;
    }

    const _onChangePreuves_cont = (preuves_contText) => {
        preuves_cont = preuves_contText;
    }

    const _onChangePens_adapt = (pens_adaptText) => {
        pens_adapt = pens_adaptText;
    }

    const _onChangeeEmo_resu = (Emo_resuText) => {
        emo_resu = Emo_resuText;
    }



    function writeUserData(situ, emotion, pens_auto, conf, preuves_cont, pens_adapt, emo_resu) {
        graph_longueur++;
        //console.log("situation:"+situ,"emotion:"+emotion,"auth:"+auth.currentUser.uid);
        set(ref(db, auth.currentUser.uid + "/"), {
            situation: situ, emotion: emotion
            , pensees_automatiques: pens_auto, confirmation: conf, preuves_contraires: preuves_cont
            , pensees_adapte: pens_adapt, emotion_resultat: emo_resu
        });
        const point = {};
        point.situation = situ;
        point.emotion = emotion;
        point.pensees_automatiques = pens_auto;
        point.confirmation = conf;
        point.preuves_contraires = preuves_cont;
        point.pensees_adapte = pens_adapt;
        point.emotion_resultat = emo_resu;
        graph[Object.keys(graph).length] = point;
    }

    const getGraphData = () => {
        const dbRef = ref(getDatabase());
        const db = getDatabase();
        get(dbRef, auth.currentUser.uid).then((snapshot) => {
        //query( ref(db,auth.currentUser.uid),OrderByChild(auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("*******************-Home-*************************");
                console.log("Les données recupérées de la Base sont les suivantes:");
                console.log("***************************************************");
              //  for (var graph of snapshot.val() ) {
                    console.log("---------------------");
                    console.log(snapshot.val());

                //}
                setObjet_global(snapshot.val());

            } else {
                console.log("*******************-Home-*************************");
                console.log("Pas de données dans la database");
                console.log("***************************************************");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    return (//KeyboardAvoidingView : comportement du clavier

        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Button containerStyle={styles.button} onPress={getGraphData}
                        containerStyle={styles.button}
                        title={"GetGraphData"}/>
                <Button containerStyle={styles.button} onPress={() => {
                    navigation.navigate({name :'GraphInput',  params:{passageVar : objet_global} }) }}
                        containerStyle={styles.button}
                        title={"Input"}/>
            </KeyboardAvoidingView>
            <Text> Graph1:</Text>

        </View>

    );

};

export var objet_global;
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
        width: 500, //largeur des bouttons
        marginTop: 10,
        color: "#99991a",

    },
});