import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './states';
import { Toaster  } from 'react-hot-toast';
 
import './styles/style.css';
 
const root = createRoot(document.getElementById('root'));
 
root.render(
  <Provider store={store}>
<Toaster position="top-center" reverseOrder={false} />
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>,
);