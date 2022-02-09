import { TmdbApi } from "tmdb-typescript-api";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const TMDB_BASE_URL = "https://image.tmdb.org/t/p/w300/";

function getTmdbApiClient(): TmdbApi {
  return new TmdbApi(TMDB_API_KEY || "");
}

const tmdbApiClient = getTmdbApiClient();

export { TMDB_BASE_URL, tmdbApiClient };
