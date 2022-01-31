import { debounce } from "lodash";
import { MouseEvent, useRef, useState } from "react";
import {
  Search,
  SearchProps,
  SearchResultData,
  StrictSearchResultProps,
} from "semantic-ui-react";
import { Person, TmdbApi } from "tmdb-typescript-api";

interface ActorSearchField {}

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

let api: TmdbApi = new TmdbApi(tmdbApiKey || "");

export default function ActorSearchField() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<StrictSearchResultProps[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const searchDebounced = useRef(
    debounce((searchValue) => {
      setIsLoading(true);

      api.search.people(searchValue).subscribe((people) => {
        setResults(convertTmdbPeopleToSemanticSearchResults(people.results));
        setIsLoading(false);
        setShowNoResults(true);
      });
    }, 1000)
  );

  function convertTmdbPeopleToSemanticSearchResults(
    people: Person[]
  ): StrictSearchResultProps[] {
    return people.map((person) => ({
      id: person.id,
      title: person.name,
    }));
  }

  function handleSearchChange(_event: MouseEvent, data: SearchProps) {
    setValue(data.value || "");
    searchDebounced.current(data.value);
  }

  function handleResultSelected(_event: MouseEvent, data: SearchResultData) {
    setValue(data.result.title);
  }

  return (
    <Search
      loading={isLoading}
      placeholder="Search by name..."
      onResultSelect={handleResultSelected}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
      showNoResults={showNoResults}
    />
  );
}
