try {
    const mainBlockchainListRef = db.collection('nangnang_main_blockchain_list');

    const snapshot = await mainBlockchainListRef.get();

    const IdxNameDict = {};
    snapshot.forEach((doc) => {
      const data = doc.data();

      const docName = doc.id;
      const BlockchainIdx = docName.split('_')[1];
      const BlockchainName = data.name;
      IdxNameDict[BlockchainIdx] = BlockchainName;

    });

    return IdxNameDict; // 낭낭이 제공하는 메인 블록체인 리스트 반환
  } catch (error) {
    console.error('데이터 읽기 실패:', error);
    return null;
  }