"use client";

import styled from "styled-components";

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchCommunity = styled.input`
  display: flex;
  gap: 1rem;
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
