"use client";

import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const CreatePostalModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CreatePostalButton = styled.button`
  display: flex;
  padding: 0.8rem 1rem;
  background: #cb4444;
  color: #f5f5f5;
  font-weight: 700;
  border: none;
  border-radius: 10px;

  &:hover {
    background: #cf6161;
    cursor: pointer;
  }
`;

export const Content = styled(Dialog.Content)`
  flex-direction: column;
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: #f0edf6;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;
export const Close = styled(Dialog.Close)`
  border: none;
  color: #160548;
  margin-left: 30rem;
`;

export const TextPost = styled.button`
  display: flex;
  margin-left: 1rem;
  font-size: 1.2rem;
  width: 2.9rem;
  height: 1.6rem;
  border: none;
  border-bottom: 2px solid #160548;
`;
export const TextPostContainer = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-top: 1rem;
    font-size: 1rem;
    height: 2.5rem;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #160548;
  }

  textarea {
    margin-top: 1rem;
    resize: vertical;
    border-radius: 5px;
    border: 1px solid #160548;
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const OptionsOfPostContainer = styled.div`
  display: flex;
`;

export const MediaPost = styled.button`
  display: flex;
  margin-left: 1rem;
  font-size: 1.2rem;
  width: 9rem;
  height: 1.6rem;
  border: none;
  border-bottom: 2px solid #160548;
`;
