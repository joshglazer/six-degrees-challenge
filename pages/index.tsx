import type { NextPage } from "next";
import { ActorSearchField } from "../components/actor-search-field";
import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="Let's get started!">
      <div></div>
      <div>
        <p>Step 1: Get started by choosing an actor.</p>
        <ActorSearchField />
      </div>
      <div>
        <p>
          Step 2: Choose another actor that&apos;s six degrees (or less) away
          from the first one.
        </p>
        <ActorSearchField />
      </div>
    </Layout>
  );
};

export default Home;
