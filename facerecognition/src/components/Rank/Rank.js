import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white f3'>
				{`${name}, Your Total Faces Detected:`}
			</div>
			<div className='white f2'>
				{ entries}
			</div>
		</div>
	);
};

export default Rank;