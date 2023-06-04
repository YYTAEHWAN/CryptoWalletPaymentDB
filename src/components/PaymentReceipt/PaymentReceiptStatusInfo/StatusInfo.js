import React, { useState } from 'react';
import {statusInfoDB} from './PaymentReceiptStatusInfoCRUD';

function StatusInfo() {
  const [paymentReceiptIdx, setPaymentReceiptIdx] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentStartTime, setPaymentStartTime] = useState('');
  const [paymentEndTime, setPaymentEndTime] = useState('');

  // 결제 영수증 상태 정보를 생성하는 함수
  const createStatusInfo = async () => {
    const docId = await statusInfoDB.create();
    console.log('새로운 결제 영수증 식별자:', docId);
    setPaymentReceiptIdx(docId);
  };

  // 결제 영수증 상태 정보를 읽어오는 함수
  const readStatusInfo = async () => {
    const result = await statusInfoDB.read(paymentReceiptIdx);
    if (result) {
      setPaymentStatus(result.payment_status);
      setPaymentStartTime(result.payment_start_time);
      setPaymentEndTime(result.payment_end_time);
    } else {
      console.log('해당 데이터가 없습니다.');
      setPaymentStatus('');
      setPaymentStartTime('');
      setPaymentEndTime('');
    }
  };

  const updateStatusInfo = async () => {
    await statusInfoDB.updateOnlyStatus(paymentReceiptIdx, paymentStatus);
    console.log('데이터 수정 완료');
  };

  const updateStartTime = async () => {
    await statusInfoDB.updateTime(paymentReceiptIdx, paymentStartTime, paymentEndTime);
    console.log('시작 시간 수정 완료');
  };

  const updateEndTime = async () => {
    await statusInfoDB.updateEndTime(paymentReceiptIdx);
    console.log('종료 시간 수정 완료');
  };

  // 결제 영수증 상태 정보를 삭제하는 함수
  const deleteStatusInfo = async () => {
    await statusInfoDB.delete(paymentReceiptIdx);
    console.log('데이터 삭제 완료');
    setPaymentReceiptIdx('');
    setPaymentStatus('');
    setPaymentStartTime('');
    setPaymentEndTime('');
  };

  // 폼 입력값 변경 이벤트 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'paymentReceiptIdx':
        setPaymentReceiptIdx(value);
        break;
      case 'paymentStatus':
        setPaymentStatus(value);
        break;
      case 'paymentStartTime':
        setPaymentStartTime(value);
        break;
      case 'paymentEndTime':
        setPaymentEndTime(value);
        break;
      default:
        break;
    }
  };

//   const handleInputChange = (e) => {
//     if (e.target.id === 'userIdInput') {
//       setUserId(e.target.value);
//     } else if (e.target.id === 'passwordInput') {
//       setPassword(e.target.value);
//     }
//   };
// <div>
//         <label htmlFor="userIdInput">아이디:</label>
//         <input id="userIdInput" type="text" value={userId} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label htmlFor="passwordInput">비밀번호:</label>
//         <input id="passwordInput" type="password" value={password} onChange={handleInputChange} />
//       </div>

return (
    <div>
      <h2>Payment Receipt Status Info</h2>
      <div>
        <label>Payment Receipt ID:</label>
        <input type="text" name="paymentReceiptIdx" value={paymentReceiptIdx} onChange={handleInputChange} />
        <button onClick={createStatusInfo}>Create</button>
      </div>
      <div>
        <span style={{ marginRight: '30px' }}></span>
        <button onClick={readStatusInfo}>Read</button>
        <span style={{ marginRight: '30px' }}></span>
        <button onClick={deleteStatusInfo}>Delete</button>
      </div>
      <div>
        <h3>Payment Status: {paymentStatus}</h3>
        <h3>Payment Start Time: {paymentStartTime}</h3>
        <h3>Payment End Time: {paymentEndTime}</h3>
      </div>
      <div>
        <h2>Update Payment Status</h2>
        <div>
          <label>Payment Status:</label>
          <input type="text" name="paymentStatus" value={paymentStatus} onChange={handleInputChange} />
          <button onClick={updateStatusInfo}>Update</button>
        </div>
      </div>
      <div>
        <h2>Update Payment Start Time</h2>
        <div>
          <label>Payment Start Time:</label>
          <input type="text" name="paymentStartTime" value={paymentStartTime} onChange={handleInputChange} />
          <button onClick={updateStartTime}>Update</button>
        </div>
      </div>
      <div>
        <h2>Update Payment End Time</h2>
        <div>
          <label>Payment End Time:</label>
          <input type="text" name="paymentEndTime" value={paymentEndTime} onChange={handleInputChange} />
          <button onClick={updateEndTime}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default StatusInfo;