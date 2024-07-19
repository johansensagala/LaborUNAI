import React from 'react';


// IN PROGRESS


const GeneralQuestion = ({ item, index }) => {
    return (
        <div className="columns is-flex">
            <div className="column">
                {item.type === "text" && (
                    <div className="field">
                        <label className="label">{index + 1}. {item.question}</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Masukkan jawaban Anda" />
                        </div>
                    </div>
                )}
                {item.type === "textarea" && (
                    <div className="field">
                        <label className="label">{index + 1}. {item.question}</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="Masukkan jawaban Anda"></textarea>
                        </div>
                    </div>
                )}
                {item.type === "radio" && (
                    <div className="field">
                        <label className="label">{index + 1}. {item.question}</label>
                        <div className="control">
                            {item.optionPertanyaanRadio.map((option, optionIndex) => (
                                <React.Fragment key={optionIndex}>
                                    <label className="radio is-inline">
                                        <input type="radio" />
                                        <span className="m-2">{option}</span>
                                    </label><br />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                {item.type === "checkbox" && (
                    <div className="field">
                        <label className="label">{index + 1}. {item.question}</label>
                        <div className="control">
                            {item.optionPertanyaanCheckbox.map((option, optionIndex) => (
                                <React.Fragment key={optionIndex}>
                                    <label className="checkbox is-inline">
                                        <input type="checkbox" />
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
