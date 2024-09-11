import React, {Component} from 'react';
import {i18nLabels} from '../../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Icon from '../../../../Generic/components/Icon/Icon';
import MessageBanner from '../../../../Generic/components/MessageBanner/MessageBanner';
import {Title} from '../../../../Generic/components/Title/Title';
import {connect} from 'react-redux';
import {postImageRequest} from '../../../redux/actions/orders.action';
import { getValidationErrorClassName } from '../../../myAccountUtils';

const UPLOAD_STATUS = {
	INITIAL: 'initial',
	UPLOADING: 'uploading'
};

const mapStateToProps = state => {
	const {images} = state.myAccountModuleReducer.OrdersReducer;
	return {images};
};

const mapDispatchToProps = {
	postImageRequest
};

export default (connect(mapStateToProps, mapDispatchToProps)(class UploadPrescription extends Component {
	state = {
		uploadStatus: UPLOAD_STATUS.INITIAL,
		fileName: null,
		isDragging: false
	};

	static propTypes = {
		postImageRequest: PropTypes.func,
		name: PropTypes.string,
		uploadStyle: PropTypes.string,
		uploadPercentage: PropTypes.number,
		transactionId: PropTypes.string,
		data: PropTypes.object,
		error: PropTypes.object,
		endpoint: PropTypes.string,
		images: PropTypes.object,
		change: PropTypes.func
	};

	componentDidUpdate(prevProps) {
		const {images, name} = this.props;
		const {dataUrl} = (images[name || ''] || {});
		const {images: oldImages} = prevProps;
		const {dataUrl: oldDataUrl} = (oldImages[name || ''] || {});

		if (oldDataUrl !== dataUrl) {
			this.props.change(name, dataUrl);
		}
	}

	acceptFile = (data) => {
		const submittedFile = data[0];
		const fileName = submittedFile.name;
		this.setState({
			fileName: fileName,
			uploadStatus: UPLOAD_STATUS.UPLOADING,
			validationError: null
		});

		const reader = new FileReader();
		reader.onload = () => {
			// Do whatever you want with the file contents
			const dataUrl = reader.result;
			this.props.postImageRequest({
				name: this.props.name,
				dataUrl: dataUrl,
				endpoint: this.props.endpoint
			});
		};

		reader.readAsDataURL(submittedFile);
	};

	rejectFile = (data) => {
		if (data.length > 0) {
			const submittedFile = data[0];
			this.setState({
				validationError: submittedFile.name
			});
		}
	};

	updateDraggingState(isDragging) {
		if (this.state.isDragging !== isDragging) {
			this.setState({
				isDragging: isDragging
			});
		}
	}

	clearValidationError() {
		this.setState({
			validationError: null
		});
	}

	render() {
		const {images, name} = this.props;
		const {uploadStatus, fileName, validationError, isDragging} = this.state;
		const {uploadPercentage, error, dataUrl} = (images[name || ''] || {});

		return (<>
			{uploadStatus === UPLOAD_STATUS.INITIAL &&
			<Dropzone onDropAccepted={data => this.acceptFile(data)}
					  onDropRejected={data => this.rejectFile(data)}
					  accept={'image/jpeg,image/png,application/pdf'}
					  multiple={false}>
				{({getRootProps, getInputProps}) => (
					<section
						onDragOver={() => this.updateDraggingState(true)}
						onDragLeave={() => this.updateDraggingState(false)}
						onDrop={() => this.updateDraggingState(false)}
						className={'border-solid-' + getValidationErrorClassName(validationError, error, isDragging) + ' text-center p-4 rounded'}>
						{validationError &&
						<MessageBanner onClose={() => this.clearValidationError()}
									   color={MessageBanner.COLOR.RED}
									   icon={MessageBanner.ICON.FAILURE}
									   description={i18nLabels.INCORRECT_FILETYPE}
									   params={[validationError]}/>
						}
						<div {...getRootProps()} className={'adc-wizard__dropzone'}>
							<input {...getInputProps()}  />
							<span className="d-block my-3 ">
								<Icon image={'plus-blue-circle'} size={Icon.SIZE.LARGER}/>
							</span>
							<Title text={i18nLabels.UPLOAD_PHOTO} color={Title.COLOR.BLUE} size={Title.SIZE.H6}/>
						</div>
					</section>
				)}
			</Dropzone>
			}

			{uploadStatus === UPLOAD_STATUS.UPLOADING &&
			<section
				className={'border-dashed-' + (validationError ? 'error' : 'grey') + ' text-center rounded ' + (dataUrl ? 'p-1' : 'p-4')}>
				<if condition={dataUrl}>
					<img className={'img-fluid'} src={dataUrl} alt={name}/>
				</if>
				<elseif condition={error}>
					<MessageBanner color={MessageBanner.COLOR.RED}
								   icon={MessageBanner.ICON.FAILURE}
								   description={i18nLabels.UPLOAD_ERROR}/>
				</elseif>
				<else>
					<span className="d-block my-5 ">
						<Icon image={'waiting-icon'} size={Icon.SIZE.LARGE}
							  className={'font-weight-bold align-middle adc-icon--rotating'}/>
					</span>
					<div className="d-flex">
						<div className="w-100 mr-auto position-relative  adc-wizard__upload ">
							<p className="adc-generic-widget--text text-left mb-1">{fileName}</p>
							<div className="progress adc-progress">
								<div className="progress-bar adc-progress__bar"
									 style={{width: {uploadPercentage} + '%'}}/>
							</div>
							<span
								className="adc-progress__value position-absolute text-left mt-1 d-block">{uploadPercentage}{'%'}</span>
						</div>
					</div>
				</else>
			</section>
			}
		</>);
	}
}));