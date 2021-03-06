import React, { useState, useEffect } from 'react';
import config from 'config';
import { Link, Redirect } from 'react-router-dom';
import { message } from 'antd';
import back from '../../static/back.png';
import logo from '../../static/logo_beta_6.svg';

export const Login = () => {

	const [submitted, toSubmit] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(false);

    const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		toSubmit(true);
	};

	useEffect(() => {
		if(!submitted) return;
		toSubmit(false);
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('accept', 'application/json');
		fetch(`${config.apiUrl}/auth/login`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({ email: email, password: password })
		}).then(response => response.json()).then(data => {
			console.log(data.message);
			if(data.message !== 'Auth failed') {
				data.email = email;
				localStorage.setItem('user', JSON.stringify(data));
				setSuccess(true);
			} else {
				message.warning("Wrong email and/or password!");
      }
		});
	}, [submitted]);

	return (
		<div className="custom" style={{ height: '100vh', width: '100vw', position: 'relative' }}>
			<img src={back} style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1 }} />
			<div className="container" style={{ position: 'absolute', zIndex: 2, width: '100%' }}>
				<div className="row" style={{textAlign:'center', marginTop: '10vh'}}>
					<img src={logo} />
				</div>
				<div className="row">
					<div className="col-sm-4 col-xs-1"></div>
					<div className="col-sm-4 col-xs-10" style={{ padding: '40px 30px', background: 'white', borderRadius: '2px', marginTop: '10vh' }}>
						<div>
							<h2 className="text-center" style={{fontFamily:'Poppins, Light', color: '#455A64'}}>Sign in to start your session</h2>
							<br />
							<form name="form" onSubmit={handleSubmit}>
								<div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
									<input type="text" className="form-control" placeholder="Email" autoComplete="true" name="email" value={email} onChange={handleEmail}  style={{borderRadius:'1px'}}/>
									{ submitted && !email &&
										<div className="help-block">Email is required</div>
									}
								</div>
								<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
									<input type="password" className="form-control" placeholder="Password" autoComplete="true" name="password" value={password} onChange={handlePassword} style={{borderRadius:'1px'}}/>
									{ submitted && !password &&
										<div className="help-block">Password is required</div>
									}
								</div>
								<div className="form-check text-left">
								  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />

								  <label className="form-check-label" htmlFor="defaultCheck1" style={{ fontWeight: 'normal' }}>&nbsp;&nbsp;Remember Me</label>
								</div>
								<br />
								<div className="form-group">
									<button className="btn btn-warning" style={{ width: '100%', borderRadius:'0px'}}>Sign In</button>
								</div>
								<br />
								<div className="text-center">
									<Link to={`/forgot-password`} ><span style={{color: '#455A64'}}>Forgot Password?</span></Link>
								</div>
							</form>
						</div>
					</div>
					<div className="col-sm-4 col-xs-1"></div>
				</div>
			</div>
			{ success && <Redirect to='/' /> }
		</div>
	);
};
