import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import Axios from '../../node_modules/axios';
import { BoxHeader, CountryItem } from './';
import { API_COUNTRY_STRING, WELCOME_CAPTION_STRING } from './StringsFromApp';

export default class WelcomeScreen extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        this.getCountries();
    }
    getCountries = async() => {
        try {
            const countries = JSON.parse(await AsyncStorage.getItem('countries'));
            if (countries !== null) {
                // console.log(countries);
                this.setState({ data: countries.data.Response });
            } else {
                this.setCountries();
            } 
        } catch (error) {
            console.error(error);
        }
   }
      setCountries = () => {
       Axios.get(API_COUNTRY_STRING)
       .then((response) => {
           this.setState({ data: response.data.Response });
           AsyncStorage.setItem('countries', JSON.stringify(response));
       })
       .catch((err) => console.log(err));
     };
    
   
    myKeyExtractor = (item) => item.NumericCode.toString();
    myRenderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ArtistsRoute',
                { countryName: item.Name })}
            >
                <CountryItem data={item} />
            </TouchableOpacity>
        );
  render() {
      const { viewStyle, textStyle } = styles;
    return (
      <View style={viewStyle} >
            <BoxHeader>
                <Text style={textStyle}>
                    {WELCOME_CAPTION_STRING}
                </Text>
            </BoxHeader>
          <FlatList 
            data={this.state.data}
            keyExtractor={this.myKeyExtractor}
            renderItem={this.myRenderItem}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#d3ffce',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
    },
});
