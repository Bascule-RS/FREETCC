import {Button, Dimensions, StyleSheet, Text, TextInput, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {child, get, getDatabase, ref, set} from "firebase/database";
import {auth} from "../Firebase";


const Graph = async ({navigation}) => {

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
    const getData = () => {
        const dbRef =ref(getDatabase());
        get(child(dbRef, auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {

                //graph = JSON.parse(snapshot);
                console.log("*****************************");
                console.log(graph);
            } else {
                console.log(snapshot);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
<View style={styles.container}>
    <TextInput placeholder="situation" autoFocus multiline={true} value={situ}
               onChangeText={(situText) => _onChangeSitu(situText)}/>


    <Button containerStyle={styles.button} onPress={getData} containerStyle={styles.button}
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

export default Graph;

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