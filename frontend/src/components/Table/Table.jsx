import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { Tooltip } from 'components';
import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ palette, shared }) => ({
  tableContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: alpha(palette.background.default, 0.6),
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
    '& .MuiTableCell-stickyHeader': {
      backgroundColor: alpha(palette.background.default, 0.99),
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
  clickable: {
    '&:hover': {
      backgroundColor: palette.background.paper,
      cursor: 'pointer',
    },
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
  tooltipRenderer,
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
            // https://github.com/mui-org/material-ui/issues/23090
            <TableCell {...column} key={`${id}-${colLabel}--${i}`} style={{ top: 26 }}>
              <Box className={classes.cellStyles}>{t(colLabel)}</Box>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderRowWithTooltip = (row, index, key) => {
    return (
      <Tooltip interactive key={key} placement="top" title={tooltipRenderer(row)}>
        <WrappedTableRow row={row} index={index} key={key} />
      </Tooltip>
    );
  };

  const WrappedTableRow = React.forwardRef(({ row, index, ...props }, ref) => {
    return (
      <TableRow
        {...props}
        className={classnames([tooltipRenderer && classes.clickable, props.className])}
        ref={ref}
      >
        {columns.map((column, j) => renderTableCell(column, row, j))}
      </TableRow>
    );
  });

  const renderBodyRows = () => {
    return rowData.length ? (
      rowData.map((row, i) => {
        const key = `${id}-table-row-tooltip-${i}`;

        return tooltipRenderer ? (
          renderRowWithTooltip(row, i, key)
        ) : (
          <WrappedTableRow row={row} index={i} key={key} />
        );
      })
    ) : (
      <TableRow key={`${id}-table-body-row-none`}>
        <TableCell align="center" colSpan={columns.length}>
          <i>{t('components.Table.noData')}</i>
        </TableCell>
      </TableRow>
    );
  };

  const renderTableCell = ({ colId, valueFormatter }, row, cellIndex) => {
    const cellValue = valueFormatter ? valueFormatter(row[colId]) : row[colId] ? row[colId] : '-';
    const Element = cellIndex === 0 ? TableCell : TableCell;
    const component = cellIndex === 0 ? 'th' : 'td';

    return (
      <Element component={component} key={`${id}-${cellIndex}--${colId}`} scope="row">
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
