// Simple Calculator Logic
// This script is loaded with `defer`, so DOM is ready when it runs.
// It encapsulates all functionality within an IIFE to avoid polluting the global scope.

(() => {
  // ----- DOM References -----
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const buttons = document.querySelectorAll('.buttons button');

  // ----- State -----
  let expression = '';
  let result = '';

  // ----- Helper Functions -----
  const updateDisplay = () => {
    expressionEl.textContent = expression;
    resultEl.textContent = result;
    // Clear error styling when we have a fresh, valid expression
    if (!result.startsWith('Error')) {
      expressionEl.classList.remove('error');
      resultEl.classList.remove('error');
    }
  };

  const clearAll = () => {
    expression = '';
    result = '';
    expressionEl.classList.remove('error');
    resultEl.classList.remove('error');
    updateDisplay();
  };

  const backspace = () => {
    if (expression.length > 0) {
      expression = expression.slice(0, -1);
    }
    updateDisplay();
  };

  // Checks if the last character of the current expression is an operator
  const lastCharIsOperator = () => /[+\-*/]$/.test(expression);

  // ----- Evaluation -----
  const evaluateExpression = () => {
    // Remove trailing operator if any (e.g., "5+" → "5")
    let evalExpr = expression.replace(/[+\-*/]$/g, '');
    // Validate: only numbers, decimal points and allowed operators
    const safeExpr = evalExpr.replace(/[^0-9.+\-*/]/g, '');
    if (safeExpr !== evalExpr) {
      // Something illegal slipped in – treat as error
      result = 'Error: Invalid expression';
      resultEl.classList.add('error');
      expressionEl.classList.add('error');
      updateDisplay();
      return;
    }
    try {
      // Use Function constructor for a slightly safer eval
      // eslint-disable-next-line no-new-func
      const computed = Function(`"use strict";return (${safeExpr})`)();
      // Detect division by zero (Infinity results)
      if (!isFinite(computed)) {
        result = 'Error: Division by zero';
        resultEl.classList.add('error');
        expressionEl.classList.add('error');
      } else {
        result = Number(computed).toString();
        // On successful evaluation, keep expression as‑is (user can continue chaining)
      }
    } catch (e) {
      result = 'Error: Invalid syntax';
      resultEl.classList.add('error');
      expressionEl.classList.add('error');
    }
    updateDisplay();
  };

  // ----- Button Click Handling -----
  const handleButtonClick = (event) => {
    const button = event.target;
    const action = button.dataset.action;
    const char = button.textContent.trim();

    switch (action) {
      case 'digit':
        expression += char;
        break;
      case 'decimal':
        // Prevent multiple decimals in the same number segment
        // Find the last number segment (after the most recent operator)
        const lastNumber = expression.split(/[+\-*/]/).pop();
        if (!lastNumber.includes('.')) {
          expression += '.';
        }
        break;
      case 'operator':
        if (expression === '' && char === '-') {
          // Allow leading negative sign
          expression += '-';
        } else if (!lastCharIsOperator()) {
          expression += char;
        } else {
          // Replace the existing operator with the new one
          expression = expression.slice(0, -1) + char;
        }
        break;
      case 'clear':
        clearAll();
        return; // display already updated inside clearAll
      case 'backspace':
        backspace();
        return; // display already updated inside backspace
      case 'equals':
        evaluateExpression();
        return; // display updated inside evaluateExpression
      default:
        // Unknown action – ignore
        return;
    }
    updateDisplay();
  };

  // Attach click listeners to all calculator buttons
  buttons.forEach((btn) => btn.addEventListener('click', handleButtonClick));

  // ----- Keyboard Support -----
  const handleKeyDown = (e) => {
    const key = e.key;
    // Map numeric keys and decimal point
    if (/^[0-9]$/.test(key)) {
      e.preventDefault();
      expression += key;
      updateDisplay();
      return;
    }
    if (key === '.' || key === ',') {
      e.preventDefault();
      // Treat comma as decimal as well
      const lastNumber = expression.split(/[+\-*/]/).pop();
      if (!lastNumber.includes('.')) {
        expression += '.';
        updateDisplay();
      }
      return;
    }
    // Operators
    if (['+', '-', '*', '/'].includes(key)) {
      e.preventDefault();
      if (expression === '' && key === '-') {
        expression += '-';
      } else if (!lastCharIsOperator()) {
        expression += key;
      } else {
        expression = expression.slice(0, -1) + key;
      }
      updateDisplay();
      return;
    }
    // Enter / =
    if (key === 'Enter' || key === '=') {
      e.preventDefault();
      evaluateExpression();
      return;
    }
    // Backspace
    if (key === 'Backspace') {
      e.preventDefault();
      backspace();
      return;
    }
    // Escape clears
    if (key === 'Escape') {
      e.preventDefault();
      clearAll();
      return;
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // ----- Expose for debugging (optional) -----
  window.calculator = {
    evaluateExpression,
    clearAll,
    backspace,
    get expression() { return expression; },
    get result() { return result; },
  };

  // Initialise display
  updateDisplay();
})();
