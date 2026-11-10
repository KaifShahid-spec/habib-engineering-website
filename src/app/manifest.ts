import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // Agar aapke paas android-chrome icons hain toh yahan add karein:
      // {
      //   src: "/android-chrome-192x192.png",
      //   sizes: "192x192",
      //   type: "image/png",
      // },
    ],
  };
}