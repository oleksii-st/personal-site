export const LINK_FIELDS = `{
  label
  type
  newTab
  disableIndex
  url
  reference {
    relationTo
    value {
      ... on Page {
        slug
        id
        breadcrumbs {
          url
        }
      }
    }
  }
}`
