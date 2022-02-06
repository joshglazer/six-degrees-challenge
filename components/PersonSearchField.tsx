import { debounce } from "lodash";
import React, { forwardRef, MouseEvent, useRef, useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import {
  Form,
  Ref,
  Search,
  SearchProps,
  SearchResultData,
  StrictSearchResultProps,
} from "semantic-ui-react";
import { Movie, Person, TmdbApi, TvShow } from "tmdb-typescript-api";

interface PersonSearchFieldProps {
  name: string;
  label: string;
  setValue: UseFormSetValue<FieldValues>;
}

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

let api: TmdbApi = new TmdbApi(tmdbApiKey || "");

function PersonSearchField({
  name,
  label,
  setValue,
}: PersonSearchFieldProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [results, setResults] = useState<StrictSearchResultProps[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  // const [selectedPersonId, setSelectedPersonId] = useState("");

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
      description: person.known_for
        .map(
          (movieOrShow: Movie | TvShow) =>
            (movieOrShow as Movie)["title"] ?? (movieOrShow as TvShow)["name"]
        )
        .join(", "),
      image: `https://image.tmdb.org/t/p/w300/${person.profile_path}`,
    }));
  }

  function handleSearchChange(_event: MouseEvent, data: SearchProps) {
    setFieldValue(data.value || "");
    searchDebounced.current(data.value);
  }

  function handleResultSelected(_event: MouseEvent, data: SearchResultData) {
    setFieldValue(data.result.title);
    setValue(name, data.result);
  }

  return (
    <React.Fragment>
      <Form.Input
        control={Search}
        label={label}
        id={`${name}-search`}
        name={name}
        loading={isLoading}
        placeholder="Search by name..."
        onResultSelect={handleResultSelected}
        onSearchChange={handleSearchChange}
        results={results}
        value={fieldValue}
        showNoResults={showNoResults}
      />
    </React.Fragment>
  );
}

export default PersonSearchField;
