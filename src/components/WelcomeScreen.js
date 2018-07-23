import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Axios from '../../node_modules/axios';
import { BoxHeader, CountryItem } from './';

export default class WelcomeScreen extends Component {
    state = {
        data: [],
    }
    componentDidMount() {
       this.getCountries();
    }
    getCountries = () => Axios.get('http://countryapi.gear.host/v1/Country/getCountries')
            .then((response) => {
                this.setState({
                    data: response.data.Response,
                });
            }
        )
            .catch(err => console.error(err));
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
                    Chose a country and see 50 most listening music artists there!
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
