import axios from "axios";
import React, { useEffect, useState } from 'react';

const GeneralQuestion = ({ item, index, handleGeneralQuestionAnswerChange }) => {
    const [answer, setAnswer] = useState({
        number: item.number,
        textAnswer: '',
        radioAnswer: '',
        checkboxAnswer: [],
    });

    const [currentQuestion, setCurrentQuestion] = useState({});

    useEffect(() => {
        getCurrentQuestion(item.question);
    }, [item]);

    useEffect(() => {
        handleGeneralQuestionAnswerChange(index, answer);
    }, [answer]);

    const getCurrentQuestion = async (code) => {
        try {
            const response = await axios.get(`http://localhost:5000/general-question/${code}`);
            
            setCurrentQuestion(response.data);
        } catch (error) {
            console.error("Error fetching application data:", error);
            throw error;
        }
    }

    const handleTextChange = (e) => {
        setAnswer({ ...answer, textAnswer: e.target.value });
    };

    const handleRadioChange = (e) => {
        setAnswer({ ...answer, radioAnswer: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        const { checked, value } = e.target;
        let newCheckboxAnswer = answer.checkboxAnswer;
        if (checked) {
            newCheckboxAnswer.push(value);
        } else {
            newCheckboxAnswer = newCheckboxAnswer.filter((v) => v !== value);
        }
        setAnswer({ ...answer, checkboxAnswer: newCheckboxAnswer });
    };

    return (
        <div className="columns is-flex">
            <div className="column">
                {currentQuestion.type === "text" && (
                    <div className="field">
                        <label className="label">{item.number}. {currentQuestion.question}</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Masukkan jawaban Anda"
                                onChange={handleTextChange}
                            />
                        </div>
                    </div>
                )}
                {currentQuestion.type === "textarea" && (
                    <div className="field">
                        <label className="label">{item.number}. {currentQuestion.question}</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                placeholder="Masukkan jawaban Anda"
                                onChange={handleTextChange}
                            ></textarea>
                        </div>
                    </div>
                )}
                {currentQuestion.type === "radio" && (
                    <div className="field">
                        <label className="label">{item.number}. {currentQuestion.question}</label>
                        <div className="control">
                            {item.optionsOfQuestionRadio.map((option, optionIndex) => (
                                <React.Fragment key={optionIndex}>
                                    <label className="radio is-inline">
                                        <input
                                            type="radio"
                                            name={`radio-${index}`}
                                            value={option}
                                            onChange={handleRadioChange}
                                        />
                                        <span className="m-2">{option}</span>
                                    </label><br />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                {currentQuestion.type === "checkbox" && (
                    <div className="field">
                        <label className="label">{item.number}. {currentQuestion.question}</label>
                        <div className="control">
                            {item.optionsOfQuestionCheckbox.map((option, optionIndex) => (
                                <React.Fragment key={optionIndex}>
                                    <label className="checkbox is-inline">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="m-2">{option}</span>
                                    </label><br />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneralQuestion;
