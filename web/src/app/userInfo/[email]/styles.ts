"use client";

import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Skeleton } from "@mui/material";

interface TapSelected {
  $variant: string;
}

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 100vh;
  background: #f0edf6;
`;

export const UserWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;

  margin-top: 3rem;
`;
export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  min-width: 60rem;
  min-height: 100vh;
  padding: 2rem;
`;
export const AvatarAndNameAndButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0edf6;
`;

export const PostsDontFoundContainer = styled.h2`
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 500;
`;
export const CommentsDontFoundContainer = styled.h2`
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 500;
`;
export const PostsOrCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 56rem;
  margin-top: 2rem;
  gap: 2rem;
`;
export const AvatarAndNameContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
export const AvatarAndIconForUploadImageContainer = styled.div`
  display: flex;

  svg {
    margin-left: -1.1rem;
    margin-top: 5rem;
  }

  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    margin-left: -1rem;
    margin-top: -6.2rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const AvatarWithoutImageAndIconForUploadImageContainer = styled.div`
  display: flex;

  svg {
    margin-left: -1rem;
  }

  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    margin-left: -1rem;
    margin-top: -6.2rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const UploadIconSvg = styled.div`
  display: flex;
  margin-top: 4rem;
`;

export const InputOfNameContainer = styled.div`
  display: flex;

  input {
    font-weight: 700;
    font-size: 2rem;
    padding: 1rem 1rem 1rem 0.5rem;
    border-radius: 8px;
    border: none;
    height: 2.5rem;
  }
`;
export const PostsOrCommentsButtonsContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 1rem;
`;
export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #f0edf6;
`;
export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
`;
export const CommunityNameContainer = styled.div`
  display: flex;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;
export const CommunityNameAndPostTitleContainer = styled.div`
  display: flex;
  gap: 0.3rem;
`;
export const CommentContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`;
export const PostNameContainer = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;
export const PostsButton = styled.button<TapSelected>`
  display: flex;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  color: #2f1b7e;
  background: ${({ $variant }) =>
    $variant === "posts" ? "#cdc3ea" : "#f0edf6"};
  font-weight: 600;

  &:hover {
    background: #cdc3ea;
  }
`;
export const CommentsButton = styled(PostsButton)<TapSelected>`
  background: ${({ $variant }) =>
    $variant === "comments" ? "#cdc3ea" : "#f0edf6"};
`;

export const SkeletonButtons = styled(Skeleton)``;

export const EditUserInfoButton = styled.button`
  display: flex;
  padding: 1rem;
  align-items: center;
  height: 2rem;
  background: #2f1b7e;
  color: #f5f5f5;
  font-weight: 700;
  border: none;
  border-radius: 10px;

  &:hover {
    background: #cf6161;
    cursor: pointer;
  }
`;
export const AvatarNameAndEditUserButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
