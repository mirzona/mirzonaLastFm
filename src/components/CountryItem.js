import React from 'react';
import { Text, StyleSheet } from 'react-native';
import BoxText from './BoxText';
// import SvgUri from 'react-native-svg-uri';

const CountryItem = (props) => (

    <BoxText>
         <Text style={styles.textStyle} >{props.data.name} </Text>
         {/* <SvgUri source={{ uri: props.data.flag }} width='50' height='50' />        */}

    </BoxText>
    );
export default CountryItem;
const styles = StyleSheet.create({
    
    textStyle: {
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    
});
