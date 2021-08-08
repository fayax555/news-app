import {
  FC,
  Dispatch,
  SetStateAction,
  memo,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5rem;
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  font-size: 1rem;
`;

interface Props {
  val: string | number;
  setVal: Dispatch<SetStateAction<string>>;
  label: string;
  isRequired?: boolean;
}

const FormEl: FC<Props> = ({ val, setVal, label, isRequired = true }) => {
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const typeVal = () => {
    if (label === 'date' || label === 'time') {
      return label;
    } else if (label === 'age') {
      return 'number';
    } else if (label === 'password' || label === 'confirm Password') {
      return 'password';
    } else {
      return 'text';
    }
  };

  return (
    <div>
      <label htmlFor={label}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      {label === 'gender' ? (
        <>
          <input
            id={label}
            type='radio'
            value='male'
            name='gender'
            onChange={handleValue}
            required
          />
          Male
          <input
            id={label}
            type='radio'
            value='female'
            name='gender'
            onChange={handleValue}
            required
          />
          Female
        </>
      ) : (
        <StyledInput
          id={label}
          type={typeVal()}
          value={val}
          onChange={handleValue}
          required={isRequired}
        />
      )}
    </div>
  );
};

export default memo(FormEl);
