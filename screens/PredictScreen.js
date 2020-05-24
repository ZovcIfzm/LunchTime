
import React from 'react';
import { ActivityIndicator, View, Text, StatusBar, Alert, } from 'react-native'
import {connect} from 'react-redux';

//import { NavigationActions } from 'react-navigation'
//import { CLARIFAY_KEY } from 'react-native-dotenv'
import Clarifai from 'clarifai'

  
class PredictScreen extends React.Component {


  componentDidMount() {
    const clarifai = new Clarifai.App({
      apiKey: CLARIFAY_KEY
    })

    //Clarifai library uses nextTick method which is not supported in React Native
    //Thus setImmediete is required
    //Tutorial says best place to set this polyfill is App.js, but we're not using a polyfill?
    //setImmediete means run this once the end of this javascript executable block is reached.
    process.nextTick = setImmediate // RN polyfill

    const { data } = this.props.navigation.state.params.image
    const file = { base64: data }
    
    clarifai.models.predict(Clarifai.GENERAL_MODEL, file)
      .then(response => {
        const { concepts } = response.outputs[0].data

        if (concepts && concepts.length > 0) {
          for (const prediction of concepts) {
            if (prediction.name === 'pizza' && prediction.value >= 0.99) {
              return this.setState({ loading: false, result: 'Pizza' })
            }
            this.setState({ result: 'Not Pizza' })
          }
        }

        this.setState({ loading: false })
      })
      .catch(e => {
        Alert.alert(
          'Une erreur est survenue',
          'Désolé, le quota est peut-être dépassé, réessaye plus tard !',
          [
            { text: 'OK', onPress: () => this._cancel() },
          ],
          { cancelable: false }
        )
      })
  }

  render() {

    return (
      <Text>This is the predictScreen</Text>
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