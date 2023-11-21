import { useQuery } from "@tanstack/react-query";
import axios from "axios";

console.log("connected");

// for fetching gifs from giphy
const gifhyAxiosClient = async () => {
  const options = {
    method: "GET",
    url: "https://api.giphy.com/v1/stickers/trending",
    params: {
      api_key: "YTaww1wJyzM9i29N4SNllhJAYdu0LS8b",
    },
  };

  try {
    const response = await axios.request(options);
    const gifhyURLs = response.data.data.map(
      (gif: { images: { original: { url: string } } }) =>
        gif.images.original.url
    );
    return gifhyURLs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useGifhyData = () => {
  return useQuery({
    queryKey: ["gif"],
    queryFn: gifhyAxiosClient,
  });
};
