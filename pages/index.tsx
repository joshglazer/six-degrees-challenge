import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Button, Form, StrictSearchResultProps } from "semantic-ui-react";
import Layout from "../components/layout/Layout";
import PeopleProgression, {
  PeopleProgressionProps,
} from "../components/people-progression/PeopleProgression";
import PersonSearchField from "../components/PersonSearchField";

const Home: NextPage = () => {
  const { handleSubmit, setValue, formState, watch } = useForm();

  function submitForm(formData: any) {
    console.log(formData);
  }

  function submitFormError(error: any) {
    console.log(error);
  }

  function getPeopleProgression(): PeopleProgressionProps["progression"] {
    const startPerson: StrictSearchResultProps = watch("startPerson");
    const endPerson: StrictSearchResultProps = watch("endPerson");

    return [
      {
        person: startPerson,
        progressionToNext: "Six Degrees",
      },
      { person: endPerson },
    ];
  }

  return (
    <Layout title="Let's get started!">
      <Form size="large" onSubmit={handleSubmit(submitForm, submitFormError)}>
        <PersonSearchField
          name="startPerson"
          label="Step 1: Get started by choosing an actor."
          setValue={setValue}
        />
        <PersonSearchField
          name="endPerson"
          label="Step 2: Choose another actor that's six degrees (or less) away
            from the first one."
          setValue={setValue}
        />
        <PeopleProgression progression={getPeopleProgression()} />
        <Form.Field>
          <Button>Start the Challenge!</Button>
        </Form.Field>
      </Form>
    </Layout>
  );
};

export default Home;
