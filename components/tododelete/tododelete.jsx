"use client"

import { Garbage } from "../svgfiles/svgs";

export default function TodoDelete({ id, handleDelete }) {
  return (
    <button onClick={() => handleDelete(id)}>
      <Garbage />
    </button>
  );
}
