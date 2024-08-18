import  { useState, useEffect } from 'react';

    const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencies, setCurrencies] = useState([]);

useEffect(() => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            setCurrencies([...Object.keys(data.rates)]);
            setExchangeRate(data.rates[toCurrency]);
        });
    }, []);

useEffect(() => {
        if (fromCurrency !== toCurrency) {
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => setExchangeRate(data.rates[toCurrency]));
        }
}, [fromCurrency, toCurrency]);

const handleAmountChange = (e) => {
        setAmount(e.target.value);
};

const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
};

const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    return (
        <div>
        <h2>Currency Converter</h2>
        <div>
            <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            />
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {currencies.map(currency => (
                <option key={currency} value={currency}>
                {currency}
                </option>
            ))}
            </select>
            <span> To </span>
            <select value={toCurrency} onChange={handleToCurrencyChange}>
            {currencies.map(currency => (
                <option key={currency} value={currency}>
                {currency}
                </option>
            ))}
            </select>
        </div>
        <h3>{amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}</h3>
        </div>
    );
};

export default CurrencyConverter;
