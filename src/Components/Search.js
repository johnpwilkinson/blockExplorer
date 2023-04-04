import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Search() {
    const [query, setQuery] = useState('')
    const [option, setOption] = useState("")
    const navigate = useNavigate()

    function handleSearch(e){
        e.preventDefault()
        setQuery(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        const destination = `/${option}/${query}`
        navigate(destination)
    }

    function handleChange(e){
        e.preventDefault()
        setOption(e.target.value)
    }

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="search-panel-container bg-white border rounded d-flex gap-2 p-1.5">
        <div className="d-none d-sm-block">
          <select
            name="f"
            className="form-select fs-base border-0 filterby"
            aria-label="Default select example"
            value={option}
            onChange={handleChange}
            required
          >
            <option value="address">Addresses</option>
            <option value="block">Blocks</option>
            <option value="txn">Transaction</option>
          </select>
        </div>

        <div className="flex-grow-1 position-relative auto-search-max-height">
          <label htmlFor="search-panel" className="visually-hidden">
            Search
          </label>
          <input
            id="search-panel"
            type="text"
            className="form-control fs-base border-0 pe-8"
            autoComplete="off"
            spellCheck="false"
            placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
            aria-describedby="button-header-search"
            name="q"
            maxLength="68"
            value={query}
            onChange={handleSearch}
          ></input>
          <input type="hidden" value="" id="hdnSearchText"></input>
          <input type="hidden" value="" id="hdnSearchLabel"></input>
          <input id="hdnIsTestNet" value="False" type="hidden"></input>
        </div>
        <div>
          <button className="btn fs-base btn-primary" >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </form>
  );
}


export default Search;
