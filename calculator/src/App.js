import { useState } from "react";
import "./App.css";
let stack = [];

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState(0);

  function calculate(expression) {
    const operators = ["+", "-", "*", "/"];
    const stack = [];
    const output = [];

    const getPrecedence = (operator) => {
      switch (operator) {
        case "+":
        case "-":
          return 1;
        case "*":
        case "/":
          return 2;
        default:
          return 0;
      }
    };

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(char) || char === ".") {
        let number = char;
        while (!isNaN(expression[i + 1]) || expression[i + 1] === ".") {
          number += expression[++i];
        }
        output.push(parseFloat(number));
      } else if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }
        stack.pop();
      } else if (operators.includes(char)) {
        while (
          stack.length &&
          getPrecedence(char) <= getPrecedence(stack[stack.length - 1])
        ) {
          output.push(stack.pop());
        }
        stack.push(char);
      }
    }

    while (stack.length) {
      output.push(stack.pop());
    }

    const resultStack = [];
    output.forEach((token) => {
      if (!isNaN(token)) {
        resultStack.push(token);
      } else {
        const b = resultStack.pop();
        const a = resultStack.pop();
        switch (token) {
          case "+":
            resultStack.push(a + b);
            break;
          case "-":
            resultStack.push(a - b);
            break;
          case "*":
            resultStack.push(a * b);
            break;
          case "/":
            resultStack.push(a / b);
            break;
          default:
            break;
        }
      }
    });

    return resultStack.pop();
  }

  const handleInput = (e) => {
    let char = e.target.textContent;
    setText((prev) => prev + char);
  };

  const handleCompute = (e) => {
    let char = e.target.textContent;
    setText((prev) => prev + char);
  };

  const clearInput = () => {
    setText("");
    setOutput(null);
  };

  const equalsResult = () => {
    if (text === "") {
      setOutput("Error");
      return;
    } else if (text.includes("0/0")) {
      setOutput(NaN);
    } else if (text.includes("/0")) {
      setOutput(Infinity);
    }
    setOutput(calculate(text));
  };

  return (
    <div className="App">
      <h1 className="title">React Calculator</h1>
      <input type="text" value={text} readOnly className="input-box" />
      <h3 className="output">Output: {output}</h3>
      <div className="card">
        <div className="row">
          <button onClick={(e) => handleInput(e)} className="btn">
            7
          </button>
          <button onClick={(e) => handleInput(e)} className="btn">
            8
          </button>
          <button onClick={(e) => handleInput(e)} className="btn">
            9
          </button>
          <button onClick={(e) => handleCompute(e)} className="btn operator">
            +
          </button>
        </div>
        <div className="row">
          <button onClick={(e) => handleInput(e)} className="btn">
            4
          </button>
          <button onClick={(e) => handleInput(e)} className="btn">
            5
          </button>
          <button onClick={(e) => handleInput(e)} className="btn">
            6
          </button>
          <button onClick={(e) => handleCompute(e)} className="btn operator">
            -
          </button>
        </div>
        <div className="row">
          <button onClick={(e) => handleInput(e)} className="btn">
            1
          </button>
          <button onClick={(e) => handleInput(e)} className="btn">
            2
          </button>
          <button onClick={(e) => handleInput(e)} className="btn">
            3
          </button>
          <button onClick={(e) => handleCompute(e)} className="btn operator">
            *
          </button>
        </div>
        <div className="row">
          <button onClick={clearInput} className="btn operator">
            C
          </button>
          <button onClick={(e) => handleInput(e)} className="btn">
            0
          </button>
          <button onClick={equalsResult} className="btn operator">
            =
          </button>
          <button onClick={(e) => handleCompute(e)} className="btn operator">
            /
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;