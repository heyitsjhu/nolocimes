import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { FormatNumber, TextPairing } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { getElClass } from 'utils';

export default props => {
  const { t } = useCopy();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const {
    CEO,
    city,
    employees,
    description,
    industry,
    phone,
    sector,
    state,
    website,
  } = candleMonkeys[STORE_KEYS.STOCK_DATA][STORE_KEYS.COMPANY];

  return (
    <Box className={classnames([getElClass('comp', 'companyProfile')])}>
      <Box display="flex">
        <Box flexGrow={1}>
          <TextPairing heading={t('pages.CandleMonkeys.ceo')} text={CEO} />
          <TextPairing
            heading={t('pages.CandleMonkeys.employees')}
            text={employees ? <FormatNumber value={employees} /> : null}
          />
          <TextPairing heading={t('pages.CandleMonkeys.sector')} text={sector} />
          <TextPairing heading={t('pages.CandleMonkeys.industry')} text={industry} />
        </Box>
        <Box flexGrow={1}>
          <TextPairing heading={t('pages.CandleMonkeys.location')} text={`${city}, ${state}`} />
          <TextPairing heading={t('pages.CandleMonkeys.phone')} text={phone} />
          <TextPairing heading={t('pages.CandleMonkeys.website')} text={website} />
        </Box>
      </Box>
      <Box>
        <TextPairing heading={t('pages.CandleMonkeys.description')} text={description} />
      </Box>
    </Box>
  );
};
