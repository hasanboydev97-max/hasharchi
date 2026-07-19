import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './OTPInput.module.css';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    if (newOtp.every(v => v !== '') && val !== '') {
      onComplete(newOtp.join(''));
    }

    if (val !== '' && index < length - 1 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.container}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          ref={el => { inputs.current[index] = el; }}
          value={data}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className={clsx(styles.input, data !== '' && styles.filled)}
        />
      ))}
    </div>
  );
};
