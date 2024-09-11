import React, {Component} from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Dropzone from 'react-dropzone';
import Icon from '../../../Generic/components/Icon/Icon';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import {connect} from 'react-redux';

const UPLOAD_STATUS = {
	INITIAL: 'initial',
	UPLOADING: 'uploading'
};

export default (connect(null, null)(class UploadPrescription extends Component {
	state = {
		uploadStatus: UPLOAD_STATUS.INITIAL,
		validationError: null,
		fileName: null
	};

	static propTypes = {
		uploadStyle: PropTypes.string
	};

	acceptFile = (data) => {
		const submittedFile = data[0];
		const fileName = submittedFile.name;
		this.setState({
			fileName: fileName,
			uploadStatus: UPLOAD_STATUS.UPLOADING,
			validationError: null
		});

		const reader = new FileReader();
		reader.onabort = () => console.log('file reading was aborted');
		reader.onerror = () => console.log('file reading has failed');
		reader.onload = () => {
			// Do whatever you want with the file contents
		};

		reader.readAsArrayBuffer(submittedFile);
	};

	rejectFile = (data) => {
		if (data.length > 0) {
			const submittedFile = data[0];
			this.setState({
				validationError: submittedFile.name + ' is not the correct file type'
			});
		} else {
			this.setState({
				validationError: 'General error'
			});
		}
	};

	render() {
		const {uploadStyle} = this.props;
		const {uploadStatus, fileName, validationError} = this.state;
		const transactionId = null;
		const uploadPercentage = 0;

		return (<>
			<section className="adc-wizard__upload border-dashed-grey text-center p-4">
				<h6 className="adc-title--blue font-weight-normal ">
					<I18n text={i18nLabels.UPLOAD_HEADING}/>
				</h6>

				{uploadStatus === UPLOAD_STATUS.INITIAL &&
				<Dropzone onDropAccepted={data => this.acceptFile(data)}
						  onDropRejected={data => this.rejectFile(data)}
						  accept={'image/jpeg,image/png,application/pdf'}
						  multiple={false}>
					{({getRootProps, getInputProps}) => (
						<section>
							<div {...getRootProps()} className={'adc-wizard__dropzone'}>
								<input {...getInputProps()}  />
								{validationError &&
								<MessageBanner color={MessageBanner.COLOR.RED}
											   icon={MessageBanner.ICON.FAILURE}
											   description={validationError}/>
								}
								<span className="d-block my-3 ">
									<Icon image={'rezept-gray'} className={'adc-wizard__upload--rezept-icon'}
											  size={Icon.SIZE.HUGE}/>
								</span>
								<p className="w-100 d-inline-block adc-generic-widget--text mb-2 px-4"><I18n
									text={i18nLabels.UPLOAD_HINT}/></p>
								<p className="w-100 d-inline-block adc-generic-widget--text mb-3  px-4"><I18n
									text={i18nLabels.OR}/>
								</p>
								<span
									className={'adc-button adc-button-' + uploadStyle + ' uppercase block mb-2 no-margin button-bg-none full-width text-center  m-0 px-0 position-relative'}>
									<Icon image={'upload-white'}
											  className={'adc-wizard__upload--download-icon position-absolute'}/>
									<I18n text={i18nLabels.UPLOAD}/>
								</span>
							</div>
						</section>
					)}
				</Dropzone>
				}

				{uploadStatus === UPLOAD_STATUS.UPLOADING &&
				<>
					<span className="d-block my-5 ">
						<Icon image={transactionId ? 'round-green-check' : 'waiting-icon'}
							  size={Icon.SIZE.LARGE} className={'font-weight-bold align-middle'}/>
					</span>
					<div className="d-flex">
						<div className="w-100 mr-auto position-relative">
							<p className="adc-generic-widget--text text-left mb-1">{fileName}</p>
							<div className="progress adc-progress">
								<div className="progress-bar adc-progress__bar"
									 style={{width: uploadPercentage + '%'}} />
							</div>
							<span className="adc-progress__value position-absolute text-left mt-1 d-block">{`${uploadPercentage}%`}</span>
						</div>
						{!transactionId &&
						<Icon image={'close-icon'} size={Icon.SIZE.SMALL}
							  className={'font-weight-bold adc-wizard__upload--close-icon align-top'}/>
						}
					</div>
				</>
				}

			</section>
			<p className="w-100 d-inline-block adc-generic-widget--text mb-4"><I18n
				text={i18nLabels.INSURANCE_DISCLAIMER}/></p>
		</>);
	}
}));