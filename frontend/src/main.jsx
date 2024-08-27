import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import global_en from "./translition/en/global.json";
import global_hy from "./translition/hy/global.json";
import global_ru from "./translition/ru/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

const savedLanguage = localStorage.getItem('lang') || 'en';

i18next.init({
  interpolation: { escapeValue: false },
  lng: savedLanguage,
  resources: {
    en: {
      global: global_en,
    },
    hy: {
      global: global_hy,
    },
    ru: {
      global: global_ru,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <CurrencyProvider>
              <App />
            </CurrencyProvider>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
