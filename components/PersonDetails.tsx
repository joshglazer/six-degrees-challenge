import React from "react";
import { StrictSearchResultProps } from "semantic-ui-react";
import Image from "next/image";

type PersonDetailsProps = Pick<
  StrictSearchResultProps,
  "title" | "image" | "id"
>;

function PersonDetails({ title, image }: PersonDetailsProps) {
  return (
    <div>
      {image && <Image src={image} alt={title} height="384" width="256" />}
      <div>{title}</div>
    </div>
  );
}

export type { PersonDetailsProps };
export default PersonDetails;
