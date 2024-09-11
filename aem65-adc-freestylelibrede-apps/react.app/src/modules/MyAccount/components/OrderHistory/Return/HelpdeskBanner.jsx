import React from 'react';
import Col from '../../../../Generic/components/Container/Col';
import Icon from '../../../../Generic/components/Icon/Icon';
import Row from '../../../../Generic/components/Container/Row';
import I18n from '../../../../Translation/components/I18n';
import {i18nLabels} from '../../../../../utils/translationUtils';

const HelpdeskBanner = ({className}) => {
	return (
		<Row className={className}>
			<Col width={3} lg={4} xl={3} className={'pr-0 pl-3'}>
				<div className={'d-flex adc-call-us__background align-items-center justify-content-center'}>
					<Icon image={'click-call-icon'} size={Icon.SIZE.LARGER}/>
				</div>
			</Col>
			<Col width={9} lg={8} xl={9} className={'pl-4 pr-0'}>
				<Row>
					<Col width={9} md={12} lg={10} xl={9}>
						<p className="mb-0 text-small"><I18n text={i18nLabels.HELP_DESK_LABEL}
															 suffix={':'}/>
						</p>
					</Col>
					<Col>
						<p className="adc-plus-service__contact__number mb-0 d-flex align-items-center">
							<I18n text={i18nLabels.HELP_DESK_NUMBER}/>
							<Icon image={'online'} size={Icon.SIZE.MEDIUM}/>
						</p>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

HelpdeskBanner.propTypes = {};
HelpdeskBanner.defaultProps = {
	className: ''
};

export default HelpdeskBanner;