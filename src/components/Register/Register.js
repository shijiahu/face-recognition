import React from 'react';
import SimpleReactValidator from 'simple-react-validator'


class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password: '',
			name: '',
		};
		this.validator = new SimpleReactValidator();
	}
	onNameChange = (event) =>{
		this.setState({name: event.target.value });
	}

	onEmailChange = (event) =>{
		this.setState({email: event.target.value });
	}

	onPasswordChange = (event) =>{
		this.setState({password: event.target.value });
	}

	onSubmitSignIn = () =>{
		if( ! this.validator.allValid() ){
		    this.validator.showMessages();
		    // rerender to show messages for the first time
		    this.forceUpdate();
		}
		fetch('https://agile-stream-69526.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user =>{
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home')
			}
		})
		
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        	onChange = {this.onNameChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="name"  
				        	id="name" />
				        {this.validator.message('name', this.state.name, 'required')}
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	onChange = {this.onEmailChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 form-control" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" />
				        {this.validator.message('email', this.state.email, 'required|email', 'text-danger')}
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	onChange = {this.onPasswordChange}
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" />
				        {this.validator.message('password', this.state.password, 'required|min:6|max:12', false, {min: 'Must have 6 more characters',max:'Must have 12 less characters'})}
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick = {this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Create New Account"
				      />
				    </div>
				  </div>
				</main>
			</article>
		);
	}
};

export default Register;