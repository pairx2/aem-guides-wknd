import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class InlineSVGIcon extends Component {
	static defaultProps = {
		size: 'sm',
	};

	static propTypes = {
		size: PropTypes.oneOf(['sm', 'md', 'lg']),
		icon: PropTypes.string
	};

	state = {};

	componentDidMount() {
		const {icon} = this.props;
		this.setState({svg: require(`../../../../ui.apps/src/main/content/jcr_root/apps/adcworkshop/components/icons/${icon}.html`)});
	}

	render() {
		const {size} = this.props;
		const {svg} = this.state;
		return <i className={`icon icon--${size}`} dangerouslySetInnerHTML={{__html: svg}}/>;
	}
}
