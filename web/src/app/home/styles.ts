"use client";

import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #160548 50%, #f0edf6 50%);

  h1 {
    color: #bd9797;
  }
`;

export const CardsOfPostContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const TopBarContainer = styled.div`
  width: 100%;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
