import axios from "axios";
import React, { useEffect, useState } from "react";

function UseFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, error };
}

export default UseFetch;
