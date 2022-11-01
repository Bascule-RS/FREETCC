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

    const [objet_global,setObjet_global] = useState({
            1: {
                0:{
                    titre :"journée de depression"
                },
                1: {
                    situation: 'journée de depression',
                    emotion: 4,
                    'pensées_auto': 'je suis nul',
                    confirmation: 'les gens me fuient',
                    preuves_contraires: "j'ai des amis",
                    'pensée_adaptée': "j'ai des qualités",
                    emotion_resultat: 2
                },
                2: {
                    situation: 'journée de depression',
                    emotion: 6,
                    'pensées_auto': "je n'interesse personne",
                    confirmation: "personne ne m'appelle",
                    preuves_contraires: "j'ai des amis",
                    'pensée_adaptée': "on m'a dit l'autre jour que je comptais",
                    emotion_resultat: 3
                },
                3: {
                    situation: 'journée de depression',
                    emotion: 5,
                    'pensées_auto': 'je suis nul',
                    confirmation: "je n'ai pas parlé",
                    preuves_contraires: 'certaines personnes tres intelligentes sont silencieuses',
                    'pensée_adaptée': "on m'a dit que j'étais interessant",
                    emotion_resultat: 3
                }
            },
            2: {
                0:{
                    titre :"dîner"
                },
                1: {
                    situation: 'dîner',
                    emotion: 5,
                    'pensées_auto': 'je suis nul',
                    confirmation: 'on me parle peu',
                    preuves_contraires: "Je sais que Simon m'aime bien et il compte pour moi",
                    'pensée_adaptée': "j'ai des qualités",
                    emotion_resultat: 2
                },
                2: {
                    situation: 'dîner',
                    emotion: 6,
                    'pensées_auto': "je n'interesse personne",
                    confirmation: 'personne ne me parle',
                    preuves_contraires: "j'ai des amis",
                    'pensée_adaptée': "Je ne connais quasiment personne et j'ai le droit d'être discret",
                    emotion_resultat: 3
                },
                3: {
                    situation: 'dîner',
                    emotion: 5,
                    'pensées_auto': 'je suis nul',
                    confirmation: 'je ne sais pas quoi dire',
                    preuves_contraires: 'certaines personnes tres intelligentes sont silencieuses',
                    'pensée_adaptée': 'Je sais que je suis cultivé',
                    emotion_resultat: 3
                }
            }
        });

    let situ;
    let emotion;
    let pens_auto;
    let conf;
    let preuves_cont;
    let pens_adapt;
    let emo_resu;
    var crypt1;
    let phrase = "Je disparait du monde"



    function encrypt() {
        var o=JSON.stringify(objet_global).split('');
        for(var i = 0, l = o.length; i < l; i++)
            if(o[i] == '{')
                o[i] = '}';
            else if(o[i] == '}')
                o[i] = '{';
   crypt1=  encodeURI(phrase + o.join(''));
        writeUserData();
    }

    function decrypt(o1, salt) {
        var o = decodeURI(o1);
        if(salt && o.indexOf(salt) != 0)
            throw new Error('object cannot be decrypted');
        o = o.substring(salt.length).split('');
        for(var i = 0, l = o.length; i < l; i++)
            if(o[i] == '{')
                o[i] = '}';
            else if(o[i] == '}')
                o[i] = '{';
        console.log('######################');
       return JSON.parse(o.join(''));
    }

    function writeUserData() {

        console.log('**************************************');
        console.log('Dans writeUserData, objet_global vaut:');
        console.log('***************************************');
        console.log(objet_global);

        console.log('*********************************************');
        console.log('Dans writeUserData, crypt1 vaut:');
        console.log('*********************************************');
        console.log(crypt1);
        //fabrication du dictionnaire pour un point.
        let path = auth.currentUser.uid + "/" ;
        console.log(path);
        set(ref(db, path), {objet:crypt1
        });
    }
    const getGraphData = () => {
        const dbRef = ref(getDatabase());
        const db = getDatabase();
        get(child(dbRef, auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {

              //  for (var graph of snapshot.val() ) {


                console.log("*******************-Home-*************************");
                console.log("Les données recupérées de la Base sont les suivantes:");
                console.log("***************************************************");
                console.log(snapshot);
                var retourBDD= snapshot.val()["objet"];
                console.log(retourBDD);
                retourBDD= decrypt(retourBDD,phrase);
                setObjet_global(retourBDD);
                console.log("----------decryptage reussi:-----------");
                console.log("----------Objet_global vaut:-----------");
                console.log(objet_global);

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
                <Button containerStyle={styles.button} onPress={encrypt}

                        title={"Encryptage et envoi"}/>
                <Button containerStyle={styles.button} onPress={getGraphData}

                        title={"Get et Decryptage"}/>
                <Button containerStyle={styles.button} onPress={writeUserData}

                        title={"Envoi sur la BDD"}/>
                <Button containerStyle={styles.button} onPress={() => {
                    navigation.navigate({name :'GraphInput',  params:{passageVar : objet_global} }) }}

                        title={"Passage des données"}/>
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