import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { BoxCountryFlag } from './';

const CountryItem = ({ data }) => {
    const { Name, FlagPng } = data;
    const { textStyle, imageStyle } = styles;
    return (
        <BoxCountryFlag >
            <Text style={textStyle} >{Name}</Text>
            <Image source={{ uri: FlagPng }} style={imageStyle} />
         </BoxCountryFlag>
    );
};   
export { CountryItem };

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        alignItems: 'center',
        paddingLeft: 10,     
        justifyContent: 'center',   
    },  
    imageStyle: {
        width: 25, 
        height: 25, 
        marginLeft: 10
    }
});
