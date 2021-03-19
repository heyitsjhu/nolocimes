import { formatHash, formatTimestamp } from 'utils';

export const anbuColumnDefs = {
  blockchain: [
    {
      colId: 'timestamp',
      colLabel: 'common.date',
      valueFormatter: formatTimestamp,
    },
    {
      colId: 'hash',
      colLabel: 'common.hash',
      valueFormatter: formatHash,
    },
    {
      colId: 'previousHash',
      colLabel: 'common.previousHash',
      valueFormatter: formatHash,
    },
  ],
  transactions: [
    {
      colId: 'timestamp',
      colLabel: 'common.date',
      valueFormatter: formatTimestamp,
    },
    {
      colId: 'sender',
      colLabel: 'common.sender',
      valueFormatter: formatHash,
    },
    {
      colId: 'recipient',
      colLabel: 'common.recipient',
      valueFormatter: formatHash,
    },
    {
      colId: 'amount',
      colLabel: 'common.amount',
    },
  ],
};
