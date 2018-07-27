import React, { Component } from 'react';
import { View,
         ScrollView,
         Text, 
         ViewPagerAndroid, 
         StyleSheet, 
         Image, 
         Linking, 
         TouchableOpacity, } from 'react-native';
import { BoxText, BoxHeader } from './';
import { FIND_MORE_LAST_FM, 
        SWIPE_FOR_MORE, 
        API_ARTIST_PART_1,
        API_ARTIST_PART_2,
        NO_INFO_ERROR_MSG } from './StringsFromApp';
import Axios from '../../node_modules/axios';


export default class ArtistDetails extends Component {
   state = {
        name: '',
        uriImagesArray: [],
        artistGenre: '',
        artistName: this.props.navigation.getParam('artistName', 'none'),
        bioText: '',
        urlWebSite: '',
        errorMsg: ''
      };

    componentDidMount() {
       this.getArtistDetails();
    }
    getArtistDetails = () => {
        const API_ARTIST_STRING = API_ARTIST_PART_1 + this.state.artistName + API_ARTIST_PART_2;
        Axios.get(API_ARTIST_STRING)
            .then((response) => {
                // console.log(response);
                if (response.data.artist.name !== 'unknown') {
                    this.setState({
                        name: response.data.artist.name, 
                        uriImage: response.data.artist.image['2']['#text'],
                        artistGenre: response.data.artist.tags.tag['0'].name,
                        bioText: response.data.artist.bio.summary,
                        urlWebSite: response.data.artist.url,
                    });
                } else {
                    this.setState({
                        errorMsg: NO_INFO_ERROR_MSG
                    });
                } 
            })
            .catch(err => (
                console.error(err)
            )); 
        };
    
  render() {
    const { viewStyle, textStyle, captionStyle, swipeStyle, linkStyle } = styles;
    const { name, uriImage, artistGenre, bioText, urlWebSite, errorMsg } = this.state;
    return (
        <ViewPagerAndroid style={viewStyle} initialPage={0}>

            <View style={viewStyle} key='1'>
                    <BoxHeader>
                        <Text style={captionStyle}> {name} </Text>
                        <Text style={captionStyle}> {errorMsg} </Text>
                    </BoxHeader>

                    <Image source={{ uri: uriImage }} style={{ width: 250, height: 250 }} />
                    <Text style={textStyle}> {artistGenre} </Text>
                    <Text style={swipeStyle}>{SWIPE_FOR_MORE}</Text>
            </View>

            <BoxText style={viewStyle} key='2'>
                <ScrollView>
                    <Text style={textStyle}>
                        {bioText.substring(0, bioText.indexOf('<'))}
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL(urlWebSite)}>
                        <Text style={linkStyle} >{FIND_MORE_LAST_FM} </Text>
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
