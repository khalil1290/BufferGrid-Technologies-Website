export type Project = {
  slug: string;
  name: string;
  category: string;
  status: string;
  url?: string;
  summary: string;
  description: string;
  services: string[];
  highlights: string[];
  cover: string;
  detail: string;
};

export const projects: Project[] = [
  {
    slug: "max-build",
    name: "Max Build Limited",
    category: "Corporate Website",
    status: "Live",
    url: "https://www.maxbuild.com.ng/",
    summary:
      "A corporate digital presence for a company operating across real estate, investment and construction.",
    description:
      "A corporate website developed to present Max Build Limited’s business areas, property opportunities and services. The experience gives visitors a clearer route to understand the company and explore its work.",
    services: [
      "Website strategy",
      "Website design & development",
      "Responsive implementation",
    ],
    highlights: [
      "Corporate company presentation",
      "Real estate and property showcases",
      "Investment and construction sections",
      "Company information and enquiry pathways",
    ],
    cover: "/images/projects/maxbuild-cover.webp",
    detail: "/images/projects/maxbuild-detail.webp",
  },
  {
    slug: "blue-light",
    name: "Blue Light Concord Concept Ltd",
    category: "Corporate Website",
    status: "Live",
    url: "https://bluelightconcord.com/",
    summary:
      "A business website presenting sourcing, supply and procurement services across multiple sectors.",
    description:
      "A corporate website developed to establish Blue Light Concord Concept Ltd’s digital presence and communicate its sourcing, supply and procurement services across mining, industrial and agricultural sectors.",
    services: [
      "Website strategy",
      "Website design & development",
      "Responsive implementation",
    ],
    highlights: [
      "Corporate business presentation",
      "Mining materials and industrial equipment categories",
      "Agro-allied product categories",
      "Industry information and business enquiry sections",
    ],
    cover: "/images/projects/bluelight-cover.webp",
    detail: "/images/projects/bluelight-detail.webp",
  },
  {
    slug: "imam-globals",
    name: "Imam Globals",
    category: "E-commerce",
    status: "Pre-launch",
    summary:
      "An online product catalogue and WhatsApp-led shopping experience for a retail business.",
    description:
      "An e-commerce website for a retail business selling football jerseys and a range of footwear. Customers can browse products, view details, add items to a cart and proceed to checkout through WhatsApp. Orders and payments are confirmed directly with the business outside the website.",
    services: [
      "E-commerce website development",
      "Product catalogue",
      "Cart and WhatsApp checkout",
    ],
    highlights: [
      "Football jersey and footwear categories",
      "Product catalogue and detail views",
      "Shopping cart",
      "WhatsApp-based order confirmation",
    ],
    cover: "/images/projects/imam-globals-cover.webp",
    detail: "/images/projects/imam-globals-detail.webp",
  },
];

export const services = [
  {
    number: "01",
    title: "Website Development",
    text: "Professional, responsive websites that communicate what your business does and make it easier for customers to take the next step.",
    tags: ["Business websites", "Landing pages", "Corporate websites"],
  },
  {
    number: "02",
    title: "E-commerce Solutions",
    text: "Product-focused online experiences that help customers discover your products and move smoothly toward an order.",
    tags: ["Product catalogues", "Shopping carts", "Checkout integrations"],
  },
  {
    number: "03",
    title: "Custom Web Applications",
    text: "Purpose-built web tools, dashboards and portals designed around the way your business actually works.",
    tags: ["Admin dashboards", "Business portals", "Workflow tools"],
  },
  {
    number: "04",
    title: "Website Improvement & Support",
    text: "Practical improvements to existing websites, from redesigns and performance work to ongoing updates and maintenance.",
    tags: ["Redesigns", "Performance", "Maintenance"],
  },
  {
    number: "05",
    title: "Integrations & Functionality",
    text: "Connect your website to the tools and services your business relies on through carefully scoped integrations.",
    tags: ["APIs", "Payment gateways", "Maps & notifications"],
  },
];
