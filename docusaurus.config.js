// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const title = "Typescript Type Challenges在线版";

let lowerCaseTitle = title
  .toLocaleLowerCase()
  .replace(/\s/g, "-");

  let resWithoutChinese = lowerCaseTitle.split('').map(letter => {
    return letter.match(/[\u4E00-\u9FA5]/) ? '' : letter;
  })
  lowerCaseTitle = resWithoutChinese.join('')

const githubUrl = "https://github.com/aotushi/" + lowerCaseTitle;

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title,
  titleDelimiter: `--`,
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://typescript-type-challenges-chinese.vercel.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "aotushi",
  projectName: "typescript-type-challenges",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          path: "./docs/",
          routeBasePath: "/",
          editUrl: `${githubUrl}/blob/master`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
    [
      "docusaurus-preset-shiki-twoslash",
      {
        themes: ["min-light", "nord"],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    algolia: {
      appId: "BH4D9OD16A",
      apiKey: "10bd867cf7c65a2a7f1dc6f749e047a4",
      indexName: "typescript-type-challenge",
      contextualSearch: true,
      searchParameters: { facetFilters: ["type:lvl1"] },
    },
    navbar: {
      title,
      logo: {
        alt: "My Site Logo",
        src: "img/favicon.ico",
      },
      items: [
        {
          href: githubUrl,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Inspired by",
          items: [
            {
              label: "type-challenges",
              href: "https://github.com/type-challenges/type-challenges",
            },
            {
              label: "type-challenges-list",
              href: "https://typescript-type-challenges-list.vercel.app/"
            }
          ],
        },
        {
          title: "Thanks",
          items: [
            {
              label: "TS Playground",
              href: "https://www.typescriptlang.org/play",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${title}.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};
