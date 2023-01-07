import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = (): JSX.Element => {
  const [theme, setTheme] = useState("emerald");

  useEffect(() => {
    themeChange(false);
  }, []);

  const themeHandler = () => {
    setTheme(theme === "emerald" ? "halloween" : "emerald");
  };

  return (
    <div
      style={{ position: "relative", left: "63%", width: "425px" }}
      className="grid grid-cols-2"
    >
      <div style={{ position: "relative", left: "70%", top: "10%" }}>
        <button data-set-theme={theme} onClick={themeHandler}>
          {theme === "emerald" ? (
            <i className="fa-solid fa-brightness-low fa-2x"></i>
          ) : (
            <i className="fa-duotone fa-moon fa-2x"></i>
          )}
        </button>
      </div>
      <ConnectButton chainStatus={"none"} showBalance={false} />
    </div>
  );
};

export default Navbar;
