import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '@/context/AuthContext';
import { Toaster } from "@/components/ui/sonner.tsx"; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
         <Toaster />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
