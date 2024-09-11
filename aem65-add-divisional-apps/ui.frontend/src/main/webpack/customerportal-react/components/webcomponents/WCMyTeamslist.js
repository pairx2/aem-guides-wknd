import React, { Component } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import {TeamCardsList} from '../myTeams-components/TeamCardsList';

class WCMyTeamsList extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
        <div>
            <TeamCardsList />
            <div className={'children'}>
                {this.props.content}
            </div>
        </div>
        )
    }
}

class ContainerModel extends DOMModel {
    @byContent('.content') content;
}
const ContainerCustomElement = createCustomElement(WCMyTeamsList, ContainerModel, "container");
window.customElements.define("wc-my-teams-list", ContainerCustomElement);

export default { ContainerCustomElement };