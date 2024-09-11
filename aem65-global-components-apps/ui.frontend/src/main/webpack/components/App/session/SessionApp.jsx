import React from "react";
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import partialConfig from '../config';
import { SiteProvider } from '../context/SiteContext';
import { AuthProvider } from '../context/AuthContext';
import PortalWithDataSet from '../components/common/PortalWithDataSet';
import SessionExpiredModal from '../components/atoms/SessionExpiredModal';

const SessionApp = () => {
  console.log("this is inside the react app")
  const date = `date: ${new Date()}`;
  return (<></>)
}

export function RenderSessionApp() {
  const root = document.createElement('div');
  const { mountingPoints } = partialConfig;
  document.body.appendChild(root);
  ReactDOM.render(
    <div className={'test sessionremove'}>
      <SessionApp>
      </SessionApp>
      <I18nextProvider i18n={i18n} defaultNS="common">
        <SiteProvider>
          <AuthProvider>
            <PortalWithDataSet selector={mountingPoints.body}>
              <SessionExpiredModal />
            </PortalWithDataSet>
          </AuthProvider>
        </SiteProvider>
      </I18nextProvider>
    </div>,
    root
  );
}

window.onload = () => {
  RenderSessionApp();
};

export default SessionApp;
