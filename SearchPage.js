
// author : yubaraj Poudel
// email : yubarajpoudel708@gmail.com

'use strict';
var SearchResults = require('./SearchResults');
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native'; // this is the sample of destructuring assignment

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 2,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 3,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
}
});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;
 
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 
  return 'http://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
  searchString: 'london',
  isLoading: false,
  message: ''
};
}
onSearchTextChanged(event) {
  console.log('onSearchTextChanged');
  this.setState({ searchString: event.nativeEvent.text });
  console.log(this.state.searchString);
}
_executeQuery(query) {
  console.log(query);
  this.setState({ isLoading: true });
  fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
}

 _handleResponse(response) {
  this.setState({ isLoading: false , message: '' });
  if (response.application_response_code.substr(0, 1) === '1') {
   // console.log('Properties found: ' + response.listings.length);
   // this.setState({message : 'on Handlequery, response = ' + response.listings})
    this.props.navigator.push({
         title: 'Search Result',
         component: SearchResults,
         passProps: {listings: response.listings}
     });
  } else {
    this.setState({ message: 'Location not recognized; please try again.'});
  }
}

onSearchPressed() {
  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
  this._executeQuery(query);
}

  render() {
    console.log('SearchPage.render');
    var spinner = this.state.isLoading ?
      ( <ActivityIndicator
         size='large'/> ) :
      ( <View/>);



    return (
      <View style={styles.container}>
   
        <Text style={styles.description}>
          Search by Property by city name
        </Text>

        <View style = {styles.flowRight}>
        	<TextInput
        		style = {styles.searchInput}
            value = {this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
        		placeholder = 'Search the Property'/>

        	<TouchableHighlight 
        		style = {styles.button}
        		 underlayColor='#99d9f4'
             onPress={this.onSearchPressed.bind(this)}>
        		 <Text style = {styles.buttonText}>
        		 Search
        		 </Text>
        	</TouchableHighlight>

        </View>

        <Image source={require('./resources/house.png')} style={styles.image}/>
        {spinner}

        <Text style={styles.description}>{this.state.message}</Text>

      </View>
    );
  }
}
//This exports the SearchPage class, which permits its use in other files.

module.exports = SearchPage;