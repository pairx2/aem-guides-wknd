import React from "react";
import ReactDOM from 'react-dom';

const App = () => {
    const date = `date: ${new Date()}`;
    return (<></>)
}
export function RenderApp() {
    const root = document.createElement('div');
    document.body.appendChild(root);
    ReactDOM.render(
        <div className={'test'}>
            <App>
            </App>
            {/*<Button
                text={'TEST'}
                anchorLink={'#'}
                buttonStyle={'primary'}
            />*/}
        </div>,
        root
    );
}

export default App;
