import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import LoopIcon from '@material-ui/icons/Loop';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import classnames from 'classnames';

import { Helmet, Select, Table, Typed } from 'components';
import { ANBU_SAMPLE_USER_HASHES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import {
  createTransaction,
  getBalanceOfAddress,
  setCurrentStep,
  initializeAnbuCoin,
  mineTransactionsQueue,
  resetBlockchain,
  updateAnbuState,
  updateBlockchainSettings,
} from 'stores/actions/anbuActions';
import { getElId, getRandomNumber } from 'utils';
import PageLayout from '../PageLayout/PageLayout';
import { anbuColumnDefs } from './columnDefs';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  anbuBlockchainLayout: {},
  innerContainer: { display: 'flex', flexDirection: 'column' },
  twoColumn: {
    '& > div': {
      width: '50%',
      '&:first-child': {
        paddingRight: spacing(2),
      },
      '&:last-child': {
        paddingLeft: spacing(2),
      },
    },
  },
  prompt: {
    alignSelf: 'center',
    padding: `${spacing(1)}px ${spacing(2)}px`,
    width: '100%',
    maxWidth: '30rem',
    borderBottom: `1px solid ${palette.primary.main}`,
  },
  balanceContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 'auto',
    width: '100%',
  },
  blockchainSettings: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    width: '100%',
  },
  buttonGroup: {
    marginTop: 'auto',
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
  console: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(1),
    width: '100%',
    height: '100%',
    maxHeight: 180,
    border: shared.borderDefault,
    overflowY: 'auto',
  },
  consoleClear: {
    position: 'absolute',
    top: spacing(1),
    right: spacing(1),
    fontSize: 12,
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  consoleStatic: {
    lineHeight: '22px',
  },
  consoleText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: palette.text.secondary,
    letterSpacing: '1px',
  },
  interactionSection: {
    display: 'flex',
    marginBottom: 'auto',
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    height: '100%',
    '& > div:first-child': {
      borderRight: shared.borderDefault,
    },
  },
  interactionLeft: {},
  interactionRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableSection: {
    display: 'flex',
    paddingTop: spacing(1),
    height: 195,
  },
  formSelect: {
    width: '100%',
    minWidth: '22%',
    maxWidth: '30%',
  },
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const { account, anbuCoin, settings } = appState[STORE_KEYS.ANBU_BLOCKCHAIN];
  const [consoleOutputs, setConsoleOutputs] = useState([]);
  const consoleRef = useRef({});
  const blocksTableRef = useRef({});
  const transactionsTableRef = useRef({});

  const onBlurHandler = settings => {
    updateBlockchainSettings(settings).then(dispatch);
  };

  const onChangeHandler = key => e => {
    dispatch(updateAnbuState(STORE_KEYS.SETTINGS, key, Number(e.target.value)));
  };

  const handleCreateBlockchain = () => {
    initializeAnbuCoin(1, 100)
      .then(dispatch)
      .then(() => {
        setConsoleOutputs([...consoleOutputs, 'pages.AnbuBlockchain.console.blockchainCreated']);
        dispatch(setCurrentStep(settings.currentStep + 1));
      });
  };

  const handleAddTransaction = () => {
    //sender, recipient
    createTransaction('fromAdddsdres', 'toDskdjfsi', getRandomNumber())
      .then(dispatch)
      .then(() => {
        setConsoleOutputs([
          ...consoleOutputs,
          'pages.AnbuBlockchain.console.blockchainTransactionPosted',
        ]);
        dispatch(setCurrentStep(settings.currentStep + 1));
      });
  };

  const handleMineTransactions = () => {
    mineTransactionsQueue(account.address)
      .then(dispatch)
      .then(() => {
        setConsoleOutputs([...consoleOutputs, 'pages.AnbuBlockchain.console.blockMined']);
        dispatch(setCurrentStep(settings.currentStep + 1));
      });
  };

  const handleResetBlockchain = () => {
    resetBlockchain()
      .then(dispatch)
      .then(
        setConsoleOutputs([...consoleOutputs, 'pages.AnbuBlockchain.console.blockchainResetted'])
      );
    dispatch(setCurrentStep(1));
  };

  const handleClearConsole = () => {
    setConsoleOutputs([]);
  };

  const renderConsoleOutput = outputs => {
    return outputs.map((output, i) => {
      if (i === outputs.length - 1) {
        return (
          <Typed
            className={classes.consoleText}
            component="span"
            cursorChar="▯"
            id="console-typed-output"
            key={'output' + i}
            strings={[t(output)]}
            typeSpeed={5}
            showCursor={true}
            // onBegin={() => dispatch(setCurrentStep(settings.currentStep + 1))}
            // onComplete // --> allow interaction again
          />
        );
      } else {
        return (
          <Typography
            className={classnames([classes.consoleText, classes.consoleStatic])}
            component="span"
            key={'output' + i}
          >
            {t(output)}
          </Typography>
        );
      }
    });
  };

  const interactionMapping = {
    buttons: [
      {
        Icon: DeveloperBoardIcon,
        label: 'common.create',
        onClick: handleCreateBlockchain,
        disabled: settings.currentStep !== 1,
      },
      {
        Icon: ReceiptIcon,
        label: 'common.add',
        onClick: handleAddTransaction,
        disabled: settings.currentStep < 2,
      },
      {
        Icon: SelectAllIcon,
        label: 'common.mine',
        onClick: handleMineTransactions,
        disabled: anbuCoin.transactionsQueue.length === 0,
      },
      {
        Icon: LoopIcon,
        label: 'common.reset',
        onClick: handleResetBlockchain,
        disabled: settings.currentStep < 3,
      },
    ],
  };

  const interationSettingsInputs = [
    {
      disabled: settings.currentStep === 1,
      id: STORE_KEYS.BLOCK_SIZE,
      label: 'Block Size',
      options: [2, 4, 6, 8, 10].map(n => ({ label: n, value: n })),
    },
    {
      disabled: settings.currentStep === 1,
      id: STORE_KEYS.DIFFICULTY,
      label: 'Difficulty',
      options: [1, 2, 3, 4, 5].map(n => ({ label: n, value: n })),
    },
    {
      disabled: settings.currentStep === 1,
      id: STORE_KEYS.MINING_REWARD,
      label: 'Mining Reward',
      options: [100, 250, 500, 750, 1000].map(n => ({ label: n, value: n })),
    },
  ];

  useEffect(() => {
    consoleRef.current.scrollTop = consoleRef.current.scrollHeight + 40;
  }, [consoleOutputs]);

  useEffect(() => {
    blocksTableRef.current.scrollTop = blocksTableRef.current.scrollHeight + 40;
  }, [anbuCoin.chain]);

  useEffect(() => {
    transactionsTableRef.current.scrollTop = transactionsTableRef.current.scrollHeight + 40;
  }, [anbuCoin.transactionsQueue]);

  useEffect(() => {
    resetBlockchain().then(dispatch);
  }, []);

  /**
   * IDEA: Create a sample blockchain, backed by a pseudo-cryptocurrency, that attempts
   * to solve some real world problem (e.g., something in real estate, like fractional ownership?). Create a story that supports the actions the user will be able to perform.
   *
   * Have the user "assume" to role of a miner and allow them to mine blocks of transactions.
   * Let the user trigger new transactions under the block chain so they can mine them.
   * Create a set of "crypto users" the user can select as the buyer/sellers in the transactions.
   * Allow the user to select an amount (or some monetary value) to exchange in the transaction.
   * Create a table that visualizes the blockchain's transactions (queued and mined), aka its ledger.
   *
   * Allow the user to "attempt" to hack the blockchain by modifying one of the mined transactions.
   * Create a stats section where user can see all users' balances, including theirs.
   *
   * Add limitations to the number of transactions the user can create (to avoid overloading the website -- this is just a sample after all!)
   */

  return (
    <PageLayout
      className={classes.innerContainer}
      pageName="anbuBlockchain"
      pageLayoutClassName={classes.anbuBlockchainLayout}
    >
      <Helmet
        title={t('components.Helmet.anbuBlockchain.title')}
        meta={[
          { name: 'description', content: t('components.Helmet.anbuBlockchain.meta.description') },
        ]}
      />

      <Box className={classnames([classes.interactionSection, classes.twoColumn])}>
        <Box className={classes.interactionLeft}>
          <Box className={classes.prompt}>
            <Typed
              id="typed"
              strings={['<i>First</i> sentence.', '&amp; a second sentence.']}
              typeSpeed={60}
              loop={true}
              // onBegin
              // onComplete
              // onReset
            />
          </Box>
        </Box>

        <Box className={classes.interactionRight}>
          <Box className={classes.balanceContainer}>
            <Link
              className={classes.link}
              color="primary"
              variant="caption"
              onClick={() => getBalanceOfAddress(account.address).then(dispatch)}
            >
              View Balance
            </Link>
          </Box>

          <ButtonGroup
            aria-label="outlined primary button group"
            className={classes.buttonGroup}
            color="primary"
            variant="contained"
          >
            {interactionMapping.buttons.map(({ disabled, label, Icon, onClick }, i) => (
              <Button
                disabled={disabled}
                key={label + i}
                startIcon={Icon ? <Icon /> : null}
                onClick={onClick}
              >
                {t(label)}
              </Button>
            ))}
          </ButtonGroup>
          <Box className={classes.blockchainSettings}>
            {interationSettingsInputs.map(input => (
              <Select
                className={classes.formSelect}
                disabled={input.disabled}
                id={input.id}
                key={input.id}
                label={input.label}
                options={input.options}
                value={settings[input.id]}
                onBlur={() => onBlurHandler(settings)}
                onChange={onChangeHandler(input.id)}
              />
            ))}
          </Box>
          <Box className={classes.console} ref={consoleRef}>
            <Link
              className={classnames([classes.consoleClear, classes.link])}
              color="textSecondary"
              variant="caption"
              onClick={handleClearConsole}
            >
              {t('common.clear')}
            </Link>
            {renderConsoleOutput(consoleOutputs)}
          </Box>
        </Box>
      </Box>
      <Box className={classnames([classes.tableSection, classes.twoColumn])}>
        <Table
          columns={anbuColumnDefs.blockchain}
          id={getElId('table', 'anbu-blockchain')}
          innerRef={blocksTableRef}
          rowData={anbuCoin.chain}
          size="small"
          stickyHeader
          title={t('pages.AnbuBlockchain.table.blocks')}
        />
        <Table
          columns={anbuColumnDefs.transactions}
          id={getElId('table', 'anbu-transactions')}
          innerRef={transactionsTableRef}
          rowData={anbuCoin.transactionsQueue}
          size="small"
          stickyHeader
          title={t('pages.AnbuBlockchain.table.transactions')}
        />
      </Box>
    </PageLayout>
  );
};
