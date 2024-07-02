"use client";

import styled from "styled-components";

interface CardType {
  largeCard: boolean;
}

export const PostCardContainer = styled.div<CardType>`
  display: flex;
  flex-direction: column;
  max-height: ${({ largeCard }) =>
    largeCard === true ? "53rem" : "14.6875rem"};
  width: ${({ largeCard }) => (largeCard === true ? "56rem" : "23.5625rem")};
  border: 2px solid #f0edf6;
  border-radius: 10px;
  background: #f5f5f5;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
`;

export const ContentOfPost = styled.div<CardType>`
  display: flex;
  border: 8px;
  min-width: 21rem;
  min-height: 5.6rem;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    cursor: pointer;
  }

  video {
    width: ${({ largeCard }) => (largeCard === true ? "52rem" : "21rem")};
    height: ${({ largeCard }) => (largeCard === true ? "30rem" : "5.6rem")};
  }
`;

export const ProfileContent = styled.div`
  display: flex;
`;
export const NameAndCommunity = styled.div`
  display: flex;
  flex-direction: column;
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
