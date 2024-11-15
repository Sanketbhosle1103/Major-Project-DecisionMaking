import React, { useState } from "react";
import axios from "axios";
import "./Decision.css";

function Decision() {
    const [category, setCategory] = useState("");
    const [options, setOptions] = useState(["", ""]); // Two options by default
    const [answers, setAnswers] = useState([]);
    const [dynamicQuestions, setDynamicQuestions] = useState([]);
    const [dynamicAnswers, setDynamicAnswers] = useState([]);
    const [decision, setDecision] = useState("");

    const [firstQuestions, setFirstQuestions] = useState([]);

    const categories = ["Finance", "Career"];

    const fixedQuestions = {
        Finance: [
            "What is your budget?",
            "What are your financial goals?",
            "How long do you plan to invest?",
            "What is your risk tolerance?",
            "What is your current financial situation?"
        ],
        Career: [
            "What are your long-term career goals?",
            "What skills do you have?",
            "What are your salary expectations?",
            "What industry interests you?",
            "Are you open to relocation?"
        ]
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setOptions(["", ""]); // Reset to two empty options
        setAnswers([]);
        setDynamicQuestions([]);
        setDynamicAnswers([]);
        setDecision("");
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, ""]); // Add an empty string for a new option
    };

    const handleAnswerChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleDynamicAnswerChange = (e, index) => {
        const updatedDynamicAnswers = [...dynamicAnswers];
        updatedDynamicAnswers[index] = e.target.value;
        setDynamicAnswers(updatedDynamicAnswers);
    };

    const handleGetQuestions = async () => {
        try {
            const response = await axios.post("http://localhost:5000/ask", {
                category,
                options,
                answers
            });
            setDynamicQuestions(response.data.dynamicQuestions);
        } catch (error) {
            console.error("Error fetching dynamic questions:", error);
        }
    };

    const handleFirstQuestion = async () => {
        try {
            const response = await axios.post("http://localhost:5000/firstask", {
                category,
                options
            });
            setFirstQuestions(response.data.dynamicQuestions);
        } catch (error) {
            console.error("Error fetching dynamic questions:", error);
        }
    };

    const handleGetDecision = async () => {
        try {
            const response = await axios.post("http://localhost:5000/decision", {
                category,
                options,
                answers,
                dynamicAnswers
            });
            setDecision(response.data.decision);
        } catch (error) {
            console.error("Error fetching decision:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="header">Decision-Making Platform</h1>

            <div className="form-group">
                <label htmlFor="category">Select Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="select-input"
                >
                    <option value="">Select...</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {category && (
                <>
                    <div className="form-group">
                        <label>Enter Options</label>
                        {options.map((option, index) => (
                            <div key={index} className="option-input">
                                <input
                                    id={`option-${index}`}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(e, index)}
                                    placeholder={`Option ${index + 1}`}
                                    className="text-input"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddOption}
                            className="button add-option-button"
                        >
                            Add Option
                        </button>
                        <button
                            type="button"
                            onClick={handleFirstQuestion}
                            className="button add-option-button"
                        >
                            Proceed
                        </button>
                    </div>

                    {firstQuestions.length>0 && firstQuestions.map((question, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`answer-${index}`}>{question}</label>
                            <input
                                id={`answer-${index}`}
                                type="text"
                                value={answers[index] || ""}
                                onChange={(e) => handleAnswerChange(e, index)}
                                className="text-input"
                            />
                        </div>
                    ))}

                    <button
                        onClick={handleGetQuestions}
                        className="button primary-button"
                    >
                        Get More Questions
                    </button>
                </>
            )}

            {dynamicQuestions.length > 0 && (
                <>
                    {dynamicQuestions.map((question, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`dynamic-answer-${index}`}>{question}</label>
                            <input
                                id={`dynamic-answer-${index}`}
                                type="text"
                                value={dynamicAnswers[index] || ""}
                                onChange={(e) => handleDynamicAnswerChange(e, index)}
                                className="text-input"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleGetDecision}
                        className="button secondary-button"
                    >
                        Get Decision
                    </button>
                </>
            )}

            {decision && (
                <div className="result">
                    <h2>Decision</h2>
                    <p>{decision}</p>
                </div>
            )}
        </div>
    );
}

export default Decision;
