import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  const changeCurrency = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    localStorage.setItem('currency', currencyCode);
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
