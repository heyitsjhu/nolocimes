// Not actually an api, but we'll pretend. :)
import SHA256 from 'crypto-js/sha256';

import constants from '../const';
import Logger from '../utils/logger';

// create transaction (just an example)
class AnbuTransaction {
  constructor(timestamp, sender, recipient, amount) {
    this.timestamp = timestamp;
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
  }
}

// Block sizes cannot exceed 1MB in size so size of transactions
// must be limited. Usually, miners (in Proof of Work consensus)
// can choose which transactions to include.
class AnbuBlock {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;

    this.nonce = 1;
    this.hash = this.calculateHash();
  }

  // [SHA256 Encryption Approach]
  calculateHash() {
    return SHA256(
      this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce
    ).toString();
  }

  // [Consensus Method: Proof of Work]
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class AnbuBlockchain {
  constructor({ difficulty, miningReward }) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = +difficulty || 1;
    this.transactionsQueue = [];
    this.blockTransactionLimit = 2;
    this.miningReward = +miningReward || 100;
  }

  createGenesisBlock() {
    return new AnbuBlock(0, Date.now(), 'Anbu Genesis Block', '0');
  }

  createTransaction(sender, recipient, amount) {
    const transaction = new AnbuTransaction(Date.now(), sender, recipient, amount);
    this.transactionsQueue.push(transaction);

    // return transaction;
    return {
      blockTransactionLimit: this.blockTransactionLimit,
      chain: this.chain,
      difficulty: this.difficulty,
      transactionsQueue: this.transactionsQueue,
      miningReward: this.miningReward,
    };
  }

  getDetails() {
    return {
      blockTransactionLimit: this.blockTransactionLimit,
      chain: this.chain,
      difficulty: this.difficulty,
      transactionsQueue: this.transactionsQueue,
      miningReward: this.miningReward,
    };
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineTransactionsQueue(miningRewardAddress) {
    const transactions = this.transactionsQueue.slice(0, this.blockTransactionLimit);
    const latestBlock = this.getLatestBlock();
    const block = new AnbuBlock(this.chain.length, Date.now(), transactions, latestBlock.hash);
    block.mineBlock(this.difficulty);

    this.chain.push(block);

    const isValid = this.validateBlockchain();

    if (isValid) {
      // reset transactions array; append transaction to give reward to miner
      this.transactionsQueue = [
        ...this.transactionsQueue.slice(this.blockTransactionLimit),
        new AnbuTransaction(Date.now(), null, miningRewardAddress, this.miningReward),
      ];
    }

    return block;
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.sender === address) {
          balance -= transaction.amount;
        }

        if (transaction.recipient === address) {
          balance += transaction.amount;
        }
      }
    }

    console.log({ address, balance });

    return { address, balance };
  }

  updateSettings(blockSize, difficulty, miningReward) {
    this.blockTransactionLimit = +blockSize || this.blockTransactionLimit;
    this.difficulty = +difficulty || this.difficulty;
    this.miningReward = +miningReward || this.miningReward;

    return this.getDetails();
  }

  validateBlockchain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// export an instance of api class
export default AnbuBlockchain;
