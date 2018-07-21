import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ArtistItem = (props) => (
      <View>
          <Text style={styles.textStyle} >{props.data.name}</Text>
      </View>
  );
export default ArtistItem;
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        margin: 10,
        paddingLeft: 20,
    }
});
