import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import SvgUri from 'react-native-svg-uri';

const CountryItem = (props) => (
    
             <View style={styles.viewStyle}>
             {/* <SvgUri source={{ uri: props.data.flag }} width='50' height='50' /> */}
                <Text style={styles.stateStyle} >{props.data.name} </Text>
                
            </View>
       
    );
export default CountryItem;
const styles = StyleSheet.create({
    viewStyle: {
        padding: 10,
        margin: 10,
        backgroundColor: '#c2de83',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    stateStyle: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // color: 'green'
    },
    
});
