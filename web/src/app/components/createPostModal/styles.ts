"use client";

import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

interface PostType {
  variant: string;
}

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

export const TextPost = styled.button<PostType>`
  display: flex;
  margin-left: 1rem;
  font-size: 1.2rem;
  width: 2.9rem;
  color: #2f1b7e;
  height: 1.6rem;
  border: none;
  border-bottom: ${({ variant }) =>
    variant === "textPost" ? "2px solid #160548" : ""};
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
    min-height: 10rem;
    border-radius: 5px;
    border: 1px solid #160548;
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const OptionsOfPostContainer = styled.div`
  display: flex;
`;

export const MediaPost = styled.button<PostType>`
  display: flex;
  margin-left: 1rem;
  font-size: 1.2rem;
  width: 9rem;
  color: #2f1b7e;
  height: 1.6rem;
  border: none;
  border-bottom: ${({ variant }) =>
    variant === "mediaPost" ? "2px solid #160548" : ""};
`;

export const CreateCommunity = styled.button<PostType>`
  display: flex;
  margin-left: 1rem;
  font-size: 1.2rem;
  width: 6.8rem;
  color: #2f1b7e;
  height: 1.6rem;
  border: none;
  border-bottom: ${({ variant }) =>
    variant === "createCommunity" ? "2px solid #160548" : ""};
`;

export const SendPostButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cb4444;
  color: #f5f5f5;
  padding: 1rem;
  margin-left: 1rem;
  font-size: 1.2rem;
  width: 5rem;
  height: 1.6rem;
  border: none;
  border-radius: 5px;
  margin: 1rem 0 0 26rem;

  &:hover {
    background: #cf6161;
  }
`;

export const MediaPostContainer = styled.div`
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
`;

export const UploadMediaContainerOnHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0d3b66;
  border-radius: 10px;
  background: #d3e2e5;
  text-align: center;
  height: 9.5rem;

  p {
    font-size: 1.125rem;
  }

  input {
    display: none;
  }
`;

export const UploadMediaContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  min-height: 10rem;
  justify-content: center;
  align-items: center;
  color: #2f1b7e;
  border-radius: 10px;
  background: #f5f5f5;
  text-align: center;
  height: 9.5rem;

  &:hover {
    background: #c3b9de;
    cursor: pointer;
  }

  p {
    font-size: 1.125rem;
  }

  input {
    display: none;
  }
`;

export const CreateCommunityContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 2rem;

  input {
    font-size: 1rem;
    height: 2.5rem;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #160548;
  }
`;

export const UploadCommunityImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2f1b7e;
  border-radius: 10px;
  background: #f5f5f5;
  text-align: center;
  height: 10rem;
  width: 10rem;

  p {
    font-size: 1.125rem;
  }

  input {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const CommunityNameAndDescription = styled.div`
  display: flex;
  flex-direction: column;
  color: #2f1b7e;
  width: 20rem;

  textArea {
    font-size: 1rem;
    margin-top: 1rem;
    padding: 0.9rem;
    resize: vertical;
  }
`;

export const CreateCommunityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cb4444;
  color: #f5f5f5;
  padding: 1rem;
  margin-left: 1rem;
  font-size: 1.2rem;
  width: 5rem;
  height: 1.6rem;
  border: none;
  border-radius: 5px;
  margin: 1rem 0 0 26rem;

  &:hover {
    background: #cf6161;
  }
`;

export const PasswordInput = styled.input`
  margin-top: 1rem;
`;
export const ImageUploadContainer = styled.div`
  img {
    display: flex;
    position: relative;
    border-radius: 5px;
  }

  button {
    display: flex;
    color: #f5f5f5;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-top: -9.7rem;
    right: 24.9rem;
    border-radius: 9px;
    width: 1.3rem;
    height: 1.5rem;
    background: none;
    border: none;
  }
`;
