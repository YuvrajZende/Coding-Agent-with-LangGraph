# SimpleCalculator

A lightweight, web‑based calculator built with **HTML**, **CSS**, and **JavaScript**. It provides a clean user interface for basic arithmetic operations and works entirely in the browser—no build tools or server required.

---

## Tech Stack
- **HTML** – Structure of the calculator UI.
- **CSS** – Styling and responsive layout.
- **JavaScript** – Core calculation logic, event handling, and keyboard support.

---

## Features
- Basic arithmetic: addition, subtraction, multiplication, division.
- Decimal support and clear entry (CE) functionality.
- Backspace (⌫) to delete the last digit.
- Keyboard shortcuts for digits, operators, **Enter** (equals), **Esc** (clear), and **Backspace**.
- Graceful handling of division‑by‑zero and other invalid inputs with user‑friendly error messages.
- Responsive design that works on desktop and mobile browsers.

---

## Installation / Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/simple-calculator.git
   cd simple-calculator
   ```
2. **Open the application**
   - Simply double‑click `index.html` or open it in your preferred browser.
   - No additional build steps, package managers, or server configuration are required.

---

## Usage Guide
### UI Layout
- **Display** – Shows the current expression and result.
- **Buttons** – Arranged in a grid: digits (0‑9), decimal point, operators (`+`, `-`, `*`, `/`), equals (`=`), clear (`CE`), and backspace (⌫).

### Button Functions
| Button | Action |
|--------|--------|
| `0‑9` | Append the digit to the current number. |
| `.`   | Insert a decimal point (only one per number). |
| `+`, `-`, `*`, `/` | Add the operator to the expression. |
| `=`   | Evaluate the expression and display the result. |
| `CE`  | Clear the entire expression and reset the display. |
| `⌫`   | Delete the last character entered. |

### Keyboard Shortcuts
- **Digits (0‑9)** – Enter numbers.
- **`.`** – Decimal point.
- **`+`, `-`, `*`, `/`** – Operators.
- **`Enter`** – Equals (evaluate).
- **`Esc`** – Clear (CE).
- **`Backspace`** – Delete last character.

### Error Messages
- **Division by zero** – Displays `Error: Division by zero`.
- **Invalid expression** – Displays `Error: Invalid input`.
- The calculator automatically clears the error message once a new valid key is pressed.

---

## Development Notes
### File Structure
```
/simple-calculator
│   index.html   ← UI markup
│   style.css    ← Styling and layout
│   script.js    ← Calculator logic & event handling
│   README.md    ← Project documentation (this file)
```

- **Modify UI** – Edit `index.html` for structural changes or add new elements. Adjust visual aspects in `style.css`.
- **Modify Logic** – All calculation, input handling, and keyboard support reside in `script.js`. Extend functionality (e.g., scientific operations) by updating the corresponding functions.

---

## Contributing (optional)
Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request. Please ensure any new code follows the existing style and includes appropriate comments.

---

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.
