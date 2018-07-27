import React from 'react';
import { View, StyleSheet } from 'react-native';

const BoxText = (props) => {
    const { boxTextStyle } = styles;
    return (
        <View style={boxTextStyle} >
              {props.children}
        </View>
    );
};
export { BoxText };

const styles = StyleSheet.create({
    boxTextStyle: {
        borderWidth: 1,
        borderRadius: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        elevation: 1,
        padding: 5,
    }
});
