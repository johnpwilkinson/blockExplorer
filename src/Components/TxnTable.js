import TxRow from "./TxRow";

function TxnTable(props) {
  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead id="theadTokenERC20Table" className="text-nowrap">
          <tr>
            <th width={"5%"} className="text-center">
              ?
            </th>
            <th width={"15%"}>Txn Hash</th>
            <th width={"20%"}>Date Time (UTC)</th>
            <th width={"15%"}>From</th>
            <th width={"15%"}>To</th>
            <th width={"15%"}>Value</th>
            <th width={"15%"}>Token</th>
          </tr>
        </thead>
        <tbody>
          {props.transfers &&
            props.transfers.map((el, i) => {
              return (
                <TxRow
                  hash={el.hash}
                  time={el.metadata.blockTimestamp}
                  from={el.from}
                  to={el.to}
                  value={el.value}
                  token={el.asset}
                  setAddress={props.setAddress}
                  logo={el.assetLogoUrl}
                  tokenLogo={props.tokenLogo}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TxnTable;
