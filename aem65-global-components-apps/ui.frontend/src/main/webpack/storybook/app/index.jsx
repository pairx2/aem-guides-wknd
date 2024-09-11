import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Storybook from './pages/Storybook';
import ThemeBuilder from './pages/ThemeBuilder';
import NewTheme from './pages/NewTheme';
import {  AppContext, AppContextProvider } from './context/AppContext';
import { PreviewContextProvider } from './context/PreviewContext';
import ProtectedRoute from './routes/ProtectedRoute';
import './styles';

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <AppContext.Consumer>
          {(context) => <main className={`stb-main ${context.appState.isFullscreen ? 'stb-fullscreen':''} ${context.appState.isPreview ? 'stb-preview-flg':''}`}>
          <Header />
          <PreviewContextProvider>
              <Switch>
                  <Route path="/" exact={true}  component={Storybook} />
                  <Route path="/new-theme" exact={true} component={NewTheme} />
                  <ProtectedRoute path="/theme-builder" exact={true} component={ThemeBuilder} />
                  <Route path="*" render={()=>{return <Redirect to="/" />}} />
              </Switch>
            </PreviewContextProvider>
          </main>
          }
        </AppContext.Consumer>
    </Router>
    </AppContextProvider>
  )
}

export default App;
