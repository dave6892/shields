'use strict'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs')
const yaml = require('js-yaml')

const { categories } = yaml.safeLoad(
  fs.readFileSync('./service-definitions.yml', 'utf8')
)

// Often in Gatsby context gets piped through GraphQL, but GraphQL adds
// unnecessary complexity here, so this uses the programmatic API.
// https://www.gatsbyjs.org/docs/using-gatsby-without-graphql/#the-approach-fetch-data-and-use-gatsbys-createpages-api
async function createPages({ actions: { createPage } }) {
  categories.forEach(category => {
    const { id } = category
    createPage({
      path: `/category/${id}`,
      component: require.resolve('./frontend/components/main'),
      // `context` provided here becomes `props.pageContext` on the page.
      context: { category },
    })
  })
}

module.exports = { createPages }