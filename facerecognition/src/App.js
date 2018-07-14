import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const particlesOption = {
  particles: {
    number:{
      value: 30,
      "density": {
        "enable": true,
        "value_area": 800
      }
    }
  }
}


const app = new Clarifai.App({
 apiKey: 'df5de14b3e2c4c45b3f154904511b159'
});


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
    console.log(data);
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=>{
    console.log(box);
    this.setState({box: box});
  }
  OnInputChange = (event)=>{
    this.setState({input: event.target.value});
  }

  OnButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
          Clarifai.FACE_DETECT_MODEL,
        // COLOR_MODEL,
          // URL
          this.state.input,
      )
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route)=>{
      this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className = 'particles' params={particlesOption}/>
        <Navigation onRouteChange = {this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
              <Logo /> 
              <Rank />
              <ImageLinkForm 
                OnInputChange = {this.OnInputChange} 
                OnButtonSubmit = {this.OnButtonSubmit}/>
              <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
            </div>
          : ( this.state.route === 'signin'
              ? <SignIn onRouteChange = {this.onRouteChange}/>
              : <Register onRouteChange = {this.onRouteChange} />)
          
          
        }
      </div>
    );
  }
}

export default App;
