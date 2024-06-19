"use client";

import styled from "styled-components";

export const PostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 14.6875rem;
  width: 23.5625rem;
  border-radius: 10px;
  background: #f5f5f5;
  padding: 1.5rem;
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
  flex-direction: column;
  overflow: hidden;
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
