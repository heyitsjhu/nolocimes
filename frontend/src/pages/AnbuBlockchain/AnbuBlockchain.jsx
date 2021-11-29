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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroupMui from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import LoopIcon from '@material-ui/icons/Loop';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import classnames from 'classnames';

import { ButtonGroup, Dialog, Helmet, Select, Table, Typed } from 'components';
import {
  ANBU_GLOSSARY_TERMS,
  ANBU_SAMPLE_USER_HASHES,
  DEFAULT_TUTORIAL_SPEED,
  SEO,
  STORE_KEYS,
} from 'const';
import { displayAsCurrency, parseTypedString } from 'helpers';
import { useCopy } from 'hooks/useCopy';
import { updateAnbuBlockchain } from 'redux/reducers/anbu';
import { useAnbuService } from 'services/anbuService';
import {
  formatHash,
  formatTimestamp,
  getElId,
  getRandomNumber,
  scrollToLatestChildElement,
} from 'utils';

import PageLayout from '../PageLayout/PageLayout';
import { anbuColumnDefs } from './columnDefs';

const useStyles = makeStyles(({ palette, shared, spacing, transitions }) => ({
  anbuBlockchainLayout: {},
  innerContainer: { display: 'flex', flexDirection: 'column' },
  twoColumn: {
    '& > div': {
      width: '50%',
      '&:first-child': { paddingRight: spacing(2) },
      '&:last-child': { paddingLeft: spacing(2) },
    },
  },
  tutorialPrompt: {
    padding: `${spacing(1)}px 0`,
    height: '100%',
    width: '100%',
    borderBottom: `1px solid ${palette.primary.main}`,
    overflowY: 'auto',
    '& p': {
      marginBottom: spacing(2),
      padding: `0 ${spacing(2)}px`,
      '&:last-child:not(:first-child)': {
        animation: `$highlightTutorialPrompt 3000ms ${transitions.easing.easeInOut}`,
      },
      '& > b': {
        textDecoration: 'underline',
      },
    },
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'column',
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
    boxShadow: 'none',
  },
  console: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(1),
    width: '100%',
    height: '100%',
    minHeight: 130,
    maxHeight: 180,
    border: shared.borderDefault,
    overflowY: 'auto',
  },
  consoleClear: {
    marginLeft: 'auto',
  },
  consoleStaticText: {
    lineHeight: '22px',
  },
  consoleText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: palette.text.secondary,
    letterSpacing: '1px',
  },
  glossaryContainer: {
    padding: `${spacing(1)}px ${spacing(2)}px`,
    height: '100%',
    width: '100%',
    overflowY: 'auto',
  },
  interactionSection: {
    display: 'flex',
    flexGrow: 1,
    marginBottom: 'auto',
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    overflow: 'hidden',
    '& > div:first-child': {
      borderRight: shared.borderDefault,
    },
  },
  interactionLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  interactionRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableSection: {
    display: 'flex',
    flexGrow: 1,
    paddingTop: spacing(1),
    minHeight: 270,
  },
  formSelect: {
    width: '100%',
    minWidth: '22%',
    maxWidth: '30%',
  },
  tooltipTableHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: spacing(2),
    paddingBottom: spacing(1),
    borderBottom: shared.borderDefault,
  },
  '@keyframes highlightTutorialPrompt': {
    '0%': { 'background-color': palette.background.paper },
    '20%': { 'background-color': palette.background.paper },
    '100%': { 'background-color': 'transparent' },
  },
}));

export default () => {
  const { t } = useCopy();
  const dispatch = useDispatch();
  const classes = useStyles();
  const anbuBlockchain = useSelector(state => state.anbu);
  const siteSettings = useSelector(state => state.siteSettings);
  const { account, anbuCoin, consoleOutputs, tutorialOutputs, settings } = anbuBlockchain;
  const { language } = siteSettings;
  const {
    createTransaction,
    initializeAnbuCoin,
    mineTransactionsQueue,
    resetBlockchain,
    updateBlockchainSettings,
    updateTutorialProgression,
  } = useAnbuService();

  const [miningInProgress, setMiningInProgress] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const blocksTableRef = useRef();
  const consoleRef = useRef();
  const tutorialPromptRef = useRef();
  const transactionsTableRef = useRef({});

  const handleCreateBlockchain = () => {
    initializeAnbuCoin(settings[STORE_KEYS.DIFFICULTY], settings[STORE_KEYS.MINING_REWARD]).then(
      handleTutorialProgression
    );
  };

  const handleAddTransaction = () => {
    const sender = ANBU_SAMPLE_USER_HASHES[getRandomNumber(1, 0)];
    let recipient = ANBU_SAMPLE_USER_HASHES[getRandomNumber(1, 0)];

    while (sender === recipient || !recipient) {
      recipient = ANBU_SAMPLE_USER_HASHES[getRandomNumber(1, 0)];
    }

    createTransaction(sender, recipient, getRandomNumber()).then(() => {
      if (
        settings[STORE_KEYS.TUTORIAL_STEP] < 3 ||
        (settings[STORE_KEYS.TUTORIAL_STEP] === 3 &&
          anbuCoin[STORE_KEYS.TRANSACTIONS_QUEUE].length === 4)
      ) {
        handleTutorialProgression();
      }
    });
  };

  const handleMineTransactions = () => {
    setMiningInProgress(true);

    mineTransactionsQueue(account[STORE_KEYS.ADDRESS]).then(() => {
      if (settings[STORE_KEYS.TUTORIAL_STEP] === 4 || settings[STORE_KEYS.TUTORIAL_STEP] === 7) {
        handleTutorialProgression();
      }
      setMiningInProgress(false);
    });
  };

  const handleResetBlockchain = () => {
    resetBlockchain();
  };

  const onChangeHandler = name => e => {
    if (settings[STORE_KEYS.TUTORIAL_STEP] === 6) {
      handleTutorialProgression();
    }

    updateBlockchainSettings(name, Number(e.target.value));
  };

  const handleTutorialProgression = () => {
    updateTutorialProgression(settings[STORE_KEYS.TUTORIAL_STEP] + 1);
  };

  const handleSkipTutorial = () => {
    updateTutorialProgression(settings[STORE_KEYS.TUTORIAL_MAX_STEP]);
  };

  // TODO: Double-check if this is still necessary?
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClearConsole = () => {
    dispatch(updateAnbuBlockchain(STORE_KEYS.CONSOLE_OUTPUTS, undefined, undefined, []));
  };

  const renderConsoleOutput = useCallback(
    outputs => {
      return outputs.map(({ message, options }, i) => {
        const key = 'anbu-console-output-' + i;
        const consoleOutput = t(message, options);

        if (undefined) {
          // i === outputs.length - 1
          // TODO: Fix issue where Typed re-renders on store update
          return (
            <Typed
              className={classes.consoleText}
              component="span"
              cursorChar="|"
              id="typedjs-console-output"
              key={key}
              showCursor
              strings={[consoleOutput]}
              typeSpeed={5}
            />
          );
        } else {
          return (
            <Typography
              className={classnames([classes.consoleText, classes.consoleStaticText])}
              component="span"
              key={key}
            >
              {consoleOutput}
            </Typography>
          );
        }
      });
    },
    [consoleOutputs]
  );

  const renderTutorialOutput = useCallback(
    outputs => {
      return outputs.map((output, i) => {
        const key = 'anbu-tutorial-output-' + i;
        if (undefined) {
          // i === outputs.length - 1
          // TODO: Fix issue where Typed re-renders on store update
          return (
            <Typed
              fadeOut
              id="typedjs-tutorial-output"
              key={key}
              showCursor={false}
              strings={[t(output)]}
              typeSpeed={DEFAULT_TUTORIAL_SPEED}
            />
          );
        } else {
          return (
            <Typography
              dangerouslySetInnerHTML={{ __html: parseTypedString(t(output)) }}
              key={key}
              variant="body2"
            />
          );
        }
      });
    },
    [tutorialOutputs]
  );

  const renderTooltip = useCallback(
    rowData => {
      return (
        <Box>
          <Box className={classes.tooltipTableHeader}>
            <Typography>
              {t('common.block')} {rowData.index + 1}
            </Typography>
            <Typography variant="overline">{formatTimestamp(rowData.timestamp)}</Typography>
          </Box>
          {typeof rowData.transactions === 'string' ? (
            <Typography align="center" variant="subtitle2">
              <i>{rowData.transactions}</i>
            </Typography>
          ) : (
            <Table
              columns={anbuColumnDefs.transactions}
              id={getElId('table', 'anbu-transactions-tooltip')}
              rowData={rowData.transactions}
              size="small"
            />
          )}
        </Box>
      );
    },
    [anbuColumnDefs.transactions]
  );

  const interactionMapping = {
    buttons: [
      {
        Icon: DeveloperBoardIcon,
        label: 'common.create',
        onClick: handleCreateBlockchain,
        disabled: anbuCoin[STORE_KEYS.CHAIN].length !== 0 || miningInProgress,
      },
      {
        Icon: ReceiptIcon,
        label: 'common.add',
        onClick: handleAddTransaction,
        disabled:
          anbuCoin[STORE_KEYS.CHAIN].length === 0 ||
          settings[STORE_KEYS.TUTORIAL_STEP] < 2 ||
          (settings[STORE_KEYS.TUTORIAL_STEP] > 3 && settings[STORE_KEYS.TUTORIAL_STEP] < 8) ||
          miningInProgress,
      },
      {
        Icon: SelectAllIcon,
        label: 'common.mine',
        onClick: handleMineTransactions,
        disabled:
          settings[STORE_KEYS.TUTORIAL_STEP] < 4 ||
          settings[STORE_KEYS.TUTORIAL_STEP] === 5 ||
          settings[STORE_KEYS.TUTORIAL_STEP] === 6 ||
          anbuCoin[STORE_KEYS.TRANSACTIONS_QUEUE].length === 0 ||
          miningInProgress,
      },
      {
        Icon: LoopIcon,
        label: 'common.reset',
        onClick: handleResetBlockchain,
        disabled:
          anbuCoin[STORE_KEYS.CHAIN].length === 0 ||
          !settings[STORE_KEYS.TUTORIAL_COMPLETED] ||
          miningInProgress,
      },
    ],
  };

  const interationSettingsInputs = [
    {
      disabled: settings[STORE_KEYS.TUTORIAL_STEP] < 6,
      id: STORE_KEYS.BLOCK_TRANSACTION_LIMIT,
      label: 'common.blockSize',
      options: [2, 4, 6, 8, 10].map(n => ({ label: n, value: n })),
    },
    {
      disabled: settings[STORE_KEYS.TUTORIAL_STEP] < 6,
      id: STORE_KEYS.DIFFICULTY,
      label: 'common.difficulty',
      options: [1, 2, 3, 4, 5].map(n => ({ label: n, value: n })),
    },
    {
      disabled: settings[STORE_KEYS.TUTORIAL_STEP] < 6,
      id: STORE_KEYS.MINING_REWARD,
      label: 'common.miningReward',
      options: [100, 250, 500, 750, 1000].map(n => ({ label: n, value: n })),
    },
  ];

  useEffect(() => {
    // TODO: Investigate why, if using the clean up method, it sometimes triggers pre-maturely (from idling on the page too long?), which breaks the page
    resetBlockchain(true);

    return () => {
      consoleRef.current = null;
      blocksTableRef.current = null;
      tutorialPromptRef.current = null;
      transactionsTableRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTo(0, consoleRef.current.scrollHeight);
    }
  }, [consoleOutputs]);

  useEffect(() => {
    // TODO: switching back and forth between tabs brings scroll back to the very top
    if (tutorialPromptRef.current) {
      scrollToLatestChildElement(tutorialPromptRef.current, { verticalAdjustment: 32 });
    }
  }, [tutorialOutputs]);

  useEffect(() => {
    if (blocksTableRef.current) {
      blocksTableRef.current.scrollTo(0, blocksTableRef.current.scrollHeight);
    }
  }, [anbuCoin.chain]);

  useEffect(() => {
    if (transactionsTableRef.current) {
      transactionsTableRef.current.scrollTo(0, transactionsTableRef.current.scrollHeight);
    }
  }, [anbuCoin.transactionsQueue]);

  return (
    <PageLayout
      className={classes.innerContainer}
      pageDescription={'pages.AnbuBlockchain.pageDescription'}
      pageName={STORE_KEYS.ANBU_BLOCKCHAIN}
      pageLayoutClassName={classes.anbuBlockchainLayout}
    >
      <Helmet {...SEO.ANBU_BLOCKCHAIN(t)} />
      <Box className={classnames([classes.interactionSection, classes.twoColumn])}>
        <Box className={classes.interactionLeft}>
          <Tabs
            aria-label="full width tabs example"
            className={classes.tabsContainer}
            indicatorColor="primary"
            textColor="primary"
            value={tabValue}
            variant="fullWidth"
            onChange={handleTabChange}
          >
            <Tab label={t('common.instructions')} />
            <Tab label={t('common.glossary')} />
          </Tabs>

          {tabValue === 0 && (
            <>
              <Box className={classes.tutorialPrompt} ref={tutorialPromptRef}>
                {renderTutorialOutput(tutorialOutputs)}
              </Box>
              <ButtonGroup justifyRight>
                {settings[STORE_KEYS.TUTORIAL_COMPLETED] ? (
                  <Typography
                    color="textSecondary"
                    style={{ fontStyle: 'italic' }}
                    variant="caption"
                  >
                    {settings[STORE_KEYS.TUTORIAL_SKIPPED]
                      ? t('common.tutorialSkipped')
                      : t('common.tutorialCompleted')}
                  </Typography>
                ) : (
                  <Link onClick={handleSkipTutorial} color="textSecondary" variant="caption">
                    {`${t('common.skip')} ${t('common.tutorial')}`}
                  </Link>
                )}
                {settings[STORE_KEYS.TUTORIAL_STEP] === 5 && (
                  <Button onClick={handleTutorialProgression} color="primary" variant="contained">
                    {t('common.next')}
                  </Button>
                )}
              </ButtonGroup>
            </>
          )}
          {tabValue === 1 && (
            <Box className={classes.glossaryContainer}>
              Glossary
              {ANBU_GLOSSARY_TERMS.map(term => {
                return (
                  <Box key={term}>
                    <Typography>{term}</Typography>
                    <Typography>{t('pages.AnbuBlockchain.glossary.' + term)}</Typography>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <Box className={classes.interactionRight}>
          <Box className={classes.balanceContainer}>
            <Typography color="textSecondary" variant="caption">
              {t('common.accountNumber')}: {formatHash(account[STORE_KEYS.ADDRESS])}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              {t('common.accountBalance')}:{' '}
              {displayAsCurrency(account[STORE_KEYS.BALANCE], language)}
            </Typography>
          </Box>

          <ButtonGroupMui
            aria-label={t('a11y.ariaLabel.anbuButtonGroup')}
            className={classes.buttonGroup}
            disableElevation
            color="primary"
            variant="contained"
          >
            {interactionMapping.buttons.map(({ disabled, label, Icon, onClick }, i) => (
              <Button
                key={label + i}
                disabled={disabled}
                startIcon={Icon ? <Icon /> : null}
                onClick={onClick}
              >
                {t(label)}
              </Button>
            ))}
          </ButtonGroupMui>

          <Box className={classes.blockchainSettings}>
            {interationSettingsInputs.map(input => (
              <Select
                className={classes.formSelect}
                disabled={input.disabled}
                id={input.id}
                key={input.id}
                label={t(input.label)}
                options={input.options}
                value={settings[input.id]}
                onChange={onChangeHandler(input.id)}
              />
            ))}
          </Box>
          <Link
            className={classnames([classes.consoleClear, classes.link])}
            color="textSecondary"
            style={{ opacity: consoleOutputs.length > 0 ? 1 : 0 }}
            variant="caption"
            onClick={handleClearConsole}
          >
            {t('common.clear')}
          </Link>
          <Box className={classes.console} ref={consoleRef}>
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
          tooltipRenderer={renderTooltip}
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
      <Dialog
        description={t('pages.AnbuBlockchain.dialog.miningInProgress')}
        id="anbu-mining-in-progress-dialog"
        open={miningInProgress}
      />
    </PageLayout>
  );
};
