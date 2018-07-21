import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CountryItem from './CountryItem';
import Axios from '../../node_modules/axios';
import BoxHeader from './BoxHeader';

export default class WelcomeScreen extends Component {
    state = {
        data: [],
    }
    componentDidMount() {
       this.getCountries();
    }
    getCountries = () => Axios.get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                // console.log(response);
                this.setState({
                    data: response.data,
                });
            }
        )
            .catch(err => console.error(err));
    myKeyExtractor = (item) => item.numericCode.toString();
    myRenderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ArtistsRoute',
                { countryName: item.name })}
            >
                <CountryItem data={item} />
            </TouchableOpacity>
        );
  render() {
    return (
      <View style={styles.viewStyle} >
            <BoxHeader>
                <Text style={styles.textStyle}>
                    Tap a country and you'll find a top 50 favorite music artists that people listen there!
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        // color: 'green'
    },
});
