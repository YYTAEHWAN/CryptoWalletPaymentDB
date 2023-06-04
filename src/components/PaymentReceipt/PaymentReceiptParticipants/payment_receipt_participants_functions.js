// // 해당 영수증(해당 거래)에 참여된 consumer와 seller 정보 저장 테이블
// Table payment_receipt_participants {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [pk]
//     // 참여한 소비자
//     consumer_id varchar
//     // 참여된 판매자
//     seller_id varchar
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝