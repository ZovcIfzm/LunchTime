import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar} from 'react-native';

import { Header, Card, CardItem, ListItem} from 'react-native-elements'
import { MonoText } from '../components/StyledText';
import Animated from 'react-native-reanimated';

import {connect} from 'react-redux';


const images = [
  { id: 1, uri: require("../assets/images/honeyChicken.png")},
  { id: 2, uri: require("../assets/images/bibimbap.jpg")},
  { id: 3, uri: require("../assets/images/braisedpork.png")},
  { id: 4, uri: require("../assets/images/bulgogi.jpg")},
];

const scrollY = new Animated.Value(0);
const HEADER_HEIGHT = 60;
const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
const headerY = Animated.interpolate(diffClampScrollY, {
  inputRange:[0, HEADER_HEIGHT],
  outputRange:[0, -HEADER_HEIGHT]
});
class RecommendScreen extends React.Component{  
  render(){
    
    return (
      <ImageBackground 
      source={require('../assets/images/kitchentable.jpg')} 
      style={styles.container}
      blurRadius={1}>
          <Animated.View
          style={{

            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: HEADER_HEIGHT,
            backgroundColor: 'transparent',
            zIndex: 1000,
            elevation: 1000,
            transform: [{translateY: headerY}],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
              
          <ImageBackground 
          source={require('../assets/images/wood.jpg')} 
          style={styles.headerBack}
          blurRadius={1}
          >
            <Text style={styles.headerText}>Recommended</Text>
          </ImageBackground>
          </Animated.View>
        <Animated.ScrollView
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent:{contentOffset:{y: scrollY}}
            }
          ])}
        >
          <View style={{paddingTop: 60}}></View>
            <View>
            {images.map(image => (
              <View key={image.id} style={{
                height: 200, 
                margin: 5,
                borderRadius: 20,
                elevation: 5,
                shadowOffset:{  width: 10,  height: 10,  },
                shadowColor: 'black',
                shadowOpacity: 0.1,
                }}>
                <Image
                  source= {image.uri}
                  style={{flex: 1, height: null, width: null, borderRadius: 10}}
                />
              </View>
            ))}
            </View>
        </Animated.ScrollView>
      </ImageBackground>
    );
  }
}

RecommendScreen.navigationOptions = {
  header: null,
};


function mapStateToProps(state){
  return{
    counter:state.counter,
    calorie_count:state.calorie_count,
    saturated_fats:state.saturated_fats,
    unsaturated_fats:state.unsaturated_fats,
    protein:state.protein,
    fiber:state.fiber,
    iron:state.iron,
    vitamin_a:state.vitamin_a,
    vitamin_b:state.vitamin_b,
    vitamin_c:state.vitamin_c,
  }
}

function mapDispatchToProps(dispatch){
  return{
    increaseCounter: () => dispatch({type:'INCREASE_COUNTER'}),
    decreaseCounter: () => dispatch({type: 'DECREASE_COUNTER'}),
  }
}

//Color scheme: -- not this one -- https://coolors.co/ef6351-f38375-f7a399-fbc3bc-ffe3e0
//https://coolors.co/6d949b-fff7b5-eabc5a-bf6763-8e5756
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  
  headerBack:{ 
    height: 60,
    width: '100%',
    paddingTop: 18,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  headerText: {
    fontSize: 25,
    color: 'whitesmoke',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 17,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  infoCardText: {
    fontSize: 18,
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 63,
    marginBottom: 20,
  },
  foodRecommendation: {
    alignSelf: 'center',
    width: 250,
    borderRadius: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
  },
  pieContainer: {
    alignSelf: 'center',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(RecommendScreen);