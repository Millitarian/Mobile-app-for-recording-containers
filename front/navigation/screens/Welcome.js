import React from "react";
import { View, Text, StyleSheet, Pressable} from 'react-native';


export default function Welcome({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.btext} >Welcome!</Text> 
                <Text style={styles.text} >    Приложение создано для облегчения поиска и учёта. Чтобы получить оптимальный опыт использования приложения, постарайтесь использовать полные и понятные названия хранилищ и их содержимого.</Text>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Main')} >
                <Text style={styles.btext} >Go -&gt;</Text>  
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",

    },
    button: {
        marginTop: 'auto',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'tomato',
    },
    btext: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    text: {
        marginTop: 30,
        fontSize: 16,
    },
    textContainer: {
        marginTop: '30%',
        width: '80%',
        alignItems: 'center',
    },
});