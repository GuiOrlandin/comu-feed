import CardPost from "@/app/components/cardPost";
import TopBar from "@/app/components/topBar";
import { CardsOfPostContainer, HomeContainer } from "@/app/pages/home/styles";

export default function Home() {
  return (
    <HomeContainer>
      <TopBar page="home" isLoged={true} />
      <CardsOfPostContainer>
        <CardPost />
        <CardPost />
        <CardPost />
      </CardsOfPostContainer>
    </HomeContainer>
  );
}
