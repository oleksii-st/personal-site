export const REDIRECTS = `
      query {
        Redirects {
            docs {
              id
              from
              to {
                type
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
              }
              updatedAt
              createdAt
          }
      }
  }
`;
