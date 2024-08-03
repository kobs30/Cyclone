import { FC, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import {
  Button,
  ButtonVariant,
  Dialog,
  DialogContent,
  DialogHeading,
  DialogTrigger,
  Dropdown,
  Input,
  InputNumber,
  InputNumberSize,
  OpenerRenderProps,
  Spinner,
  TextArea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'components';
import { useRootStore } from 'core';
import {
  ArrowDown,
  CommentNew,
  KeyboardArrowDown,
  QuestionCircle,
  WalletOutlined,
} from 'components/icons';
import { getTokenSymbolImageSrc } from 'utils/token';
import { HELP_URL } from 'config';

import styles from './Send.module.scss';
import { SendFrom } from './SendFrom/SendFrom';
import { FeeTokenSelect } from './FeeTokenSelect/FeeTokenSelect';
import { validateAmount } from './utils';
import { truncateAddress } from '../../utils/address';
import { truncateTextInMiddle } from '../../utils/textFormat';
import { usePagesStore } from '../../pages';

export type SendProps = {
  confirm: boolean;
  onConfirm(): void;
  onConfirmCancel(): void;
  onSubmit(): void;
};

export type SendFormValues = {
  token: string; // address
  to: string; // address
  amount: number;
  feeTokenAddress: string;
  feeTokenAmount: number;
  signMessage: string;
};

const SIGN_HELP_ICON_SIZE = 12;
const SIGN_BUTTON_ICON_SIZE = 16;
const SIGN_BUTTON_TOOLTIP_OFFSET = -4;
const FEE_TOKEN_PREFIX_ICON_SIZE = 16;
const FEE_TOKEN_SUFFIX_ICON_SIZE = 18;
const FEE_TOKEN_DROPDOWN_OFFSET = -34;

export const Send: FC<SendProps> = observer(function Send_(props) {
  const { confirm, onConfirmCancel, onConfirm, onSubmit } = props;

  const rootStore = useRootStore();
  const pagesStore = usePagesStore();

  const location = useLocation();

  const [isFeeTokenSelectOpened, setIsFeeTokenSelectOpened] = useState(false);
  const [isSignDialogOpened, setIsDialogOpened] = useState(false);
  const [signMessage, setSignMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getFormDefaultValues = (): SendFormValues => {
    const symbol = new URLSearchParams(location.search).get('symbol');
    const token =
      rootStore.tokens.noFeeTokens.find((t) => symbol === t.symbol)?.address ?? 'native';
    return {
      token,
      feeTokenAddress: 'native' ?? '',
      feeTokenAmount: 0,
      amount: 0,
      signMessage: '',
      to: '',
    };
  };

  const form = useForm<SendFormValues>({
    reValidateMode: 'onSubmit',
    defaultValues: getFormDefaultValues(),
  });

  useEffect(() => {
    rootStore.tokens.fetchTokens().then(() => {
      form.reset(getFormDefaultValues());
    });

    return () => {
      setIsLoading(false);
    };
  }, []);

  if (rootStore.tokens.isLoading) return <Spinner />;
  if (rootStore.tokens.isError) return 'Error, Change network gateway';

  const watchTo = form.watch('to');
  const watchToken = form.watch('token');
  const watchAmount = form.watch('amount');
  const watchFeeTokenAddress = form.watch('feeTokenAddress');

  const token =
    watchToken === 'native'
      ? { balance: rootStore.tokens.native, symbol: 'CYCL', address: '', type: '' }
      : rootStore.tokens.findTokenByAddress(watchToken);
  const feeToken =
    watchFeeTokenAddress === 'native'
      ? { symbol: 'CYCL', address: '' }
      : rootStore.tokens.findTokenByAddress(watchFeeTokenAddress);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const values = form.getValues();
      const txHash = await rootStore.transaction.send(
        values.token,
        values.to,
        values.amount,
        values.signMessage,
        values.feeTokenAddress
      );
      rootStore.resetTokens();
      pagesStore.send.setTxHash(txHash);
      onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  const toController = (
    <Controller
      name="to"
      control={form.control}
      rules={{ required: true, validate: rootStore.wallet.verifyAddress }}
      render={({ field: { onBlur, onChange, ref, value } }) => (
        <Input ref={ref} value={value} legend="Send to" onChange={onChange} onBlur={onBlur} />
      )}
    />
  );

  const amountController = (
    <Controller
      name="amount"
      control={form.control}
      rules={{
        min: 0,
        max: token?.balance ?? 0,
        required: true,
        validate: validateAmount,
      }}
      render={({ field: { onBlur, onChange, ref, value } }) => (
        <InputNumber
          ref={ref}
          value={value}
          legend="Amount"
          onChange={(e) => onChange(Number(e))}
          onBlur={onBlur}
          min={0}
          max={token?.balance}
        />
      )}
    />
  );

  const feeTokenPrefix = feeToken ? (
    <div className={styles.feeToken}>
      <img
        src={
          watchFeeTokenAddress === 'native'
            ? '/assets/images/tokens/cycl.png'
            : getTokenSymbolImageSrc(feeToken.address)
        }
        width={FEE_TOKEN_PREFIX_ICON_SIZE}
        height={FEE_TOKEN_PREFIX_ICON_SIZE}
        alt="icon"
      />
      <span className={styles.feeTokenSymbol}>{feeToken.symbol}</span>
    </div>
  ) : undefined;

  const feeTokenAmountController = ({ ref: openerRef, ...openerProps }: OpenerRenderProps) => (
    <Controller
      name="feeTokenAmount"
      control={form.control}
      rules={{
        min: 0,
        required: true,
      }}
      render={({ field: { onBlur, onChange, ref, value } }) => (
        <div ref={openerRef}>
          <InputNumber
            size={InputNumberSize.SMALL}
            ref={ref}
            value={value}
            legend="Fee Token"
            min={0}
            prefix={feeTokenPrefix}
            suffix={
              <div
                role="button"
                {...openerProps}
                className={styles.feeTokenOpen}
                onMouseUp={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
              >
                <KeyboardArrowDown
                  width={FEE_TOKEN_SUFFIX_ICON_SIZE}
                  height={FEE_TOKEN_SUFFIX_ICON_SIZE}
                />
              </div>
            }
            onChange={(e) => onChange(Number(e))}
            onBlur={onBlur}
          />
        </div>
      )}
    />
  );

  const symbolSrc = token
    ? token?.symbol === 'CYCL'
      ? '/assets/images/tokens/cycl.png'
      : getTokenSymbolImageSrc(token.address)
    : '';
  const typeSrc = '/assets/images/blockchains/cycl.png';

  return (
    <FormProvider {...form}>
      <div className={styles.root}>
        {confirm ? (
          <div className={styles.confirm}>
            <img src={symbolSrc} alt="icon" className={styles.confirmSymbol} />
            <h1 className={styles.confirmTitle}>
              <img src={typeSrc} alt="type icon" width={12} height={12} />
              <span>{token?.symbol}</span>
            </h1>
            <div className={styles.confirmDestinations}>
              <div className={styles.confirmDestination}>
                <div className={styles.destinationPrefix}>
                  <WalletOutlined />
                  <img src={typeSrc} alt="type icon" className={styles.confirmType} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.destinationRow}>
                    <div className={styles.destinationTitle}>From</div>
                    <div className={styles.destinationTitle}>
                      {truncateAddress(rootStore.wallet.activeAddress)}
                    </div>
                  </div>
                  <div className={styles.destinationRow}>
                    <div className={styles.destinationHeadline}></div>
                    <div className={styles.destinationHeadline}>
                      {truncateTextInMiddle(rootStore.wallet.activeAccount.name, 18)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.arrowRow}>
                <div className={styles.arrow}>
                  <div className={styles.arrowContent}>
                    <ArrowDown />
                  </div>
                </div>
              </div>
              <div className={styles.confirmDestination}>
                <div className={styles.destinationPrefix}>
                  <WalletOutlined />
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.destinationRow}>
                    <div className={styles.destinationTitle}>To</div>
                    <div className={styles.destinationTitle}>{truncateAddress(watchTo)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.confirmSummary}>Transaction Summary</div>
            <div className={styles.summary}>
              <div className={styles.summaryContent}>
                <div className={styles.leaders}>
                  <div className={styles.leadersRow}>
                    <span className={styles.leadersTitle}>Asset</span>
                    <span className={styles.leadersValue}>{token?.symbol}</span>
                  </div>
                  <div className={styles.leadersRow}>
                    <span className={styles.leadersTitle}>Amount</span>
                    <span className={styles.leadersValue}>
                      {watchAmount} {token?.symbol}
                    </span>
                  </div>
                  <div className={styles.leadersRow}>
                    <span className={styles.leadersTitle}>Fee</span>
                    <span className={styles.leadersValue}>{0}</span>
                  </div>
                  <div className={cn(styles.leadersRow, styles.tot)}>
                    <span className={styles.leadersTitle}>Total</span>
                    <span className={styles.leadersValue}>
                      {watchAmount} {token?.symbol}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.confirmButtons}>
                <Button variant={ButtonVariant.SECONDARY} onClick={onConfirmCancel}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm}>{isLoading ? <Spinner /> : 'Confirm'}</Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.top}>
              {token && <SendFrom token={token} />}
              <div className={styles.inputs}>
                {toController}
                {amountController}
                <Dropdown
                  fullWidth
                  offset={FEE_TOKEN_DROPDOWN_OFFSET}
                  placement="bottom"
                  open={isFeeTokenSelectOpened}
                  openerRender={feeTokenAmountController}
                  onOpenChange={setIsFeeTokenSelectOpened}
                >
                  <FeeTokenSelect
                    onListItemClick={(address) => {
                      form.setValue('feeTokenAddress', address, { shouldDirty: true });
                      setIsFeeTokenSelectOpened(false);
                    }}
                  />
                </Dropdown>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.total}>
                <span className={styles.totalTitle}>Total</span>
                <span className={styles.totalAmount}>
                  {watchAmount} {!rootStore.tokens.noBalance && token?.symbol}
                </span>
                <Dialog open={isSignDialogOpened} onOpenChange={setIsDialogOpened}>
                  <DialogTrigger asChild>
                    <div className={styles.signFabWrapper}>
                      <Tooltip placement="left" offset={SIGN_BUTTON_TOOLTIP_OFFSET}>
                        <TooltipTrigger>
                          <div className={styles.signFab}>
                            <CommentNew
                              width={SIGN_BUTTON_ICON_SIZE}
                              height={SIGN_BUTTON_ICON_SIZE}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Sign transaction</TooltipContent>
                      </Tooltip>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeading title="Sign Transaction" />
                    <div className={styles.signDialogContent}>
                      <TextArea
                        rows={13}
                        legend="Your script"
                        placeholder="Here you can leave a comment on transaction or write a script for smart contract"
                        value={signMessage}
                        onChange={(e) => setSignMessage(e.target.value)}
                      />
                      <a href={HELP_URL} target="_blank" className={styles.signHelp}>
                        <QuestionCircle width={SIGN_HELP_ICON_SIZE} height={SIGN_HELP_ICON_SIZE} />
                        <span>How it works</span>
                      </a>
                    </div>
                    <Button
                      fullWidth
                      onClick={() => {
                        if (signMessage.length === 0) return;
                        form.setValue('signMessage', signMessage, { shouldDirty: true });
                        setIsDialogOpened(false);
                      }}
                    >
                      Sign Current Transaction
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              <Button
                htmlType="submit"
                disabled={form.formState.isSubmitting || !form.formState.isDirty}
              >
                Confirm & Send
              </Button>
            </div>
          </form>
        )}
      </div>
    </FormProvider>
  );
});
