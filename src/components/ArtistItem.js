import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BoxText } from './';

const ArtistItem = ({ data, navigation }) => {
    const { name } = data;
    const { textStyle } = styles;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ArtistDetailsRoute', { artistName: name })}
        >
            <BoxText>
                <Text style={textStyle} >{name}</Text>
            </BoxText>
        </TouchableOpacity> 
    );  
};
export { ArtistItem };

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        paddingLeft: 10,
    }
});
