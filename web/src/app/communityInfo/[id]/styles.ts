"use client";

import styled from "styled-components";

export const CommunityInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0edf6;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
`;

export const PostAndCommunityWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const CommunityInfoContent = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0edf6;

  h2 {
    font-weight: 400;
  }
`;
export const NameAndDescription = styled.div`
  display: flex;
  flex-direction: column;
`;
export const PostsOfCommunityContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export const PostAndCommunityInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 61.3125rem;
  background: #f5f5f5;
  border-radius: 10px;
  margin-top: 2rem;
  min-height: 100vh;
  padding: 3rem;
`;
