import React, { useState } from 'react';
import { MultipleProductsInfoDB } from './PaymentReceiptMultipleProductsInfoCRUD';

const MultipleProductsInfo = () => {
  const [paymentReceiptIdx, setPaymentReceiptIdx] = useState('');
  const [productInfoIdx, setProductInfoIdx] = useState('');
  const [numOfProduct, setNumOfProduct] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    const result = await MultipleProductsInfoDB.create(
      paymentReceiptIdx,
      productInfoIdx,
      numOfProduct
    );

    if (result === 1) {
      setMessage('데이터 생성 성공');
    } else {
      setMessage('데이터 생성 실패');
    }
  };

  const handleRead = async () => {
    const result = await MultipleProductsInfoDB.read(
      paymentReceiptIdx,
      productInfoIdx
    );

    if (result) {
      setMessage(`제품 개수 : ${JSON.stringify(result.quantity)}개`);
    } else {
      setMessage('데이터가 존재하지 않습니다.');
    }
  };

  const handleUpdate = async () => {
    const result = await MultipleProductsInfoDB.update_num_of_product(
      paymentReceiptIdx,
      productInfoIdx,
      numOfProduct
    );

    if (result === 1) {
      setMessage('데이터 수정 성공');
    } else {
      setMessage('데이터 수정 실패');
    }
  };

  const handleDelete = async () => {
    const result = await MultipleProductsInfoDB.delete(
      paymentReceiptIdx,
      productInfoIdx
    );

    if (result === 1) {
      setMessage('데이터 삭제 성공');
    } else {
      setMessage('데이터 삭제 실패');
    }
  };

  return (
    <div>
      <h2>MultipleProductsInfo CRUD 테스트</h2>
      <div>
        <label>결제 영수증 식별 idx: </label>
        <input
          type="text"
          value={paymentReceiptIdx}
          onChange={(e) => setPaymentReceiptIdx(e.target.value)}
        />
      </div>
      <div>
        <label>상품 번호: </label>
        <input
          type="text"
          value={productInfoIdx}
          onChange={(e) => setProductInfoIdx(e.target.value)}
        />
      </div>
      <div>
        <label>상품 개수: </label>
        <input
          type="text"
          value={numOfProduct}
          onChange={(e) => setNumOfProduct(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleCreate}>생성</button>
        <button onClick={handleRead}>조회</button>
        <button onClick={handleUpdate}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default MultipleProductsInfo;