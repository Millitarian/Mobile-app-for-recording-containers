import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated, TextInput, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import axios from 'axios'
axios.defaults.baseURL = 'http://172.16.9.37:8080/api'

export default function ViewAll({route, navigation}) {
    const containerId = route.params.con_id
    const animated = new Animated.Value(1);
    
    navigation.setOptions({
        headerRight: () => (
            <Pressable style={styles.tabButton} onPressIn={fadeIn} onPressOut={fadeOut} onPress={() => navigation.navigate('QrGenScreen', {con_id: containerId, con_name: route.params.con_name})}><Ionicons name='qr-code' size={22} color='black'/></Pressable>
        ),
    })

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

    const [components, setComponents] = useState([
        {_id: 'ObjectId(1)', name: 'Колесо', count: '24'},
        {_id: 'ObjectId(2)', name: 'Arduino', count: '11'},
        {_id: 'ObjectId(3)', name: 'Батарейка AAA', count: '4'},
    ]);

    const [newName, setNewComponentName] = useState('новый компонент')
    const [newCount, setNewComponentCount] = useState('0')

    const fetchComponent = async () => {
        try {
            const id = mongoose.Types.ObjectId.createFromHexString(containerId)
            const data = await getComponents(id)
            setComponents(data)
        } catch (error) {
            alert(error)
        }
    }

    const getComponents = async (id) => {
        const {data} = await axios(`/router2/${id}`)
        console.log(data)
        return(data)
    }

    useEffect(()=> {
        let clean = false
        fetchComponent()
        return () => clean = true
    }, [])

    const addNewComponent = async () => {
        try {
            const {data} = await axios.post('/router2', {containerId, newName, newCount})
            if (data)
                fetchComponent()

        } catch (error) {
            alert(error)
        }
    }

    return(
        <View  style={styles.container}>
            <View style={styles.infoContainer}>
                <Ionicons name='archive' size={30} color='tomato'/>
                <Text style={styles.containerInfoText}>id: {containerId}</Text>
                <Text style={styles.containerInfoText}>{route.params.con_name}</Text>
            </View>
            <View style={styles.addContainer}>
                <TextInput style={styles.textInput} placeholder="add component..." onChangeText={setNewComponentName}/>
                <TextInput style={styles.textInput2} placeholder="count..." onChangeText={setNewComponentCount}/>
                <Pressable style={styles.button} onPressIn={fadeIn} onPressOut={fadeOut} onPress={addNewComponent}>
                    <Animated.View
                        style={{
                            opacity: animated,
                        }}>
                        <Ionicons name='add-outline' size={30} color='black'/>
                    </Animated.View>
                </Pressable>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList data={components} renderItem={({item}) => (
                        <View style={styles.ListItemContainer}>
                        <View style={styles.ListItemContent}>
                            <Ionicons name='caret-forward-outline' size={20} color='tomato'/>
                            <Text style={styles.text}>"{item.name}"</Text>
                            <Text style={styles.text}>{item.count}</Text>
                        </View>
                    </View>
                )}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        backgroundColor: 'white',
        alignItems: "center",
        padding: 20,
    },
    flatListContainer: {

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
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
    },
    containerInfoText: {
        fontSize: 20,
        margin: 5,
    },
    addContainer: {
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        marginVertical: 5,
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
        flex: 2,
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingVertical: 10,
        fontSize: 16,
    },
    textInput2: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingVertical: 10,
        fontSize: 16,
    },
    tabButton:
    {
        marginRight: 20,
    }
});