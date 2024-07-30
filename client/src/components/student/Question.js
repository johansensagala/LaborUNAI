import React, { useEffect, useState } from 'react';

const Question = ({ item, index, handleTestAnswerChange, submitTestAnswerWithoutRedirect }) => {
    const [answer, setAnswer] = useState({
        number: item.number,
        textAnswer: '',
        radioAnswer: '',
        checkboxAnswer: [],
    });

    useEffect(() => {
        handleTestAnswerChange(index, answer);
        submitTestAnswerWithoutRedirect();
    }, [answer]);

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
                {item.questionType === "text" && (
                    <div className="field">
                        <label className="label">{item.number}. {item.question}</label>
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
                {item.questionType === "textarea" && (
                    <div className="field">
                        <label className="label">{item.number}. {item.question}</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                placeholder="Masukkan jawaban Anda"
                                onChange={handleTextChange}
                            ></textarea>
                        </div>
                    </div>
                )}
                {item.questionType === "radio" && (
                    <div className="field">
                        <label className="label">{item.number}. {item.question}</label>
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
                {item.questionType === "checkbox" && (
                    <div className="field">
                        <label className="label">{item.number}. {item.question}</label>
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

export default Question;
