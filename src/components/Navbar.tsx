import React, { useEffect, useRef, useState } from "react";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/LogoFull.svg";
import { toggleSidebar } from "../redux/module/slice";
import { useAppDispatch } from "../redux/store";
import { selectUserData } from "../redux/user/selectors";
import { logoutUser } from "../redux/user/slice";
const Navbar: React.FC = () => {
  const {
    user: { userName, email },
  } = useSelector(selectUserData);
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        path: Node[];
      };
      if (dropdownRef.current && !_event.path.includes(dropdownRef.current)) {
        setShowLogout(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navWrapper">
      <div className="nav-center">
        <button
          onClick={toggle}
          type="button"
          className="button button--toggleBtn"
        >
          <FaAlignLeft />
        </button>
        <div>
          <img src={logo} className="nav-center__logo" />
          <h3 className="nav-center__logoText">Dashboard</h3>
        </div>
        <div ref={dropdownRef} className="btn-container">
          <button
            onClick={() => setShowLogout((prevValue) => !prevValue)}
            type="button"
            className="button button--logoutBtn"
          >
            <FaUserCircle />
            {userName}
            <FaCaretDown />
          </button>
          {showLogout && (
            <div
              className="dropdown dropdown__show"
            >
              <div className="dropdownInfoContainer">
                <span>
                  <FaUserCircle />
                </span>
                <div className="dropdownInfoContainer__details">
                  <h4>{userName}</h4>
                  <p>
                    {email.length > 5 ? `${email.substring(0, 15)}...` : email}
                  </p>
                </div>
              </div>
              <div className="dropdownLinksContainer">
                <Link
                  onClick={() => setShowLogout(false)}
                  to="/profile"
                  type="button"
                  className="button button--dropdownBtn button--dropdownBtn"
                >
                  Profile
                </Link>
                <Link
                  onClick={() => setShowLogout(false)}
                  to="/"
                  type="button"
                  className="button button--dropdownBtn"
                >
                  My Modules
                </Link>
                <Link
                  onClick={() => setShowLogout(false)}
                  to="/all-modules"
                  type="button"
                  className="button button--dropdownBtn"
                >
                  All Modules
                </Link>
                <Link
                  onClick={() => setShowLogout(false)}
                  to="/create-module"
                  type="button"
                  className="button button--dropdownBtn"
                >
                  Create Module
                </Link>
                <button
                  onClick={() => dispatch(logoutUser("Logged out!"))}
                  type="button"
                  className="button button--dropdownBtn button--dropdownBtn--logout"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
