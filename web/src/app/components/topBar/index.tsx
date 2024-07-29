"use client";

import Link from "next/link";
import {
  AvatarAndNameOfCommunityContainer,
  AvatarContentWithoutImage,
  ButtonOnBarContainer,
  ButtonsOnBarContainer,
  CommunitiesResultContainer,
  SearchCommunity,
  SearchCommunityCompleteContainer,
  SearchCommunityContainer,
  TopBarContainer,
  TwoOptionsRedirectOnBarContainerInHome,
  TwoOptionsRedirectOnBarContainerInOthersPages,
} from "./styles";
import { useRouter } from "next/navigation";
import CreatePostModal from "../createPostAndCommunityModal";

import { signOut } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from "react";
import { tokenStore } from "@/store/tokenStore";
import { emailStore } from "@/store/emailStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userStore } from "@/store/userStore";
import AvatarImage from "../avatarImg";
import { RxAvatar } from "react-icons/rx";

interface TopBarProps {
  page: string;
}

export interface CommunityResponse {
  id: string;
  created_at: Date;
  community_image?: string | null;
  email: string;
  founder_id: string;
  key_access: string;
  name: string;
}
export interface CommunityResponseWithProps {
  props: {
    id: string;
    created_at: Date;
    community_image?: string | null;
    email: string;
    founder_id: string;
    key_access: string;
    name: string;
  };
}
interface CommentsResponse {
  id: string;
  created_at: Date;
  user_id: string;
  text_post_id: string;
  media_post_id: string;
  text_post?: {
    community: {
      name: string;
      id: string;
    };
    id: string;
    title: string;
  };
  media_post?: {
    community: {
      name: string;
      id: string;
    };
    id: string;
    title: string;
  };
  content: string;
}
export interface MediaPostsResponse {
  id: string;
  created_at: Date;
  user_id: string;
  title: string;
  community_id: string;
  media: string;
  love: LoveResponse[];
}
export interface TextPostsResponse {
  id: string;
  created_at: Date;
  user_id: string;
  title: string;
  community_id: string;
  content: string;
  love: LoveResponse[];
}

export interface LoveResponse {
  id: string;
  created_at: Date;
  user_id: string;
  text_post_id?: string;
  media_post_id?: string;
}

export interface UserResponse {
  id: string;
  avatar?: string | null;
  created_at?: Date;
  email: string;
  name: string;
  community_Founder?: CommunityResponse[];
  community_Member?: CommunityResponse[];
  comments?: CommentsResponse[];
  mediaPosts?: MediaPostsResponse[];
  textPosts?: TextPostsResponse[];
  love: LoveResponse[];
}

export default function TopBar({ page }: TopBarProps) {
  const router = useRouter();
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>();
  const [communityName, setCommunityName] = useState<string>();
  const [communities, setCommunities] = useState<
    CommunityResponseWithProps[] | null | undefined
  >();
  const token = tokenStore((state) => state.token);
  const setEmail = emailStore((state) => state.setEmail);
  const removeEmail = emailStore((state) => state.removeEmail);
  const email = emailStore((state) => state.email);
  const setUser = userStore((state) => state.setUser);
  const userStored = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);
  const setToken = tokenStore((state) => state.setToken);
  const removeToken = tokenStore((state) => state.removeToken);

  function handleRedirect(page: string) {
    router.push(`/${page}`);
  }
  function handleLogout() {
    signOut();
    removeUser();
    removeToken();
    removeEmail();
    if (typeof window !== "undefined") {
      localStorage.removeItem("storeToken");
      localStorage.removeItem("storeEmail");
    }
  }

  const {
    data: user,
    refetch,
    isSuccess,
    isError,
  } = useQuery<UserResponse>({
    queryKey: ["user-authenticated"],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/users?email=${email}`)
        .then((response) => response.data);
    },
  });

  const {
    data: communitiesData,
    refetch: refetchFindCommunitiesByName,
    isSuccess: foundCommunities,
  } = useQuery<CommunityResponseWithProps[]>({
    queryKey: ["communities-info"],

    queryFn: async () => {
      if (communityName) {
        return axios
          .get(`http://localhost:3333/community?name=${communityName}`)
          .then((response) => response.data);
      }
    },
  });

  function handleSearchCommunities(event: ChangeEvent<HTMLInputElement>) {
    const nameOrCharactersForSearch = event.target.value;

    setCommunityName(nameOrCharactersForSearch!);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenStorage = localStorage.getItem("storeToken");
      const emailStorage = localStorage.getItem("storeEmail");

      if (
        typeof window !== "undefined" &&
        !token &&
        !email &&
        tokenStorage &&
        emailStorage
      ) {
        setToken(tokenStorage!);
        setEmail(emailStorage!);
      }
    }

    if (token && email && user === undefined) {
      refetch();
    }

    if (isSuccess) {
      setUser(user!);
    }

    if (userStored!.name !== "" && !isError) {
      ("");
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, [token, isSuccess, email, user, userStored]);

  useEffect(() => {
    if (communityName) {
      refetchFindCommunitiesByName();
    }

    if (foundCommunities) {
      setCommunities(communitiesData!);
    }

    if (!communityName) {
      setCommunities(undefined);
    }
  }, [communityName, communitiesData, foundCommunities, isError]);

  return (
    <TopBarContainer>
      {page === "home" && (
        <>
          <TwoOptionsRedirectOnBarContainerInHome>
            <Link href="/news">Novidades</Link>
          </TwoOptionsRedirectOnBarContainerInHome>

          <SearchCommunityContainer>
            <SearchCommunity
              $variant={communities ? "true" : "false"}
              type="text"
              placeholder="Procurar comunidade"
              onChange={(event) => handleSearchCommunities(event)}
            />
            {communities && communities!.length > 0 && (
              <SearchCommunityCompleteContainer>
                {communities.map((community) => (
                  <CommunitiesResultContainer
                    key={community.props.id}
                    onClick={() =>
                      router.push(`/communityInfo/${community.props.id}`)
                    }
                  >
                    {community.props.community_image === null ? (
                      <AvatarAndNameOfCommunityContainer>
                        <AvatarContentWithoutImage>
                          <RxAvatar size={55} color="" />
                        </AvatarContentWithoutImage>
                        <span>{community.props.name}</span>
                      </AvatarAndNameOfCommunityContainer>
                    ) : (
                      <AvatarAndNameOfCommunityContainer>
                        <AvatarImage
                          urlImg={`http://localhost:3333/files/communityImage/${community!
                            .props.community_image!}`}
                          avatarImgDimensions={3.1375}
                        />
                        <span>{community.props.name}</span>
                      </AvatarAndNameOfCommunityContainer>
                    )}
                  </CommunitiesResultContainer>
                ))}
              </SearchCommunityCompleteContainer>
            )}
          </SearchCommunityContainer>
          {userAuthenticated ? (
            <ButtonsOnBarContainer>
              <CreatePostModal user={user!} />
              <ButtonOnBarContainer onClick={() => handleLogout()}>
                Sair
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          ) : (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
                Entrar
              </ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
                Cadastrar
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          )}
        </>
      )}
      {page === "register" && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="/home">Home</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          <ButtonsOnBarContainer>
            <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
              Entrar
            </ButtonOnBarContainer>
          </ButtonsOnBarContainer>
        </>
      )}
      {page === "login" && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="home">Home</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          <ButtonsOnBarContainer>
            <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
              Cadastrar
            </ButtonOnBarContainer>
          </ButtonsOnBarContainer>
        </>
      )}

      {page === "news" && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="/home">Home</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          <SearchCommunityContainer>
            <SearchCommunity
              $variant={communities ? "true" : "false"}
              type="text"
              placeholder="Procurar comunidade"
              onChange={(event) => handleSearchCommunities(event)}
            />
            {communities && communities!.length > 0 && (
              <SearchCommunityCompleteContainer>
                {communities.map((community) => (
                  <CommunitiesResultContainer
                    key={community.props.id}
                    onClick={() =>
                      router.push(`/communityInfo/${community.props.id}`)
                    }
                  >
                    {community.props.community_image === null ? (
                      <AvatarAndNameOfCommunityContainer>
                        <AvatarContentWithoutImage>
                          <RxAvatar size={55} color="" />
                        </AvatarContentWithoutImage>
                        <span>{community.props.name}</span>
                      </AvatarAndNameOfCommunityContainer>
                    ) : (
                      <AvatarAndNameOfCommunityContainer>
                        <AvatarImage
                          urlImg={`http://localhost:3333/files/communityImage/${community!
                            .props.community_image!}`}
                          avatarImgDimensions={3.1375}
                        />
                        <span>{community.props.name}</span>
                      </AvatarAndNameOfCommunityContainer>
                    )}
                  </CommunitiesResultContainer>
                ))}
              </SearchCommunityCompleteContainer>
            )}
          </SearchCommunityContainer>
          {userAuthenticated ? (
            <ButtonsOnBarContainer>
              <CreatePostModal user={user!} />

              <ButtonOnBarContainer onClick={() => handleLogout()}>
                Sair
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          ) : (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
                Entrar
              </ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
                Cadastrar
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          )}
        </>
      )}

      {(page === "postInfo" ||
        page === "communityInfo" ||
        page === "userInfo") && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="/home">Home</Link>
            <Link href="/news">Novidades</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          <SearchCommunityContainer>
            <SearchCommunity
              $variant={communities ? "true" : "false"}
              type="text"
              placeholder="Procurar comunidade"
              onChange={(event) => handleSearchCommunities(event)}
            />
            {communities && communities!.length > 0 && (
              <SearchCommunityCompleteContainer>
                {communities.map((community) => (
                  <CommunitiesResultContainer
                    key={community.props.id}
                    onClick={() =>
                      router.push(`/communityInfo/${community.props.id}`)
                    }
                  >
                    {community.props.community_image === null ? (
                      <AvatarAndNameOfCommunityContainer>
                        <AvatarContentWithoutImage>
                          <RxAvatar size={55} color="" />
                        </AvatarContentWithoutImage>
                        <span>{community.props.name}</span>
                      </AvatarAndNameOfCommunityContainer>
                    ) : (
                      <AvatarAndNameOfCommunityContainer>
                        <AvatarImage
                          urlImg={`http://localhost:3333/files/communityImage/${community!
                            .props.community_image!}`}
                          avatarImgDimensions={3.1375}
                        />
                        <span>{community.props.name}</span>
                      </AvatarAndNameOfCommunityContainer>
                    )}
                  </CommunitiesResultContainer>
                ))}
              </SearchCommunityCompleteContainer>
            )}
          </SearchCommunityContainer>
          {userAuthenticated ? (
            <ButtonsOnBarContainer>
              <CreatePostModal user={user!} />
              <ButtonOnBarContainer onClick={() => handleLogout()}>
                Sair
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          ) : (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
                Entrar
              </ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
                Cadastrar
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          )}
        </>
      )}
    </TopBarContainer>
  );
}
