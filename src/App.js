import React, {useState, useEffect} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {

    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }

    }
  }
}

const initialState= {
 id: '', name: '',  email: '',  entries: 0,  joined: '' 
}

function App() {
const [input, setInput] = useState('');
const [imageUrl, setImageUrl] = useState('');
const [box, setBox] = useState({});
const [boxall, setBoxall] = useState([]);
const [route, setRoute] = useState('SignIn');
const [isSignedIN, setIsSignedIn] = useState(false);
const [user, setUser] = useState({id: '', name: '',  email: '',  entries: 0,  joined: ''});

const loadUser = (user) => {
  setUser(
    {   id : user.id,
        name : user.name,
        email : user.email,
        entries: user.entries,
        joined : user.joined
      }
    )
}

const resetUser = () =>{
  setImageUrl('');
  loadUser(initialState);
  setBoxall([]);
}

  const calculateFaceLocation = (data) => {
    const clarifaiFaceAll = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
     const boxArr = clarifaiFaceAll.map(region => {
      return (
        {
          leftCol :  region.region_info.bounding_box.left_col * width,
          topRow :  region.region_info.bounding_box.top_row * height,
          rightCol : width - (region.region_info.bounding_box.right_col * width),
          bottomRow : height - (region.region_info.bounding_box.bottom_row * height)
        }
      )
    });
    return boxArr;

  }

  const displayFaceBox = (box) => {
   setBoxall(box);
  }

const onInputChange = (event) => {
setInput(event.target.value);
}

const onPictureSumbit = () => {
  setImageUrl(input);

       fetch('https://still-spire-52947.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
             body:JSON.stringify({input: input})
          })
       .then(response => response.json())
     .then(response => 
     {
        if (response) {
          fetch(' https://still-spire-52947.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
             body:JSON.stringify({id: user.id})
          })
        .then(response => response.json())
        .then(count =>setUser( {   
          id : user.id,
        name : user.name,
        email : user.email,
        entries: count,
        joined : user.joined
      }))
        .catch(console.log)

        }
       setBoxall(calculateFaceLocation(response));
      })
      .catch(err => console.log("nooooo"));
  }



const onRouteChange = (route) => {
  if (route === 'SignOut')
  {
    resetUser();
    setIsSignedIn(false);
  }
  else
{  if (route === 'home')
  {
    setIsSignedIn(true);
  }
}
  setRoute(route);
}

  return (
    <div className="App">
     <Particles className='particles'
          params={particlesOptions}
        />

     <Navigation  onRouteChange={onRouteChange} isSignedIN={isSignedIN} />

{route === 'home'
? 
<div>
     <Logo/>
     <Rank name={user.name} entries = {user.entries}/>
   <ImageLinkForm onInputChange={onInputChange} onPictureSumbit={onPictureSumbit}/>
     <FaceRecognition boxA ={boxall} imageUrl={imageUrl}/>
     </div>
    
:   (
  route === 'SignIn' || route === 'SignOut'
  ?
  <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
  
:
<Register onRouteChange={onRouteChange} loadUser={loadUser}/>
)
}
</div>
  );
}

export default App;