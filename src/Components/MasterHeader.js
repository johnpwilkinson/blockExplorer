function MasterHeader(props) {
        return (

            <header id="masterHeader" className="header border-bottom d-print-none">
                <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0">
                    <div className="container-xxl position-relative">
                        <a className="navbar-brand" href={"/"} target="_parent" aria-label="Etherscan">
                            <img width="150" data-img-theme="light" src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5" alt="Etherscan Logo"></img>
                                <img width="150" data-img-theme="darkmode" src="/assets/svg/logos/logo-etherscan-light.svg?v=0.0.5" alt="Etherscan Logo"></img>
                                </a>
                                <div className="d-flex align-items-center gap-4">
                                    <a className="link-dark d-block d-lg-none" href="/login">
                                        <i className="far fa-user-circle me-1"></i> Sign In
                                    </a>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                    <ul className="navbar-nav gap-1 gap-lg-0 pt-4 pt-lg-0">
                                        <li className="nav-item">
                                            <a href="/" id="LI_default" className="nav-link active" aria-current="page">
                                                Home
                                            </a>
                                        </li>
                                        <li className="nav-item align-self-center d-none d-lg-block">
                                            <span className="text-secondary">|</span>
                                        </li>
                                        <li className="nav-item d-none d-lg-block">
                                            <a className="nav-link" href="/login">
                                                <i className="far fa-user-circle me-1"></i> Sign In
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
            )
    }
    
export default MasterHeader
