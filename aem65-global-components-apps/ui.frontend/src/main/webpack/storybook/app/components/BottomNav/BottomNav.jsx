import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PreviewContext } from '../../context/PreviewContext';
import Api from '../../services/Api';
import Button from '../Button';
import Modal from '../Modals/Modal';
import ErrorModal from  '../Modals/ErrorModal';
import './BottomNav.scss';

const BottomNav = () => {
  const history = useHistory();
  const {previewState, clearSession} = useContext(PreviewContext);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const themeVariables = previewState.themeVariables;


  const handleDiscardModal = () => {
    clearSession();
    history.push('/new-theme');
  }

  const handleSaveModal = () => {
    history.push('/new-theme');
  }

  const handleExportCSS = async() => {
    const exportData = themeVariables.getExportData();
    const theme = previewState.newTheme.getTheme();
    const themeName = theme.name.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
    let response;
    try {
      response = await Api.exportCSSFile(exportData, theme.themeId, themeName)
    } catch(e) {
      setErrorCode('-1');
      setShowErrorModal(true);
      return;
    }

    if (response.success && response.data) {
      const { cssfileName, responseStr: cssOutputString } = response.data;
      const blob = new Blob([cssOutputString], { type: "octet/stream" });
      const url = window.URL.createObjectURL(blob);

      const aLink = document.createElement('a')
      aLink.className = 'css-download-link d-none';
      aLink.href=url;
      aLink.setAttribute('download',`${cssfileName.replace(' ','-')}.css`);
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
      if (window.URL.revokeObjectURL) {
        window.URL.revokeObjectURL(url);
      }
      setShowExportModal(false)
    } else {
        setErrorCode('-1');
        setShowErrorModal(true);
    }
  }

  const handleExportAEMTheme = async () => {
    const exportData = themeVariables.getExportData();
    const theme = previewState.newTheme.getTheme();
    const themeName = theme.name.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
    let response;

    try{
      response = await Api.exportSCSSFile(exportData, theme.themeId, themeName)
    }
    catch(e) {
      setErrorCode('-1');
      setShowErrorModal(true);
      return;
    }

    if (response.success && response.data) {
      const { zipFileName, zipFilePath } = response.data;

      if (zipFileName && zipFilePath) {
        const aLink = document.createElement('a')
        aLink.className = 'css-download-link d-none';
        aLink.href=zipFilePath;
        aLink.setAttribute('download',`${zipFileName}.zip`);
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        setShowExportModal(false)
      }
    } else {
      setErrorCode('-1');
      setShowErrorModal(true);
    }
  }

  return (
    <>
      <div className="stb-bottom-nav">
        <div className="stb-bottom-nav__start">
          <Button
            label='Discard &amp; Start Over'
            secondary={true}
            onClick={()=>setShowDiscardModal(true)}
          />
        </div>
        <Button
          label='Save &amp; Close'
          secondary={true}
          onClick={()=>setShowSaveModal(true)}
        />
        <Button
          label='Export Theme'
          onClick={()=>setShowExportModal(true)}
        />
      </div>

      <Modal
        show={showDiscardModal}
        heading="Are you sure you want to start over?"
        message="If you start over, all your changes to this theme will be discarded"
        okTitle="Discard &amp; Start Over"
        cancelTitle="Keep Working"
        onOk={handleDiscardModal}
        onCancel={()=>setShowDiscardModal(false)}
        onClose={()=>setShowDiscardModal(false)}
        width="502px"
      />

      <Modal
        show={showSaveModal}
        heading="Are you sure you want to close this theme?"
        okTitle="Save &amp; Close"
        cancelTitle="Keep Working"
        onOk={handleSaveModal}
        onCancel={()=>setShowSaveModal(false)}
        onClose={()=>setShowSaveModal(false)}
        width="500px"
      >
        <p>Your changes to this theme are saved locally in this browser, so the next time you visit the Theme Builder you will be able to review and make changes.</p>
        <p className="note"><i className="mdi mdi-alert"></i><strong>Note:</strong> Your custom theme is not saved on the server, so clearing your browser history (cookies, local data storage, browser history) will erase this theme’s settings completely.</p>
      </Modal>

      <Modal
        show={showExportModal}
        heading="Export Theme"
        message="You can export your theme styles as a single CSS file which can be shared with others and imported into Theme Builder, or you can export a .ZIP file containing configuration files for AEM (for developers only)."
        okTitle="Export AEM Theme"
        cancelTitle="Export CSS"
        onOk={handleExportAEMTheme}
        onCancel={handleExportCSS}
        onClose={()=>setShowExportModal(false)}
        width="502px"
      />

      <ErrorModal show={showErrorModal} errorCode={errorCode} onOk={()=>setShowErrorModal(false)} onClose={()=>setShowErrorModal(false)} />


    </>
  )
}

export default BottomNav;
