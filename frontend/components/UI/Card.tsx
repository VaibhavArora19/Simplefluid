import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

import classes from "./Card.module.css";

type Iprops = {
  heading: string;
  description: string;
  position: string;
};

const Card = (props: Iprops) => {
  return (
    <div className={classes.card}>
      <h2>{props.heading}</h2>
      <p>{props.description}</p>
      <div>
        {props.position === "second" && (
          <div className={classes.coins}>
            <Image
              src="/token-default.webp"
              width={30}
              height={30}
              alt="Ethereum token"
              className={classes.coin}
            />
            <span className={classes.logo}>
            <i className="fa-solid fa-shuffle"></i>
            </span>
            <Image
              src="/token-default.webp"
              width={30}
              height={30}
              alt="Ethereum token"
              className={classes.coin}
            />
          </div>
        )}
        <div className={classes.animation}>
          {props.position === "first" && (
            <>
              <div className={classes.side}>
                <div>
                  <Image
                    src="/user0.avif"
                    style={{ borderRadius: "6px", marginRight: "5%" }}
                    width={24}
                    height={32}
                    alt="user0"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width={100}
                    sx={{ fontSize: "15px" }}
                  />
                  <Skeleton
                    variant="text"
                    width={60}
                    sx={{ fontSize: "12px" }}
                  />
                </div>
              </div>
              <div>
                <Image
                  src="/stream-loop.gif"
                  width={40}
                  height={1}
                  alt="superfluid-stream"
                />
              </div>
              <div className={classes.side}>
                <div>
                  <Image
                    src="/user2.avif"
                    style={{ borderRadius: "6px", marginRight: "5%" }}
                    width={24}
                    height={32}
                    alt="user0"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width={120}
                    sx={{ fontSize: "15px" }}
                  />
                  <Skeleton
                    variant="text"
                    width={75}
                    sx={{ fontSize: "12px" }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {props.position === "third" &&
            <div className={classes.third}>
                <i className="fa-brands fa-bitcoin fa-2x"></i>
            </div>
        }
        {   props.position === "fourth" &&
            <div className={classes.fourth}>
                <i className="fa-regular fa-wand-sparkles"></i>
            </div>
        }
      </div>
    </div>
  );
};

export default Card;
