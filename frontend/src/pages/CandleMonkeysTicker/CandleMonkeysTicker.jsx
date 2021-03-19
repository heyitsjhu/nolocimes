import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { AgGridView, AgGridViewPane, Widget } from 'components';
import { ROUTES, STORE_KEYS } from 'const';
import { getGridLayout, getViewWidgets } from 'helpers/gridHelpers';
import { useCopy } from 'hooks/useCopy';
import { useIEXBatchQuery } from 'hooks/useIEXBatchQuery';
import { useIEXStockQuery } from 'hooks/useIEXStockQuery';
import { AppContext } from 'stores';

import PageLayout from '../PageLayout/PageLayout';
import CompanyWidgetMapping from './widgetMapping';

const useStyles = makeStyles(({ palette, spacing }) => ({
  candleMonkeysTickerLayout: { padding: 0 },
  searchHeader: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${spacing(2)}px ${spacing(4)}px`,
    width: '100%',
    '& > div': { maxWidth: '80%' },
  },
}));

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [appState, dispatch] = useContext(AppContext);

  const gridLayout = getGridLayout(appState, STORE_KEYS.COMPANY);
  const viewWidgets = getViewWidgets(appState, STORE_KEYS.COMPANY);

  // const data = useIEXBatchQuery('batchStock', {
  //   batchQueryList:
  //     'balancesheet,company,dividends,earnings,estimates,income,intraday-prices,news,quote',
  //   last: 4,
  // });

  const hi = useIEXStockQuery('stockQuote');

  console.log('useIEXBatchQuery', hi);

  const handleClick = e => {
    e.preventDefault();
    history.push(ROUTES.HOME);
  };

  return (
    <PageLayout pageName="candleMonkeys" pageLayoutClassName={classes.candleMonkeysTickerLayout}>
      <AgGridView layout={gridLayout} cols={12} rowHeight={35} isDraggable={false}>
        {viewWidgets.map(({ type, key }) => {
          const { detailedContent, widgetContent } = CompanyWidgetMapping[type];

          return (
            <AgGridViewPane key={key}>
              <Widget widgetContent={widgetContent} detailedContent={detailedContent} />
            </AgGridViewPane>
          );
        })}
      </AgGridView>
    </PageLayout>
  );
};
