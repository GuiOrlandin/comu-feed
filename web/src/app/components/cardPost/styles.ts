"use client";

import styled from "styled-components";
import { Skeleton } from "@mui/material";

interface PostType {
  variant: string;
}

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

export const SkeletonAvatar = styled(Skeleton)`
  margin-top: 0.18rem;
`;

export const SkeletonName = styled(Skeleton)`
  margin-top: 0.18rem;
  margin: -0.4rem 1rem;
`;
export const SkeletonCommunity = styled(Skeleton)`
  margin-top: 0.18rem;
  margin: -0.4rem 1rem;
`;

export const SkeletonContent = styled(Skeleton)`
  border-radius: 5px;
  margin-top: 1rem;
`;
