import { useState, useEffect } from 'react';

import fetchApi from 'api/fetch';
import { useQueryParams, URL_PARAMS } from 'hooks/useQueryParams';

export const useIEXBatchQuery = (queryType, options) => {
  const ticker = useQueryParams(URL_PARAMS.TICKER);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    // if fetchApi is handling errors, should this just return what's in response.data?

    if (options.tickers && options.tickers.length) {
      options.tickers = options.tickers.join(',');
    }

    const response = await fetchApi.get('/api/iexcloud/batch', { queryType, ticker, options });

    setData(response && response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return data;
};
