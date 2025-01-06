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

  // Memoize the filtered data based on inputValue
  const filteredData = useMemo(() => {
    return data.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()));
  }, [data, inputValue]); // Only recompute when data or inputValue changes

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedApiComponent;
/*
import React, { useState, useEffect, useMemo } from 'react';

const CachedApiComponent = () => {
  // State to store the fetched data and the loading state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(''); 
  
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      console.log(result); 
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const memoizedData = useMemo(() => {
    return data;
  }, [inputValue]); 
  
  
  useEffect(() => {
    fetchData();
  }, [inputValue]); 

  return (
    <div>
      <h1>API Data</h1>
      <input
        type="text"
        placeholder="Type to trigger data fetch"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {memoizedData.map((item) => (
            <li key={item.id}>
              <h4>{item.title}</h4> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedApiComponent;
/*
import React, { useState, useEffect, useMemo } from 'react';

const CachedApiComponent = () => {
  // State to store the fetched data and the loading state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(''); // Example input to trigger data fetch
  
  // Function to fetch data from the API
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

  // Memoize the data based on the input value
  const memoizedData = useMemo(() => {
    return data;
  }, [inputValue]); // Only re-fetch when inputValue changes
  
  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [inputValue]); // Re-fetch data when inputValue changes

  return (
    <div>
      <h1>API Data</h1>
      <input
        type="text"
        placeholder="Type to trigger data fetch"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {memoizedData.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedApiComponent;

/*
import React, { useState, useEffect, useMemo } from "react";

const CachedApiComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0); // Input to influence API call

  // Fetch data function
  const fetchData = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts${userId ? `?userId=${userId}` : ""}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useMemo to cache fetched data based on userId
  const memoizedData = useMemo(() => {
    fetchData(userId);
    return data;
  }, [userId]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Cached API Data</h1>

      <div>
        <label htmlFor="userId">Filter by User ID: </label>
        <input
          type="number"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {memoizedData.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedApiComponent;
*/