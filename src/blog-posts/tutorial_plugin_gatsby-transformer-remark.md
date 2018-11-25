---
path: "/blog/gatsby-transformer-remark-plugin"
date: "2018-11-24" 
title: "The gatsby-transformer-remark Plugin"
---

# [`gatsby-transformer-remark`](https://www.gatsbyjs.org/docs/adding-markdown-pages/#transforming-markdown--gatsby-transformer-remark) Plugin
The `gatsby-transformer-remark` plugin tells Gatsby how to recognize files which are markdown and read the contents. _This plugin must be used if you intend to use markdown files as a source of content in your Gatsby site_.

## The Markdown Files
The format you use for the markdown files does not matter _**EXCEPT**_ for the "frontmatter" of the markdown document - _the frontmatter block must be present in all markdown files used by this plugin_. Frontmatter for a markdown document looks like the following:

```text
---
path: "/blog/my-first-post"
date: "2017-11-07" 
title: "My first blog post"
---
```
- You can have different key-value pairs that are relevant to your website
  - **IMPORTANT**: _Any time you add or remove values to the frontmatter, YOU MUST RESTART YOUR GATSBY SITE_
    - Changes like this to the frontmatter block ARE NOT reflected in GraphQL after saving - the site needs to be rebuilt in order for the posts to contain the updated metadata
- The rest of the markdown content is rendered by the plugin as HTML content
  - It's format DOES NOT MATTER - this is just the markdown "content" rendered as HTML

## Adding a Source
With the plugin added, it's time to give your Gatsby site some markdown files to work with.

Technically, all you need to use this plugin is _some_ source where the markdown files are stored. This can be done via any source option supported by Gatsby. For simplicity, this guide will use the source plugin, `gatsby-source-filesystem`, configured to use a local project directory as the source of markdown files. The relevant code in `gatsby-config.js`:

```JavaScript
plugins: [
  // ...
  {
    resolve:  `gatsby-source-filesystem`,
    options: {
      path:  `${__dirname}/src/blog-posts`,
      name:  "markdown-pages",
    },
  },
  // ...
]
```

The code snippet above configures the Gatsby site to look within the local `src/blog-posts` directory for markdown documents.

## How it Works
The `gatsby-transformer-remark` plugin does 2 things when reading markdown files:
1. Converts the metadata from the top of the markdown file to `frontmatter` content
    - `frontmatter` contains all key-value pairs defined for the given document metadata
2. Converts the document content to HTML

## How Do You Know it Works?
Simple: use GraphQL! If you set everything up correctly, _**and you have markdown files located in the source pointed to by `gatsby-source-filesystem`**_ (GraphQL will not provide query auto-completion for `gatsby-transformer-remark` related fields if there are no markdown files in the source location - EVEN IF YOU SET UP THE DEPENDENCIES PROPERLY).

So to recap, the general steps are:
1. Add the `gatsby-transformer-remark` dependency to `gatsby-config.js`
2. Add the source dependency (filesystem or otherwise) to `gatsby-config.js`
3. Add some markdown files _with properly-formatted `frontmatter` metadata_ to the source location
4. Test that the files are detected by your Gatsby site using GraphQL

### The Query
In general, the query to get markdown file data from `gatsby-transformer-remark`, use the following syntax:

```text
query {
  allMarkdownRemark {
    edges {
      node {
        id
        timeToRead
        frontmatter {
          
        }
      }
    }
  }
}
```
- `id` and `timeToRead` are built-in and not user-defined
  - There are other provided attributes here - experiment with graphQL's auto-complete feature to see what data is available to you
- `frontmatter` is built-in, but the values it **CONTAINS** are user-defined
  - This data is extracted from the metadata blocks that Gatsby requires at the top of all Markdown files in use
  - Contains user-defined key-value pairs

Launch your Gatsby site and navigate to `localhost:8000/__graphql` and play around with the query structure to learn more about the kind of information you can get on the Markdown files using this plugin. A few of things to note:
1. _**`allMarkdownRemark` will not be usable in your query if you don't have any markdown files in the target source directory**_
    - If you try to query markdown files before you have any in the source, graphQL will simply tell you that `allMarkdownRemark` doesn't exist
    - An easy way to tell if you set it up correctly is to just type "a" as the first attribute of the `query` object in graphQL and then press the `TAB` key
      - If the plugin is setup correctly and you have markdown files in the source, graphQL will display `allMarkdownRemark` as an auto-complete option
      - If you did something wrong, you won't see `allMarkdownRemark` listed as an option in the auto-complete context menu
2. _**All Markdown files must be prefaced with a properly-formatted metadata block**_
    - See section "The Markdown Files" above
3. _**Changes made to `frontmatter` on Markdown files ARE NOT immediately reflected after saving when using `gatsby develop`**_
    - It seems some changes are reflected, but GraphQL may behave strangely (like create erroneous null entries)
    - To get around this, simply kill and restart the `gatsby develop` service after you make any changes to existing markdown files' metadata blocks
4. 