"use client";

import TopBar from "@/app/components/topBar";
import {
  CancelJoinCommunityButton,
  CommunityAvatarWithoutImage,
  CommunityInfoContainer,
  CommunityInfoContent,
  CommunityInfoContentWithOutButton,
  CommunitySkeleton,
  CommunityWithoutPostsContainer,
  JoinCommunityButton,
  JoinCommunityConfirmButton,
  NameAndDescription,
  PasswordInput,
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
import { useEffect, useState, ChangeEvent } from "react";

import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ButtonsOfDialogContainer,
  Content,
  DialogDeleteCommentContainer,
  DialogTitle,
  DialogTrigger,
} from "@/app/postInfo/[id]/styles";
import { Overlay } from "@/app/components/createPostAndCommunityModal/styles";
import { useJoinCommunityMutate } from "@/hooks/joinCommunity";
import DeleteDialog from "@/app/components/deleteDialog";
import { emailStore } from "@/store/emailStore";
import { tokenStore } from "@/store/tokenStore";

export interface CommunityResponse {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  founder_id: string;
  key_access?: string;
  User_Members: {
    id: string;
  }[];
  community_image: string;
  allPosts: (TextPostWithUser | MediaPostWithUser)[];
}

export default function CommunityInfo({ params }: { params: { id: string } }) {
  const user = userStore((state) => state.user);
  const router = useRouter();
  const [communityPassword, setCommunityPassword] = useState<string>();
  const [userIsFounder, setUserIsFounder] = useState<boolean>(false);
  const [userFiltered, setUserFiltered] = useState<string | undefined>(
    undefined
  );
  const removeEmail = emailStore((state) => state.removeEmail);
  const removeToken = tokenStore((state) => state.removeToken);

  const removeUser = userStore((state) => state.removeUser);
  const { mutate, isSuccess, error } = useDeleteCommunityMutate();
  const { mutate: joinCommunity } = useJoinCommunityMutate();
  const {
    data: communityInfoById,
    isLoading,
    error: communityError,
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

  function handleJoinCommunityWithoutPassword(community_id: string) {
    joinCommunity({ community_id: community_id });
  }

  function handleJoinCommunityWithPassword(community_id: string) {
    joinCommunity({ community_id: community_id, password: communityPassword });
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
    if (error?.message === "Request failed with status code 401") {
      console.log(error?.message);

      if (typeof window !== "undefined") {
        localStorage.removeItem("storeToken");
        localStorage.removeItem("storeEmail");
      }

      removeUser();
      removeEmail();
      removeToken();

      router.push("/");
    }

    if (communityError?.message === "Request failed with status code 404") {
      router.push("/");
    }

    if (communityInfoById?.User_Members) {
      const userFilteredArray = communityInfoById.User_Members.filter(
        (userInCommunity) => userInCommunity.id === user.id
      );

      if (userFilteredArray.length > 0) {
        const userId = userFilteredArray[0].id;

        if (userId) {
          setUserFiltered(userId!);
        }
      }
    }

    if (user && communityInfoById?.founder_id === user.id) {
      setUserIsFounder(true);
    }
  }, [isSuccess, error, communityError, communityInfoById, user]);

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
              <CommunityInfoContentWithOutButton>
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
                </CommunityInfoContent>
                {user.id === communityInfoById?.founder_id && (
                  <DeleteDialog
                    title=" Você deseja deletar a comunidade?"
                    handleDeleteAction={() =>
                      handleDeleteCommunity(communityInfoById.id)
                    }
                    deleteButtonText="Deletar"
                  />
                )}

                {userFiltered !== user.id &&
                  communityInfoById?.founder_id !== user.id &&
                  user.name !== "" && (
                    <>
                      {communityInfoById?.key_access === "true" ? (
                        <Dialog.Root>
                          <DialogTrigger asChild>
                            <JoinCommunityButton>Entrar</JoinCommunityButton>
                          </DialogTrigger>
                          <Dialog.Portal>
                            <Overlay />
                            <Content>
                              <DialogTitle>
                                Digite a senha para entrar na comunidade
                              </DialogTitle>
                              <PasswordInput
                                type="text"
                                onChange={(value) =>
                                  setCommunityPassword(value.target.value)
                                }
                              />
                              <DialogDeleteCommentContainer>
                                <ButtonsOfDialogContainer>
                                  <JoinCommunityConfirmButton
                                    onClick={() =>
                                      handleJoinCommunityWithPassword(
                                        communityInfoById.id
                                      )
                                    }
                                  >
                                    Confirmar
                                  </JoinCommunityConfirmButton>
                                  <CancelJoinCommunityButton>
                                    Cancelar
                                  </CancelJoinCommunityButton>
                                </ButtonsOfDialogContainer>
                              </DialogDeleteCommentContainer>
                            </Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                      ) : (
                        <JoinCommunityButton
                          onClick={() =>
                            handleJoinCommunityWithoutPassword(
                              communityInfoById!.id
                            )
                          }
                        >
                          Entrar
                        </JoinCommunityButton>
                      )}
                    </>
                  )}
              </CommunityInfoContentWithOutButton>
              {communityInfoById?.key_access === "false" ||
              (communityInfoById?.key_access === "true" &&
                (userFiltered === user.id ||
                  communityInfoById?.founder_id === user.id)) ? (
                <PostsOfCommunityContainer>
                  {communityInfoById?.allPosts.map((post) => (
                    <CardPost
                      key={post.id}
                      post={post}
                      largecard={"true"}
                      userIsFounder={userIsFounder}
                    />
                  ))}
                </PostsOfCommunityContainer>
              ) : (
                <CommunityWithoutPostsContainer>
                  <h1>
                    Para acessar os posts é necessário entrar na comunidade!
                  </h1>
                </CommunityWithoutPostsContainer>
              )}
            </>
          )}
        </PostAndCommunityInfoContainer>
      </PostAndCommunityWrapper>
    </CommunityInfoContainer>
  );
}
