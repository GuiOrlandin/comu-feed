"use client";

import styled from "styled-components";

interface TopBarType {
  $variant: string;
}

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchCommunity = styled.input<TopBarType>`
  padding: 0.5rem;
  z-index: 1;
  min-width: 25.85rem;
  width: 100%;
  border: none;
  overflow: hidden;
  border: 1px solid #160548;
  border-radius: 12px;
  color: #160548;
  font-weight: 600;
`;
export const SearchCommunityContainer = styled.div`
  display: flex;
  position: relative;
`;
export const AvatarAndNameOfCommunityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  span {
    font-weight: 600;
  }
`;
export const SearchCommunityCompleteContainer = styled.div`
  position: absolute;
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
  z-index: 0;
  min-width: 25.75rem;
  padding: 2.3rem 0.5rem 0.5rem 0.5rem;
  border-radius: 12px;
  background: white;
`;
export const CommunitiesResultContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`;
export const AvatarContentWithoutImage = styled.div`
  display: flex;
  margin-left: -0.26rem;
  margin-right: -0.3rem;
`;

export const TwoOptionsRedirectOnBarContainerInHome = styled.div`
  display: flex;
  gap: 1.8rem;

  a {
    height: 1.5rem;
    color: #f5f5f5;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid #f5f5f5;
    }
  }
`;
export const TwoOptionsRedirectOnBarContainerInOthersPages = styled.div`
  display: flex;
  gap: 1.8rem;

  a {
    height: 1.5rem;
    color: #2f1b7e;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid #2f1b7e;
    }
  }
`;

export const ButtonsOnBarContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ButtonOnBarContainer = styled.button`
  display: flex;
  padding: 0.8rem 1rem;
  background: #cb4444;
  color: #f5f5f5;
  font-weight: 700;
  border: none;
  border-radius: 10px;

  &:hover {
    background: #cf6161;
    cursor: pointer;
  }
`;
