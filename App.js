/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

import SearchPage from './src/components/search_page/search_page';
import ResultPage from './src/components/result_page/result_page';

const AppConstants = require('./src/settings/constants');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = {
      screens: [AppConstants.screens.SEARCH_PAGE],
      params: {},
    };
    this.renderers = {};
    this.renderers[AppConstants.screens.SEARCH_PAGE] = this.renderSearchPage;
    this.renderers[AppConstants.screens.RESULT_PAGE] = this.renderResultPage;
  }

  updateScreen = (screen, params) => {
    let screens = this.state.screens;
    console.log('screen == ', screen, 'back == ', AppConstants.screens.BACK_PRESSED);
    if (screen == AppConstants.screens.BACK_PRESSED) {
      console.log('2');
        screens.pop();
    } else {
      if (screen == AppConstants.screens.SEARCH_PAGE) {
        console.log('1');
          screens = [];
      }

      let cycle_position = screens.indexOf(screen);
      if (cycle_position != -1) {
          screens.splice(cycle_position, 1);
      }

      if (!screens || !screens.length) {
          screens = [screen];
      }

      if (screens[screens.length - 1] != screen) {
        console.log('3');
          screens.push(screen);
      }
    }
    console.log('state == ', this.state.screens);

    this.setState({
      screens: screens,
      params: params
    });

  }

  render() {
    console.log('renderum screensy', this.state.screens);
    let screens = this.state.screens;
    let current_screen = AppConstants.screens.SEARCH_PAGE;
    if (screens && screens.length) {
        current_screen = screens[screens.length - 1];
        console.log('current_screen == ', current_screen);
    }
    console.log('renderers == ', this.renderers[current_screen]);
    return this.renderers[current_screen]();
  }

  renderSearchPage = () => {
    console.log('======== 1 =======');
    return (
      <SearchPage updateScreen={this.updateScreen} params={this.state.params}/>
    );
  }

  renderResultPage = () => {
    return (
      <ResultPage updateScreen={this.updateScreen} params={this.state.params}/>
    );
  }

}
