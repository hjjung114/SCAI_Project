import React, { useState } from "react";

export default function Header({ onInputSubmit }) {
  const [inputValue, setInputValue] = useState(""); // Manage the input value in state

  const handleSubmit = () => {
    // Call the onInputSubmit function passed as a prop and pass the input value
    onInputSubmit(inputValue);
  };

    return (
        <div>
          <input
            type="text"
            name="name"
            className="company-input"
            placeholder="종목명"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            제출</button>
        </div>
    );
};
