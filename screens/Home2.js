import React from 'react';
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, Button} from 'react-native';
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
//import {db} from "../Firebase";
import { getDatabase, ref, child, get ,set } from "firebase/database";


//onAuthStateChanged(auth, (user) => {
//    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
//        const uid = user.uid;
        // ...
//    } else {
        // User is signed out
        // ...
//    }
//});


const Home = async ({navigation}) => {

    let situ;
    let emotion;
   // let pens_auto;
   // let conf;
   // let preuves_cont;
   // let pens_adapt;
   // let emo_resu;



    const _onChangeSitu = (situText) => {
        console.log("+++++++\n+++++++\n+++++++\n+++++++\nsituation:" + situ);
        situ = situText;
    }

    const _onChangeEmotion = (emotionText) => {
        console.log("emotion:" );
        emotion = emotionText;
    }
    //const _onChangePens_auto = (pens_autoText) => {
    //    pens_auto = pens_autoText;
    //}
    //const _onChangeConf = (confText) => {
    //    conf = confText;
   // }

    //const _onChangePreuves_cont = (preuves_contText) => {
     //   preuves_cont = preuves_contText;
   // }

   // const _onChangePens_adapt = (pens_adaptText) => {
    //    pens_adapt = pens_adaptText;
   // }

    //const _onChangeeEmo_resu = (Emo_resuText) => {
    //    emo_resu = Emo_resuText;
   // }

//let graph_longueur = graph.length();
    const writeUserData = () => {
        const db =getDatabase();
        //let taillegraph= 0;
        //let taille_du_graph =graph.length ;
        //while (taille_du_graph != 0){
        //    taillegraph++;
        //    taille_du_graph--;
        //}

        //console.log("situation:"+situ,"emotion:"+emotion,"auth:"+auth.currentUser.uid);
        set(ref(db, auth.currentUser.uid), {situation: situ});
        //set(ref(db, auth.currentUser.uid + "/" + taillegraph), {emotion: emotion});
        //set(ref(db, auth.currentUser.uid + "/" + taillegraph), {pensees_automatiques: pens_auto});
        //set(ref(db, auth.currentUser.uid + "/" + taillegraph), {confirmation: conf});
        //set(ref(db, auth.currentUser.uid + "/" + taillegraph), {preuves_contraires: preuves_cont});
        //set(ref(db, auth.currentUser.uid + "/" + taillegraph), {pensees_adapte: pens_adapt});
        //set(ref(db, auth.currentUser.uid + "/" + taillegraph), {emotion_resultat: emo_resu});

       // graph.taillegraph = taillegraph;
       // graph.taillegraph.situation = situ;
       // graph.taillegraph.emotion = emotion;
       // graph.taillegraph.pensees_automatiques = pens_auto;
       // graph.taillegraph.confirmation = conf;
       // graph.taillegraph.preuves_contraires = preuves_cont;
       // graph.taillegraph.pensees_adapte = pens_adapt;
       // graph.taillegraph.emotion_resultat = emo_resu;
    }

    // const getData = () => {
    //   get(child(db, `auth.currentUser.uid`)).then((snapshot) => {
    //     if (snapshot.exists()) {

    //       graph = JSON.parse(snapshot);
    //      console.log("*****************************");
    //     console.log(graph);
    // } else {
    //     console.log("No data available");
    // }
    // }).catch((error) => {
    //     console.error(error);
    // });
    //  }


    //const docRef = doc(ref(db, auth.currentUser.uid));
    //const docSnap = await getDatabase();

    //if (docSnap.exists()) {
    //    console.log("Document data:", docSnap.data());
    //} else {
        // doc.data() will be undefined in this case
    //    console.log("No such document!");
    //}

    //NB: j'ai ici viré les utilisations abusives du states ci-dessous.
    //const [email,setEmail]=useState("");
    //const[password,setPassword]=useState("");
    //secureTextEntry


    //<TextInput placeholder="emotion" multiline={true} value={emotion} onChangeText={(emotionText) => _onChangeEmotion(emotionText)}/>

    // <TextInput placeholder="pens_auto" multiline={true} value={pens_auto} onChangeText={(pens_autoText) => _onChangePens_auto(pens_autoText)}/>

    // <TextInput placeholder="conf" multiline={true} value={conf} onChangeText={(confText) => _onChangeConf(confText)}/>

//            <TextInput placeholder="preuves_cont" multiline={true} value={preuves_contText} onChangeText={(preuves_contText) => _onChangePreuves_cont(preuves_contText)}/>

    //          <TextInput placeholder="pens_adapt" multiline={true} value={pens_adapt} onChangeText={(pens_adaptText) => _onChangePens_adapt(pens_adaptText)}/>

    //        <TextInput placeholder="émo_résu" multiline={true} value={emo_resu} onChangeText={(Emo_resuText) => _onChangeeEmo_resu(Emo_resuText)}/>

    return (//KeyboardAvoidingView : comportement du clavier

        <View style={styles.container}>
            <TextInput placeholder="situation" autoFocus multiline={true} value={situ}
                       onChangeText={(situText) => _onChangeSitu(situText)}/>


            <Button containerStyle={styles.button} onPress={writeUserData} containerStyle={styles.button}
                    title={"Write"}/>

            <Text> Graph1:</Text>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
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