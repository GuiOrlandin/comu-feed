"use client";

import styled from "styled-components";

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
  margin-right: 1rem;
`;

export const NameAndCommunity = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileContent = styled.div`
  display: flex;
`;

export const ContentOfPost = styled.div`
  display: flex;
  border: 8px;
  padding: 1rem;
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

  textArea {
    display: flex;
    position: relative;
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
  left: 76.3%;
  border: none;
  font-weight: 600;
  border-radius: 4px;
  color: #2f1b7e;
  margin-top: 3.3%;
  background: #f0edf6;

  &:hover {
    background: #e3d6fd;
  }
`;

export const AvatarContentInComment = styled.div`
  display: flex;
`;
