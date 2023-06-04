// // 해당 영수증에서 구매한 여러 상품의 종류(idx)와 개수(num)을 저장하는 테이블
// Table payment_receipt_multiple_products_info {
//     // 복합키로 설정
//       // 결제 영수증 식별 idx 칼럼
//       payment_receipt_idx int [pk]
//       // 구매하려는 상품 번호
//       product_info_idx int [pk]
  
//     // 몇 개?
//     num_of_product int
//   }
  

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝

