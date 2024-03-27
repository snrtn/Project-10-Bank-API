import React from 'react';
import FeatureItem from '../home/featureItem.js';
import featuresData from '../home/featuresData.js';

const HomeView = () => {
	return (
		<>
			<div className='hero'>
				<section className='hero-content'>
					<h2 className='sr-only'>Promoted Content</h2>
					<p className='subtitle'>No fees.</p>
					<p className='subtitle'>No minimum deposit.</p>
					<p className='subtitle'>High interest rates.</p>
					<p className='text'>Open a savings account with Argent Bank today!</p>
				</section>
			</div>
			<section className='features'>
				<h2 className='sr-only'>Features</h2>
				{featuresData.map((feature) => (
					<FeatureItem key={feature.id} {...feature} />
				))}
			</section>
		</>
	);
};

export default HomeView;
