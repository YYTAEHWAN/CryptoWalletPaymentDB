import React, { useState } from 'react';
import { NetworkInfoDB } from './PaymentReceiptNetworkInfoCRUD';

const NetworkInfo = () => {
  const [paymentReceiptIdx, setPaymentReceiptIdx] = useState('');
  const [paymentWalletName, setPaymentWalletName] = useState('');
  const [mainBlockchainName, setMainBlockchainName] = useState('');
  const [detailedNetworkName, setDetailedNetworkName] = useState('');
  const [detailedNetworkId, setDetailedNetworkId] = useState('');
  const [result, setResult] = useState(null);

  const handleCreate = async () => {
    const result = await NetworkInfoDB.create(
      paymentReceiptIdx,
      paymentWalletName,
      mainBlockchainName,
      detailedNetworkName,
      detailedNetworkId
    );
    setResult(result);
  };

  const handleRead = async () => {
    const result = await NetworkInfoDB.read(paymentReceiptIdx);
    setResult(result);
  };

  const handleUpdate = async () => {
    const result = await NetworkInfoDB.update(
      paymentReceiptIdx,
      paymentWalletName,
      mainBlockchainName,
      detailedNetworkName,
      detailedNetworkId
    );
    setResult(result);
  };

  const handleDelete = async () => {
    const result = await NetworkInfoDB.delete(paymentReceiptIdx);
    setResult(result);
  };

  return (
    <div className="network-info-container">
      <h2>Network Info</h2>
      <div className="input-container">
        <label htmlFor="payment-receipt-idx">Payment Receipt Index:</label>
        <input
          id="payment-receipt-idx"
          type="number"
          value={paymentReceiptIdx}
          onChange={(e) => setPaymentReceiptIdx(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="payment-wallet-name">Payment Wallet Name:</label>
        <input
          id="payment-wallet-name"
          type="text"
          value={paymentWalletName}
          onChange={(e) => setPaymentWalletName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="blockchain-name">Main Blockchain Name:</label>
        <input
          id="blockchain-name"
          type="text"
          value={mainBlockchainName}
          onChange={(e) => setMainBlockchainName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="detailed-network-name">Detailed Network Name:</label>
        <input
          id="detailed-network-name"
          type="text"
          value={detailedNetworkName}
          onChange={(e) => setDetailedNetworkName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="detailed-network-id">Detailed Network ID:</label>
        <input
          id="detailed-network-id"
          type="number"
          value={detailedNetworkId}
          onChange={(e) => setDetailedNetworkId(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleRead}>Read</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {result && (
        <div className="result-container">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NetworkInfo;