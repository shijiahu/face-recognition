import React, { Component } from 'react';
import './App.css';
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

const initialState = {
      input: '',
      imageUrl:'',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data)=>{
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }
  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(console.log);
  // }

  calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    
    // const image = document.getElementById('inputimage');
    // const width = Number(image.width);
    // const height = Number(image.height);
    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height)
    // }
    
    const clarifaiFace = data.outputs[0].data.regions.map( (box) => { return box.region_info.bounding_box})
 
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = clarifaiFace.map((face) => {
        return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height)
        }
      }

    );
    return box;
  }



  displayFaceBox = (box)=>{
    console.log(box);
    console.log("boxlength:" + box.length)
    this.setState({box: box});
  }
  OnInputChange = (event)=>{
    this.setState({input: event.target.value});
  }

  OnButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input});
      fetch('https://agile-stream-69526.herokuapp.com/imageurl', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                input: this.state.input 
              })
            })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://agile-stream-69526.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id, 
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {entries: count }))
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route)=>{
    if (route === 'signout') {
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className = 'particles' params={particlesOption}/>
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
              <Logo /> 
              <Rank name={this.state.user.name} entries={this.state.user.entries} nums = {this.state.box.length}/>
              <ImageLinkForm 
                OnInputChange = {this.OnInputChange} 
                OnButtonSubmit = {this.OnButtonSubmit}/>
              <div className='white f3'>
                { `Faces Detected: ${this.state.box.length}`}
              </div>

              <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
              
            </div>
          : ( this.state.route === 'signin'
              ? <SignIn loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>
              : <Register loadUser= {this.loadUser} onRouteChange = {this.onRouteChange} />)
          
          
        }
      </div>
    );
  }
}

export default App;
