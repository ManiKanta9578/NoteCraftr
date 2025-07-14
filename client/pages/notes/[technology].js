// pages/notes/[technology].js

import React from "react";
import { useRouter } from "next/router";
import NotesPage from "@/components/NotesPage";

const TechnologyPage = () => {
  const router = useRouter();
  const { technology } = router.query;

  return <NotesPage technology={technology} />;
};

export default TechnologyPage;
