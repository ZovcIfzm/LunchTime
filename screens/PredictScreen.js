
import React from 'react';
import { ActivityIndicator, View, Text, StatusBar, Alert, } from 'react-native'
import {connect} from 'react-redux';

//import { NavigationActions } from 'react-navigation'
//import { CLARIFAY_KEY } from 'react-native-dotenv'
import Clarifai from 'clarifai'

  
class PredictScreen extends React.Component {

  render() {

    return (
      <View></View>
    )
  }
}

function mapStateToProps(state){
return{
  counter:state.counter
}
}

function mapDispatchToProps(dispatch){
return{
  increaseCounter: () => dispatch({type:'INCREASE_COUNTER'}),
  decreaseCounter: () => dispatch({type: 'DECREASE_COUNTER'}),
}
}


export default connect(mapStateToProps, mapDispatchToProps)(PredictScreen);