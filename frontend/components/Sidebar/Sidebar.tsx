import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classes from "./Sidebar.module.css";

const Sidebar = (): JSX.Element => {
  const router = useRouter();


  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>
        <Image
          src="/logo.png"
          width={72}
          height={32}
          alt="Simplefluid logo"
          className={classes.image}
        />
        <Link href="/"><h1>Simplefluid</h1></Link>
      </div>
      <div>
        <div className={router.pathname === "/dashboard" ? classes.linkActive : classes.link}>
          <Link href="/dashboard">
            <h2><i className="fa-regular fa-chart-network"></i>&nbsp;&nbsp; Dashboard</h2>
          </Link>
        </div>
        <div className={router.pathname === "/sendcfa" ? classes.linkActive : classes.link}>
          <Link href="/sendcfa">
            <h2><i className="fa-regular fa-square-arrow-up-right"></i>&nbsp;&nbsp; Send tokens (CFA)</h2>
          </Link>
        </div>
        <div className={router.pathname === "/IDA" ? classes.linkActive : classes.link}>
          <Link href="/IDA">
            <h2><i className="fa-regular fa-send-back"></i>&nbsp;&nbsp; Send tokens (IDA)</h2>
          </Link>
        </div>
        <div className={router.pathname === "/lend" ? classes.linkActive : classes.link}>
          <Link href="">
            <h2><i className="fa-regular fa-landmark"></i>&nbsp;&nbsp; Lend</h2>
          </Link>
        </div>
        <div className={router.pathname === "/borrow" ? classes.linkActive : classes.link}>
          <Link href="">
            <h2><i className="fa-solid fa-money-check"></i>&nbsp;&nbsp; Borrow</h2>
          </Link>
        </div>
        <div className={router.pathname === "/permissions" ? classes.linkActive : classes.link}>
          <Link href="/permissions">
            <h2><i className="fa-solid fa-binary-circle-check"></i>&nbsp;&nbsp; Permissions</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
