

// 함수를 사용할 때 넣을 인자들을 묶어놓은 객체들 예시입니다.
let statusInfo = {
    payment_receipt_idx: 1,
    payment_status: "1", // 결제 중 = 1, 결제 완료 = 999, 결제 실패 = -1, DB 만드는 중 = 0, 환불 요청 = 2, 환불 완료 = 3, 결제 취소는 필요 없지?
    payment_start_time: "2023-05-20 13:00:00",
    payment_end_time: null
};

let networkInfo = {
    payment_receipt_idx: 1,
    payment_wallet_name: "메타마스크",
    blockchain_name: "이더리움",
    detailed_network_name: "이더리움 메인넷",
    detailed_network_id: 1
};

let priceAddressInfo = {
    payment_receipt_idx: 1,
    total_coin_price: 0.00196,
    sender_consumer_id: "consumer1",
    receiver_seller_id: "seller1",
    sender_wallet_address: "0x123...",
    receiver_wallet_address: "0x456..."
};

let products = [
    {
        product_name: gimchi,
        product_won_price_per : 3000,
        num_of_product: 2
    },
    {
        product_name: ganjang,
        product_won_price_per : 2000,
        num_of_product: 3
    }
];

// sellerWeb이 우리의 API 서버를 통해 qr 코드를 생성하고, 생성된 QR을 consumer가 찍으면
// 질문 1. 어떤 화면을 띄울 거야? 
//          a. 블록체인 관련 정보 없이 순수한 결제 정보만 보여주는 화면 
//          b. 블록체인 관련 정보까지 보여주는 화면
// a 예시 : consumer가 보는 NangNang 앱 화면엔 product_name, won_price, num_of_product 가 존재
// 넘겨 받는 실제 정보들은 아래와 같음

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝

import * as statusInfoDB from "./payment_receipt_status_info/payment_receipt_status_info_CRUD.js";
import * as networkInfoDB from "./payment_receipt_network_info/payment_receipt_network_info_CRUD.js";
import * as priceAddressInfoDB from "./payment_receipt_price_address_info/payment_receipt_price_address_info_CRUD.js";
import * as multipleProductsInfoDB from "./payment_receipt_multiple_products_info/payment_receipt_multiple_products_info_CRUD.js";
import * as participantsDB from "./payment_receipt_participants/payment_receipt_participants_CRUD.js";

import * as sellerProductsDB from "../user/seller/product/seller_products/seller_products_CRUD.js";
import * as productInfoDB from "../user/seller/product/product_info/product_info_CRUD.js";
import isExist_product_info_with_seller_id_and_product_name from "../user/seller/product/product_join_functions.js";
// 여러 결제들이 동시에 몰리면 PaymentReceipt_status_info 에서 status가 0이니까 혼란이 생길 수 있고
// "" getPresentPaymentReceiptIdx() 가 계속 바뀌어서 혼란이 생길 수 있음
// 다 만들고 생각해보기
// 트랜잭션을 어떻게 만들건지? 아니면 다른 해결책이 있을지?


// 그리고 이 부분이 웹과 앱에서 동시에 DB에 접근하면서 넣어야하니까 굉장히 어렵다



// 실제 함수들 시작


// 정혁형 1번 요청. 판매자 플랫폼이 보낸 (코인 변환 이전) 데이터들(1. 제품명 2. 원화가격 3. 구매 개수 4. seller_id) DB에 저장하기
// 아마 서버 API에서 이 함수를 호출할 것 같음
// 단계 1. product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 없다면 저장 (product_info_idx는 자동 증가후 저장됨)
// 단계 2. 없었다면 seller_products에 (판매자 아이디, product_info_idx) 저장
function ifIsNotExist_saveProductData_ReturnIdx(one_product_object, seller_id) {
    // 접근 db name : product_info
    // product_info db columns : product_info_idx, product_name, product_won_price_per
    // 접근 db name : seller_products
    // seller_products db columns : seller_id, product_info_idx

    // one_product_object : 판매자가 보낸 하나의 제품 데이터
    // seller_id : 판매자 아이디

    // 하나의 제품 데이터만 들어오게끔 만들어놓음
    const current_one_product_object = one_product_object;
   
    // isExist = 1 해당 제품이 DB의 기존 데이터에 존재, isExist = 0 존재X
    const isExist = isExist_product_info_with_seller_id_and_product_name(seller_id, one_product_object.product_name) 
    
    const result = -1; // -1로 초기화

    if(isExist == 0) {
        // product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 없다면 
        // 저장 (product_info_idx는 자동 증가후 저장됨)

        // create_product_info 성공하면 product_info_idx 반환, 실패하면 -1 반환
        const product_info_idx = productInfoDB.create_product_info(product_name, product_won_price_per);
        
        // seller_products에 (판매자 아이디, product_info_idx) 저장, 성공하면 1 반환, 실패하면 -1 반환
        result = sellerProductsDB.create_seller_products(seller_id, product_info_idx);
    }
    if(result == 1) {
        // 저장 성공하면 1 반환
        return 1;
    }
    else {
        // 저장 실패하면 -1 반환
        return -1;
    }
}


// PaymentReceipt 를 만들고 결제하기 전 초기 세팅 함수
// PaymentReceipt의 idx를 가져오고, 그 idx를 이용해 다른 테이블들에 정보를 저장하기 시작함, 결제 시작 시점도 저장함
// qr 코드 만들고 바로 시행되어야 함 그래야 
function startSet_paymentReceiptStatusInfo() {
    // 접근 db name : payment_receipt_status_info
    // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time

    // payment_receipt_idx : 결제 영수증 식별 idx 인데 increment라서 뺌
    const payment_status = 0; // 테이블 만드는 중 = 0
    const payment_start_time = "2023-05-20 19:40:00"; // //getLocalTime() 요런 함수 쓰기  // 결제 시작 시점
    const payment_end_time = null; // 결제 완료 시점 (아직 결제가 완료되지 않았으니까 null) 

    // payment_receipt_status_info db에 statusInfo정보 저장
    const payment_receipt_idx = statusInfoDB.create_payment_receipt_status_info(payment_status,
        payment_start_time, payment_end_time);
    if(payment_receipt_idx != -1) {
        return payment_receipt_idx; // db에 저장 성공하면 payment_receipt_idx 반환
    }
    else {
        return -1; // db에 저장 실패하면 -1 반환
    }
    return -1; // db에 저장 실패하면 -1 반환
}

// paymentReceiptStatusInfo에 마지막 end_time 설정하고, status 바꾸는 함수
function endSet_paymentReceiptStatusInfo() {
    const payment_status = 999; // 결제 완료 = 999
    const payment_end_time = "2023-05-21 03:05:00"; // 결제 완료 시점
    const result = statusInfoDB.update_end_time_and_status_payment_receipt_status_info(payment_receipt_idx, payment_status, payment_end_time);

    return result; // 1: 성공, -1: 실패
}

// 해당 영수증(거래)에서 결제해야할 총 원화 개수 구하기
// product_info db에서 product_won_price_per를 가져오고, 
// payment_receipt_multiple_products_info db에서 num_of_product를 가져와서 곱한 것들을 다 더하여 총 원화 가격을 계산함
function get_total_won_price(payment_receipt_idx) {
    // 접근 db name : product_info
    // product_info db columns : product_info_idx, product_name, product_won_price_per
    // 접근 db name : payment_receipt_multiple_products_info
    // payment_receipt_multiple_products_info db columns : payment_receipt_idx, product_info_idx, num_of_product

    // payment_receipt_idx : 결제 영수증 식별 idx
    
    // 각 db 접근해서 값 가져오고 계산해서 리턴
    const total_won_price = 0; // 임시로 0으로 초기화
    return total_won_price;
}

// 앱에서 QR을 찍으면 앱에서 실행되는 결제를 위한 사전 준비 함수
function preparePayment(products, seller_id, customer_id, networkInfo, priceAddressInfo) {
    // 접근 db name : payment_receipt_network_info
    // payment_receipt_network_info db columns : payment_receipt_idx, payment_wallet_name, blockchain_name, detailed_network_name, detailed_network_id
    // 접근 db name : payment_receipt_price_address_info
    // payment_receipt_price_address_info db columns : payment_receipt_idx, total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address
    // 접근 db name : payment_receipt_multiple_products_info
    // payment_receipt_multiple_products_info db columns : payment_receipt_idx, product_info_idx, num_of_product

    // input_networkInfo : 네트워크 정보 -> 맨 나중에 넣으면 돼서 삭제
    // priceAddressInfo : 가격과 주소 정보 
    // products : 제품 정보

    // products가 만약 이렇다면
    const temp_products = [
        {product_name, product_won_price_per, num_of_product},
         {product_name, product_won_price_per, num_of_product},
         {product_name, product_won_price_per, num_of_product}]

    const result = -1; // -1로 초기화

    // 3-1.
    // 앱 -> 서버
    const payment_receipt_idx = startSet_paymentReceiptStatusInfo() // 초기 상태 설정 (payment_receipt_idx를 가져옴) 
    
    3 - 2,3 
    // 앱 -> 서버
    // 제품 정보 저장 (있으면 저장 안하고 없으면 저장하고  )
    // 여기서 products를 하나의 product로 나눠서 넣어주고, 함수 써주는 게 깔끔할 듯
    for (let i = 0; i < products.length; i++) {
        const one_product_object = temp_products[i];
        3-2.
        result = ifIsNotExist_saveProductData_ReturnIdx(one_product_object, seller_id); // 저장하는 곳은 seller_products, product_info db
        // ------------------------ 한 번 더 보기 ------------------------
        // ------------------------ 한 번 더 보기 ------------------------
        if(result == -1) return -1; // -1: 실패 // 여기 수정 필요 위에 함수는 언제나 idx 리턴함
        // ------------------------ 한 번 더 보기 ------------------------
        // ------------------------ 한 번 더 보기 ------------------------
        // 지금은 result = product_info_idx임
        3-3.
        result = multipleProductsInfoDB.create_payment_receipt_multiple_products_info(payment_receipt_idx, result, one_product_object.num_of_product); // 저장하는 곳은 payment_receipt_multiple_products_info db
        if(result == -1) return -1; // -1: 실패
    }

    // 3-4.
    // 앱 -> 서버
    // 해당 영수증(거래)에 참여한 consumer_id와 seller_id 저장
    participantsDB.create_payment_receipt_participants(payment_receipt_idx, customer_id, seller_id); // 저장하는 곳은 payment_receipt_participants db
};

// 4. 결제 버튼 누른 후 앱에서 실행되는 함수
// total_won_price, total_coin_price 계산 끝났고
// priceAddressInfo 객체도 다 만들어졌고
// networkInfo 객체도 다 만들어진 상태
// 이젠 앱에서 코인가격, 네트워크, 결제 진행할 지갑주소 등 블록체인 결제를 위한 정보 페이지 제공 후
// "결제하기" 버튼이 사용자에게 제공되고, 사용자가 "결제하기" 버튼을 누르면 실행되는 함수
// payment_receipt_price_address_info , payment_receipt_network_info db에 정보를 저장하고
// payment_receipt_status_info의 status를 1 "결제 중"으로 바꿈
function AfterSignTxOnBlockchain(payment_receipt_idx, total_won_price,total_coin_price, priceAddressInfo, networkInfo) {
    // 사실 이건 앱에서 하나하나 해도 되는데 그냥 만들어봄

    // 접근 db name : payment_receipt_network_info
    // payment_receipt_network_info db columns : payment_receipt_idx, payment_wallet_name, blockchain_name, detailed_network_name, detailed_network_id
    // 접근 db name : payment_receipt_price_address_info
    // payment_receipt_price_address_info db columns : payment_receipt_idx, total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address
    // 접근 db name : payment_receipt_status_info
    // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time

    // payment_receipt_idx : 결제 영수증 식별 idx
    // total_won_price : 총 원화 가격
    // total_coin_price : 총 코인 가격
    // priceAddressInfo : 가격과 주소 정보
    // networkInfo : 네트워크 정보

    // payment_receipt_network_info db에 networkInfo정보 저장
    const result = networkInfoDB.create_payment_receipt_network_info(payment_receipt_idx, networkInfo.payment_wallet_name, networkInfo.blockchain_name, networkInfo.detailed_network_name, networkInfo.detailed_network_id);
    if(result == -1) return -1; // -1: 실패

    // payment_receipt_price_address_info db에 priceAddressInfo정보 저장
    result = priceAddressInfoDB.create_payment_receipt_price_address_info(payment_receipt_idx, total_coin_price, priceAddressInfo.sender_consumer_id, priceAddressInfo.receiver_seller_id, priceAddressInfo.sender_wallet_address, priceAddressInfo.receiver_wallet_address);
    if(result == -1) return -1; // -1: 실패

    // payment_receipt_status_info의 status를 1 "결제 중"으로 바꿈
    result = statusInfoDB.update_status_payment_receipt_status_info(payment_receipt_idx, 1);
    if(result == -1) return -1; // -1: 실패

    return result; // 1: 성공, -1: 실패
}

// 5. 결제 완료 후 앱에서 실행되는 함수
// 4번 함수처럼 안만들어도 됨 근데 파일의 흐름상 있으면 깔끔한 마무리가 될 것 같아서 만들어봄
function AfterTxCompleted(payment_receipt_idx) {
    // 접근 db name : payment_receipt_status_info
    // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time

    // payment_receipt_idx : 결제 영수증 식별 idx

    // payment_receipt_status_info의 status를 999 "결제 완료"으로 바꿈
    const result = statusInfoDB.update_status_payment_receipt_status_info(payment_receipt_idx, 999);
    if(result == -1) return -1; // -1: 실패

    return result; // 1: 성공, -1: 실패
}

// 6. 결제가 완료되었다는 것을 서버가 DB를 확인하다가 알아서 판매자 플랫폼에 보내주면 될 듯

