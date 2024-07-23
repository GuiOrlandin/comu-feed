import Image from "next/image";
import { AvatarImageContainer } from "./styles";

interface AvatarImageProps {
  urlImg: string;
  avatarImgDimensions: number;
}

export default function AvatarImage({
  urlImg,
  avatarImgDimensions,
}: AvatarImageProps) {
  return (
    <AvatarImageContainer>
      <Image
        src={urlImg}
        width={avatarImgDimensions * 16}
        height={avatarImgDimensions * 16}
        alt="Picture of the author"
        quality={100}
      />
    </AvatarImageContainer>
  );
}
