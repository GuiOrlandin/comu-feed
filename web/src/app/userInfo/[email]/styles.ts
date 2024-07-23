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

  margin-top: 2rem;
`;
export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  min-width: 58rem;
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
