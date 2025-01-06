import React, { useState, useEffect, useMemo } from 'react';

const CachedApiComponent = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(''); 
  
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const filteredData = useMemo(() => {
    return data.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()));
  }, [data, inputValue]); 
  
 
  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      <h1>API Data</h1>
      <input
        type="text"
        placeholder="Type to filter data"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              <h4>{item.title}</h4>  
              <p>{item.body}</p>     
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedApiComponent;
