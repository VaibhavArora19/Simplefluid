import Image from "next/image";

import classes from "./Card.module.css";

type Iprops = {
    heading: string;
    description: string;

}
const Card = (props: Iprops) => {
    return (
        <div className={classes.card}>
            <h2>
                {props.heading}
            </h2>
            <p>{props.description}</p>
            <div>
                <span className={classes.animation}>
                    <Image src="/token-default.webp" width={30} height={30} alt="Ethereum token"/>
                    <Image src="/stream-loop.gif" width={40} height={1} alt="superfluid-stream"/>
                    <Image src="/token-default.webp" width={30} height={30} className={classes.animate} alt="Ethereum token"/>
                </span>
            </div>
        </div>
    )
};

export default Card;