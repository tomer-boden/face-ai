import React from 'react';

const Navigation = ({onRouteChange, isSignedIN}) => {

		if(isSignedIN){
			return(
					<nav style = {{display : 'flex', justifyContent : 'flex-end'}}>
					<p className ='f3 limk dim black underline pa3 pointer' onClick={()=> onRouteChange('SignOut')}>Sign out</p>
					</nav>)
	}
	else{
		return(
				<nav style = {{display : 'flex', justifyContent : 'flex-end'}}>
				<p className ='f3 limk dim black underline pa3 pointer' onClick={()=> onRouteChange('SignIn')}>Signin</p>
				<p className ='f3 limk dim black underline pa3 pointer' onClick={()=> onRouteChange('register')}>register</p>
				</nav>
				)
	}
}

export default Navigation;