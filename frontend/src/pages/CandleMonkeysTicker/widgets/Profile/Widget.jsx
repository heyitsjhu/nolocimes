import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { FormatNumber, TextPairing } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { getElClass } from 'utils';

export default props => {
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const stockState = appState[STORE_KEYS.CANDLE_MONKEYS][STORE_KEYS.STOCK_DATA];
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
  } = stockState.company;

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
