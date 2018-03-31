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
  Image
} from 'react-native';

const window = Dimensions.get('window');
const AppConstants = require('./../../settings/constants');

export default class SearchItem extends Component {
  constructor(props) {
    super(props);
  }

  navigateToResultPage = () => {
    this.props.updateScreen(AppConstants.screens.RESULT_PAGE, {
                from_screen: AppConstants.screens.SEARCH_PAGE,
                hotel_town: this.props.town_name,
            });
  }

  render() {
    return (
        <TouchableOpacity style={styles.searchItem} onPress={() => this.navigateToResultPage()}>
          <Text> {this.props.town_name} </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  searchItem: {
    height: window.height * 0.09,
    width: window.width,
    borderWidth: 1/ PixelRatio.get(),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
  }
});
