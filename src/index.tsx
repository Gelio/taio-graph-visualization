import { initializeApp } from 'firebase';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-github-button/assets/style.css';

import { App } from './App';
import { firebaseConfig } from './firebase-config';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
