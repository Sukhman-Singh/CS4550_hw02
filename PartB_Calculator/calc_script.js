(function () {
  "use strict";

  class Calculator {
    constructor(prevTerm, currTerm) {
      this.prevTerm = prevTerm;
      this.currTerm = currTerm;
      this.operation = undefined;
      this.clear;
    }

    addNumber(number) {
      if (number == "." && this.currTerm.includes(".")) return;
      this.currTerm = this.currTerm.toString() + number.toString();
    }

    selectOperation(operation) {
      // if the current and previous term are empty, just return
      // cannot have an operation without any terms
      if (this.currTerm === "" && this.prevTerm === "") {
        return;
      }

      // if the current term is empty and previous term is not, there is no operation to
      // carry out update the current operation and return
      if (this.currTerm === "" && this.prevTerm !== "") {
        this.operation = operation;
        return;
      }

      // if the current term is not empty and previous term is empty,
      // update the operation, update the previous term and reset the current term
      if (this.currTerm !== "" && this.prevTerm === "") {
        this.operation = operation;
        this.prevTerm = this.currTerm;
        this.currTerm = "";
        return;
      }

      // else if the previous and current terms are not empty,
      // carry out the calculation
      // this.currTerm !== "" && this.prevTerm !== ""
      this.calculate(operation);
    }

    // carry out the calculation using the current operation and use the
    // input "nextOperation" for the next calculation
    calculate(nextOperation) {
      // parse the values to numbers
      const prev = parseFloat(this.prevTerm);
      const curr = parseFloat(this.currTerm);

      if (isNaN(prev) || isNaN(curr)) {
        return;
      }

      switch (this.operation.toString()) {
        case "+=":
          this.prevTerm = prev + curr;
          break;
        case "-":
          this.prevTerm = prev - curr;
          break;
        case "x":
          this.prevTerm = prev * curr;
          break;
        case "÷":
          this.prevTerm = prev / curr;
          break;
      }

      // if the nextOperation is "+=", just use it like an equals button, not plus
      if (nextOperation == "+=") {
        this.currTerm = this.prevTerm;
        this.prevTerm = "";
        this.operation = undefined;
      }
      // set the input "nextOperation" as the new current operation
      else {
        this.operation = nextOperation;
        // reset current term to empty so a new term could be input
        this.currTerm = "";
      }
    }

    // clear the calculator, reset previous term, current term, and operation
    clear() {
      this.prevTerm = "";
      this.currTerm = "";
      this.operation = undefined;
    }

    // update the actual HTML and display of the calculator
    updateDisplay() {
      // if the operation is not null, include it in the "currExpression" field
      if (this.operation != null) {
        document.getElementById("currExpression").innerHTML =
          this.prevTerm.toString() +
          " " +
          this.operation.toString().substring(0, 1);

        // else if there is no operation, only display the previous number
      } else {
        document.getElementById("currExpression").innerHTML = this.prevTerm;
      }
      // always display the current term
      document.getElementById("currTerm").innerHTML = this.currTerm;
    }
  }

  const calc = new Calculator("", "");

  // Adding event listeners to the "number" buttons
  Array.from(document.getElementsByClassName("number")).forEach(function (num) {
    num.addEventListener("click", function () {
      calc.addNumber(num.innerHTML);
      calc.updateDisplay();
    });
  });

  // Adding event listeners to the "operation" buttons
  Array.from(document.getElementsByClassName("operation")).forEach(function (
    op
  ) {
    op.addEventListener("click", function () {
      calc.selectOperation(op.innerHTML);
      calc.updateDisplay();
    });
  });

  // Adding event listeners to the "clear" button
  document.getElementById("clear").addEventListener("click", function () {
    calc.clear();
    calc.updateDisplay();
  });
})();
