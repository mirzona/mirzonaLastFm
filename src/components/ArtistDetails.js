import React, { Component } from 'react';
import { View, Text, ViewPagerAndroid, StyleSheet, Image, } from 'react-native';
import Axios from '../../node_modules/axios';
import BoxText from './BoxText';

export default class ArtistDetails extends Component {
    state= {
        name: '',
        uriImagesArray: [],
        artistGenre: '',
        artistName: this.props.navigation.getParam('artistName', 'none'),
        bioText: '',
    }
    componentDidMount() {
        this.getArtistDetails();
    }
    getArtistDetails = () => (
        Axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.state.artistName}&api_key=1578beb2c1523bc37e494feca8a47421&format=json`)
            .then(response => {
                console.log(response);
                this.setState({
                    name: response.data.artist.name,
                    uriImage: response.data.artist.image['2']['#text'],
                    artistGenre: response.data.artist.tags.tag['0'].name,
                    bioText: response.data.artist.bio.summary,
                });
            })
            .catch(err => (
                console.error(err)
            ))
            
    );
  render() {
    return (
        <ViewPagerAndroid style={styles.viewStyle} initialPage={0}>
            <View style={styles.viewStyle} key='1'>
                <Text style={styles.captionStyle}> {this.state.name} </Text>
                <Image source={{ uri: this.state.uriImage }} style={{ width: 250, height: 250 }} />
                <Text style={styles.textStyle}> {this.state.artistGenre} </Text>
                <Text style={styles.swipetStyle}> swipe for more >> </Text>
            </View>
            <View style={styles.viewStyle} key='2'>
                <Text style={styles.textStyle}>
                    {this.state.bioText.substring(0, this.state.bioText.indexOf('<'))}
                 </Text>
            </View>                          
        </ViewPagerAndroid>
      
    );
  }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: '#d3ffce',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captionStyle: {
        fontSize: 50,
        color: 'red'
    },
    textStyle: {
        padding: 5,
        fontSize: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipetStyle: {
        padding: 5,
        fontSize: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey'
    }
});
