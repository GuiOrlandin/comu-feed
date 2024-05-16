import TopBar from "@/app/components/topBar";
import { HomeContainer } from "@/app/pages/home/styles";

export default function Home() {
  return (
    <HomeContainer>
      <TopBar page="home" isLoged={false} />
    </HomeContainer>
  );
}
