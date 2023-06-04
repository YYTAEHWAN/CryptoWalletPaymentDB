// // 결제의 사용 지갑, 네트워크 정보 테이블
// Table payment_receipt_network_info {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [pk]
  
//     // 블록체인 지갑 칼럼 ex) 메타마스크, 트러스트월렛
//     payment_wallet_name varchar
//     // 블록체인 네트워크  칼럼 ex) 이더리움, 비트코인, 리플
//     blockchain_name varchar
//     // 세부 네트워크 칼럼 ex) 이더리움 메인넷, BSC Mainnet, zkSync Era
//     detailed_network_name varchar
//     // 세부 네트워크 id 칼럼 (chain id를 의미)
//     detailed_network_id int
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝