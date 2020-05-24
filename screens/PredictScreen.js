
import React from 'react';
import { StyleSheet, ScrollView, ImageBackground, View, Text, Alert, Image} from 'react-native'
import {connect} from 'react-redux';
import ImageManipulator from 'expo';
//import { NavigationActions } from 'react-navigation'
import { CLARIFAI_KEY, WOLFRAM_KEY } from 'react-native-dotenv'
import Clarifai from 'clarifai'
import {NavigationEvents} from 'react-navigation'
import * as fbfunc from '../firebase_functions'  
import {Header} from 'react-native-elements'

class PredictScreen extends React.Component {
  state={
    picture: null,
    loading: false,
    topFiveIngredients: [],
    calorie_count: 760,
    sat_fats: '64%',
    unsat_fats: '76%',
    protein: '21%'
  }

  resize = async photo => {
    let manipulatedImage = await ImageManipulator.manipulate(
      photo,
      [{ resize: { height: 300, width: 300 } }],
      { base64: true }
    );
    return manipulatedImage.base64;
   }; 

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
    //console.log(file)
    
    console.log("reached predict")
    
    clarifai.models.predict('bd367be194cf45149e75f01d59f77ba7', file)
      .then(response => {
        console.log("into predict")
        const { concepts } = response.outputs[0].data
        this.setState({topFiveIngredients: [concepts[0].name, concepts[1].name, concepts[2].name, concepts[3].name, concepts[4].name]})
        console.log(concepts[0].name)
        console.log(concepts[1].name)
        console.log(concepts[2].name)
        console.log(concepts[3].name)
        
        console.log(fbfunc.testHi())
        fbfunc.addMeal("<TEST>", "meal", this.state.topFiveIngredients)
        
        //Wolfram
        //getNutritionalInfo("http://api.wolframalpha.com/v2/query?input='+tag+'%20nutrition%20facts&appid='"+WOLFRAM_KEY, function (result) {
        //  $('#concepts').html('<h3>'+ tag + '</h3>' + "<img src='"+result+"'>");
        //});

        if (concepts && concepts.length > 0) {
          for (const prediction of concepts) {
            if (prediction.name === 'pizza' && prediction.value >= 0.99) {
              console.log("reached inner result")
              console.log("Pizza")
              return this.setState({ loading: false, result: 'Pizza' })
            }
            this.setState({ result: 'Not Pizza' })
          }
        }
        console.log("reached result")
        console.log(this.state.result)
        this.setState({ loading: false })
      })
      .catch(e => {
        console.log(e)
        Alert.alert(
          'Please submit a photo first',
          [
            { text: 'OK'},
          ],
          { cancelable: false }
        )
      })
  }

  render() {

    <NavigationEvents onDidFocus={() => console.log('I am triggered')} />

    return (
      <ImageBackground 
      source={require('../assets/images/kitchentable.jpg')} 
      style={styles.container}
      blurRadius={1}>
        <ImageBackground 
        source={require('../assets/images/wood.jpg')} 
        style={styles.headerBack}
        blurRadius={1}
        >
          <Header 
              backgroundColor='#fff'
              leftComponent={{icon: 'menu', color: 'black'}}
              centerComponent={{ text: 'Analyze', style: styles.headerText}}
              //rightComponent={{ text: 'Right component', style: styles.headerText }}
              containerStyle={{
                elevation: 10,
                shadowOffset:{  width: 10,  height: 10,  },
                shadowColor: 'black',
                shadowOpacity: 1.0,
                backgroundColor: 'transparent',
                paddingBottom: 20,
                height: 60,
              }}
              >
          </Header>
        </ImageBackground>
        <ScrollView style={styles.container}>
      
        <Image source={{ uri: `data:${"image"};base64,${this.state.picture}` }} style={styles.foodRecommendation} />
        
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Largest food component: " + this.state.topFiveIngredients[0]}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Second largest food component: " + this.state.topFiveIngredients[1]}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Third largest food component: " + this.state.topFiveIngredients[2]}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Calories: " + this.state.calorie_count}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Protein: " + this.state.protein}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Saturated fats: " + this.state.sat_fats}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Unsaturated fats: " + this.state.unsat_fats}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationFilename: {
    marginTop: 5,
  },
  headerText: {
    fontSize: 25,
    color: 'whitesmoke',
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 5,
    margin: 5,
    padding: 12,
    borderRadius: 5,
    elevation: 5,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    opacity: 0.75,
  },
  infoCardText: {
    textAlign: 'center',
    fontSize: 18,
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 63,
    margin: 5,
  },
  foodRecommendation: {
    alignSelf: 'center',
    width: 350,
    height: 300,
    borderRadius: 20,
    margin: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
  },
  
  headerBack:{ 
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PredictScreen);