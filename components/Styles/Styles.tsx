import styled from 'styled-components';

export const PageHeading = styled.h1`
  text-align: center;
  padding-bottom: 2rem;
`;

// Form Button
export const Button = styled.button<{ isSubmit?: boolean }>`
  background-color: #333;
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  outline: none;
  opacity: ${(props) => (props.isSubmit ? 0.6 : 1)};

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: #1818ec auto 5px;
  }
`;

export const LinkBtn = styled.a`
  background-color: #333;
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: #1818ec auto 5px;
  }
`;
