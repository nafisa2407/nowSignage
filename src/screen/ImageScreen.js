import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const ImageScreen = ({ url }) => {
    if (!url.length) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: url }}
                style={{ resizeMode: "cover", aspectRatio: 1.2, height: null }}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1

    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default ImageScreen;