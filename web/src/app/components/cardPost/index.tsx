import {
  NameAndCommunity,
  PostCardContainer,
  ProfileContent,
  SkeletonAvatar,
  SkeletonCommunity,
  SkeletonContent,
  SkeletonName,
} from "./styles";

export default function CardPost() {
  return (
    <PostCardContainer>
      <ProfileContent>
        <SkeletonAvatar width={6 * 16} height={6 * 16} variant="rectangular" />
        <NameAndCommunity>
          <SkeletonName width={14 * 16} height={3 * 16} variant="text" />
          <SkeletonCommunity width={7 * 16} height={2 * 16} variant="text" />
        </NameAndCommunity>
      </ProfileContent>
      <SkeletonContent width={20 * 16} height={5 * 16} variant="rectangular" />
    </PostCardContainer>
  );
}
