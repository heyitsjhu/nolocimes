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

export const TableBalanceSheet = ({ tableData }) => {
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
        <TableAssets tableData={tableData} />
        <TableLiabilities tableData={tableData} />
      </Table>
    )
  );
};

const TableAssets = ({ tableData }) => {
  const { t } = useCopy();
  const classes = useStyles();

  return (
    <TableBody className={classes.tableBody}>
      <TableRow>
        <TableCell className={classes.cellSubheading} colSpan={tableData.length + 1}>
          Assets
        </TableCell>
      </TableRow>
      {[
        'currentCash',
        'receivables',
        'inventory',
        'shortTermInvestments',
        'otherCurrentAssets',
        'currentAssets',
      ].map(rowItem => (
        <TableRow
          key={rowItem}
          className={classnames([rowItem === 'currentAssets' && classes.subTotalRow])}
        >
          <TableCell>{t(`pages.CandleMonkeys.${rowItem}`)}</TableCell>
          {tableData.map((dataItem, j) => (
            <TableCell key={dataItem + j} align="right">
              {bigNumFormatter(dataItem[rowItem])}
            </TableCell>
          ))}
        </TableRow>
      ))}
      {[
        'propertyPlantEquipment',
        'goodwill',
        'longTermInvestments',
        'otherAssets',
        'totalAssets',
      ].map(rowItem => (
        <TableRow
          key={rowItem}
          className={classnames([rowItem === 'totalAssets' && classes.totalRow])}
        >
          <TableCell>{t(`pages.CandleMonkeys.${rowItem}`)}</TableCell>
          {tableData.map((dataItem, i) => (
            <TableCell key={dataItem + i} align="right">
              {bigNumFormatter(dataItem[rowItem])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

const TableLiabilities = ({ tableData }) => {
  const { t } = useCopy();
  const classes = useStyles();

  return (
    <TableBody className={classes.tableBody}>
      <TableRow>
        <TableCell className={classes.cellSubheading} colSpan={tableData.length + 1}>
          Liabilities and Stockholders&apos; Equity
        </TableCell>
      </TableRow>
      {[
        'accountsPayable',
        'currentLongTermDebt',
        'otherCurrentLiabilities',
        'totalCurrentLiabilities',
      ].map(rowItem => (
        <TableRow
          key={rowItem}
          className={classnames([rowItem === 'totalCurrentLiabilities' && classes.subTotalRow])}
        >
          <TableCell>{t(`pages.CandleMonkeys.${rowItem}`)}</TableCell>
          {tableData.map((dataItem, j) => (
            <TableCell key={dataItem + j} align="right">
              {bigNumFormatter(dataItem[rowItem])}
            </TableCell>
          ))}
        </TableRow>
      ))}
      {['longTermDebt', 'otherLiabilities', 'totalLiabilities'].map(rowItem => (
        <TableRow
          key={rowItem}
          className={classnames([rowItem === 'totalLiabilities' && classes.totalRow])}
        >
          <TableCell>{t(`pages.CandleMonkeys.${rowItem}`)}</TableCell>
          {tableData.map((dataItem, i) => (
            <TableCell key={dataItem + i} align="right">
              {bigNumFormatter(dataItem[rowItem])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
