import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Header, Card, CardItem, ListItem} from 'react-native-elements'
import { MonoText } from '../components/StyledText';

import {connect} from 'react-redux';

class HomeScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Header 
            backgroundColor='#fff'
            leftComponent={{icon: 'menu', color: 'black'}}
            centerComponent={{ text: 'Home', style: styles.headerText}}
            //rightComponent={{ text: 'Right component', style: styles.headerText }}
            containerStyle={{
              elevation: 10,
              shadowOffset:{  width: 10,  height: 10,  },
              shadowColor: 'black',
              shadowOpacity: 1.0,
            }}
            >
        </Header>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Today's Calories: " + this.props.calorie_count}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Protein: " + this.props.protein}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Saturated Fats: " + this.props.saturated_fats}</Text>
          </View>
          <View style={styles.infoCard} >
            <Text style={styles.infoCardText}>{"Unsaturated Fats: " + this.props.calorie_count}</Text>
          </View>

          <TouchableOpacity onPress={() => this.props.increaseCounter()}>
            <Text style={styles.getStartedText}>
              CountUp
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.getStartedText}>{this.props.counter}</Text>


        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
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
    fontFamily: 'Roboto',
    color: 'black'
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
    shadowOpacity: 1.0,
  },
  infoCardText: {
    fontSize: 18,
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);