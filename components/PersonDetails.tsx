import React from "react";
import { StrictSearchResultProps } from "semantic-ui-react";
import Image from "next/image";

function PersonDetails({ title, image }: StrictSearchResultProps) {
  return (
    <div>
      {image && <Image src={image} alt={title} height="384" width="256" />}
      <div>{title}</div>
    </div>
  );
}

export default PersonDetails;
