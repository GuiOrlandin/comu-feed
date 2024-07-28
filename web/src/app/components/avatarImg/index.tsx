import Image from "next/image";
import { useRouter } from "next/navigation";

import { AvatarImageContainer } from "./styles";

interface AvatarImageProps {
  urlImg: string;
  avatarImgDimensions: number;
  userEmail?: string;
}

export default function AvatarImage({
  urlImg,
  avatarImgDimensions,
  userEmail,
}: AvatarImageProps) {
  const router = useRouter();

  return (
    <AvatarImageContainer $variant={userEmail ? "true" : "false"}>
      {userEmail ? (
        <Image
          onClick={() => router.push(`/userInfo/${userEmail}`)}
          src={urlImg}
          width={avatarImgDimensions * 16}
          height={avatarImgDimensions * 16}
          alt="Picture of the author"
          quality={100}
        />
      ) : (
        <Image
          src={urlImg}
          width={avatarImgDimensions * 16}
          height={avatarImgDimensions * 16}
          alt="Picture of the author"
          quality={100}
        />
      )}
    </AvatarImageContainer>
  );
}
