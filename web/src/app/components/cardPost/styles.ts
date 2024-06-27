"use client";

import styled from "styled-components";

export const PostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 14.6875rem;
  width: 23.5625rem;
  border-radius: 10px;
  background: #f5f5f5;
  padding: 1.5rem 1.5rem 0 1.5rem;
`;

export const ProfileContent = styled.div`
  display: flex;
`;
export const NameAndCommunity = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ContentOfPost = styled.div`
  display: flex;
  border: 8px;
  width: 21rem;
  height: 5.6rem;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    cursor: pointer;
  }
`;

export const ContentOfPostWithMedia = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`;
export const AvatarContentWithoutImage = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;
export const LoveAndCommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  padding-top: 0.3rem;
`;
export const LoveImageAndLength = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;
export const CommentsImageAndLength = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;
