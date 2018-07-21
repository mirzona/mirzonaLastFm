import React from 'react';
import { Text, StyleSheet } from 'react-native';
import BoxText from './BoxText';

const ArtistItem = (props) => (

      <BoxText>
          <Text style={styles.textStyle} >{props.data.name}</Text>
      </BoxText>
  );
export default ArtistItem;
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 25,
        paddingLeft: 10,
    }
});
