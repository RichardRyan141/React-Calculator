import { useContext } from "react";
import { CalcContext } from '../context/CalcContext'

const getStyleName = btn => {
    const className = {
        '=': 'equals',
        'x': 'operator',
        '-': 'operator',
        '+': 'operator',
        '/': 'operator'
    }
    return className[btn]
}

const Button = ({ value }) => {
    const { calc, setCalc, history, setHistory } = useContext(CalcContext);

    const commaClick = () => {
        if (!calc.num.toString().includes('.')) {
            setCalc({
                sign: calc.sign,
                res: calc.res,
                num: calc.num + value
            });
        }
    }
  
    const resetClick = () => {
        setCalc({
            sign: '', 
            num: 0, 
            res: 0
        })
    }

    const handleNumberClick = () => {
        const numberString = value.toString();
    
        let numberValue;
    
        if (calc.res !== 0 && !calc.sign) {
            numberValue = Number(numberString);
            setCalc({
                sign: '',
                res: 0,
                num: numberValue
            });
        } else {
            if (numberString === '0' && calc.num === 0) {
                numberValue = "0";
            } else {
                numberValue = Number(calc.num + numberString);
            }
    
            setCalc({
                sign: calc.sign,
                res: calc.res,
                num: numberValue
            });
        }
    };
    

    const signClick = () => {
        let newRes, newNum = 0;

        if (!calc.res && calc.num) {
            newRes = calc.num;
        } else {
            newRes = calc.res;
        }

        setCalc({
            sign: value,
            res: newRes,
            num: newNum
        });
    }

    const equalsClick = () => {
        if(calc.res && calc.num) {
            const math = (a, b, sign) => {
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return result[sign](a, b);
            }

            let newRes = parseFloat(math(calc.res, calc.num, calc.sign).toFixed(10));
            if (newRes % 1 === 0) {
                newRes = newRes.toFixed(0);
            }

            setHistory([...history, { equation: `${calc.res} ${calc.sign} ${calc.num}`, result: newRes }]);


            setCalc({
                sign: '',
                res: newRes,
                num: 0
            })
        }
    }

    const percentClick = () => {
        setCalc({
            sign: '',
            res: (calc.num / 100),
            num: (calc.num / 100),
        })
    }

    const invertClick = () => {
        setCalc({
            sign: '',
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
        })
        console.log(calc);
    }

    const handleBtnClick = () => {

        const results = {
            '.': commaClick,
            'C': resetClick,
            '/': signClick,
            'x': signClick,
            '-': signClick,
            '+': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+/-': invertClick
        }
        if(results[value]) {
            return results[value]()
        } else {
            return handleNumberClick()
        }
    }

    return (
        <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
    )
}

export default Button