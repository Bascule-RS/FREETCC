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
    const [objet_global,setObjet_global] = useState(route.params.passageVar);
    let situ;
    let emotion;
    let pens_auto;
    let conf;
    let preuves_cont;
    let pens_adapt;
    let emo_resu;
    let ChiffreDernierGraph;
    let NouveauPointDerGraph;

    useLayoutEffect(()=>{

            console.log('****************');
            console.log('params transéfré');
            console.log('****************');
            //for (var enfant of Object.keys(objet_global))
            //console.log("enfant:\n"+enfant);
            console.log(route.params.passageVar);

            console.log('**************************************');
            console.log('La variable objet_global vaut:');
            console.log('***************************************');
            console.log(objet_global);
        if (Object.keys(objet_global).length >0) {
            NouveauPointDerGraph = ++Object.keys(objet_global[Object.keys(objet_global).length]).length;
        }else {
            NouveauPointDerGraph =0;
        }


        /*return (
            <View style={styles.container}>
                <Text>
                Object.keys(objet_global).map((item, i)=>{


                }
               </Text>

            </View>
        )*/
    },[route.params?.passageVar]);

    const _onChangeSitu = (situText) => {
        console.log("+++++++\n+++++++\n+++++++\n+++++++\nsituation:" + situ);
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
function AjoutUnPoint() {

}
    function writeUserData(situ, emotion, pens_auto, conf, preuves_cont, pens_adapt, emo_resu) {
        console.log('**************************************');
        console.log('Dans writeUserData, objet_global vaut:');
        console.log('***************************************');
        console.log(objet_global);

        console.log('*********************************************');
        console.log('Dans writeUserData, ChiffreDernierGraph vaut:');
        console.log('*********************************************');
        console.log(ChiffreDernierGraph);
         //fabrication du dictionnaire pour un point.
let path =auth.currentUser.uid + "/" + ChiffreDernierGraph.toString() + '/' + NouveauPointDerGraph.toString() + '/';
console.log(path);
        set(ref(db, path), {
            situation: situ, emotion: emotion
            , pensees_automatiques: pens_auto, confirmation: conf, preuves_contraires: preuves_cont
            , pensees_adapte: pens_adapt, emotion_resultat: emo_resu
        });
//augmentation Javascript  du point ici, pour simuler ce qui se passe dans la basse de donnée et éviter de refaire un (get):
        const point = {};
        point.situation = situ;
        point.emotion = emotion;
        point.pensees_automatiques = pens_auto;
        point.confirmation = conf;
        point.preuves_contraires = preuves_cont;
        point.pensees_adapte = pens_adapt;
        point.emotion_resultat = emo_resu;
        Object.keys[DernierGraph.length ]= point;
    }

    return (//KeyboardAvoidingView : comportement du clavier

        <View style={styles.container}>
            <KeyboardAvoidingView>
                <TextInput placeholder="situation" autoFocus multiline={true} value={situ}
                           onChangeText={(situText) => _onChangeSitu(situText)}/>
                <TextInput placeholder="emotion" multiline={true} value={emotion}
                           onChangeText={(emotionText) => _onChangeEmotion(emotionText)}/>

                <TextInput placeholder="pens_auto" multiline={true} value={pens_auto}
                           onChangeText={(pens_autoText) => _onChangePens_auto(pens_autoText)}/>

                <TextInput placeholder="conf" multiline={true} value={conf}
                           onChangeText={(confText) => _onChangeConf(confText)}/>

                <TextInput placeholder="preuves_cont" multiline={true} value={preuves_cont}
                           onChangeText={(preuves_contText) => _onChangePreuves_cont(preuves_contText)}/>

                <TextInput placeholder="pens_adapt" multiline={true} value={pens_adapt}
                           onChangeText={(pens_adaptText) => _onChangePens_adapt(pens_adaptText)}/>

                <TextInput placeholder="émo_résu" multiline={true} value={emo_resu}
                           onChangeText={(Emo_resuText) => _onChangeeEmo_resu(Emo_resuText)}/>


                <Button containerStyle={styles.button}
                        onPress={() => writeUserData(situ, emotion, pens_auto, conf, preuves_cont, pens_adapt, emo_resu)}
                        containerStyle={styles.button}
                        title={"Write"}/>

                <Button containerStyle={styles.button} onPress={() => navigation.navigate('Home')}
                        containerStyle={styles.button}
                        title={"Retour Home"}/>
                <Button containerStyle={styles.button} onPress={AjoutUnPoint()}
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