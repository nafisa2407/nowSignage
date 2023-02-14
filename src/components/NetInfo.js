import React, { useState, useEffect } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";

import { Text } from 'react-native-elements';
const NetInfo = () => {
    const netInfo = useNetInfo();
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setVisible(!netInfo?.isConnected)
    }, [])

    useEffect(() => {
        setVisible(true)

        setTimeout(() => {
            if (netInfo?.isConnected) {
                setVisible(false)
            }
        }, 2000);

    }, [netInfo?.isConnected])

    return (
        visible &&
        <Text style={{
            marginTop: 20,
            backgroundColor: netInfo?.isConnected ? "green" : 'red',
            paddingVertical: 30, textAlign: 'center',
            fontWeight: 'bold', fontSize: 18
        }}>
            {netInfo?.isConnected ? "back online" : "Could not connect to the internet..."}
        </Text>)

};


export default NetInfo;
