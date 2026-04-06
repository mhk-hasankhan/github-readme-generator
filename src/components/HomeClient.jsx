"use client";

import { useState } from "react";
import LandingPage from "./LandingPage";
import BuilderPage from "./BuilderPage";

export default function HomeClient() {
  const [page, setPage] = useState("landing"); // "landing" | "builder"

  if (page === "builder") {
    return <BuilderPage onBack={() => setPage("landing")} />;
  }

  return <LandingPage onStart={() => setPage("builder")} />;
}
