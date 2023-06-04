// 일단 PaymentReceiptParticipantsCRUD 함수 내부를 완성시켜줄래?
// 조건은 이러해
// 1. firebase db 문법을 사용
// 2. document 이름을 식별자로 사용
// 3. 그렇기 때문에 create함수에서 doc(String(payment_receipt_idx)).set(data)의 형식을 사용함
// 4. 모든 CRUD 내부 코드에서는 가장 먼저 들어온 값이 데이터베이스에 존재하는지 확인하는 doc(String(payment_receipt_idx)).get() 함수부터 사용해

// 현재 PaymentReceiptParticipantsCRUD의 코드는 이래


// 이 파일의 CRUD 함수들을 react 환경에서 테스트해볼 수 있도록 html과 react hook을 사용하여
  // PriceAddressInfo 파일을 만들어줘

import React, { useState } from 'react';
import {PriceAddressInfoDB} from './PaymentReceiptPriceAddressInfoCRUD';

function PriceAddressInfo() {
  const [paymentReceiptIdx, setPaymentReceiptIdx] = useState('');
  const [totalCoinPrice, setTotalCoinPrice] = useState('');
  const [senderConsumerId, setSenderConsumerId] = useState('');
  const [receiverSellerId, setReceiverSellerId] = useState('');
  const [senderWalletAddress, setSenderWalletAddress] = useState('');
  const [receiverWalletAddress, setReceiverWalletAddress] = useState('');

  const createPriceAddressInfo = async () => {
    const result = await PriceAddressInfoDB.create(
      paymentReceiptIdx,
      totalCoinPrice,
      senderConsumerId,
      receiverSellerId,
      senderWalletAddress,
      receiverWalletAddress
    );
    if (result === 1) {
      console.log('데이터 생성 성공');
    } else {
      console.log('데이터 생성 실패');
    }
  };

  const readPriceAddressInfo = async () => {
    const result = await PriceAddressInfoDB.read(paymentReceiptIdx);
    if (result) {
      setTotalCoinPrice(result.total_coin_price);
      setSenderConsumerId(result.sender_consumer_id);
      setReceiverSellerId(result.receiver_seller_id);
      setSenderWalletAddress(result.sender_wallet_address);
      setReceiverWalletAddress(result.receiver_wallet_address);
      console.log('데이터 읽기 성공');
    } else {
      console.log('해당 데이터가 없습니다.');
      setTotalCoinPrice('');
      setSenderConsumerId('');
      setReceiverSellerId('');
      setSenderWalletAddress('');
      setReceiverWalletAddress('');
    }
  };

  const updatePriceAddressInfo = async () => {
    const result = await PriceAddressInfoDB.update(
      paymentReceiptIdx,
      totalCoinPrice,
      senderConsumerId,
      receiverSellerId,
      senderWalletAddress,
      receiverWalletAddress
    );
    if (result === 1) {
      console.log('데이터 업데이트 완료');
    } else {
      console.log('데이터 업데이트 실패');
    }
  };

  const deletePriceAddressInfo = async () => {
    const result = await PriceAddressInfoDB.delete(paymentReceiptIdx);
    if (result === 1) {
      console.log('데이터 삭제 완료');
      setPaymentReceiptIdx('');
      setTotalCoinPrice('');
      setSenderConsumerId('');
      setReceiverSellerId('');
      setSenderWalletAddress('');
      setReceiverWalletAddress('');
    } else {
      console.log('데이터 삭제 실패');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'paymentReceiptIdx':
        setPaymentReceiptIdx(value);
        break;
      case 'totalCoinPrice':
        setTotalCoinPrice(value);
        break;
      case 'senderConsumerId':
        setSenderConsumerId(value);
        break;
      case 'receiverSellerId':
        setReceiverSellerId(value);
        break;
      case 'senderWalletAddress':
        setSenderWalletAddress(value);
        break;
      case 'receiverWalletAddress':
        setReceiverWalletAddress(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Payment Receipt Price Address Info</h2>
      <div>
        <label>Payment Receipt ID:</label>
        <input type="text" name="paymentReceiptIdx" value={paymentReceiptIdx} onChange={handleInputChange} />
      </div>
      <div>
        <label>Total Coin Price:</label>
        <input type="text" name="totalCoinPrice" value={totalCoinPrice} onChange={handleInputChange} />
      </div>
      <div>
        <label>Sender Consumer ID:</label>
        <input type="text" name="senderConsumerId" value={senderConsumerId} onChange={handleInputChange} />
      </div>
      <div>
        <label>Receiver Seller ID:</label>
        <input type="text" name="receiverSellerId" value={receiverSellerId} onChange={handleInputChange} />
      </div>
      <div>
        <label>Sender Wallet Address:</label>
        <input type="text" name="senderWalletAddress" value={senderWalletAddress} onChange={handleInputChange} />
      </div>
      <div>
        <label>Receiver Wallet Address:</label>
        <input type="text" name="receiverWalletAddress" value={receiverWalletAddress} onChange={handleInputChange} />
      </div>
      <div>
        <button onClick={createPriceAddressInfo}>Create</button>
        <button onClick={readPriceAddressInfo}>Read</button>
        <button onClick={updatePriceAddressInfo}>Update</button>
        <button onClick={deletePriceAddressInfo}>Delete</button>
      </div>
    </div>
  );
}

export default PriceAddressInfo;
