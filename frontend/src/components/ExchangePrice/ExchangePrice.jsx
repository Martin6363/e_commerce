import { useTheme } from '@emotion/react';
import armenianFlag from '../../assets/images/armenian_flag.svg';
import russianFlag from '../../assets/images/russian_flag.svg';
import usFlag from '../../assets/images/us_flag.png';
import '../../assets/styles/ExchangePrice.scss';
import { useCurrency } from '../../context/CurrencyContext';
import { useEffect } from 'react';

export default function ExchangePrice() {
  const theme = useTheme();  
  const { selectedCurrency, changeCurrency } = useCurrency();

  useEffect(() => {
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency) {
      changeCurrency(storedCurrency);
    }
  }, [changeCurrency]);

  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    localStorage.setItem('currency', currencyCode); 
  };
  
  return (
    <div className="exchange_rates_wrapper">
      <div className="exchange_container">
        <span
          className="flag_item"
          style={{
            backgroundImage: `url(${
              selectedCurrency === 'AMD'
                ? armenianFlag
                : selectedCurrency === 'RUB'
                ? russianFlag
                : usFlag
            })`,
          }}
        ></span>
        <span className="code_item">{selectedCurrency}</span>
      </div>
      <div
        className={`exchange_rates_container shadow-sm ${
          theme.palette.mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <h2 className="text-[16px] m-2 font-thin">Select currency</h2>
        <label
          className={`rate_item_block ${selectedCurrency === 'AMD' ? 'active' : ''}`}
          onClick={() => handleCurrencyChange('AMD')}
        >
          <span className="flag_item" style={{ backgroundImage: `url(${armenianFlag})` }}></span>
          <span className='text-gray-400'>AMD</span>
          <span>Armenian dram</span>
        </label>
        <label
          className={`rate_item_block ${selectedCurrency === 'RUB' ? 'active' : ''}`}
          onClick={() => handleCurrencyChange('RUB')}
        >
          <span className="flag_item" style={{ backgroundImage: `url(${russianFlag})` }}></span>
          <span className='text-gray-400'>RUB</span>
          <span>Russian ruble</span>
        </label>
        <label
          className={`rate_item_block ${selectedCurrency === 'USD' ? 'active' : ''}`}
          onClick={() => handleCurrencyChange('USD')}
        >
          <span className="flag_item" style={{ backgroundImage: `url(${usFlag})` }}></span>
          <span className='text-gray-400'>USD</span>
          <span>American dollar</span>
        </label>
      </div>
    </div>
  );
}
