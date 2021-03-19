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

export const TableIncomeStatement = ({ tableData }) => {
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

// reportDate: '2019-12-31',
// fiscalDate: '2019-12-31',
// currency: 'USD',
// totalRevenue: 62681000000,
// costOfRevenue: 39086000000,
// grossProfit: 23595000000,
// researchAndDevelopment: 3750000000,
// sellingGeneralAndAdmin: 4216000000,
// operatingExpense: 47052000000,
// operatingIncome: 15629000000,
// otherIncomeExpenseNet: 792000000,
// ebit: 15629000000,
// interestIncome: 868000000,
// pretaxIncome: 16421000000,
// incomeTax: 2296000000,
// minorityInterest: 0,
// netIncome: 14125000000,
// netIncomeBasic: 14125000000,

const TableRevenues = ({ tableData }) => {
  const { t } = useCopy();
  const classes = useStyles();

  return (
    <TableBody className={classes.tableBody}>
      {['totalRevenue', 'costOfRevenue', 'grossProfit'].map(rowItem => (
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
      ))}
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
        'researchAndDevelopment',
        'sellingGeneralAndAdmin',
        'operatingExpense',
        'otherIncomeExpenseNet',
        'ebit',
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
