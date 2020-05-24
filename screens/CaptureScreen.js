
import * as React from 'react';
import {ImageBackground, Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Header, Card} from 'react-native-elements';
import {connect} from 'react-redux';
//import { TouchableOpacity } from 'react-native-gesture-handler';


class CaptureScreen extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

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
              centerComponent={{ text: 'Capture', style: styles.headerText}}
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
        <View style={{ flex: 1}}>

        <ImageBackground 
          source={require('../assets/images/takingpicofmeal.jpg')}
          style={styles.pictureTaking}>
        </ImageBackground>

          <TouchableOpacity onPress={this._pickImage} style={styles.infoCard}>
            <Text style={styles.infoCardText}>Pick an image from camera roll</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._takePhoto} style={styles.infoCard}>
            <Text style={styles.infoCardText}>Take photo</Text>
          </TouchableOpacity>

          <View>
            {
              image ?
              <View>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: `data:${"image"};base64,${image}` }} style={styles.foodRecommendation} />
                </View>  
              </View>
              : 
              <View style={styles.imageContainer}>
                  <Image source={
                    require('../assets/images/nophoto.jpg')
                  } style={styles.foodRecommendation} />
                
              </View>
            }  
          </View>
          <TouchableOpacity onPress={this._submitPhoto} style={styles.infoCard}>
            <Text style={styles.infoCardText}> Submit photo </Text>
          </TouchableOpacity> 
        </View>
      </ImageBackground>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      
      const { status2 } = await Permissions.askAsync(Permissions.CAMERA);
      if (status2 !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        this.setState({ image: result.base64 });
      }
    } catch (E) {
      console.log(E);
    }
  };

  _takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        this.setState({ image: result.base64 });
      }
    } catch (E) {
      console.log(E);
    }
  };

  _submitPhoto = () => {
    //console.log(this.state.image)
    this.props.navigation.navigate('Predict', {image: this.state.image})
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
  container:{
    flex: 1,
    overflow: 'scroll',
  },
  headerBack:{ 
    height: 60,
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
    width: 250,
    height: 200,
    borderRadius: 20,
  },
  pictureTaking:{
    alignSelf: 'center',
    resizeMode: 'center',
    width: 440,
    height: 200,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'lightblue',
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CaptureScreen);