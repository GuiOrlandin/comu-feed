"use client";

import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DeleteButton = styled.button`
  padding: 0.5rem;
  height: 1.8rem;
  background: #cb4444;
  color: #f5f5f5;
  font-weight: 600;
  border: none;
  border-radius: 8px;

  &:hover {
    background: #cf6161;
    cursor: pointer;
  }
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const DialogDeleteCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DialogClose = styled(Dialog.Close)`
  border: none;
  margin: -1rem 0 1rem 12rem;
`;

export const Content = styled(Dialog.Content)`
  flex-direction: column;
  min-width: 16rem;
  border-radius: 6px;
  padding: 2rem 2rem 1.2rem 2rem;
  background: #f0edf6;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CancelButton = styled(Dialog.Close)`
  display: flex;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  background: #cb4444;

  &:hover {
    background: #cf6161;
  }
`;
export const ButtonsOfDialogContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DialogTitle = styled(Dialog.Title)`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;
export const DialogTrigger = styled(Dialog.Trigger)`
  display: flex;
`;

export const DialogDeleteTriggerButton = styled.button`
  border: none;
  font-size: 0.7rem;
  font-weight: 700;
  background: none;
`;

export const ConfirmButton = styled.button`
  display: flex;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  background: #cb4444;

  &:hover {
    background: #cf6161;
  }
`;
