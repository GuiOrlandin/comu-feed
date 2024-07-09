"use client";

import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Skeleton } from "@mui/material";

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  background: #f0edf6;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 61.3125rem;
  background: #f5f5f5;
  border-radius: 10px;
  margin-top: 6rem;
  padding: 3rem;
`;

export const PostWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;

  margin-top: 1rem;
`;

export const AvatarContentWithoutImage = styled.div`
  display: flex;
  margin-left: 0.5rem;
`;

export const NameAndCommunity = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileContent = styled.div`
  display: flex;

  img {
    margin-right: 1rem;
  }
  svg {
    margin-right: 1rem;
  }
`;

export const ContentOfPost = styled.div`
  display: flex;
  border: 8px;
  padding: 1rem;
`;
export const TitleAndContentOfPost = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 0.5rem;
  }

  span {
    margin-bottom: 0.5rem;
  }

`;

export const ContentOfPostWithMedia = styled.div`
  display: flex;
  border-radius: 10px;
  margin-top: 1rem;

  video {
    margin-bottom: 1rem;
  }
`;

export const LoveAndCommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  margin: 0.5rem;
  border-bottom: 2px solid #f0edf6;
`;

export const CommentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  h2 {
    font-size: 1.1rem;
  }

  p {
    margin-top: 0.1rem;
  }
`;

export const NameAndContentOfComment = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentsAndCreateCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  textArea {
    display: flex;
    border: 2px solid #f0edf6;
    border-radius: 8px;
    height: 4.9rem;
    padding: 1rem;
    margin-top: 0.5rem;
    resize: none;
    overflow: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
`;

export const SendCommentButton = styled.button`
  padding: 0.5rem;
  display: flex;
  position: absolute;
  left: 92.7%;
  border: none;
  font-weight: 600;
  border-radius: 4px;
  color: #2f1b7e;
  margin-top: 5.4%;
  background: #f0edf6;

  &:hover {
    background: #e3d6fd;
  }
  &:disabled {
    background: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const AvatarContentInComment = styled.div`
  display: flex;

  img {
    margin-right: 1rem;
  }
  svg {
    margin-right: 1rem;
  }
`;

export const DialogDeleteCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
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
export const DialogClose = styled(Dialog.Close)`
  border: none;
  margin: -1rem 0 1rem 12rem;
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

export const SkeletonAvatarNameAndCommunityContainer = styled.div`
  display: flex;
`;

export const SkeletonNameAndCommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SkeletonCommentAndLikeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SkeletonLike = styled(Skeleton)``;
export const SkeletonComment = styled(Skeleton)``;
