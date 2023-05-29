import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from './contexts/ThemeProvider.jsx';
import UserProvider from './contexts/UserProvider.jsx';
import FeedbackProvider from './contexts/FeedbackProvider.jsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FeedbackProvider>
        <UserProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ThemeProvider>
        </UserProvider>
      </FeedbackProvider>
    </BrowserRouter>
  </React.StrictMode>
);
