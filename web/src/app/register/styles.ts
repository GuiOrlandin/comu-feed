"use client";

import styled from "styled-components";

export const RegisterContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
`;
export const RegisterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  height: 100%;
  background: #f0edf6;
`;
export const RegisterContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  width: 52.8125rem;
  height: 44.4375rem;
  padding: 6.3125rem 10.625rem;

  span {
    color: #2f1b7e;
    font-weight: 600;
  }
`;
export const EmailInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  border-radius: 8px;

  span {
    color: #2f1b7e;
    font-weight: 600;
  }

  input {
    width: 31.5rem;
    height: 3.9375rem;
    border-radius: 8px;
    border: 2px solid #f0edf6;
    overflow: hidden;
    padding: 1rem;
  }
`;

export const NameInputContainer = styled(EmailInputContainer)`
  margin-top: 2rem;
`;
export const RegisterButtonContainer = styled.div`
  margin-top: 0.6rem;
  border-bottom: 1px solid #f0edf6;
`;
export const RegisterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 18.25rem;
  height: 3.75rem;
  background: #cb4444;
  color: #f5f5f5;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  margin: 2rem 7rem;
`;
export const ErrorContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 12rem;
  color: #cb4444;
`;

export const RegisterWithGoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 18.25rem;
  background: none;
  width: 31.5rem;
  color: #2f1b7e;
  font-weight: 600;
  border: 2px solid #f0edf6;
  border-radius: 8px;
  margin: 2rem 0;
  padding: 0.8rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const PasswordInputContainer = styled(EmailInputContainer)`
  margin-top: 2rem;
  position: relative;
`;

export const ShowPasswordContentButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  left: 28rem;
  top: 3.5rem;
`;
