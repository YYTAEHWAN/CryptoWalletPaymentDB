

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



// 여러 결제들이 동시에 몰리면 PaymentReceipt_status_info 에서 status가 0이니까 혼란이 생길 수 있고
// "" getPresentPaymentReceiptIdx() 가 계속 바뀌어서 혼란이 생길 수 있음
// 다 만들고 생각해보기
// 트랜잭션을 어떻게 만들건지? 아니면 다른 해결책이 있을지?


// 그리고 이 부분이 웹과 앱에서 동시에 DB에 접근하면서 넣어야하니까 굉장히 어렵다


import {db} from '../../../../services/firebase.js';
import {productInfoDB} from '../../../../components/User/SellerData/Product/ProductInfo/ProductInfoCRUD.js';
import {sellerProductsDB} from '../../../../components/User/SellerData/Product/SellerProducts/SellerProductsCRUD.js';

// 실제 함수들 시작

const getSellerProductInfoIdxList = async (sellerId) => {
    try {
      const querySnapshot = await db
        .collection("seller_products")
        .where("seller_id", "==", sellerId)
        .get();
  
      const productInfoIdxList = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productInfoIdxList.push(data.product_info_idx);
      });
  
      return productInfoIdxList;
    } catch (error) {
      console.error("판매자의 product_info_idx 가져오기 실패:", error);
      return [];
    }
  };

  const checkProductNameExistence = async (productInfoIdxList, product_datas) => {
    try {
      const productNamesSnapshot = await db
        .collection("product_info")
        .where("product_info_idx", "in", productInfoIdxList)
        .select("product_name")
        .get();
  
      const product_name_list = [];
      productNamesSnapshot.forEach((doc) => {
        const data = doc.data();
        product_name_list.push(data.product_name);
      });
  
      const isExist = product_name_list.includes(product_datas.product_name) ? 1 : 0;
  
      return isExist;
    } catch (error) {
      console.error("제품 이름 검색결과 없음 -> 새 생품이므로 등록요망:", error);
      return 0;
    }
  };



// 정혁형 1번 요청. 판매자 플랫폼이 보낸 (코인 변환 이전) 데이터들(1. 제품명 2. 원화가격 3. 구매 개수 4. seller_id) DB에 저장하기
// 아마 서버 API에서 이 함수를 호출할 것 같음
// 단계 1. product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 없다면 저장 (product_info_idx는 자동 증가후 저장됨)
// 단계 2. 없었다면 seller_products에 (판매자 아이디, product_info_idx) 저장
function saveProductDataSentBySeller(seller_id, product_datas) {
    // 접근 db name : product_info
    // product_info db columns : product_info_idx, product_name, product_won_price_per
    // 접근 db name : seller_products
    // seller_products db columns : seller_id, product_info_idx

    // ex) const product_infos = [product_name, product_won_price_per, num_of_product]
    // product_infos : 판매자 플랫폼이 보낸 (코인 변환 이전) 한 제품의 데이터(1. 제품 명 2. 개당 원화 가격 3. 구매 개수)
    // seller_id : 판매자 아이디

    // isExist = 1 존재, isExist = 0 존재하지 않음
    const productInfoIdxList = getSellerProductInfoIdxList(seller_id);

    // 해당 productInfoIdxList 리스트의 product_name 값을 모두 가져와서 product_name_list에 저장한 뒤
    // product_name_list에 입력한 product_datas.product_name 이 존재하는지 확인
    // 확인 후에 존재하면 isExist = 1, 존재하지 않으면 isExist = 0
    const isExist = checkProductNameExistence(productInfoIdxList, product_datas);
    
    if(isExist === 0) {
        // product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 없다면 
        // 저장 (product_info_idx는 자동 증가후 저장됨)

        // create_product_info 성공하면 product_info_idx 반환, 실패하면 -1 반환
        const product_info_idx = productInfoDB.createProductInfo(product_name, product_won_price_per);
        if (product_info_idx === -1) {
            // 저장 실패하면 -1 반환
            return -1;
        }
            // seller_products에 (판매자 아이디, product_info_idx) 저장, 성공하면 1 반환, 실패하면 -1 반환
        const result = sellerProductsDB.createSellerProducts(seller_id, product_info_idx);
        if(result == 1) {
            // 저장 성공하면 1 반환
            return 1;
        }
        else {
            // 저장 실패하면 -1 반환
            return -1;
        }
    }
    else if(isExist === 1) {
        // product_info에 (제품명,원화가격) 해당 데이터가 있으면
        // 저장하지 않고 0 반환
        return 0;
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


function makePayment(products, seller_id) {
    // 접근 db name : payment_receipt_network_info
    // payment_receipt_network_info db columns : payment_receipt_idx, payment_wallet_name, blockchain_name, detailed_network_name, detailed_network_id
    // 접근 db name : payment_receipt_price_address_info
    // payment_receipt_price_address_info db columns : payment_receipt_idx, total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address
    // 접근 db name : payment_receipt_multiple_products_info
    // payment_receipt_multiple_products_info db columns : payment_receipt_idx, product_info_idx, num_of_product

    // input_networkInfo : 네트워크 정보 -> 맨 나중에 넣으면 돼서 삭제
    // priceAddressInfo : 가격과 주소 정보 
    // products : 여러 제품의 정보들
    // products = [product1, product2, ...]
    // product1 = {product_name, product_won_price_per, num_of_product}

    const result = -1; // -1로 초기화
    // 웹 -> 서버
    const payment_receipt_idx = startSet_paymentReceiptStatusInfo() // 초기 상태 설정 (payment_receipt_idx를 가져옴) 
    // 웹 -> 서버
    result = saveProductDataFromSeller(products, seller_id); // 제품 정보 저장
    if(result == -1) return -1; // -1: 실패

    result = update_status_payment_receipt_status_info(payment_receipt_idx, 1) // 1은 "결제 중"
    if(result == -1) return -1; // -1: 실패



    result = endSet_paymentReceiptStatusInfo(); // 마지막 상태 설정
    if(result == -1) return -1; // -1: 실패

};



// PaymentReceipt의 idx를 가져옴
function getPresentPaymentReceiptIdx() {
    // 접근 db name : payment_receipt_status_info
    // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time

    // 함수에서 받는 인자 없음

    // payment_receipt_status_info db에서 PaymentReceipt의 idx를 가져옴

    // 임시로 1을 반환
    return 1;
}

// DB에 저장할 네트워크 정보를 가져오는 함수
// 이건 이 파일이 아닌 다른 파일에서 가져오는 게 좋을 것 같음
function getNetworkInfo() {
    // 어쨋든 return을 한다고 치고
    const networkInfo = {
        payment_receipt_idx: 1,
        payment_wallet_name: "메타마스크",
        blockchain_name: "이더리움",
        detailed_network_name: "이더리움 메인넷",
        detailed_network_id: 1
    };
    return networkInfo;
}