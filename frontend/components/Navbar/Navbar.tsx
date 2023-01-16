import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = (): JSX.Element => {


  return (
    <div
      style={{ position: "relative", left: "82%", width: "190px" }}
    >
      <ConnectButton chainStatus={"none"} showBalance={false} />
    </div>
  );
};

export default Navbar;
