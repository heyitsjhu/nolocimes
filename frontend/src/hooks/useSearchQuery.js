import { useState, useEffect } from 'react';

import fetchApi from 'api/fetch';

export const useSearchQuery = () => {
  const [ticker, setTicker] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async ticker => {
    if (ticker === '') return null;
    const response = await fetchApi.get('/api/iexcloud/search', { ticker }, true);

    setData(response.data);
  };

  useEffect(() => {
    fetchData(ticker);
  }, [ticker]);

  return [data, setTicker];
};
