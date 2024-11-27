import React, { useEffect, useState } from 'react';
import styles from './Captcha1.module.css';

export const Captcha1 = ({ validateCaptcha, isInvalidCaptcha, lbl, lblCols, inputCols, errorMsg, value, isRequired, type, name, errMsgCols, handleChange, placeholder }) => {
    const [captchaText, setCapatchText] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState(value || ''); // Control the input value

    useEffect(() => {
        fnGenerateCaptcha();
    }, []);

    const fnGenerateCaptcha = () => {
        let chars = "";
        const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 1; i <= 5; i++) {
            const randomIndex = Math.floor(Math.random() * randomchar.length);
            chars += randomchar.charAt(randomIndex);
        }
        setCapatchText(chars);
        setInputCaptcha(''); // Reset input captcha
        validateCaptcha(false); // Initially set to false until user inputs
    };

    const handleCaptchaInput = (event) => {
        const value = event.target.value;
        setInputCaptcha(value);
        validateCaptcha(value === captchaText);
        handleChange(event)
    };

    return (
        <div className='row'>
            <div className={`col-sm-${lblCols} text-end`}>
                <b>{lbl}{isRequired && <span className='text-danger'>*</span>}:</b>
            </div>
            <div className={`col-sm-${inputCols}`}>
                <p>
                    <input 
                        placeholder={placeholder} 
                        value={inputCaptcha} // Controlled input
                        type={type} 
                        name={name} 
                        className='form-control' 
                        onChange={handleCaptchaInput} 
                    />
                </p>
                <p>
                    <span className={styles.captcha}><i>{captchaText}</i></span>
                    <button onClick={fnGenerateCaptcha} className="btn btn-dark">Refresh</button>
                </p>
            </div>
            <div className={`col-sm-${errMsgCols} text-danger text-start`}>
                {isInvalidCaptcha && <b>{errorMsg}</b>}
            </div>
        </div>
    );
};