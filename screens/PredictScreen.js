
import React from 'react';
import { ActivityIndicator, View, Text, StatusBar, Alert, Button, Image} from 'react-native'
import {connect} from 'react-redux';

//import { NavigationActions } from 'react-navigation'
import { CLARIFAI_KEY } from 'react-native-dotenv'
import Clarifai from 'clarifai'

  
class PredictScreen extends React.Component {
  state={
    picture: null,
  }

  componentDidMount() {
    const clarifai = new Clarifai.App({
      apiKey: CLARIFAI_KEY
    })

    //Clarifai library uses nextTick method which is not supported in React Native
    //Thus setImmediete is required
    //Tutorial says best place to set this polyfill is App.js, but we're not using a polyfill?
    //setImmediete means run this once the end of this javascript executable block is reached.
    process.nextTick = setImmediate // RN polyfill

    const data = this.props.route.params.image
    this.setState({picture: data})
    //const otherParam=navigation.getParam('otherParam','some default value');
    const file = { base64: data }
    
    clarifai.models.predict('bd367be194cf45149e75f01d59f77ba7', data)
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
        console.log(e)
        Alert.alert(
          'An error has occurred',
            'Sorry, the quota may be exceeded, try again later!',
          [
            { text: 'OK'},
          ],
          { cancelable: false }
        )
      })
  }

  render() {

    return (
      <View>
        <Text>This is the predictScreen</Text>
        {this.state.picture && <Image source={{ uri: this.state.picture }} style={{ width: 200, height: 200 }} />}
      </View>
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