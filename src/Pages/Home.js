import { useState, useEffect } from 'react';

// Components
import SearchBar from '../Components/SearchBar';
import Card from '../Components/Card';

export default function Home() {
    const [data, setData] = useState(null);
    const [spinner, setSpinner] = useState(true);

    useEffect(()=> {
        const getForums = async() => {
            const url = "http://localhost:5000/api/v1/forums";
            const options = {
                mode:"cors",
            };
            const response = await fetch(url, options);
            const result = await response.json();
            setSpinner(false);
            setData(result.data.forums);
        }
        getForums();
    }, []);

    if(spinner) return (
        <h3>Loading...</h3>
    )

    return (
        <>
            <SearchBar/>
            { data ? data.map(frm => {
                return <Card forum={frm}/>
            }) : <h3>Error</h3> }
        </>
    );
};
