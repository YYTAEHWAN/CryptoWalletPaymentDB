// // 결제의 코인가격과 거래 주소 정보 테이블
// Table payment_receipt_price_address_info {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [pk]
    
//     // 원화 총 결제 금액
//     // payment_receipt_multiple_products_info 를 통해 계산
//     total_won_price int
//     // 코인 총 결제 금액 ex) 0.00196 (ETH의 경우)
//     total_coin_price int
//     // 발신자 id
//     sender_consumer_id varchar
//     // 수신자 id
//     receiver_seller_id varchar
//     // 발신자 지갑 주소
//     sender_wallet_address varchar
//     // 수신자 지갑 주소
//     receiver_wallet_address varchar
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝