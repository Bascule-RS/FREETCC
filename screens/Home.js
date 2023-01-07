import React, {useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    var objet_global = {};
    let password = route.params ? route.params.password : console.log("route.params : pas de variable password transférée");
    let graph;
    let listGraph = [];
    let isLoading = true;


//////////////////////////Async storage://////////////////////////////
    const getObject = async (key) => {
        try {

            if (key == "graph") {
                const jsonValue = await AsyncStorage.getItem('@' + key);
                graph != null ? JSON.parse(jsonValue) : null; //objet_global
            } else if (key == "objet_global") {
                const jsonValue = await AsyncStorage.getItem('@' + key);
                objet_global != null ? JSON.parse(jsonValue) : null; //objet_global
            } else {
                const password = await AsyncStorage.getItem('@' + key);

            }
            console.log('############################################');
            console.log("async storage: objet récupéré avec la clé " + key);
            console.log("");
            console.log('############################################');


        } catch (e) {
            console.log('######################');
            console.log("erreur de async storage:" + e);
            console.log('######################');
        }
    }


    const storeObject = async (object, key) => {
        try {
            if (key == "objet_global") {
                const jsonValue = JSON.stringify(object)
                await AsyncStorage.setItem('@' + key, jsonValue)
            } else {
                await AsyncStorage.setItem('@' + key, object)
            }
            console.log('############################################');
            console.log("async storage: objet rangé à la clé " + key);
            console.log('############################################');

        } catch (e) {
            console.log('############################################');
            console.log("erreur de async storage:" + e);
            console.log('############################################');

        }
    }

    //storeObject(object_global,"object_global");

    if (password != null) {
        storeObject(password, "password");
    }


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
    var crypt1;

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

        return JSON.parse(o.join(''));
    }

    function encrypt() {
        getObject("password");
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


    const getGraphData = new Promise(async (resolve, reject) => {
        await getObject("password");

        const dbRef = ref(getDatabase());

        await get(child(dbRef, auth.currentUser.uid)).then((snapshot) => {
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
                resolve("get sur la BDD réussi");

            } else {
                console.log("*******************-Home-*************************");
                console.log("Pas de données dans la database");
                console.log("***************************************************");
                reject("erreur de get sur la database")
            }
        }).catch((error) => {
            console.error(error);
        });

    })


    //////////////Liste des Graphs et passage au graph correspondant://////////////

    //useEffect(() => {

    //}),[];
    const itemListGraph = ({item}) => {
        <View>
            <Button style={styles.button} onPress={graphInput} title={objet_global[item][0]}/>
            <Text style={styles.title_text}>---</Text>
        </View>;
    }


///////////////////////Ajout d'un Graph:////////////////////////////////
    if (route.params.graph) { //si le paramètre graph est renvoyé lors de la navigation
        handleAjout();
    } else console.log("route.params : pas de variable  de Graphique transférée");

    function handleAjout() {

        getObject("graph"); // recuperation du graph dans async
        if (!graph[1]) {// si le graph n'a qu'un titre alors c'est un nom de graph
            objet_global[Object.keys(objet_global).length + 1] = graph;
            console.log("*******************-Home-*************************");
            console.log("Nouveau graph transféré:");
            console.log("***************************************************");
        } else {
            for (let clés of Object.keys(objet_global)) {
                if (objet_global[clés][0] == graph[0]) { // test sur toutes les clés de l'objet global
                    objet_global[clés] = graph;           // pour vérifier si le nom existe déjà
                    //et le remplacer

                }
            }

            console.log("*******************-Home-*************************");
            console.log("Graph  transféré (ou modifié)");
            console.log("***************************************************");
        }
        console.dir(objet_global);

        storeObject(object_global, "objet_global");
    }

//////////////Appel vers graph ou GraphInput://////////////


    function graphInput(param) {
        storeObject(object_global, objet_global);// sauvegarde de l'objet global avant le transfer
        if (param)
            navigation.navigate('GraphInput')
        else {
            navigation.navigate('Graph');
        }

    }


//////////////////////////////////////////////////////////////////////////////
    ///////////////////////////Recuperation sur la BDD//////////////////

    useLayoutEffect(() => {
        getGraphData.then(() => {

                console.log("*******************-Home-*************************"),
                    console.log("Après GetGraphData :" + objet_global),
                    listGraph = Object.keys(objet_global),
                    console.log("lecture de ItemListGraph"),
                    console.log("la liste graph récupérée est :" + listGraph)


            }
        )
    }, );
/*
   while(!listGraph.length)
        return (     <View>
            <Text style={styles.title_text}> chargement des données de FireBase</Text>
        </View>)
*/

        console.log("listgraph vaaaaaaaaaaaaaaaaut" + listGraph);
        return (//KeyboardAvoidingView : comportement du clavier

            <View>
                <View>
                    <Text style={styles.title_text}> La liste des graphs :</Text>
                </View>
                <FlatList
                    data={listGraph}
                    renderItem={itemListGraph}
                    keyExtractor={(item, index) => item + index}
                />
                <Button containerStyle={styles.button} onPress={(onPress = 1) => graphInput(onPress)}
                        title={"Ajouter un graph"}/>

                <KeyboardAvoidingView>
                    <Text style={styles.title_text}> Gestion des données:</Text>

                    <Button containerStyle={styles.button} onPress={encrypt}
                            title={"Encryptage et envoi"}/>


                    <Button containerStyle={styles.button} onPress={getGraphData}
                            title={"Get et Decryptage"}/>

                    <Button containerStyle={styles.button} onPress={printPassword}
                            title={"Print password"}/>


                    <Button containerStyle={styles.button} onPress={printObjetGlobal}
                            title={"Print objetGlobal"}/>


                </KeyboardAvoidingView>


            </View>

        );


};

export default Home;
