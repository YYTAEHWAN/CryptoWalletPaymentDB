import React, { useState, useEffect } from 'react';
import { userDataDB } from './UserDataCRUD';

function UserData() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [consumerOrNot, setConsumerOrNot] = useState(0); // 초기값은 판매자(0)
    const [email, setEmail] = useState('');
    const [realName, setRealName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rRNumber, setRRNumber] = useState('');
    const [userData, setUserData] = useState(null);
  
    // id : 사용자가 입력한 아이디
    // password : 사용자가 입력한 비밀번호
    // consumer_or_not : 소비자(1)인지 판매자(0)인지 확인하는 변수
    // email : 사용자가 입력한 이메일
    // real_name : 사용자가 입력한 실명
    // phone_number : 사용자가 입력한 전화번호
    // resident_registration_number : 사용자가 입력한 주민등록번호

    const handleCreate = async () => {
        const result = await userDataDB.createUserData(
            id,
            password,
            consumerOrNot,
            email,
            realName,
            phoneNumber,
            rRNumber
          );
        if (result === 1) {
            console.log("사용자 데이터 생성 성공");
        } else {
            console.log("사용자 데이터 생성 실패");
        }
    };
  
    const handleRead = async () => {
      const data = await userDataDB.readUserData(id);
      if (data) {
        setUserData(data);
      } else {
        console.log('사용자 데이터를 읽어오는데 실패했습니다.');
      }
    };
  
    const handleUpdate = async () => {
      const result = await userDataDB.updateUserData(id,
        password,
        email,
        realName,
        phoneNumber 
    );
      if (result) {
        console.log('사용자 데이터가 성공적으로 수정되었습니다.');
        setConsumerOrNot(1);
        setRRNumber("");
      } else {
        console.log('사용자 데이터 수정에 실패했습니다.');
      }
    };
  
    const handleDelete = async () => {
      const result = await userDataDB.deleteUserData(id);
      if (result === 1) {
        console.log('사용자 데이터가 성공적으로 삭제되었습니다.');
      } else {
        console.log('사용자 데이터 삭제에 실패했습니다.');
      }
    };
  
    useEffect(() => {
      // 초기 데이터 로드 등 필요한 작업 수행
    }, []);
  
    return (
      <div>
        <h1>User Data</h1>
        <form>
          <label>
            ID:
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Consumer or Not:
            <select value={consumerOrNot} onChange={(e) => setConsumerOrNot(Number(e.target.value))}>
              <option value={0}>판매자</option>
              <option value={1}>소비자</option>
            </select>
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Real Name:
            <input type="text" value={realName} onChange={(e) => setRealName(e.target.value)} />
          </label>
          <br />
          <label>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <br />
          <label>
            resident registration number:
            <input type="text" value={rRNumber} onChange={(e) => setRRNumber(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleCreate}>Create</button>
          <button type="button" onClick={handleRead}>Read</button>
          <button type="button" onClick={handleUpdate}>Update</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </form>
        {userData && (
          <div>
            <h2>Read Result</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
  
  export default UserData;