import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable, Share, Animated, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import QRCode from 'react-native-qrcode-svg';
import {captureRef} from "react-native-view-shot";

export default function QrGenScreen({route, navigation}) {
    const containerId = route.params.con_id
    const containerName = route.params.con_name
    const animated = new Animated.Value(1);
    const viewRef = useRef();
    
    navigation.setOptions({
        headerRight: () => (
            <Pressable style={styles.tabButton} onPress={saveQRCode} onPressIn={fadeIn} onPressOut={fadeOut}><Ionicons name='share' size={22} color='black'/></Pressable>
        ),
    })

    saveQRCode = () => {
        this.svg.toDataURL(onShare);
    };

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
    
    const onShare = async (dataURL) => {
        try {
            const uri = await captureRef(viewRef, {format: "png", quality: 0.7});
            console.log(uri);
            const result = await Share.share({
                title:containerName,
                url: uri,
                subject: 'Share Link',
                });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    

    return (
        <View style={styles.container}>
            <View ref={viewRef} collapsable={false}>
                <QRCode 
                    value={containerId}
                    backgroundColor={'tomato'}
                    size={250}
                    quietZone={20}
                    getRef = {(c)=>(this.svg = c)}
                />
            </View>
            <Text style={styles.btext} >{containerName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btext: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        margin: 10,
    },
    tabButton:
    {
        marginRight: 20,
    }
});