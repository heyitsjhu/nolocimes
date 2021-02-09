import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ palette, shared }) => ({
  tableContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: palette.overlay.dark,
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  table: {
    '& thead .MuiTableCell-sizeSmall': {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    '& tbody .MuiTableCell-sizeSmall': {
      fontSize: '0.875rem',
      fontWeight: 300,
    },
    '& .MuiTableCell-root': {
      borderBottom: shared.borderDefault,
    },
  },
  cellStyles: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  noDataTable: {
    height: '100%',
  },
}));

export default ({
  className,
  columns,
  id,
  innerRef,
  rowData,
  size,
  title,
  TableHeadProps,
  TableRowProps,
  ...otherTableProps
}) => {
  const { t } = useCopy();
  const classes = useStyles();

  const renderHeaderRow = () => {
    return (
      <TableHead {...TableHeadProps}>
        {title && (
          <TableRow {...TableRowProps}>
            <TableCell colSpan={columns.length}>
              <Typography align="center" component="h3" variant="overline">
                {title}
              </Typography>
            </TableCell>
          </TableRow>
        )}
        <TableRow {...TableRowProps}>
          {columns.map(({ colId, colLabel, valueFormatter, ...column }, i) => (
            <TableCell {...column} key={`${colLabel}--${i}`}>
              <Box className={classes.cellStyles}>{t(colLabel)}</Box>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderBodyRows = () => {
    return rowData.length ? (
      rowData.map((row, i) => (
        <TableRow key={`table-body-row-${i}`}>
          {columns.map((column, j) => {
            return renderTableCell(column, row, j);
          })}
        </TableRow>
      ))
    ) : (
      <TableRow key={`table-body-row-0`}>
        <TableCell align="center" colSpan={columns.length}>
          {t('components.Table.noData')}
        </TableCell>
      </TableRow>
    );
  };

  const renderTableCell = ({ colId, valueFormatter }, row, cellIndex) => {
    const cellValue = valueFormatter ? valueFormatter(row[colId]) : row[colId] ? row[colId] : '-';
    const Element = cellIndex === 0 ? TableCell : TableCell;
    const component = cellIndex === 0 ? 'th' : 'td';

    return (
      <Element component={component} key={`${cellIndex}--${colId}`} scope="row">
        <Box className={classes.cellStyles}>{cellValue}</Box>
      </Element>
    );
  };

  return (
    <TableContainer className={classes.tableContainer} ref={innerRef}>
      <Table
        aria-label="a dense table"
        className={classnames([
          classes.table,
          rowData.length === 0 && classes.noDataTable,
          className,
        ])}
        id={id}
        size={size}
        {...otherTableProps}
      >
        {renderHeaderRow()}
        <TableBody>{renderBodyRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};
