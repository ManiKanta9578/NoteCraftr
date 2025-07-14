// pages/notes/[technology].js

import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const NotesPage = dynamic(() => import("@/components/NotesPage"), {
  ssr: false,
  loading: () => <p>Loading notes...</p>,
});


const TechnologyPage = () => {

  const router = useRouter();
  const { technology } = router.query;

  return <NotesPage technology={technology} />;
};

export default TechnologyPage;
