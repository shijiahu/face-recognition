import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
		<div className='ma4 mt0 center'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 120, width: 120 }} >
				<div className="Tilt-inner pa1">
					<img style={{paddingTop: '6px', height: 100, width: 100}} alt='logo' src={brain}/>
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;