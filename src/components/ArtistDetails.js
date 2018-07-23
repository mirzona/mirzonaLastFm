import React, { Component } from 'react';
import { View,
         ScrollView,
         Text, 
         ViewPagerAndroid, 
         StyleSheet, 
         Image, 
         Linking, 
         TouchableOpacity, } from 'react-native';
import Axios from '../../node_modules/axios';
import { BoxText, BoxHeader } from './';

export default class ArtistDetails extends Component {
   state = {
        name: '',
        uriImagesArray: [],
        artistGenre: '',
        artistName: this.props.navigation.getParam('artistName', 'none'),
        bioText: '',
        urlWebSite: '',
      };

    componentDidMount() {
        this.getArtistDetails();
    }
    getArtistDetails = () => {
        Axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.state.artistName}&api_key=1578beb2c1523bc37e494feca8a47421&format=json`)
            .then(response => {
                // const { artistData } = response.data.artist;
                this.setState({
                    name: response.data.artist.name, 
                    uriImage: response.data.artist.image['2']['#text'],
                    artistGenre: response.data.artist.tags.tag['0'].name,
                    bioText: response.data.artist.bio.summary,
                    urlWebSite: response.data.artist.url,
                });
            })
            .catch(err => (
                console.error(err)
            )); 
        };

  render() {
    const { viewStyle, textStyle, captionStyle, swipeStyle, linkStyle } = styles;
    const { name, uriImage, artistGenre, bioText, urlWebSite, } = this.state;
    return (
        <ViewPagerAndroid style={viewStyle} initialPage={0}>
            <View style={viewStyle} key='1'>
                    <BoxHeader>
                        <Text style={captionStyle}> {name} </Text>
                    </BoxHeader>
                    <Image source={{ uri: uriImage }} style={{ width: 250, height: 250 }} />
                    <Text style={textStyle}> {artistGenre} </Text>
                    <Text style={swipeStyle}> swipe for more >> </Text>
            </View>
            <BoxText style={viewStyle} key='2'>
                <ScrollView>
                <Text style={textStyle}>
                    {bioText.substring(0, bioText.indexOf('<'))}
                 </Text>
                 <TouchableOpacity onPress={() => Linking.openURL(urlWebSite)}>
                     <Text style={linkStyle} >...find more at Last.fm</Text>
                 </TouchableOpacity>
                </ScrollView>
            </BoxText>                          
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
        fontSize: 20,
        color: 'red'
    },
    textStyle: {
        padding: 5,
        fontSize: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeStyle: {
        padding: 5,
        fontSize: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey'
    },
    linkStyle: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 20,
    }
});
