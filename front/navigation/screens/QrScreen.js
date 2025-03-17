import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Modal } from "react-native";
import { CameraView, Camera } from "expo-camera";

import mongoose from "mongoose";
import axios from 'axios'
axios.defaults.baseURL = 'http://172.16.9.37:8080/api'

export default function QrScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = async ({data}) => {
        setScanned(true)
        const containerId = mongoose.Types.ObjectId.createFromHexString(data)
        const con = await takeConData(containerId) 
        navigation.navigate('AllInfo', {con_id: con._id, con_name: con.name})
            
    };

    const takeConData = async (containerId) =>{
        const {data} = await axios(`/router1/${containerId}`)
        console.log(data)
        return(data)
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
            <Pressable style={styles.button} onPress={() => setScanned(false)} >
                <Text style={styles.btext} >Tap to Scan Again</Text>  
            </Pressable>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
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
    modalContent: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    modalButton: {
        alignItems: "center",
        paddingBottom: 20,
        paddingTop: 20,
    },
});