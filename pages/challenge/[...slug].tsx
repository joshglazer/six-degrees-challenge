import { isArray } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Person } from "tmdb-typescript-api";
import { tmdbApiClient } from "../../api/tmdbApi";
import Layout from "../../components/layout/Layout";

const Challenge: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [startPerson, setStartPerson] = useState<Person>();
  const [endPerson, setEndPerson] = useState<Person>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isArray(slug) && slug.length === 2) {
      setHasError(false);

      const startPersonId = +slug[0];
      const endPersonId = +slug[1];

      tmdbApiClient.people.details(startPersonId).subscribe((person) => {
        setStartPerson(person);
      });

      tmdbApiClient.people.details(endPersonId).subscribe((person) => {
        setEndPerson(person);
      });
    } else {
      setHasError(true);
    }
  }, [slug]);

  console.log(slug);
  return (
    <Layout title="The challenge is on!">
      {hasError ? (
        <div>There was an error</div>
      ) : (
        <div>
          {startPerson?.name} --- {endPerson?.name}
        </div>
      )}
    </Layout>
  );
};
export default Challenge;
