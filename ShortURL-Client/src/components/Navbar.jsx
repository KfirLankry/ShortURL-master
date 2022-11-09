function Navbar() {
  return (
    <div>
      <nav className="navBar navbar-expand-lg bg-dark navbar-dark ">
        <p className="title navbar-brand text-center pt-3" href="#">
          <img style={{ width: "2.2rem" }} src="logo.png" alt="Logo" />{" "}
          ShortURLs
        </p>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
