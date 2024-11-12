import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import {
    Container, Box, Typography, Button, TextField, Select, MenuItem, InputLabel,
    FormControl, ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import './Decision.css'; // Import the CSS file

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        primary: {
            main: '#FF5722', // Bright orange for better visibility
        },
        secondary: {
            main: '#03DAC6',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h4: { fontWeight: 700 },
        h6: { fontWeight: 600 },
        body1: { fontWeight: 400 },
    },
});
=======
import './Decision.css';
>>>>>>> 5eb475e912addc8b4eda1dc1780c5227d93e62b7

function Decision() {
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState('');
    const [answers, setAnswers] = useState([]);
    const [dynamicQuestions, setDynamicQuestions] = useState([]);
    const [dynamicAnswers, setDynamicAnswers] = useState([]);
    const [decision, setDecision] = useState('');

    const categories = ['Finance', 'Career'];

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
        setOptions('');
        setAnswers([]);
        setDynamicQuestions([]);
        setDynamicAnswers([]);
        setDecision('');
    };

    const handleOptionChange = (e) => {
        setOptions(e.target.value);
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
            const response = await axios.post('http://localhost:5000/ask', { category, options, answers });
            setDynamicQuestions(response.data.dynamicQuestions);
        } catch (error) {
            console.error('Error fetching dynamic questions:', error);
        }
    };

    const handleGetDecision = async () => {
        try {
            const response = await axios.post('http://localhost:5000/decision', { category, options, answers, dynamicAnswers });
            setDecision(response.data.decision);
        } catch (error) {
            console.error('Error fetching decision:', error);
        }
    };

    return (
<<<<<<< HEAD
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="sm" className="decision-container">
                <Box textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        Decision-Making Platform
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Choose a category and provide your input to receive tailored questions and a decision.
                    </Typography>

                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Select Category</InputLabel>
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            label="Select Category"
                        >
                            <MenuItem value=""><em>Select...</em></MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {category && (
                        <Box className="input-section">
                            <Typography variant="h6" gutterBottom>
                                Input Section
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Enter Options"
                                value={options}
                                onChange={handleOptionChange}
                                InputLabelProps={{ style: { color: '#FF5722' } }}
                                InputProps={{ style: { color: '#FFFFFF', height: '56px' } }}
                                className="custom-text-field"
                            />
                            {fixedQuestions[category].map((question, index) => (
                                <TextField
                                    key={index}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    label={question}
                                    value={answers[index] || ''}
                                    onChange={(e) => handleAnswerChange(e, index)}
                                    InputLabelProps={{ style: { color: '#FF5722' } }}
                                    InputProps={{ style: { color: '#FFFFFF', height: '56px' } }}
                                    className="custom-text-field"
                                />
                            ))}
                            <Button
                                variant="contained"
                                onClick={handleGetQuestions}
                                className="get-questions-button"
                            >
                                Get More Questions
                            </Button>
                        </Box>
                    )}

                    {dynamicQuestions.length > 0 && (
                        <Box className="additional-questions">
                            <Typography variant="h6" gutterBottom>
                                Additional Questions
                            </Typography>
                            {dynamicQuestions.map((question, index) => (
                                <TextField
                                    key={index}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    label={question}
                                    value={dynamicAnswers[index] || ''}
                                    onChange={(e) => handleDynamicAnswerChange(e, index)}
                                    InputLabelProps={{ style: { color: '#FF5722' } }}
                                    InputProps={{ style: { color: '#FFFFFF', height: '56px' } }}
                                    className="custom-text-field"
                                />
                            ))}
                            <Button
                                variant="contained"
                                onClick={handleGetDecision}
                                className="get-decision-button"
                            >
                                Get Decision
                            </Button>
                        </Box>
                    )}

                    {decision && (
                        <Box className="decision-section">
                            <Typography variant="h5" gutterBottom>
                                Your Decision
                            </Typography>
                            <Typography variant="body1">
                                {decision}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
=======
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
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {category && (
                <>
                    <div className="form-group">
                        <label htmlFor="options">Enter Options</label>
                        <input
                            id="options"
                            type="text"
                            value={options[0] || ''}
                            onChange={handleOptionChange}
                            className="text-input"
                        />
                    </div>

                    {fixedQuestions[category].map((question, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`answer-${index}`}>{question}</label>
                            <input
                                id={`answer-${index}`}
                                type="text"
                                value={answers[index] || ''}
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
                                value={dynamicAnswers[index] || ''}
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
>>>>>>> 5eb475e912addc8b4eda1dc1780c5227d93e62b7
    );
}

export default Decision;
