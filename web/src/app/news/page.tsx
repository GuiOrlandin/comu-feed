import TopBar from "../components/topBar";
import { NewsContainer, NewsContent } from "./styles";

export default function News() {
  return (
    <NewsContainer>
      <TopBar page="news" />

      <NewsContent>a</NewsContent>
    </NewsContainer>
  );
}
