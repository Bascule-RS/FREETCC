import {StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    image: {
        marginTop: 110,
        flex: 1,
        height: 300,
        marginBottom: 30,
        alignItems: 'center', justifyContent: 'center'
    },
    container: {
        flex: 1,
        marginTop: 110,
        flexDirection: 'column',
        width: Dimensions.get("window").width,
        alignItems: "center", //tout est centré
        justifyContent: "center",
        padding: 10,

    },
    inputContainer: {

        marginTop: 50,
        width: 300, //la largeur des cases d'input

    },
    graphStyle: {
        marginTop: 50,
        marginBottom: 800,
        color: "#99991a",


    },
    button: {
        width: Dimensions.get("window").width, //largeur des bouttons
        marginTop: 10,
        color: "#99991a",

    },
    listPoint: {
        width: Dimensions.get("window").width,



    },
    containerCase: {
        flexDirection: 'column',

        margin: 20,

    },

    attributCase: {
        flexDirection: 'row',
        fontWeight: 'bold',
        fontSize: 15,


    },

    title_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,


    },

    titreGraph: {

        fontWeight: 'bold',
        fontSize: 20,


    },
    titreCase: {


        fontSize: 18,


    },
    attributTitle: {
        textAlign: 'left',
        fontSize: 16
    }
    ,
    attributText: {
        textAlign: 'center',
        fontSize: 13
    }
});

export default styles;
