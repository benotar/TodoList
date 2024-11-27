// import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ThemeProvider from "@/components/theme/ThemeProvider.tsx";
import {Toaster} from 'sonner';
import ConfirmationDialog from "@/components/reusable/ConfirmationDialog.tsx";

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <ThemeProvider>
        <App/>
        <Toaster position="top-center" richColors closeButton/>
        <ConfirmationDialog/>
    </ThemeProvider>
    // </StrictMode>
);
