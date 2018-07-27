import React from 'react';
import { View, StyleSheet } from 'react-native';

const BoxHeader = (props) => {
    const { boxHeaderStyle } = styles;

    return (
        <View style={boxHeaderStyle} >
              {props.children}
        </View>
    );
};
const styles = StyleSheet.create({
    boxHeaderStyle: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'green',
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 20,
        elevation: 2,
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    }
    

});
export { BoxHeader };
