import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';

import { Dropdown } from 'components';
import { STORE_KEYS } from 'const';
import { TableBalanceSheet } from './TableBalanceSheet';
import { TableIncomeStatement } from './TableIncomeStatement';
import { TableCashFlow } from './TableCashFlow';

const TABLE_VIEW_OPTIONS = [
  { label: 'Balance Sheet', value: 'balancesheet' },
  { label: 'Income Statement', value: 'income' },
  { label: 'Cash Flow', value: 'cashflow' },
];

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
  companyFundamentalsContainer: {
    paddingTop: spacing(2),
  },
  dropdown: {
    position: 'absolute',
    top: -1,
    marginLeft: spacing(2),
  },
}));

export default props => {
  const classes = useStyles();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const { balancesheet, cashflow, income } = candleMonkeys[STORE_KEYS.STOCK_DATA];
  const [tableData, setTableData] = useState([]);
  const [tableView, setTableView] = useState('balancesheet');

  const renderTable = (tableView, tableData) => {
    if (tableView === 'balancesheet') {
      return <TableBalanceSheet tableData={tableData} />;
    } else if (tableView === 'income') {
      return <TableIncomeStatement tableData={tableData} />;
    } else if (tableView === 'cashflow') {
      return <TableCashFlow tableData={tableData} />;
    }
  };

  const handleChange = event => {
    setTableView(event.target.value);
  };

  useEffect(() => {
    const data = { ...balancesheet, ...income, ...cashflow };
    if (data[tableView]) {
      setTableData(data[tableView]);
    }
  }, [balancesheet, cashflow, income, tableView]);

  return (
    <Box className={classes.companyFundamentalsContainer}>
      <Dropdown
        id="table-view-select"
        labelId="table-view-select-label"
        label="Table View"
        className={classes.dropdown}
        options={TABLE_VIEW_OPTIONS}
        value={tableView}
        onChange={handleChange}
      />
      <TableContainer>{renderTable(tableView, tableData)}</TableContainer>
    </Box>
  );
};
