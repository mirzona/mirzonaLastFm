import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Axios from '../../node_modules/axios';
import ArtistItem from './ArtistItem';
import BoxHeader from './BoxHeader';

export default class Artists extends Component {
  state={
    data: [],
    countryName: this.props.navigation.getParam('countryName', 'spain')
  }
  
  componentDidMount() {
    this.getTopArtists();
    console.log(this.state.data);
  }
  getTopArtists = () => {
    Axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${this.state.countryName}&api_key=1578beb2c1523bc37e494feca8a47421&format=json`)
      .then(response => {
        console.log(response);
        this.setState({
          data: response.data.topartists.artist, 
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  myRenderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('ArtistDetailsRoute',
       { artistName: item.name })}
    >
      <ArtistItem data={item} />
    </TouchableOpacity>
    );
    
  myKeyExtractor = (item) => item.mbid.toString();

  render() {
    return (
      <View style={styles.viewStyle}>
      <BoxHeader>
      <Text style={styles.textStyle}>Top 50 artists from {this.state.countryName}
        . Tap to find some details!
        </Text>
      </BoxHeader>
        
        <FlatList 
          data={this.state.data}
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
        // margin: 10,
        // alignItems: 'center',
    },
    textStyle: {
        fontSize: 25,
        padding: 10,
        justifyContent: 'center',
        // margin: 20,
    }
});
