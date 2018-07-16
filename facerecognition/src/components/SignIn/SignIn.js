import React from 'react';
import './SignIn.css';
import SimpleReactValidator from 'simple-react-validator'

class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword: '',
		};
		this.validator = new SimpleReactValidator();
	}
	onEmailChange = (event) =>{
		this.setState({signInEmail: event.target.value });
	}

	onPasswordChange = (event) =>{
		this.setState({signInPassword: event.target.value });
	}

	onSubmitSignIn = () =>{
		if( ! this.validator.allValid() ){
		    this.validator.showMessages();
		    // rerender to show messages for the first time
		    this.forceUpdate();
		}
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
			  this.props.loadUser(user);
			  this.props.onRouteChange('home');
			}
		})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange = {this.onEmailChange}/>
				        {this.validator.message('email', this.state.signInEmail, 'required|email', 'text-danger')}
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	onChange = {this.onPasswordChange}
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" />
				        {this.validator.message('password', this.state.signInPassword, 'required')}
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick = {this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in"
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick = {()=>onRouteChange('register')}className="f6 link dim black db pointer">Sign up</p>
				      <a href="#0" className="f6 link dim black db">Forgot your password?</a>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
};

export default SignIn;