import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classnames from 'classnames';

import { bigNumFormatter } from 'helpers/numHelpers';
import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ palette, spacing }) => ({
  tableBody: {
    borderBottom: `15px solid ${palette.common.white}`,
  },
  cellSubheading: {
    fontWeight: 700,
  },
  subTotalRow: {
    '& .MuiTableCell-body:first-child': {
      textIndent: spacing(3),
    },
    '& .MuiTableCell-body:not(:first-child)': {
      borderTop: `2px solid ${palette.grey[400]}`,
    },
  },
  totalRow: {
    '& .MuiTableCell-body': {
      fontWeight: 700,
      '&:first-child': {
        textIndent: spacing(6),
      },
      '&:not(:first-child)': {
        borderTop: `2px solid ${palette.grey[400]}`,
      },
    },
  },
}));

export const TableCashFlow = ({ tableData }) => {
  const { t } = useCopy();
  const classes = useStyles();
  const [fiscalDates, setFiscalDates] = useState([]);

  useEffect(() => {
    if (tableData) {
      setFiscalDates(tableData.map(entry => entry.fiscalDate));
    }
  }, [tableData]);

  return (
    tableData && (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {fiscalDates.map(fiscalDate => (
              <TableCell key={fiscalDate} align="right">
                {fiscalDate}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableRevenues tableData={tableData} />
        <TableExpenses tableData={tableData} />
      </Table>
    )
  );
};

// "netIncome": 14125000000,
// "depreciation": 2754000000,
// "changesInReceivables": -9082000000,
// "changesInInventories": 1942000000,
// "cashChange": -6058000000,
// "cashFlow": 19523000000,
// "capitalExpenditures": -3041000000,
// "investments": -926000000,
// "investingActivityOther": 1566000000,
// "totalInvestingCashFlows": -3001000000,
// "dividendsPaid": -3530000000,
// "netBorrowings": -27000000,
// "otherFinancingCashFlows": -260000000,
// "cashFlowFinancing": -22580000000,
// "exchangeRateEffect": null

const TableRevenues = ({ tableData }) => {
  const { t } = useCopy();
  const classes = useStyles();

  return (
    <TableBody className={classes.tableBody}>
      {['netIncome', 'depreciation', 'changesInReceivables', 'changesInInventories'].map(
        rowItem => (
          <TableRow
            key={rowItem}
            className={classnames([rowItem === 'grossProfit' && classes.subTotalRow])}
          >
            <TableCell>{t(`pages.CandleMonkeys.${rowItem}`)}</TableCell>
            {tableData.map((dataItem, j) => (
              <TableCell key={dataItem + j} align="right">
                {bigNumFormatter(dataItem[rowItem])}
              </TableCell>
            ))}
          </TableRow>
        )
      )}
    </TableBody>
  );
};

const TableExpenses = ({ tableData }) => {
  const { t } = useCopy();
  const classes = useStyles();

  return (
    <TableBody className={classes.tableBody}>
      <TableRow>
        <TableCell className={classes.cellSubheading} colSpan={tableData.length + 1}>
          Expenses
        </TableCell>
      </TableRow>
      {[
        'investments',
        'investingActivityOther',
        'totalInvestingCashFlows',
        'dividendsPaid',
        'netBorrowings',
        'otherFinancingCashFlows',
        'cashFlowFinancing',
        'exchangeRateEffect',
      ].map(rowItem => (
        <TableRow key={rowItem} className={classnames([rowItem === 'ebit' && classes.subTotalRow])}>
          <TableCell>{t(`pages.CandleMonkeys.${rowItem}`)}</TableCell>
          {tableData.map((dataItem, j) => (
            <TableCell key={dataItem + j} align="right">
              {bigNumFormatter(dataItem[rowItem])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
