import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Axios from '../../node_modules/axios';
import { BoxHeader, ArtistItem } from './';
import { API_ARTISTS_PART_1, 
         API_ARTISTS_PART_2, 
         NO_INFO_ERROR_MSG, 
         ARTISTS_CAPTION_PART_1_STRING, 
         ARTISTS_CAPTION_PART_2_STRING } from './StringsFromApp';


export default class Artists extends Component {
  state={
    data: [],
    countryName: this.props.navigation.getParam('countryName', 'spain'),
    errorMsg: ''
  }
  
  componentDidMount() {
    this.getTopArtists();
  }
  getTopArtists = () => {
    const API_ARTISTS_STRING = API_ARTISTS_PART_1 + this.state.countryName + API_ARTISTS_PART_2;
    Axios.get(API_ARTISTS_STRING)
      .then(response => {
        // console.log(response);
        if (response.data.topartists['@attr'].total !== '0') {
          this.setState({
            data: response.data.topartists.artist, 
          });
        } else {
          this.setState({
            errorMsg: NO_INFO_ERROR_MSG
          });
          Alert.alert(NO_INFO_ERROR_MSG);
          this.props.navigation.navigate('WelcomeRoute');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert(NO_INFO_ERROR_MSG);
        this.props.navigation.navigate('WelcomeRoute');
      });
  }
 
  myRenderItem = ({ item }) => (
      <ArtistItem data={item} navigation={this.props.navigation} />
    );
    
  myKeyExtractor = (item) => item.mbid.toString();

  render() {
    const { countryName, data, errorMsg } = this.state;
    const { textStyle, viewStyle, } = styles;

    return (
      <View style={viewStyle}>
        <BoxHeader>
          <Text style={textStyle}>
            {ARTISTS_CAPTION_PART_1_STRING}{countryName}{ARTISTS_CAPTION_PART_2_STRING}
            {errorMsg}
           </Text>
        </BoxHeader> 
        <FlatList 
            data={data}
            renderItem={this.myRenderItem}
            keyExtractor={this.myKeyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: '#d3ffce',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20,
        padding: 10,
        alignSelf: 'center',
    }
});
