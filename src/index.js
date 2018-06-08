import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import theme from './theme';

const AppWrapper = styled(App)`
  @media (max-width: 1366px) {
    font-size: 12px;
  }
`;

ReactDOM.render(<ThemeProvider theme={theme.main}><AppWrapper /></ThemeProvider>, document.getElementById('root'));
registerServiceWorker();
