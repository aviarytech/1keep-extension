import { useState } from 'react';

import { AddressFlagType } from '@/shared/constant';
import { checkAddressFlag } from '@/shared/utils';
import { Button, Icon, Text } from '@/ui/components';
import { EnableAtomicalsPopover } from '@/ui/components/EnableAtomicalsPopover';
import { useI18n } from '@/ui/hooks/useI18n';
import { useChangeAddressFlagCallback, useCurrentAccount, useReloadAccounts } from '@/ui/state/accounts/hooks';

export default function AtomicalsFeatureButton() {
  const { t } = useI18n();
  const currentAccount = useCurrentAccount();
  const isEnableAtomicals = checkAddressFlag(currentAccount.flag, AddressFlagType.Is_Enable_Atomicals);

  const changeAddressFlag = useChangeAddressFlagCallback();
  const [isShowAlert, setIsShowAlert] = useState(false);
  const enableAtomicals = async () => {
    await changeAddressFlag(true, AddressFlagType.Is_Enable_Atomicals);
  };

  const disableAtomicals = async () => {
    await changeAddressFlag(false, AddressFlagType.Is_Enable_Atomicals);
  };

  const reloadAccounts = useReloadAccounts();
  if (isEnableAtomicals) {
    return (
      <>
        <Button
          style={{ paddingTop: 12, paddingBottom: 12 }}
          onClick={() => {
            disableAtomicals();
            setIsShowAlert(false);
          }}>
          <Icon icon={'atomicals'} />
          <Text text={t('disable_atomicals')} mx={'md'} />
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          style={{ paddingTop: 12, paddingBottom: 12 }}
          onClick={() => {
            setIsShowAlert(true);
          }}>
          <Icon icon={'atomicals'} />
          <Text text={t('enable_atomicals')} mx={'md'} />
        </Button>
        {isShowAlert && (
          <EnableAtomicalsPopover
            onClose={() => setIsShowAlert(false)}
            onConfirm={async () => {
              await enableAtomicals();
              reloadAccounts();
              setIsShowAlert(false);
            }}
          />
        )}
      </>
    );
  }
}
