import { createFileRoute } from "@tanstack/react-router";
import { Shutter } from "@/components/Shutter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chanchal Man — Dukaan Shutter" },
      {
        name: "description",
        content:
          "Pull the shutter up to reveal चंचल मन. A dukaan-style unlock animation with marigold toran and mechanical sound.",
      },
      { property: "og:title", content: "Chanchal Man — Dukaan Shutter" },
      {
        property: "og:description",
        content:
          "A web-based dukaan shutter unlock experience with swaying marigold garland.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shutter,
});
