import './App.css';
import {useEffect, useRef, useState} from 'react'
import useCountries from './hooks/useCountries';
import useProducts from './hooks/useProducts';

const App = () => {
  const inputRef = useRef(null);
  const {filter, setFilter, filtered, backFilter} = useCountries();
  const {country, setCountry, setProductFilter, productFilter, filteredProduct, backProductFilter} = useProducts();
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleCountryClick = (item) => {
    setValue(value => value.slice(0, -filter.length) + item + '.');
    inputRef.current.focus()
    setCountry(item);
    setFilter('');
  }

  const handleProductClick = (item) => {
    setValue(value => value.slice(0, -productFilter.length) + item);
    inputRef.current.focus()
    setFilter('');
    setProductFilter('');
  }


  const handleKeyChange = (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      if (country === '') {
        setFilter(filter + String.fromCharCode(event.keyCode))
      } else {
        setProductFilter(productFilter + String.fromCharCode(event.keyCode))
      }
    }
    if (event.keyCode === 8) {
      backFilter()
      backProductFilter()
      let chars = value.split('');
      if (chars.length > 0 && chars.pop() === '.') {
        setCountry('')
      }
    }
    if (event.keyCode === 32) {
      setCountry('')
    }
  }

  useEffect(() => {
    console.log('filtered =>', filtered);
    if (filtered.length === 0) setFilter('');
    // eslint-disable-next-line
  }, [filtered])
  
  useEffect(() => {
    console.log('product filtered =>', filteredProduct);
    if (filteredProduct.length === 0) setProductFilter('');
    // eslint-disable-next-line
  }, [filteredProduct])

  useEffect(() => {
    if (value === '') setCountry('')
    // eslint-disable-next-line
  }, [value])

  return (<div style={{margin: 10}}>
    <div>
      <label style={{display: 'block', fontSize:30}}>Please type any word</label>
      <input ref={inputRef} value={value} onChange={handleChange} onKeyDown={handleKeyChange} style={{width: '80%', fontSize:30 }}/>
    </div>
    <ul>
      {filtered.map((item, index) => <li key={index} style={{listStyle: 'none', fontSize: 30}} onClick={()=>handleCountryClick(item)}>{item}</li>)}
    </ul>
    <ul>
      {filteredProduct.map((item, index) => <li key={index} style={{listStyle: 'none', fontSize: 30}} onClick={()=>handleProductClick(item)}>{item}</li>)}
    </ul>
  </div>)
}

export default App;
