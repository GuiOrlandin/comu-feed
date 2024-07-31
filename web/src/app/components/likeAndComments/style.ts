"use client";

import styled from "styled-components";

export const LoveAndCommentContainer = styled.div`
  display: flex;
  align-items: center;
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
