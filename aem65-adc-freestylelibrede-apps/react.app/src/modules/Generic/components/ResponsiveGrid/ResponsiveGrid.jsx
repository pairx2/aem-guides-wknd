import React, {Component} from 'react';
import {getComponentByTitle, getComponentData} from '../../../../utils/componentMapping';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {getComponentHTMLRequest, getEditContextRequest} from './redux/actions/responsivegrid.action';
import PropTypes from 'prop-types';
import {getRequiredSiteData} from '../../../../utils/siteData';
import {WCM_MODE_EDIT} from '../../../../utils/enums';

/*
	How do I use this component?
	1. Destructure component props to get {path}
	2. Pass them to this component as seen below.
	3. Set the responsive grid's name as seen below.
		<ResponsiveGrid
			path={path}
			responsiveGridName='responsivegrid_xxx'
		/>
*/

const mapStateToProps = state => {
	const {editContext, html} = state.responsiveGridModuleReducer.responsiveGridReducer;
	return {editContext, html};
};

const mapDispatchToProps = {
	getEditContextRequest,
	getComponentHTMLRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class ResponsiveGrid extends Component {
	static propTypes = {
		getEditContextRequest: PropTypes.func,
		getComponentHTMLRequest: PropTypes.func,
		editContext: PropTypes.object,
		html: PropTypes.object,
		path: PropTypes.string,
		responsiveGridName: PropTypes.string
	};

	state = {};

	componentDidMount() {
		const isEditor = getRequiredSiteData('wcmmode') === WCM_MODE_EDIT;
		this.setState({
			isEditor
		});
		this.fetchEditContext(isEditor);
		this.fetchComponents(isEditor);
	}

	fetchEditContext = (isEditor) => {
		const {path, responsiveGridName} = this.props;
		isEditor && this.props.getEditContextRequest({
			path: path + '/' + responsiveGridName
		});
	};

	fetchComponents = (isEditor) => {
		const {path, responsiveGridName} = this.props;
		this.props.getComponentHTMLRequest({
			editor: isEditor,
			path: path + '/' + responsiveGridName
		});
	};

	renderReact = () => {
		const {path, responsiveGridName} = this.props;
		document.querySelectorAll('[data-path="' + path + '/' + responsiveGridName + '"] [data-react-component]').forEach(element => {
			const TargetComponent = getComponentByTitle(element.dataset.reactComponent);
			if (TargetComponent) {
				render(<TargetComponent {...getComponentData(element.dataset.jsonString)} />, element);
			}
		});
	};

	render() {
		const {editContext, html, path, responsiveGridName} = this.props;
		const {isEditor} = this.state;
		const responsiveGridPath = path + '/' + responsiveGridName;
		return (
			<div data-path={responsiveGridPath}>
				<if condition={html && html[responsiveGridPath]}>
					<ExistingResponsiveGrid renderReact={this.renderReact} html={html?.[responsiveGridPath]}/>
				</if>
				<elseif condition={isEditor}>
					<DynamicResponsiveGrid renderReact={this.renderReact} editContext={editContext?.[responsiveGridPath]} path={path} responsiveGridName={responsiveGridName}/>
				</elseif>
			</div>
		);
	}
});

class DynamicResponsiveGrid extends Component {
	static propTypes = {
		renderReact: PropTypes.func,
		editContext: PropTypes.object,
		path: PropTypes.string,
		responsiveGridName: PropTypes.string
	};

	componentDidUpdate(prevProps) {
		if (JSON.stringify(prevProps.editContext) !== JSON.stringify(this.props.editContext)) {
			this.props.renderReact();
		}
	}

	render() {
		const {editContext, path, responsiveGridName} = this.props;
		const editConfig = editContext[`${path}/${responsiveGridName}/*`];
		const columns = editConfig?.ipeConfig?.columns || 12;
		return (
			<div className={`aem-Grid aem-Grid--${columns} aem-Grid--default--${columns} cq-Editable-dom cq-Editable-dom--container`}>
				<div className='new newpar section aem-Grid-newComponent cq-Editable-dom'>
					{editContext && <cq data-path={`${path}/${responsiveGridName}/*`} data-config={JSON.stringify(editConfig)}/>}
				</div>
				{editContext && <cq data-path={`${path}/${responsiveGridName}`} data-config={JSON.stringify(editConfig)}/>}
			</div>
		);
	}
}

class ExistingResponsiveGrid extends Component {
	static propTypes = {
		renderReact: PropTypes.func,
		html: PropTypes.string
	};

	componentDidMount() {
		this.props.renderReact();
	}

	render() {
		const {html} = this.props;
		return (
			<div dangerouslySetInnerHTML={{__html: html}}/>
		);
	}
}