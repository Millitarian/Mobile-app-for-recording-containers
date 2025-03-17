import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons'

import axios from 'axios'
axios.defaults.baseURL = 'http://172.16.9.37:8080/api'

export default function SearchScreen({navigation}) {
    const [search, setSearch] = useState("");
    const [Containers, setContainer] = useState([]);

    const updateSearch = (search) => {
        setSearch(search);
    };

    useEffect(()=> {
        let clean = false
        fetchContainer()
        return () => clean = true
    }, [search])

    const get = async () => {
        if (search) {
            const name = search
            const {data} = await axios(`/router3/${name}`)
            console.log(data)
            return data
        }
    }

    const fetchContainer = async () => {
        try {
            const data = await get() 
            setContainer(data)
        } catch (error) {
            alert(error)
        }
    }





    return(
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={updateSearch}
                    value={search}
                    platform="android"
                />
            </View>
            <View style={styles.container}>
                <FlatList data={Containers} renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('AllInfo',{con_id: item._id, con_name: item.name})}>
                        <View style={styles.ListItemContainer}>
                            <View style={styles.ListItemContent}>
                                <Ionicons name='archive' size={20} color='tomato'/>
                                <Text style={styles.text}>"{item.name}"</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarContainer: {
        marginBottom: 5,
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
        fontSize: 16,
        marginHorizontal: 10,
    },
});