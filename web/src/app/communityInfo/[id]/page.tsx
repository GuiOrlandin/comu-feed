"use client";

import TopBar from "@/app/components/topBar";
import {
  CommunityAvatarWithoutImage,
  CommunityInfoContainer,
  CommunityInfoContent,
  CommunitySkeleton,
  NameAndDescription,
  PostAndCommunityInfoContainer,
  PostAndCommunityWrapper,
  PostsOfCommunityContainer,
} from "./styles";
import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";
import { RxAvatar } from "react-icons/rx";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AvatarImage from "@/app/components/avatarImg";
import CardPost from "@/app/components/cardPost";
import {
  SkeletonAvatarNameAndCommunityContainer,
  SkeletonComment,
  SkeletonCommentAndLikeContainer,
  SkeletonContainer,
  SkeletonLike,
  SkeletonNameAndCommunityContainer,
} from "@/app/news/styles";
import {
  SkeletonAvatar,
  SkeletonCommunity,
  SkeletonContent,
  SkeletonName,
} from "@/app/components/cardPostWithSkeleton/styles";
import { ProfileContent } from "@/app/components/cardPost/styles";
import { userStore } from "@/store/userStore";
import { useDeleteCommunityMutate } from "@/hooks/deleteCommunity";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ButtonsOfDialogContainer,
  CancelButton,
  ConfirmButton,
  Content,
  DialogDeleteCommentContainer,
  DialogDeleteTriggerButton,
  DialogTitle,
  DialogTrigger,
} from "@/app/postInfo/[id]/styles";
import { Overlay } from "@/app/components/createPostModal/styles";

export interface CommunityResponse {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  founder_id: string;
  community_image: string;
  allPosts: (TextPostWithUser | MediaPostWithUser)[];
}

export default function CommunityInfo({ params }: { params: { id: string } }) {
  const user = userStore((state) => state.user);
  const router = useRouter();
  const removeUser = userStore((state) => state.removeUser);
  const { mutate, isSuccess, error } = useDeleteCommunityMutate();
  const {
    data: communityInfoById,
    isLoading,
    error: communiytiError,
  } = useQuery<CommunityResponse>({
    queryKey: ["community-info"],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/community/${params.id}`)
        .then((response) => response.data);
    },
  });

  function handleDeleteCommunity(community_id: string) {
    mutate(community_id);
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
    if (error?.message === "Request failed with status code 401") {
      removeUser();
      if (typeof window !== "undefined") {
        localStorage.removeItem("storeToken");
        localStorage.removeItem("storeEmail");
      }

      router.refresh();
    }

    if (communiytiError?.message === "Request failed with status code 404") {
      router.push("/");
    }
  }, [isSuccess, error, communiytiError]);

  return (
    <CommunityInfoContainer>
      <TopBar page="communityInfo" />
      <PostAndCommunityWrapper>
        <PostAndCommunityInfoContainer>
          {isLoading ? (
            <>
              <CommunitySkeleton>
                <SkeletonAvatar
                  width={6 * 16}
                  height={6 * 16}
                  variant="rectangular"
                />
                <SkeletonNameAndCommunityContainer>
                  <SkeletonName
                    width={14 * 16}
                    height={3 * 16}
                    variant="text"
                  />
                  <SkeletonCommunity
                    width={7 * 16}
                    height={2 * 16}
                    variant="text"
                  />
                </SkeletonNameAndCommunityContainer>
              </CommunitySkeleton>

              {[...Array(3)].map((_, index) => (
                <SkeletonContainer key={index}>
                  <ProfileContent>
                    <SkeletonAvatarNameAndCommunityContainer>
                      <SkeletonAvatar
                        width={6 * 16}
                        height={6 * 16}
                        variant="rectangular"
                      />
                      <SkeletonNameAndCommunityContainer>
                        <SkeletonName
                          width={14 * 16}
                          height={3 * 16}
                          variant="text"
                        />
                        <SkeletonCommunity
                          width={7 * 16}
                          height={2 * 16}
                          variant="text"
                        />
                      </SkeletonNameAndCommunityContainer>
                    </SkeletonAvatarNameAndCommunityContainer>
                  </ProfileContent>
                  <SkeletonContent height={5 * 16} variant="rectangular" />
                  <SkeletonCommentAndLikeContainer>
                    <SkeletonLike height={3 * 16} width={6 * 16} />
                    <SkeletonComment height={3 * 16} width={6 * 16} />
                  </SkeletonCommentAndLikeContainer>
                </SkeletonContainer>
              ))}
            </>
          ) : (
            <>
              <CommunityInfoContent>
                {communityInfoById?.community_image === null ? (
                  <CommunityAvatarWithoutImage>
                    <RxAvatar size={60} />
                  </CommunityAvatarWithoutImage>
                ) : (
                  <AvatarImage
                    avatarImgDimensions={4}
                    urlImg={`http://localhost:3333/files/communityImage/${communityInfoById?.community_image}`}
                  />
                )}
                <NameAndDescription>
                  <h1>{communityInfoById?.name}</h1>
                  <h2>{communityInfoById?.description}</h2>
                </NameAndDescription>
                {user.id === communityInfoById?.founder_id && (
                  <Dialog.Root>
                    <DialogTrigger asChild>
                      <button>Deletar</button>
                    </DialogTrigger>
                    <Dialog.Portal>
                      <Overlay />
                      <Content>
                        <DialogTitle>
                          Você deseja deletar a comunidade?
                        </DialogTitle>
                        <DialogDeleteCommentContainer>
                          <ButtonsOfDialogContainer>
                            <ConfirmButton
                              onClick={() =>
                                handleDeleteCommunity(communityInfoById.id)
                              }
                            >
                              Confirmar
                            </ConfirmButton>
                            <CancelButton>Cancelar</CancelButton>
                          </ButtonsOfDialogContainer>
                        </DialogDeleteCommentContainer>
                      </Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                )}
              </CommunityInfoContent>
              <PostsOfCommunityContainer>
                {communityInfoById?.allPosts.map((post) => (
                  <CardPost key={post.id} post={post} largecard={"true"} />
                ))}
              </PostsOfCommunityContainer>
            </>
          )}
        </PostAndCommunityInfoContainer>
      </PostAndCommunityWrapper>
    </CommunityInfoContainer>
  );
}
