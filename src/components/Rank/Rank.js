import React from 'react';
import './Rank.css';

const Rank = ({name, entries, nums}) => {
	// const entriesInt = entries
	// const numsInt = nums
	return (
		<div>
			<div className='white f3'>
				{`${name}, Your Total Images Detected:`}
			</div>
			<div className='white f2'>
				{ entries }
			</div>
			
		</div>
	);
};

export default Rank;