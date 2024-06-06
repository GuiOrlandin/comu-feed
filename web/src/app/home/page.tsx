import CardPost from "@/app/components/cardPost";
import TopBar from "@/app/components/topBar";
import { CardsOfPostContainer, HomeContainer } from "@/app/home/styles";

export default async function Home() {
  return (
    <HomeContainer>
      <TopBar page="home" />

      <CardsOfPostContainer>
        <CardPost />
        <CardPost />
        <CardPost />
      </CardsOfPostContainer>
    </HomeContainer>
  );
}
