import React, { useState } from 'react';
import { ParticipantsDB } from './PaymentReceiptParticipantsCRUD';

function Participants() {
  const [paymentReceiptIdx, setPaymentReceiptIdx] = useState('');
  const [consumerId, setConsumerId] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [result, setResult] = useState('');

  const handleCreate = async () => {
    const res = await ParticipantsDB.create(
      paymentReceiptIdx,
      consumerId,
      sellerId
    );
    setResult(res === 1 ? '데이터 생성 성공' : '데이터 생성 실패');
  };

  const handleRead = async () => {
    const res = await ParticipantsDB.read(paymentReceiptIdx);
    if (res) {
      setResult(`consumer_id: ${res.consumer_id}, seller_id: ${res.seller_id}`);
    } else {
      setResult('해당 데이터가 없습니다.');
    }
  };

  const handleUpdate = async () => {
    const res = await ParticipantsDB.update(
      paymentReceiptIdx,
      consumerId,
      sellerId
    );
    setResult(res === 1 ? '데이터 수정 성공' : '데이터 수정 실패');
  };

  const handleDelete = async () => {
    const res = await ParticipantsDB.delete(paymentReceiptIdx);
    setResult(res === 1 ? '데이터 삭제 성공' : '데이터 삭제 실패');
  };

  return (
    <div>
      <h1>Participants CRUD</h1>
      <div>
        <label htmlFor="paymentReceiptIdx">payment_receipt_idx:</label>
        <input
          type="text"
          id="paymentReceiptIdx"
          value={paymentReceiptIdx}
          onChange={(e) => setPaymentReceiptIdx(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="consumerId">consumer_id:</label>
        <input
          type="text"
          id="consumerId"
          value={consumerId}
          onChange={(e) => setConsumerId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sellerId">seller_id:</label>
        <input
          type="text"
          id="sellerId"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleRead}>Read</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>{result}</div>
    </div>
  );
}

export default Participants;