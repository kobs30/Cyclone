import { makeAutoObservable, runInAction } from 'mobx';
import { sha256 } from 'crypto-hash';
import * as wif from 'wif';

import { Bitcoin } from 'assets/js/bitcoinjs-lib';
import { sign_message, verify_message } from 'assets/js/bitcoinsig';
import type { RootStore } from 'core';

import { TxSendRequest } from './NetworkClient';

const BitcoinLegacy = Bitcoin as any;
const signMessageLegacy = sign_message as any;
const verifyMessageLegacy = verify_message as any;

export class TransactionController {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);
  }

  isSendLoading = false;

  #signMessage = (token: string, address: string, amount: number, data = '') => {
    if (data) {
      return JSON.stringify({
        method: 'execute',
        data,
      });
    }
    if (token === 'native') {
      return JSON.stringify({
        method: 'execute',
        data: `transfer("${address}", ${amount})`,
      });
    }
    return JSON.stringify({
      method: 'execute',
      data: `callContract("${token}", "transfer", "${address}", ${amount})`,
    });
  };

  send = async (
    token: string,
    to: string,
    amount: number,
    signMessage: string,
    feeCurrency: string
  ): Promise<string> => {
    runInAction(() => {
      this.isSendLoading = true;
    });
    try {
      const message = this.#signMessage(token, to, amount, signMessage);
      const sendRequest: TxSendRequest = {
        vm: '', // ignore

        hash: '',
        signature: '',
        message,
        currencyFee: feeCurrency === 'native' ? '' : feeCurrency,
        sender: this.rootStore.wallet.activeAddress,
        nonce: Date.now().toString(),
      };

      //m.VM + m.Sender + m.Message.String() + m.Nonce.String() + m.FeeCurrency
      const signPayload =
        sendRequest.vm +
        sendRequest.sender +
        sendRequest.message +
        sendRequest.nonce +
        sendRequest.currencyFee;

      const pk = new BitcoinLegacy.ECKey(
        Array.from(wif.decode(this.rootStore.wallet.activeAccount.pk).privateKey)
      );
      const sign = signMessageLegacy(pk, signPayload, false);
      const verify = verifyMessageLegacy(sign, signPayload);

      console.log('payload=', signPayload);
      console.log('sign=', sign);
      console.log('verify=', verify);

      if (!verify) return Promise.reject();

      // const signHash = bitcoin.crypto.sha256(Buffer.from(signPayload));
      // const signResult = pairInterface.sign(signHash);

      sendRequest.signature = sign;

      sendRequest.hash = await sha256(
        sendRequest.vm +
          sendRequest.signature +
          sendRequest.sender +
          sendRequest.message +
          sendRequest.nonce +
          sendRequest.currencyFee
      );

      const { txHash } = await this.rootStore.network.client.send(sendRequest);
      return txHash;
      // eslint-disable-next-line no-useless-catch
    } catch (e) {
      throw e;
      /* empty */
    } finally {
      runInAction(() => {
        this.isSendLoading = false;
      });
    }
  };
}
