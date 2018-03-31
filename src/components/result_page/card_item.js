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
  PropTypes
} from 'react-native';

const window = Dimensions.get('window');
const AppConstants = require('./../../settings/constants');

export default class CardItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <TouchableOpacity style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: this.props.hotelImage}}
            />
            <Text style={styles.hotelName}> {this.props.hotelName} </Text>
        </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: window.height * 0.3,
    width: window.width,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    margin: 2,
    borderRadius: 10,
    borderColor: '#D5DBDB',
  },
  image: {
    height: window.height * 0.3,
    width: window.width * 0.4,
  },
  hotelName: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});
