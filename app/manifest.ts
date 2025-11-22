import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "London Tube Map",
    short_name: "Tube Map",
    description: "London Tube Map with some quality of life features",
    start_url: "/",
    theme_color: "#000000",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "3840x2160",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshot-narrow.png",
        sizes: "800x1734",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
