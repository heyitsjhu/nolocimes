import { useState, useEffect } from 'react';

import fetchApi from 'api/fetch';
import { useQueryParams, URL_PARAMS } from 'hooks/useQueryParams';

export const useIEXStockQuery = (queryType, options = {}) => {
  const ticker = useQueryParams(URL_PARAMS.TICKER);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    // if fetchApi is handling errors, should this just return what's in response.data?
    const response = await fetchApi.get(
      '/api/iexcloud',
      { queryType, ticker, options },
      true // change to true to actually call the api!
    );

    console.log('useIEXStockQuery', response);
    setData(response && response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
};
