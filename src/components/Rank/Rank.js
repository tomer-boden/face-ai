import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
	return (
		<div>
		<div className='white f3'>
		{`${name}, your current rank is...`}
		</div>
		<div className='white f1'>
		{entries}
		</div>
		<div>
		{entries == 0 ?
			<p className='white f4'>i see your'e have 0 entries..., let me help you! put the following url in the searchbox and press detect https://images.daznservices.com/di/library/GOAL_INTERNATIONAL/74/5/barcelona-cwc-18122011_168xl1z31r49m1kj9tclsti7cu.jpg?t=-1508046223 </p>
			:
			<h1> </h1>
		}
		</div>
		</div>


		);
}

export default Rank;