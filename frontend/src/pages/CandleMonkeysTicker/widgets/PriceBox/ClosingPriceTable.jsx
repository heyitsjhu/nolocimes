import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { FormatNumber } from 'components';
import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(() => ({
  closingPriceTable: {
    '& th, td': {
      padding: 0,
      width: '33.33%',
      lineHeight: 1.3,
      '&:nth-child(2)': { textAlign: 'center' },
      '&:last-child': { textAlign: 'right' },
    },
    '& span': {
      fontSize: 10,
      fontWeight: 600,
    },
  },
  tableRow: {},
}));

export default ({ stockQuote }) => {
  const { t } = useCopy();
  const classes = useStyles();
  const { change, changePercent, close } = stockQuote;
  const headerCellLabels = [t('common.close'), t('common.change'), t('common.changePercent')];
  const cellData = [
    <FormatNumber key={close} currency value={close} />,
    <FormatNumber key={change} currency value={change} />,
    <FormatNumber key={changePercent} percentage value={changePercent} />,
  ];

  return (
    <Table className={classes.closingPriceTable}>
      <TableHead>
        <TableRow className={classes.tableRow}>
          {headerCellLabels.map((label, i) => (
            <TableCell key={`header-cell-${i}`}>
              <Typography variant="caption">{label}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.tableRow}>
          {cellData.map((dataItem, i) => (
            <TableCell key={`data-cell-${i}`}>
              <Typography variant="caption">{dataItem}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};
