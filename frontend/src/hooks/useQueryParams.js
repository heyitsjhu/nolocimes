import { useLocation } from 'react-router-dom';

export const URL_PARAMS = {
  TICKER: 'ticker',
};

export const useQueryParams = param => {
  const query = new URLSearchParams(useLocation().search);

  return query.get(param);
};
