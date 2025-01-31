import { createContext, useState } from "react"

export const CalcContext = createContext()

const CalcProvider = ({ children }) => {
    const [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0
    });
    
    const [history, setHistory] = useState([]);

    const clearHistory = () => {
        setHistory([]);
    };


    const providerValue = {
        calc, setCalc, history, setHistory, clearHistory
    }

    return (
        <CalcContext.Provider value={providerValue}>
            {children}
        </CalcContext.Provider>
    )
}

export default CalcProvider