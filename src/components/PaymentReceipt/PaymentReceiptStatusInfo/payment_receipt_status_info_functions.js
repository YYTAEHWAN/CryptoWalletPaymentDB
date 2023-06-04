// // 결제 영수증 상태 테이블
// Table payment_receipt_status_info {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [increment, pk]
  
//     // 해당 영수증이 발행된 후 상태가 "테이블 만드는 중(0)" 인지 "결제 중(1)" 인지
//     // 아니면 "결제 완료(999)" 인지, "환불 요청(2)" 인지, "환불 완료(3)" 인지, "결제 실패(-1)" 인지
//     // 처럼 결제의 상태를 알려주는 payment_status 칼럼
//     payment_status varchar
//     // 결제 시작 시점을 알려주는 칼럼
//     payment_start_time varchar
//     // 결제 완료 시점을 알려주는 칼럼
//     payment_end_time varchar
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝