import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ThemeProvider from "@/components/theme/theme-provider.tsx";
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <App/>
            <Toaster position="top-right" richColors closeButton  />
        </ThemeProvider>
    </StrictMode>
);
