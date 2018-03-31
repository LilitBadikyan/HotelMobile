import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import SearchItem from './search_item';

const window = Dimensions.get('window');
const AppConstants = require('./../../settings/constants');
const NetworkService = require('./../../networking/service');

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.towns = [];
    this.townsToSuggest = [];
    this.text_input = '';
    this.state = {
      search_clicked: false,
      suggestions: [],
      search_town: '',
    }
  }

  componentWillMount() {
    console.log('=====================');
    NetworkService.makeAPIGetRequest(AppConstants.API_BASE_URL).then(data => {
      let temp_arr = data.map(item => {
        return {
          hotelTown: item.hotelTown,
        }
      });
      this.towns = [...new Set(temp_arr.map(item => item.hotelTown))];
    }).catch(err => {
      Alert.alert('Error', 'Sorry, but an error occurred while connecting to the server. Please check your network connection');
      console.log('err', err);
      return err;
    })
  }

  autosuggest(search_town) {
    this.text_input = search_town;

    if (search_town == '') {
      this.setState({
        suggestions: []
      });
      return;
    }
    NetworkService.makeAPIGetRequest(AppConstants.API_BASE_URL + '/townsuggestions?town=' + search_town).then(data => {
      if (!data) {
        this.setState({
          suggestions: []
        });
        return;
      } else {
        let temp_arr = data.map(item => {
          return {
            hotelTown: item.hotelTown,
          }
        });
        this.townsToSuggest = [... new Set(temp_arr.map(item => item.hotelTown))];
        let result = this.townsToSuggest.map((array_item, index) => {
          let item = <SearchItem key={index} town_name={array_item} updateScreen={this.props.updateScreen} />
          return item;
        })
        this.setState({
          suggestions: result
        });
      }
    }).catch(err => {
      return err;
    })
  }

  searchButtonClick(search_town) {
    if (search_town == '') {
      let result = this.towns.map((array_item, index) => {
        let item = <SearchItem key={index} town_name={array_item} updateScreen={this.props.updateScreen} />
        return item;
      })
      this.setState({
        suggestions: result
      });
      return true;
    }

    NetworkService.makeAPIGetRequest(AppConstants.API_BASE_URL + '/townsuggestions?town=' + search_town).then(data => {
      let temp_arr = data.map(item => {
        return {
          hotelTown: item.hotelTown,
        }
      });
      this.townsToSuggest = [... new Set(temp_arr.map(item => item.hotelTown))];
      let result = this.townsToSuggest.map((array_item, index) => {
        let item = <SearchItem key={index} town_name={array_item} updateScreen={this.props.updateScreen} />
        return item;
      })
      this.setState({
        suggestions: result
      });
    }).catch(err => {
      return err;
    })

  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={styles.searchTextInput}
            underlineColorAndroid='transparent'
            onFocus = {() => this.searchButtonClick(this.text_input)}
            onChangeText = {(search_town) => this.autosuggest(search_town)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => this.searchButtonClick(this.text_input)}>
            <Image
              source={require('./../../../icons/search-icon.png')}
              style={styles.searchButtonIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{width: window.width, height: window.height*0.85}}>
          {this.state.suggestions}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: window.height * 0.1,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchTextInput: {
    height: window.height * 0.1,
    width: window.width * 0.7,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#D5DBDB',
    borderRadius: 5,
  },
  searchButton: {
    height: window.height * 0.1,
    width: window.height * 0.1,
    backgroundColor: '#2E86C1',
    borderRadius: window.height * 0.1 / 2,
    margin: window.width * 0.02,
  },
  searchButtonIcon: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').height * 0.1,
  }
});
