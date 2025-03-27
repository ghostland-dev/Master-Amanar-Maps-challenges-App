
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fonction pour enregistrer le service worker en production
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered successfully:', registration.scope);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Créer l'application
createRoot(document.getElementById("root")!).render(<App />);

// Enregistrer le service worker après le chargement de l'application
registerServiceWorker();
