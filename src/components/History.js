import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const History = () => {
    const { history, clearHistory } = useContext(CalcContext);

    return (
        <div className="history-container">
            <h3>History</h3>
            <div className="history">
                {history.length === 0 ? (
                    <p>No history yet</p>
                ) : (
                    history.map((entry, index) => (
                        <div key={index} className="history-entry">
                            <div className="equation">{entry.equation}</div>
                            <div className="result">{entry.result}</div>
                        </div>
                    ))
                )}
            </div>
            <button onClick={clearHistory} className="clear-history-btn">Clear History</button>
        </div>
    );
};

export default History;
