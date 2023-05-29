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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
