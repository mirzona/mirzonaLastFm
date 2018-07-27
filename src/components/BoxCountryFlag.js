import React from 'react';
import { View, StyleSheet } from 'react-native';

const BoxCountryFlag = (props) => {
    const { boxCountryFlagStyle } = styles;
    return (
        <View style={boxCountryFlagStyle} >
              {props.children}
        </View>
    );
};
const styles = StyleSheet.create({
    boxCountryFlagStyle: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 2,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        elevation: 1,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
});
export { BoxCountryFlag };
