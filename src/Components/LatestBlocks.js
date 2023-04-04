import LatestRow from "./LatestRow";

function Latest(props) {
  if (props.flag === "blocks") {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-header-title">{props.title}</h2>
        </div>
        <div
          id="mCSB_1_container"
          className="card-body overflow-auto scrollbar-custom"
          style={{ maxHeight: "30.3rem" }}
        >
          {props.blocks &&
            props.blocks.map((el) => (
              <LatestRow
                bn={el.number}
                miner={el.miner}
                numTx={el.transactions.length}
                timeStamp={el.timestamp}
                flag={props.flag}
              />
            ))}
        </div>
        <a
          className="card-footer bg-light fw-medium text-cap link-muted text-center"
          href="/blocks"
        >
          View all blocks <i className="far fa-long-arrow-right ms-1"></i>
        </a>
      </div>
    );
  }
  if (props.flag === "txs") {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-header-title">{props.title}</h2>
        </div>
        <div
          id="mCSB_1_container"
          className="card-body overflow-auto scrollbar-custom"
          style={{ maxHeight: "30.3rem" }}
        >
          {props.txs &&
            props.txs.map((el, i) => (
              <LatestRow
                key={i}
                hash={el.hash}
                from={el.from}
                to={el.to}
                value={el.value}
                flag={props.flag}
              />
            ))}{" "}
        </div>
        <a
          className="card-footer bg-light fw-medium text-cap link-muted text-center"
          href="/txs"
        >
          View all transactions <i className="far fa-long-arrow-right ms-1"></i>
        </a>
      </div>
    );
  }
}

export default Latest;
