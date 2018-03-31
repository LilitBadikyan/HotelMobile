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
  BackHandler,
  ScrollView
} from 'react-native';

import CardItem from './card_item';

const NetworkService = require('./../../networking/service');
const AppConstants = require('./../../settings/constants');

export default class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array_of_hotels: [],
    }
  }

  handleBackPress = () => {
    this.props.updateScreen(AppConstants.screens.BACK_PRESSED, {
        from_screen: AppConstants.screens.RESULT_PAGE
    })
    return true;
  }
  componentWillMount() {
    NetworkService.makeAPIGetRequest(AppConstants.API_BASE_URL + '?hotelTown=' + this.props.params.hotel_town).then(data => {
      let arr = data.map(item => {
        return {
          hotelName: item.hotelName,
          hotelImage: item.hotelImage
        }
      })
      this.setState({array_of_hotels: arr})
    }).catch(err => {
      console.log('err', err);
      return err;
    })
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  renderCardItems() {
    return result = this.state.array_of_hotels.map((item, index)=> {
      return <CardItem key={index} hotelName={item.hotelName} hotelImage={item.hotelImage} />
    })
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#E5E7E9'}}>
        {this.renderCardItems()}
      </ScrollView>
    );
  }
}
