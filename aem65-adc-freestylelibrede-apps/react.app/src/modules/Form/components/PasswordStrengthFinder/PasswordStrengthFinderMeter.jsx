import React, {Component} from 'react';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';

class PasswordStrengthFinderMeter extends Component {
	static propTypes = {
		colorBar: PropTypes.object
	};
	changeColor = (numberColor, characterColor, symbolColor, lengthColor) => {
		return {
			numberColor, characterColor, symbolColor, lengthColor
		};
	};

	render() {
		const {colorBar} = this.props;
		let status = null;
		let color = '';
		const barCount = Object.values(colorBar).filter(entry => entry).length;

		switch (barCount) {
			case 1: {
				color = this.changeColor('red', 'grey', 'grey', 'grey');
				status = <I18n text={'password_strength_very_weak'}/>;
				break;
			}
			case 2: {
				color = this.changeColor('orange', 'orange', 'grey', 'grey');
				status = <I18n text={'password_strength_weak'}/>;
				break;
			}
			case 3: {
				color = this.changeColor('yellow', 'yellow', 'yellow', 'grey');
				status = <I18n text={'password_strength_strong'}/>;
				break;
			}
			case 4: {
				color = this.changeColor('green', 'green', 'green', 'green');
				status = <I18n text={'password_strength_very_strong'}/>;
				break;
			}
			default: {
				break;
			}
		}
		return (
			<>
				<div className="col-12">
					<ul className="list-inline mt-2">
						<li className="w-25 float-left pr-1"><span
							className={`progress adc-progressbar adc-progressbar--${color.numberColor}`}/></li>
						<li className="w-25 float-left pr-1"><span
							className={`progress adc-progressbar adc-progressbar--${color.characterColor}`}/></li>
						<li className="w-25 float-left pr-1"><span
							className={`progress adc-progressbar adc-progressbar--${color.symbolColor}`}/></li>
						<li className="w-25 float-left"><span
							className={`progress adc-progressbar adc-progressbar--${color.lengthColor}`}/></li>
					</ul>
				</div>
				<div className="adc-passwordfinder__strength-text col-10 text-right pr-0">
					<span className="adc-passwordfinder__strength-title">{status || ''}</span>
				</div>
			</>
		);
	}
}

export default PasswordStrengthFinderMeter;
