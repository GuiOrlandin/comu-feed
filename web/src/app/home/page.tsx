import CardPost from "@/app/components/cardPost";
import TopBar from "@/app/components/topBar";
import { CardsOfPostContainer, HomeContainer } from "@/app/home/styles";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <HomeContainer>
      {session ? (
        <>
          <TopBar page="home" isLoged={true} />
        </>
      ) : (
        <TopBar page="home" isLoged={false} />
      )}
      <CardsOfPostContainer>
        <CardPost />
        <CardPost />
        <CardPost />
      </CardsOfPostContainer>
    </HomeContainer>
  );
}
