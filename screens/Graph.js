import {
    Button,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {React, useLayoutEffect} from 'react';

import {useEffect, useState} from "react";
import styles from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Graph = ({navigation, route}) => {

    let password = route.params ? route.params.password : console.log("route.params : pas de variable password transférée");


    /////////////////////////////////si un point a été renvoyé par le route:///////////
    if (route.params.point) {
        graph[Object.keys(graph).length] = route.params.point;

    }
    route.params.point = null;

    /////////////////////useEffect pour les conflits de barre de navigation:///////////////
    useEffect(() => {
            navigation.setOptions({
                title: graph[0],
                headerLeft: () => (<Button containerStyle={styles.button} onPress={() => {retourHome  }} title={"Back"}/>)
            })
        }
    ) , [];

    //////////////////////////retourHome/////////////////////////////////
    const storeObject = async (graph,key) => {
        try {
            const jsonValue = JSON.stringify(graph)
            await AsyncStorage.setItem('@'+key, graph);
        } catch (e) {
            console.log('######################');
            console.log("erreur de async storage:" + e);
            console.log('######################');
        }
    }

    const retourHome= ( )=>{
        storeObject(graph, graph);
        navigation.navigate('Home',{graph:true});
    }
    ///////////////////// recuperation du graph:///////////////
    const getObject = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@object')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('######################');
            console.log("erreur de async storage:" + e);
            console.log('######################');
        }
    }
    const graph = getObject ;

    /////////////////////////maintenance://///////////////////////////////////////////

    const printObjetGlobal = () => {
        console.log("*******************-Graph-*************************");
        console.log("           L'objet graph etant:");
        console.log("***************************************************");
        console.log(graph);
    }

    ////////////////Le component de rentranscription graphique d'un point:////////////
    const caseComponent = ({item}) =>
        // console.log("caseComponent, item vaut:"+item );
        (

            <View>
                <View style={{height: 1, backgroundColor: 'black'}}/>
                <View>
                    <Text style={styles.titreCase}>Situation :{graph[item].situation}</Text>
                </View>


                <View>
                    <Text style={styles.attributTitle}>emotion:</Text><Text>{graph[item].emotion}</Text>
                </View>
                <View style={{height: 1, backgroundColor: 'black'}}/>

                <View>
                    <Text style={styles.attributTitle}>confirmation:</Text><Text> {graph[item].confirmation}</Text>
                </View>
                <View style={{height: 1, backgroundColor: 'black'}}/>

                <View>
                    <Text style={styles.attributTitle}>pensées_auto :</Text><Text>{graph[item].pensées_auto}</Text>
                </View>
                <View style={{height: 1, backgroundColor: 'black'}}/>

                <View>
                    <Text style={styles.attributTitle}>pensée_adaptée :</Text><Text>{graph[item].pensée_adaptée}</Text>
                </View>
                <View style={{height: 1, backgroundColor: 'black'}}/>

                <View>
                    <Text style={styles.attributTitle}>preuves_contraires
                        :</Text><Text>{graph[item].preuves_contraires}</Text>
                </View>
                <View style={{height: 1, backgroundColor: 'black'}}/>

                <View>
                    <Text style={styles.attributTitle}>emotion_resultat
                        :</Text><Text>{graph[item].emotion_resultat}</Text>
                </View>
                <View style={{height: 1, backgroundColor: 'black'}}/>


            </View>

        )


    if (Object.keys(graph).length > 2) {//grosse scission conditionnelle si le graph possède au moins deux point

////////////////////////////////////////La Flatlist des points:///////////////////////
        const ComponentListPoint = () => {

            return (
                <View>

                    <Text style={styles.titreGraph}>{graph[0]}</Text>

                    <View>
                        <FlatList
                            data={pointSupZero}
                            renderItem={caseComponent}
                            keyExtractor={(index) => index}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                        />
                    </View>


                </View>
            )
        }
//////////////////////////////////////preparation des données pour le graph:///////////
        let dataset = []
        let pointSupZero = [];
        for (let points of Object.keys(graph)) {
            console.log(points);

            if (parseInt(points, 10) > 0) {
                dataset.push(graph[points]["emotion"]) ///on recupere bien la case "émotion"
                pointSupZero.push(points);
            }
        }

        console.log("la liste des points du graph est :" + dataset);//maintenance

        return (
            <View>
                <ScrollView>

                <LineChart
                    data={{
                        labels: dataset,
                        datasets: [
                            {
                                data: dataset
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={200}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 5
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 2,
                        borderRadius: 5
                    }}
                />


                <Button containerStyle={styles.button} onPress={() => {
                    navigation.navigate('PointInput')
                }} title={"Ajouter un point"}/>


                <ComponentListPoint/>

                    </ScrollView>
            </View>


        );
    } else return (<View>
            <Text>Votre graph ne contient pas assez de points d'exposition</Text>
            <Button containerStyle={styles.button} onPress={() => {
                navigation.navigate('PointInput')
            }} title={"Ajouter un point"}/>
        </View>
    )

};

export default Graph;
