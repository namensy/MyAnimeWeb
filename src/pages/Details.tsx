import { assets } from "@/assets/assets"
import { useAnimeApi } from "@/hooks/useAnimeApi";
import { useParams } from "react-router-dom";
const Details = () => {
  const { id } = useParams();
  const { animeList } = useAnimeApi(id as string);
  console.log(id);
  return (
    <div>
      <div className="container">
        {animeList?.map((anime) => (
          <div key={anime.mal_id}>
            <img src={anime.images.webp.image_url} alt={anime.title} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Details