import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Axios from '../../node_modules/axios';
import { BoxHeader, ArtistItem } from './';


export default class Artists extends Component {
  state={
    data: [],
    countryName: this.props.navigation.getParam('countryName', 'spain')
  }
  
  componentDidMount() {
    this.getTopArtists();
  }
  getTopArtists = () => {
    Axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${this.state.countryName}&api_key=1578beb2c1523bc37e494feca8a47421&format=json`)
      .then(response => {
        this.setState({
          data: response.data.topartists.artist, 
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  myRenderItem = ({ item }) => (
      <ArtistItem data={item} navigation={this.props.navigation} />
    );
    
  myKeyExtractor = (item) => item.mbid.toString();

  render() {
    const { countryName, data } = this.state;
    const { textStyle, viewStyle, } = styles;

    return (
      <View style={viewStyle}>
        <BoxHeader>
          <Text style={textStyle}>
            Top 50 artists from {countryName}. Tap to find
            some details about them!
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
