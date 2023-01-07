import React, {useLayoutEffect} from 'react';

import {StyleSheet, Text, View, TextInput, Dimensions, Button, KeyboardAvoidingView ,ScrollView} from 'react-native';
import styles from "../Styles";

const PointInput = ({navigation, route}) => {
    let password = route.params ? route.params.password : console.log("route.params : pas de variable password transférée");

    let situ;
    let emotion;
    let pens_auto;
    let conf;
    let preuves_cont;
    let pens_adapt;
    let emo_resu;


    useLayoutEffect(() => {


    }, []);

    function pointCreationSend() {
        var point = {};
        point.situation = situ;
        point.emotion = emotion;
        point.confirmation = conf;
        point.emotion_resultat = emo_resu;
        point.pensées_auto = pens_auto;
        point.pensée_adaptée = pens_adapt;
        point.preuves_contraires = preuves_cont;
        console.log
        {
            point
        }
        ;
        navigation.navigate('Graph', {point: point , password : password});
    }

    const _onChangeSitu = (situText) => {
        console.log("situation:" + situ);
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


    return (//KeyboardAvoidingView : comportement du clavier
        <View style={styles.container}>
            <View style={styles. containerPoint}>
                <ScrollView>
                    <KeyboardAvoidingView>
                    <Text style = {styles.title_text}>Situation:</Text>
                    <TextInput placeholder="situation" autoFocus multiline={true} value={situ}
                               onChangeText={(situText) => _onChangeSitu(situText)}/>
                    <Text style = {styles.title_text}>Emotion:</Text>
                    <TextInput placeholder="emotion" multiline={true} value={emotion}
                               onChangeText={(emotionText) => _onChangeEmotion(emotionText)}/>
                    <Text style = {styles.title_text}>Pensées automatiques:</Text>
                    <TextInput placeholder="pens_auto" multiline={true} value={pens_auto}
                               onChangeText={(pens_autoText) => _onChangePens_auto(pens_autoText)}/>
                    <Text style = {styles.title_text}>Pensées de confirmation:</Text>
                    <TextInput placeholder="conf" multiline={true} value={conf}
                               onChangeText={(confText) => _onChangeConf(confText)}/>
                    <Text style = {styles.title_text}>Preuves contraires:</Text>
                    <TextInput placeholder="preuves_cont" multiline={true} value={preuves_cont}
                               onChangeText={(preuves_contText) => _onChangePreuves_cont(preuves_contText)}/>
                    <Text style = {styles.title_text}>Pensées adaptées:</Text>
                    <TextInput placeholder="pens_adapt" multiline={true} value={pens_adapt}
                               onChangeText={(pens_adaptText) => _onChangePens_adapt(pens_adaptText)}/>
                    <Text style = {styles.title_text}>Emotion resultat:</Text>
                    <TextInput placeholder="émo_résu" multiline={true} value={emo_resu}
                               onChangeText={(Emo_resuText) => _onChangeeEmo_resu(Emo_resuText)}/>


                    <Button containerStyle={styles.button} onPress={() => pointCreationSend()}
                            containerStyle={styles.button}
                            title={"Retour Graph"}/>
                    </KeyboardAvoidingView>
                </ScrollView>


            </View>
        </View>

    );

};
export var objet_global;
export default PointInput;

