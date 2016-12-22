/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


'use strict'; //This enables Strict Mode, which adds improved error handling and disables some less-than-ideal JavaScript language features. In simple terms, it makes JavaScript better!

var React = require('react');
var ReactNative = require('react-native');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

class PropertyFinderApp extends React.Component {
  render() {
    return React.createElement(ReactNative.Text, {style: styles.text}, "Hello World!");
  }
}
ReactNative.AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });
