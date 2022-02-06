import React from "react";
import { StrictSearchResultProps } from "semantic-ui-react";
import PersonDetails from "../PersonDetails";
import styles from "./PeopleProgression.module.css";

interface PeopleProgressionProps {
  progression: {
    person?: StrictSearchResultProps;
    progressionToNext?: string;
  }[];
}

function PeopleProgression({
  progression,
}: PeopleProgressionProps): JSX.Element {
  return (
    <div className={styles.peopleProgression}>
      {progression.map(
        ({ person, progressionToNext }, index) =>
          person && (
            <React.Fragment key={person?.id ?? index}>
              <PersonDetails {...person} />
              {progressionToNext && (
                <div> &lt;-- {progressionToNext} --&gt; </div>
              )}
            </React.Fragment>
          )
      )}
    </div>
  );
}

export type { PeopleProgressionProps };
export default PeopleProgression;
