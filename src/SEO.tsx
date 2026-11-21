import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  path: string;
};

export default function SEO({ title, description, path }: SEOProps) {
  useEffect(() => {
    const url = `https://buffergridtech.com${path}`;

    document.title = title;

    const updateMeta = (attribute: string, key: string, content: string) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    updateMeta("name", "description", description);

    updateMeta("property", "og:type", "website");
    updateMeta("property", "og:title", title);
    updateMeta("property", "og:description", description);
    updateMeta("property", "og:url", url);
    updateMeta("property", "og:image", "https://buffergridtech.com/og.png");

    updateMeta("name", "twitter:card", "summary_large_image");
    updateMeta("name", "twitter:title", title);
    updateMeta("name", "twitter:description", description);
    updateMeta("name", "twitter:image", "https://buffergridtech.com/og.png");

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
  }, [title, description, path]);

  return null;
}
