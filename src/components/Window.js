import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";
import { Textfit } from "react-textfit";

const Window = () => {
    const { calc } = useContext(CalcContext);

    return (
        <div className="screen-container">
            {calc.res !== 0 && (
                <div className="small-text">
                    {calc.res} {calc.sign}
                </div>
            )}
            <Textfit className="screen" max={70} mode="single">
                {calc.num ? calc.num : calc.res}
            </Textfit>
        </div>
    );
};

export default Window;
