import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/redux/store';

import './index.css';

const container = document.getElementById('root'); 
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
