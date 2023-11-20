import './index.css'
import ReactDOM from 'react-dom/client';
import {UseCasesContext, defaultUseCasesContextValue} from "./who-wants-to-be-millionaire/adapters/primary/react/useCasesInjections.tsx";
import React from 'react';
import App from "./who-wants-to-be-millionaire/adapters/primary/react/components/App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UseCasesContext.Provider value={defaultUseCasesContextValue}>
            <App />
        </UseCasesContext.Provider>
    </React.StrictMode>
)
