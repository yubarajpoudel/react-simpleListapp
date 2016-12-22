/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


'use strict'; //This enables Strict Mode, which adds improved error handling and disables some less-than-ideal JavaScript language features. In simple terms, it makes JavaScript better!

var React = require('react');
var ReactNative = require('react-native');
var SearchPage = require('./SearchPage');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class mainUi extends React.Component {
  render() {
    return <ReactNative.Text style={styles.text}>Hello World (Again)</ReactNative.Text>;
  }
}
class nrnradioApp extends React.Component{
	render(){
		return(
		 <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
		);
	}
}

ReactNative.AppRegistry.registerComponent('nrnradio', function() { return nrnradioApp });
