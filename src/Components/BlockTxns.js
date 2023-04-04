import Table from "react-bootstrap/Table";
import { formatIso } from "../utils/helpers";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AlchemyContext } from "./Alc";
import { toHex } from "alchemy-sdk";
import TxRow from "./TxRow";

function BlockTxns(props) {
  let { block } = useParams();

  const alchemy = useContext(AlchemyContext);
  const [blockTxns, setBlockTxns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blockTs, setBlockTs] = useState("");

  async function getBlock(block) {
    let response = await alchemy.core.getBlockWithTransactions(block);
    setBlockTs(formatIso(response.timestamp * 1000, false));
    for (let i = 0; i < response.transactions.length; i++) {
      let txnObj = {
        hash: response.transactions[i].hash,
        from: response.transactions[i].from,
        to: response.transactions[i].to,
        value: response.transactions[i].value,
      };
      setBlockTxns((oldState) => [...oldState, txnObj]);
    }
    setIsLoaded(true);
  }

  useEffect(() => {
    getBlock(toHex(block));
  }, []);
  if (!isLoaded) {
    return <div>loading</div>;
  }

  return (
    <main id="content" className="main-content" role="main">
      <section className="container-xxl">
        <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom gap-3 py-5">
          <div className="d-flex flex-column gap-1">
            <h1 className="h5 mb-0">Transactions</h1>
            <span
              id="ContentPlaceHolder1_divForXXX"
              className="d-flex flex-wrap align-items-center text-break gap-1"
            >
              For Block {block}
            </span>
          </div>
        </div>
      </section>
      <section className="container-xxl pt-5 pb-12">
        <span id="ContentPlaceHolder1_lblAdResult"></span>
        <div id="ContentPlaceHolder1_divTransactions" className="card">
          <div id="ContentPlaceHolder1_divDataInfo" className="card-body">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <span className="text-dark content-center gap-1">
                  A total of {blockTxns.length} transactions found
                </span>
                <div className="d-block text-muted small"></div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  <th width={"5%"}>?</th>
                  <th width={"10%"}>Txn Hash</th>
                  <th width={"15%"}>Block</th>
                  <th width={"25%"}>Date Time (UTC)</th>
                  <th width={"15%"}>From</th>
                  <th width={"15%"}>To</th>
                  <th width={"15%"}>Value</th>
                </tr>
              </thead>
              <tbody>
                {blockTxns.map((el, i) => {
                  return (
                    <TxRow
                      hash={el.hash}
                      time={blockTs}
                      from={el.from}
                      to={el.to}
                      value={el.value}
                      block={block}
                      flag={"block"}
                    />
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlockTxns;
