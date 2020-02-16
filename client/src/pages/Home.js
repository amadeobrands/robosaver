import React, { useState } from 'react';
import Modal from '../components/Modal';

import { colors } from '../lib';
import Deposit from '../components/Deposit';

const styles = {
  container: {
    backgroundColor: colors.background,
    height: '100vh',
  }
};

function Home(props) {

  const { connect, tbtc, cTokens } = props;

  const [displayBitcoinModal, setDisplayBitcoinModal] = useState(false);
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [startFlow, setStartFlow] = useState(false);
  const [depositMethod, setDepositMethod] = useState(0); // 0 initiate // 1 complete
  const [loading, setLoading] = useState(false);
  const [displayDashboard, setDisplayDashboard] = useState(false);

  function updateModal(address) {
    setBitcoinAddress(address);
    setDisplayBitcoinModal(true);
    setLoading(false);
  }

  function triggerStartFlow() {
    setLoading(true);
    setStartFlow(true);
  }

  function triggerShowLoader() {
    setLoading(true);
  }

  function completeDepositFlow() {
    setDisplayDashboard(true);
    setDisplayBitcoinModal(false);
    setLoading(false);
  }

  function getTBtcRate() {
    if (cTokens) {
      console.log(cTokens);
    const ctBtcToken = cTokens['cToken'].filter((token) => { return token['underlying_symbol'] === 'TBTC'; });
    return (ctBtcToken.length > 0) && ctBtcToken['supply_rate']['value'];
    }
  }

  return (
    <div style={styles.container} className="Home">
      <Modal
        {...props}
        loading={loading}
        startFlow={triggerStartFlow}
        bitcoinAddress={bitcoinAddress}
        displayBitcoinModal={displayBitcoinModal}
        displayDashboard={displayDashboard}
        tBtcRate={getTBtcRate()}
      />
      <Deposit
        startFlow={startFlow}
        connect={connect}
        tbtc={tbtc}
        displayBitcoinModal={(address) => updateModal(address)}
        method={depositMethod}
        showLoader={triggerShowLoader}
        complete={completeDepositFlow}
      />
    </div>
  );
}

export default Home;
