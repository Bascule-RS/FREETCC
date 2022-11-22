import React from 'react';

import {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    Alert,
    Modal
} from 'react-native';
import {auth} from "../Firebase";
import Dialog from "react-native-dialog";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {db} from "../Firebase";
import {getDatabase, ref, child, get, query, set, OrderByChild} from "firebase/database";
import styles from "../Styles";


const Home = ({navigation, route}) => {
    let password = route.params ? route.params.password : console.log("route.params : pas de variable password transférée");


    let objet_global = {
        "1": {
            "0": "journée sans alcool",
            "1": {
                situation: 'désir au cours de la journée',
                emotion: 4,
                'pensées_auto': 'envie moyenne',
                confirmation: 'Ca va me rassurer , me mettre bien',
                preuves_contraires: "l'alcool le lendemain me rend depressif",
                'pensée_adaptée': "Je vais regarder un film",
                emotion_resultat: 2
            },
            "2": {
                situation: 'désir au cours de la journée',
                emotion: 6,
                'pensées_auto': "Gross envie a cause d'un problème au boulot",
                confirmation: "Allez je prends juste trois bières",
                preuves_contraires: "Lacher maintenant me fera lacher plus tard",
                'pensée_adaptée': "Je vais aller courir",
                emotion_resultat: 3
            },
            "3": {
                situation: 'désir au cours de la journée',
                emotion: 5,
                'pensées_auto': 'bonne semaine. Week end. envie de décompresser',
                confirmation: "On a qu'une vie",
                preuves_contraires: "Je vais m'écrouler le lendemain",
                'pensée_adaptée': "Aller marcher",
                emotion_resultat: 3
            }
        },
        "2": {
            "0": 'soirée sans alcool',
            "1": {
                situation: 'soirée',
                emotion: 5,
                'pensées_auto': "ca va me mettre a l'aise",
                confirmation: 'tout le monde boit',
                preuves_contraires: "il faut que je perde l'abitude",
                'pensée_adaptée': "certaines personnes sont au perrier",
                emotion_resultat: 2
            },
            "2": {
                situation: 'soirée',
                emotion: 6,
                'pensées_auto': "Tout le monde est bourré, envie d'entrer dans l'ambiance",
                confirmation: 'ça va me mettre bien',
                preuves_contraires: "j'ai repris le sport",
                'pensée_adaptée': "Je vais rentrer sobre et je serais en pleine forme demain matin",
                emotion_resultat: 3
            },
            "3": {
                situation: 'soirée',
                emotion: 5,
                'pensées_auto': "ca va me mettre a l'aise",
                confirmation: 'ca va me décoincer',
                preuves_contraires: 'certaines personnes tres intelligentes sont silencieuses',
                'pensée_adaptée': "il faut que je prenne l'habitude d'arrêter de boire",
                emotion_resultat: 3
            }
        }
    }


    var crypt1;


///////////////////////Maintenance:////////////////////////////////
    const printPassword = () => {
        console.log("*******************-Home-*************************");
        console.log("           La password etant:");
        console.log("***************************************************");
        console.log(password);
    }

    const printObjetGlobal = () => {
        console.log("*******************-Home-*************************");
        console.log("           L'objet global etant:");
        console.log("***************************************************");
        console.log(objet_global);
    }
///////////////////////Cryptage:////////////////////////////////
    function decrypt(o1, salt) {
        var o = decodeURI(o1);
        if (salt && o.indexOf(salt) != 0)
            throw new Error('object cannot be decrypted');
        o = o.substring(salt.length).split('');
        for (var i = 0, l = o.length; i < l; i++)
            if (o[i] == '{')
                o[i] = '}';
            else if (o[i] == '}')
                o[i] = '{';
        console.log('######################');
        console.log(o.join(''));
        return o.join('');
        //return JSON.parse(o.join(''));
    }

    function encrypt() {
        var o = JSON.stringify(objet_global).split('');
        console.log("***************************************************");
        console.log("          Dans encrypt, o vaut:");
        console.log("***************************************************");
        console.log(o);
        for (var i = 0, l = o.length; i < l; i++)
            if (o[i] == '{')
                o[i] = '}';
            else if (o[i] == '}')
                o[i] = '{';
        console.log("*******************-Home-*************************");
        console.log("          Dans encrypt, la password etant:");
        console.log("***************************************************");
        console.log(password);
        console.log(typeof password)
        crypt1 = encodeURI(password + o.join(''));
        writeUserData();
    }

///////////////////////Envoi - reception firebase:////////////////////////////////
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
        let path = auth.currentUser.uid + "/";
        console.log("le path avant le set est  " + path);
        set(ref(db, path), {
            objet: crypt1
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
                var retourBDD = snapshot.val()["objet"];
                console.log("*******************-Home-*************************");
                console.log("       Le retourBDD à envoyer au décryptage:");
                console.log("***************************************************");
                console.log(retourBDD);
                console.log("*******************-Home-*************************");
                console.log("           La password etant:");
                console.log("***************************************************");
                console.log(password);
                retourBDD = decrypt(retourBDD, password);
                objet_global = retourBDD;
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
///////////////////////Ajout d'un Graph:////////////////////////////////
    if( route.params.graph ) { //si le paramètre graph est renvoyé lors de la navigation
        handleAjout(route.params.graph)
    }
    else console.log("route.params : pas de variable  de Graphique transférée");

    function handleAjout (graph) {
        let levier = false;
        for ( let  clés of Object.keys(objet_global)){
            if (objet_global[clés][0] == graph[0]) { // test sur toutes les clés de l'objet global
                objet_global[clés]= graph;           // pour vérifier si le nom existe déjà
                                                    //et le changer
                levier = true;
            }
        }
     if (levier == false) // ici il ne s'agit que d'un nom de graph (entré dans GraphInput)
        objet_global[Object.keys(objet_global).length+1] = graph;
        console.log("*******************-Home-*************************");
        console.log("Graph (ou nom de Graph) transféré:");
        console.log("***************************************************");
        console.log(objet_global);
    }
///////////////////////Ajout d'un Nom de Graph:////////////////////////////////
    if( route.params.nomGraph ) {
        handleAjoutNom(route.params.nomGraph)
    }
    else console.log("route.params : pas de variable nomGraph transférée");

   function handleAjoutNom (nomGraph) {
        objet_global[Object.keys(objet_global).length+1] = {};
        objet_global[Object.keys(objet_global).length][0] = nomGraph;
        console.log(objet_global);
    }
////////////////////////////////////////////////////////////////////////


    const listGraph = Object.keys(objet_global);

    const itemListGraph = ({item}) => (
        <View>
        <Button style={styles.button} onPress={() => {
            navigation.navigate('Graph', {graph: objet_global[item]})
        }} title={objet_global[item][0]}/>
        <Text style={styles.title_text}>*-*</Text>
        </View>
    )

    return (//KeyboardAvoidingView : comportement du clavier

        <View >
            <View>
            <Text style={styles.title_text}> La liste des graphs :</Text>
            </View>
            <FlatList
                data={listGraph}
                renderItem={itemListGraph}
                keyExtractor={(item, index) => item + index}
            />
            <Button containerStyle={styles.button} onPress={() => {
                navigation.navigate('GraphInput', {objet_global: objet_global})}}

                    title={"Ajouter un graph"}/>
            <KeyboardAvoidingView>
                <View><Text style={styles.title_text}> Gestion des données:</Text>
                    <Button containerStyle={styles.button} onPress={encrypt}
                            title={"Encryptage et envoi"}/>
                </View>
                <Button containerStyle={styles.button} onPress={getGraphData}

                        title={"Get et Decryptage"}/>
                <Button containerStyle={styles.button} onPress={printPassword}

                        title={"Print password"}/>
                <Button containerStyle={styles.button} onPress={printObjetGlobal}

                        title={"Print objetGlobal"}/>

                <Button containerStyle={styles.button} onPress={() => {
                    navigation.navigate('Graph', {objet_global: objet_global , password : password})
                }}

                        title={"Passage à Graph avec passage des données"}/>
            </KeyboardAvoidingView>


        </View>

    );

};

export default Home;
