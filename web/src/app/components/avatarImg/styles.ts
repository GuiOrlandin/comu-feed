"use client";

import styled from "styled-components";

interface AvatarImgProps {
  $variant: string;
}

export const AvatarImageContainer = styled.div<AvatarImgProps>`
  img {
    border-radius: 999px;

    &:hover {
      cursor: ${({ $variant }) => ($variant === "true" ? "pointer" : "")};
    }
  }
`;
