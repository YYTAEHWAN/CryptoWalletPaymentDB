import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDataPage from './components/User/UserData/UserDataPage';
import SellerDataPage from './components/User/SellerData/SellerDataPage';
import ConsumerDataPage from './components/User/ConsumerData/ConsumerDataPage';
import SellerProductPage from './components/User/SellerData/Product/SellerProduct/SellerProductPage';
import ProductInfoPage from './components/User/SellerData/Product/ProductInfo/ProductInfoPage';
import SellersChosenWalletPage from './components/User/SellerData/Chosen/Wallet/SellersChosenWalletPage';
import SellersChosenMainBlockchainPage from './components/User/SellerData/Chosen/Blockchain/SellersChosenMainBlockchainPage';
import CryptoWalletListPage from './components/NangNangServe/CryptoWalletList/CryptoWalletListPage';
import MainBlockchainListPage from './components/NangNangServe/MainBlockchainList/MainBlockchainListPage';
import GetSellerDataPage from './components/BroFunctions/SangyunBro/GetSellerData/GetSellerDataPage';
import WalletAboutPage from './components/BroFunctions/SangyunBro/WalletOne/WalletAboutPage';
import ChosenWalletPage from './components/BroFunctions/SangyunBro/WalletTwo/ChosenWalletPage';
import ManageBcFuncsPage from './components/BroFunctions/SangyunBro/BlockchainOne/ManageBcFuncsPage';
import ModifyBcFuncsPage from './components/BroFunctions/SangyunBro/BlockchainTwo/ModifyBcFuncsPage';
import LoginReturnDataFuncPage from './components/BroFunctions/DongyuBro/LoginReturnData/LoginReturnDataFuncPage';
import StatusInfoPage from './components/PaymentReceipt/PaymentReceiptStatusInfo/StatusInfoPage';
import PriceAddressInfoPage from './components/PaymentReceipt/PaymentReceiptPriceAddressInfo/PriceAddressInfoPage';
import ParticipantsPage from './components/PaymentReceipt/PaymentReceiptParticipants/ParticipantsPage';
import NetworkInfoPage from './components/PaymentReceipt/PaymentReceiptNetworkInfo/NetworkInfoPage';
import MultipleProductsInfoPage from './components/PaymentReceipt/PaymentReceiptMultipleProductsInfo/MultipleProductsInfoPage';
import PaymentProcessPage from './components/BroFunctions/DongyuBro/PaymentProcess/PaymentProcessPage';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="UserDataPage" element={<UserDataPage />} />
          <Route path="SellerDataPage" element={<SellerDataPage />} />
          <Route path="ConsumerDataPage" element={<ConsumerDataPage />} />
          <Route path="SellerProductPage" element={<SellerProductPage />} />
          <Route path="ProductInfoPage" element={<ProductInfoPage />} />
          <Route path="SellersChosenWalletPage" element={<SellersChosenWalletPage />} />
          <Route path="SellersChosenMainBlockchainPage" element={<SellersChosenMainBlockchainPage />} />
          <Route path="CryptoWalletListPage" element={<CryptoWalletListPage />} />
          <Route path="MainBlockchainListPage" element={<MainBlockchainListPage />} />
          <Route path="GetSellerDataPage" element={<GetSellerDataPage />} />
          <Route path="WalletAboutPage" element={<WalletAboutPage />} />
          <Route path="ChosenWalletPage" element={<ChosenWalletPage />} />
          <Route path="ManageBcFuncsPage" element={<ManageBcFuncsPage />} />
          <Route path="ModifyBcFuncsPage" element={<ModifyBcFuncsPage />} />
          <Route path="LoginReturnDataFuncPage" element={<LoginReturnDataFuncPage />} />
          <Route path="StatusInfoPage" element={<StatusInfoPage />} />
          <Route path="PriceAddressInfoPage" element={<PriceAddressInfoPage />} />
          <Route path="ParticipantsPage" element={<ParticipantsPage />} />
          <Route path="NetworkInfoPage" element={<NetworkInfoPage />} />
          <Route path="MultipleProductsInfoPage" element={<MultipleProductsInfoPage />} />
          <Route path="PaymentProcessPage" element={<PaymentProcessPage />} />
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
