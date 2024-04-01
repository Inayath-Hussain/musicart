import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import "./reset.css";
import { store } from './store';
import { AuthTokenProvider } from './context/authTokens';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthTokenProvider>

      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>

    </AuthTokenProvider>
  </React.StrictMode>
)
