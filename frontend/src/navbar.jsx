import { Link, useNavigate } from "react-router-dom";
import notif from "./assets/notif.svg";
import account from "./assets/account.svg";
import logo from "./assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  function openProfile() {
    navigate("/profile");
  }

  function openHome() {
    navigate("/");
  }

  return (
    <div>
      <div className="bg-green-500 h-16 flex justify-between items-center px-6 z-99">
        <div className="flex justify-normal items-center gap-10">
          <div>
            <Link to="/" className="focus:font-medium">
              Home
            </Link>
          </div>
          <div>
            <Link to="/explore" className="focus:font-medium">
              Explore
            </Link>
          </div>
          <div>
            <Link to="/compare" className="focus:font-medium">
              Compare
            </Link>
          </div>
          <div>
            <Link to="/contact" className="focus:font-medium">
              Contact Us
            </Link>
          </div>
          <div>
            <Link to="/ocr" className="focus:font-medium">
              Scan it
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-start mr-64">
            <div className="flex">
              <img
                src={logo}
                alt="logo"
                className="size-12 -mt-4.5 w-16 -mr-1.5 cursor-pointer"
                onClick={openHome}
              ></img>
              <p className="font-medium cursor-pointer" onClick={openHome}>
                Nutri
              </p>
              <p
                className="text-white font-normal cursor-pointer"
                onClick={openHome}
              >
                Decode
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-normal items-center gap-10">
          <div>
            <img
              className="size-8 cursor-pointer"
              src={notif}
              alt="notification"
            ></img>
          </div>
          <div>
            <img
              className="size-8 cursor-pointer"
              src={account}
              alt="account"
              onClick={openProfile}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
