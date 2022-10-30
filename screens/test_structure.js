import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions, Button} from 'react-native';
import {auth,db} from "../Firebase";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { getDatabase, ref, child, get ,set } from "firebase/database";




//const docRef = doc(ref(db, auth.currentUser.uid));
const docSnap = getDatabase();

if (docSnap) {
    console.log("Document data:", docSnap.data());
} else {
    //doc.data()// will be undefined in this case
    console.log("No such document!");
}

//NB: j'ai ici viré les utilisations abusives du states ci-dessous.
const [email,setEmail]=useState("");
const[password,setPassword]=useState("");
//secureTextEntry



const Home = ({navigation}) => {
    let situ;
    let emotion;
    let pens_auto;
    let conf;
    let preuves_cont;
    let pens_adapt;
    let emo_resu;

    let graph= {};

    function add_point(graph){
        let graph_length = graph.length.toString();

        graph.push([graph_length])

    }
    const _onChangeSitu = (situText) => {
        console.log("situation:" + situ);
        situ = situText;
    }

    const _onChangeEmotion = (emotionText) => {
        console.log("emotion:" );
        emotion = emotionText;
    }

    const writeUserData = (situ) => {

        set(ref(db, auth.currentUser.uid), {situation: situ});
    }
    return (//KeyboardAvoidingView : comportement du clavier

        <View>


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