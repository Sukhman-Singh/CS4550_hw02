// initial values
var prevTerm = "";
var currTerm = "";
var operation = undefined;

var addNumber = function (number) {
  if (number == "." && this.currTerm.includes(".")) return;
  this.currTerm = this.currTerm.toString() + number;
};

var selectOperation = function (op) {
  // if the current term is empty, there is no operation to carry out
  // update the current operation and return
  if (this.currTerm == "") {
    this.operation = op;
    return;
  }

  // if the previous term is not empty, carry out the calculation
  // reset the current term to empty
  if (this.prevTerm != "") {
    calculate(op);
    this.currTerm = "";
    return;
  }

  // else if the previous term is empty and the current term is not
  // update the operation, update the previous term and reset the current term
  this.operation = op;
  this.prevTerm = this.currTerm;
  this.currTerm = "";
};

// carry out the calculation using the current operation and use the
// input "nextOperation" for the next calculation
var calculate = function (nextOperation) {
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

  // set the input "nextOperation" as the new current operation
  this.operation = nextOperation;
};

// clear the calculator, reset previous term, current term, and operation
var clear = function () {
  this.prevTerm = "";
  this.currTerm = "";
  this.operation = undefined;
};

// update the actual HTML and display of the calculator
var updateDisplay = function () {
  // if the operation is not null, include it in the "currExpression" field
  if (this.operation != null) {
    document.getElementById("currExpression").innerHTML =
      this.prevTerm.toString() + " " + this.operation.toString();

    // else if there is no operation, only display the previous number
  } else {
    document.getElementById("currExpression").innerHTML = this.prevTerm;
  }
  // always display the current term
  document.getElementById("currTerm").innerHTML = this.currTerm;
};

// Adding event listeners to the "number" buttons
Array.from(document.getElementsByClassName("number")).forEach(function (num) {
  num.addEventListener("click", function () {
    addNumber(num.innerHTML);
    updateDisplay();
  });
});

// Adding event listeners to the "operation" buttons
Array.from(document.getElementsByClassName("operation")).forEach(function (op) {
  op.addEventListener("click", function () {
    selectOperation(op.innerHTML);
    updateDisplay();
  });
});

// Adding an event listener to the "clear" button
document.getElementById("clear").addEventListener("click", function () {
  clear();
  updateDisplay();
});
