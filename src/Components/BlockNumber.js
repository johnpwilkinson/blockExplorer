import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import {AlchemyContext} from './Alc';

function BlockNumber(){
    const alchemy = useContext(AlchemyContext)
    const [blockNumber, setBlockNumber] = useState();
    
      useEffect(() => {
        async function getBlockNumber() {
          setBlockNumber(await alchemy.core.getBlockNumber());
        }
    
        getBlockNumber();
      });
    
      return <div className="App">Block Number: {blockNumber}</div>;

}

export default BlockNumber
