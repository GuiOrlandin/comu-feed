"use client";

import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: 20rem;
  background: linear-gradient(to bottom, #160548 50%, #f0edf6 50%);
`;

export const CardsOfPostContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: -7rem;

  overflow: hidden;
`;

export const TopBarContainer = styled.div`
  margin-top: -17rem;
`;
