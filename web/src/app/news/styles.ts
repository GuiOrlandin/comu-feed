"use client";

import { Skeleton } from "@mui/material";
import styled from "styled-components";

export const NewsContainer = styled.div`
  display: flex;

  padding: 2rem;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #f0edf6;
`;
export const NewsContent = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
  width: 61.3125rem;
  height: 100%;
  background: #f5f5f5;
  border-radius: 10px;
  margin-top: 10rem;
`;

export const NewsWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;

  margin-top: 1rem;
`;
export const NewsWrapperInLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  margin-top: 1rem;
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
  width: 52rem;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border: 2px solid #f0edf6;
`;
export const SkeletonCommentAndLikeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SkeletonLike = styled(Skeleton)``;
export const SkeletonComment = styled(Skeleton)``;
