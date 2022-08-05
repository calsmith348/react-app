import {useState, useMemo, useEffect} from 'react';
import json from '../jsons/products.json';

const useProducts = () => {
    const [productFilter, setProductFilter] = useState('');
    const [country, setCountry] = useState('');

    const filteredProduct = useMemo(() => {
        const trimedfilter = productFilter.trim();
        if (!country) return [];
        if (!json.hasOwnProperty(country)) return [];
        if (trimedfilter === '') return [];
        return json[country].filter(item => item.toLowerCase().startsWith(trimedfilter.toLowerCase()))
        // eslint-disable-next-line
    }, [json, productFilter, country])

    const backProductFilter = () => {
        if (productFilter.length > 0) setProductFilter(productFilter.slice(0, -1))
    }
    useEffect(() => {
        console.log('product filter =>', productFilter)
    }, [productFilter])

    useEffect(() => {
        console.log('country => ', country)
    }, [country])
    return {filteredProduct, setProductFilter, productFilter, country, setCountry, backProductFilter}
}

export default useProducts;