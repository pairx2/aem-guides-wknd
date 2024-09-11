import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modals/Modal';
import ErrorModal from '../../components/Modals/ErrorModal';
import ImportModal from '../../components/Modals/ImportModal';
import ThemeNameModal from '../../components/Modals/ThemeNameModal';
import Page from '../../components/Page/Page';
import ThemeCard from '../../components/ThemeCard';
import { PreviewContext } from '../../context/PreviewContext';
import { Themes } from '../../models/Themes';
import QueryParams from '../../models/QueryParams';
import Api from '../../services/Api';
import { AppContext } from '../../context/AppContext';
import { App } from '../../constants/App';
import './NewTheme.scss';



const NewTheme = () => {
  const {previewState, clearSession} = useContext(PreviewContext);
  const {setSelectedComponent} = useContext(AppContext);
  const history = useHistory();
  const [newTheme, setNewTheme] = useState();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showThemeNameModal, setShowThemeNameModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const themeBuilerPath = QueryParams.getPagePathWithHash(App.THEME_BUILDER);
  const compVars = previewState.themeVariables.getVariablesByComponent('color-system')
  const [loaded, setPageLoaded] = useState(false);
  let changedVars = compVars ? compVars.vars : {};


  useEffect(()=>{
    setNewTheme(previewState.newTheme.getTheme());
    setSelectedComponent(null);
    setPageLoaded(true);
  }, [])


  const fetchTheme = (theme, newThemeName) => {
    let hasError = false;
    Api.getThemeConfig(theme.id)
      .then((response)=>{
        if (response.success) {
          clearSession();
          previewState.newTheme.setup({
            name: newThemeName,
            themeId: theme.id,
            data: response.data
          });
        } else {
          setErrorCode(response.code);
          hasError = true;
        }
      })
      .catch((e)=>{
        if (e instanceof DOMException) {
          //do nothing
        } else {
          hasError = true;
          setErrorCode(-1);
        }
      })
      .finally(()=>{
        setShowWarningModal(false);
        setLoading(false);
        if (hasError) {
          setShowErrorModal(true);
        } else {
          history.push(themeBuilerPath);
        }
      });
  }

  const handleOnNewThemeCardClick = (theme)=> {
    if (newTheme) {
      setShowWarningModal(true);
    } else {
      setShowThemeNameModal(true);
    }
    setSelectedTheme(theme);
  }

  const handleOnEditThemeCardClick = (data)=> {
    history.push(themeBuilerPath);
  }

  const handleModalWarningOk = ()=>{
    setShowWarningModal(false);
    setShowThemeNameModal(true);
  }

  const handleModalThemeNameChange = (newThemeName) => {
    setLoading(true);
    fetchTheme(selectedTheme, newThemeName);
  }

  const getBrandColorFinalValue = (key) => {
    if (changedVars[key]) {
      return changedVars[key];
    } else {
      return newTheme.brandColors && newTheme.brandColors[key];
    }
  }

  return (
    <Page className="stb-new-page" noNav={true}>
      <h1 className="stb-page-title">{App.NEW_THEME.TITLE}</h1>
      {loaded && <div className="stb-new-page__wrapper">
        <div className="stb-new-page__theme-cards">
          {newTheme && <div className="stb-new-page__edit-theme">
            <h2 className="stb-page-sub-title">Continue Editing</h2>
            <ThemeCard
              className="theme-card"
              name={newTheme.name}
              description="Theme 1 utilizes FreeStyle Libre branding, which includes primary colors of blue and yellow. This theme uses the Helvetica font family."
              primaryColor={getBrandColorFinalValue('--primary-color')}
              secondaryColor={getBrandColorFinalValue('--secondary-color')}
              tertiaryColor={getBrandColorFinalValue('--tertiary-color')}
              isEditTheme={true}
              thumbnail="/public/images/global/thumbnail.png"
              onClick={()=>handleOnEditThemeCardClick(newTheme)}
            />
          </div>}
          <div className="stb-new-page__new-theme">
            <div className="stb-new-page__new-theme-content">
              <h2 className="stb-page-sub-title">Start a New Theme</h2>
              <Button label="Import a CSS File" onClick={()=>setShowImportModal(true)} />
              <p className="stb-body-text">or begin with colors and styles from an existing theme</p>
            </div>
            <div className="stb-new-page__cards">
              {Themes.map((theme, idx)=>{
                return <ThemeCard
                  key={idx}
                  className="theme-card"
                  id={theme.id}
                  name={theme.name}
                  description={theme.description}
                  primaryColor={theme.brandColors.primary}
                  secondaryColor={theme.brandColors.secondary}
                  tertiaryColor={theme.brandColors.tertiary}
                  thumbnail={theme.imagePath}
                  onClick={()=>handleOnNewThemeCardClick(theme)}
                />
              })}
            </div>
          </div>
        </div>
      </div>}
      <Modal
        show={showWarningModal}
        heading="Are you sure you want to start a new theme?"
        message="If you start a new theme, your saved theme will be discarded."
        okTitle="Start New Theme"
        cancelTitle="Keep Saved Theme"
        onOk={handleModalWarningOk}
        onCancel={()=>setShowWarningModal(false)}
        onClose={()=>setShowWarningModal(false)}
        width="500px"
      />
      <ThemeNameModal
        name=""
        show={showThemeNameModal}
        onChange={handleModalThemeNameChange}
        onClose={()=>setShowThemeNameModal(false)}
        onCancel={()=>setShowThemeNameModal(false)}
        loading={loading}
      />
      <ErrorModal
        show={showErrorModal}
        errorCode={errorCode}
        onOk={()=>setShowErrorModal(false)}
        onClose={()=>setShowErrorModal(false)}
      />
      <ImportModal
        show={showImportModal}
        onCancel={()=>setShowImportModal(false)}
        onClose={()=>setShowImportModal(false)}
      />
    </Page>
  )
}

export default NewTheme;
