const FeatureItem = ({ icon, title, description }) => (
	<div className='feature-item'>
		<img src={icon} alt={`${title} Icon`} className='feature-icon' />
		<h3 className='feature-item-title'>{title}</h3>
		<p>{description}</p>
	</div>
);

export default FeatureItem;
