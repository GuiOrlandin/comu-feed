"use client";

import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const CommunityInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0edf6;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
`;

export const PostAndCommunityWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const CommunityInfoContentWithOutButton = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0edf6;

  h2 {
    font-weight: 400;
  }
`;
export const CommunityInfoContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;

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
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;
export const CommunityWithoutPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  h1 {
    font-size: 1.6rem;
  }
`;

export const PostAndCommunityInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 61.3125rem;
  background: #f5f5f5;
  border-radius: 10px;
  margin-top: 2rem;
  min-height: 80vh;
  padding: 3rem;
`;

export const CommunityAvatarWithoutImage = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

export const CommunitySkeleton = styled.div`
  display: flex;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f0edf6;
`;
export const JoinCommunityButton = styled.button`
  padding: 0.5rem;
  background: #2f1b7e;
  color: #f5f5f5;
  font-weight: 600;
  border: none;
  border-radius: 8px;

  &:hover {
    background: #554986;
  }
`;
export const DeleteCommunityButton = styled(JoinCommunityButton)`
  background: #cb4444;

  &:hover {
    background: #cf6161;
    cursor: pointer;
  }
`;

export const PasswordInput = styled.input`
  padding: 0.4rem;
  border: 1px solid #f0edf6;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 1rem;
`;
export const JoinCommunityConfirmButton = styled(JoinCommunityButton)``;
export const CancelJoinCommunityButton = styled(Dialog.Close)`
  padding: 0.5rem;
  background: #2f1b7e;
  color: #f5f5f5;
  font-weight: 600;
  border: none;
  border-radius: 8px;

  &:hover {
    background: #554986;
  }
`;
