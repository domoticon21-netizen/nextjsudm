"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function page() {
  let params = useParams<{ id: string }>();
  let mode = useSearchParams().get("mode");
  return (
    <div>
      id da banda {params.id} - {mode}
    </div>
  );
}
