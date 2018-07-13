import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
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
    }
  }

  OnInputChange = (event)=>{
    this.setState({input: event.target.value});
  }

  OnButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,
        // COLOR_MODEL,
          // URL
          this.state.input
      )
      .then(
          function(response) {
          // do something with response
            console.log(response);
          },
          function(err) {// there was an error
          }
      );
  }

  render() {
    return (
      <div className="App">
        <Particles className = 'particles' params={particlesOption}/>
        <Navigation />
        <Logo /> 
        <Rank />
        <ImageLinkForm 
          OnInputChange = {this.OnInputChange} 
          OnButtonSubmit = {this.OnButtonSubmit}/>
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
