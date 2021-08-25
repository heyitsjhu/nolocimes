import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { AgGridView, AgGridViewPane, Helmet, Widget } from 'components';
import { ROUTES, SEO, STORE_KEYS } from 'const';
import { getGridLayout, getViewWidgets } from 'helpers/gridHelpers';
import { useCopy } from 'hooks/useCopy';
import { useIEXBatchQuery } from 'hooks/useIEXBatchQuery';
import { useIEXStockQuery } from 'hooks/useIEXStockQuery';

import PageLayout from '../PageLayout/PageLayout';
import CompanyWidgetMapping from './widgetMapping';

const useStyles = makeStyles(({ palette, spacing }) => ({
  candleMonkeysLayout: { padding: 0 },
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
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const candleMonkeys = useSelector(state => state.candleMonkeys);

  // const gridLayoutRef = useRef(layoutDefaults.nested(STORE_KEYS.COMPANY));
  // const viewWidgetsRef = useRef(widgetDefaults[STORE_KEYS.COMPANY]);

  // const gridLayout = candleMonkeys.nested(STORE_KEYS.LAYOUT_DEFAULTS).nested(STORE_KEYS.COMPANY);
  // const viewWidgets = candleMonkeys.nested(STORE_KEYS.WIDGET_DEFAULTS).nested(STORE_KEYS.COMPANY);
  const gridLayout = getGridLayout(candleMonkeys, STORE_KEYS.COMPANY);
  const viewWidgets = getViewWidgets(candleMonkeys, STORE_KEYS.COMPANY);
  // const data = useIEXBatchQuery('batchStock', {
  //   batchQueryList:
  //     'balancesheet,company,dividends,earnings,estimates,income,intraday-prices,news,quote',
  //   last: 4,
  // });

  // const hi = useIEXStockQuery('stockQuote');

  const handleClick = e => {
    e.preventDefault();
    history.push(ROUTES.HOME);
  };

  return (
    <PageLayout pageName="candleMonkeys" pageLayoutClassName={classes.candleMonkeysLayout}>
      <Helmet {...SEO.CANDLE_MONKEYS(t)} />
      <AgGridView layout={gridLayout} cols={12} rowHeight={35} isDraggable={false}>
        {viewWidgets.map(({ key, type }) => {
          const { customStyles, detailedContent, widgetContent } = CompanyWidgetMapping[type];

          return (
            <AgGridViewPane key={key} style={{ ...(customStyles || {}) }}>
              <Widget widgetContent={widgetContent} detailedContent={detailedContent} />
            </AgGridViewPane>
          );
        })}
      </AgGridView>
    </PageLayout>
  );
};
