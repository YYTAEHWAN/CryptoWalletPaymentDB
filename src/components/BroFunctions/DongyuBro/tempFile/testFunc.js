// 필요한 모듈 또는 파일을 불러옵니다.
// const 함수명 = require('./파일명.js');

import {saveProductDataSentBySeller} from '../PaymentProcess/ApptoServer.js'
import {preparePayment} from '../PaymentProcess/ApptoServer.js'
import {AfterConnectWallet} from '../PaymentProcess/ApptoServer.js'
import {AfterSignTxOnBlockchain} from '../PaymentProcess/ApptoServer.js'

// 버튼 요소를 가져옵니다.
const saveButton = document.getElementById('saveButton');
const prepareButton = document.getElementById('prepareButton');
const connectButton = document.getElementById('connectButton');
const signButton = document.getElementById('signButton');

// saveProductDataSentBySeller 함수 테스트
saveButton.addEventListener('click', async () => {
  const sellerId = 'seller1001';
  const productData = {
    product_name: 'gimchi',
    product_won_price_per: 3000,
    num_of_product: 2
  };

  const result = await saveProductDataSentBySeller(sellerId, productData);
  console.log('saveProductDataSentBySeller Result:', result);
});

// preparePayment 함수 테스트
prepareButton.addEventListener('click', async () => {
  const products = [
    {
      product_name: 'gimchi',
      product_won_price_per: 3000,
      num_of_product: 2
    },
    {
      product_name: 'ganjang',
      product_won_price_per: 2000,
      num_of_product: 3
    }
  ];
  const sellerId = 'seller1001';
  const customerId = 'gen1001';

  const result = await preparePayment(products, sellerId, customerId);
  console.log('preparePayment Result:', result);
});

// AfterConnectWallet 함수 테스트
connectButton.addEventListener('click', async () => {
  const paymentReceiptIdx = 6;
  const priceAddressInfoObject = {
    payment_receipt_idx: 6,
    total_won_price: 12000,
    total_coin_price: null,
    sender_consumer_id: 'gen1001',
    receiver_seller_id: 'seller1001',
    sender_wallet_address: null,
    receiver_wallet_address: null
  };
  const networkInfoObject = {
    payment_receipt_idx: 6,
    payment_wallet_name: '메타마스크',
    main_blockchain_name: '이더리움',
    detailed_network_name: '이더리움 메인넷',
    detailed_network_id: 1
  };

  const result = await AfterConnectWallet(paymentReceiptIdx, priceAddressInfoObject, networkInfoObject);
  console.log('AfterConnectWallet Result:', result);
  
});

// AfterSignTxOnBlockchain 함수 테스트
signButton.addEventListener('click', async () => {
  const paymentReceiptIdx = 6;

  const result = await AfterSignTxOnBlockchain(paymentReceiptIdx);
  console.log('AfterSignTxOnBlockchain Result:', result);
});