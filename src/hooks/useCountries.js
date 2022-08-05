import {useState, useMemo, useEffect} from 'react';
import json from '../jsons/countries.json';

const useCountries = () => {
    const [filter, setFilter] = useState('');

    const filtered = useMemo(() => {
        const trimedfilter = filter.trim();
        if (trimedfilter === '') return [];
        return json.countries.filter(item => item.toLowerCase().startsWith(trimedfilter.toLowerCase()))
        // eslint-disable-next-line
    }, [json, filter])

    const backFilter = () => {
        if (filter.length > 0) setFilter(filter.slice(0, -1))
    }
    
    useEffect(() => {
        console.log('filter =>', filter)
    }, [filter])

    return {filtered, filter, setFilter, backFilter}
}

export default useCountries;