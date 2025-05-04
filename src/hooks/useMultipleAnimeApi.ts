// import { AnimeItems } from "@/types";
// import axios from "axios";
// import { useEffect, useState } from "react";

// // function useMyApi(url) {
// //   สร้าง state
// //   useEffect(() => {
// //     setLoading(true)
// //     fetch(url)
// //       .then(res => res.json())
// //       .then(data => setData(data))
// //       .catch(err => setError(err))
// //       .finally(() => setLoading(false))
// //   }, [url])
// //   return { data, loading, error }
// // }

// export const useMultipleAnimeApi = (ids: number[]) => {
//   const [animes, setAnimes] = useState<{[key: number]: AnimeItems}>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");

  

//   try {
//     setLoading(true);
//     const fetchAll =  async () => {
//       const result = await Promise.all(
//         ids.map((id) => axios.get(`https://api.jikan.moe/v4/anime/${id}`))
//       );

//       const animeData = result.reduce<{[key: number]: AnimeItems}>((acc, curr, index) => {
//         acc[ids[index]] = curr.data.data
//         return acc
//       }, {})
//       setAnimes(animeData)
//     }
//     fetchAll()
//   } catch (error) {
//     console.log(error);
//     if (axios.isAxiosError(error)) {
//       setErrorMessage("Error fetching Anime ID");
//     } else {
//       setErrorMessage("Error from another Error");
//     }
//   } finally {
//     setLoading(false);
//   }

//   return {
//     animes,
//     loading,
//     errorMessage
//   }

// };
