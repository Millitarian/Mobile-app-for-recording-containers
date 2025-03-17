import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Pressable, TextInput, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import axios from 'axios'
axios.defaults.baseURL = 'http://172.16.9.37:8080/api'

export default function DbScreen({navigation}) {
    const animated = new Animated.Value(1);

    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.4,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const [container, setContainer] = useState([]);
    const [newContainerName, setNewContainerName] = useState('Новый контейнер')

    const fetchContainer = async () => {
        try {
            const {data} = await axios('/router1')
            setContainer(data)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=> {
        let clean = false
        fetchContainer()
        return () => clean = true
    }, [navigation])

    const addNewContainer = async () => {
        try {
            const {data} = await axios.post('/router1', {newContainerName})
            if (data)
                fetchContainer()

        } catch (error) {
            alert(error)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.addContainer}>
                <TextInput style={styles.textInput} placeholder="add container..." onChangeText={setNewContainerName}/>
                <Pressable style={styles.button} onPressIn={fadeIn} onPressOut={fadeOut} onPress={addNewContainer}>
                    <Animated.View
                        style={{
                            opacity: animated,
                        }}>
                        <Ionicons name='add-outline' size={30} color='black'/>
                    </Animated.View>
                </Pressable>
            </View>
            <FlatList data={container} renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('AllInfo', {con_id: item._id, con_name: item.name})}>
                    <View style={styles.ListItemContainer}>
                        <View style={styles.ListItemContent}>
                            <Ionicons name='archive' size={20} color='tomato'/>
                            <Text style={styles.text}>"{item.name}"</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
    },
    ListItemContainer: {
        marginBottom: 5,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    ListItemContent: {
        width: '80%',
        marginLeft: '10%',
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },
    text: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    addContainer: {
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: 'tomato',
    },
    textInput: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingVertical: 10,
        fontSize: 16,
    },
});