import { GiphyFetch } from "@giphy/js-fetch-api";

const GiphyApi = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || "");

export default GiphyApi;
