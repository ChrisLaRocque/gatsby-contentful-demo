import * as React from "react";
import {graphql} from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
const SSRPage = (props) => {
  // console.log(props)
  const { serverData, data } = props
  return (
  <main className="page" >
    <h1>SSR Page with {serverData ? 'Dogs':'Pasta'}</h1>
    <h2>&quot;Hey we need an H2 on the page&quot;</h2>
    {/* use static query image if server-side api call fails */}
    {serverData ? <img alt="Happy dog" src={serverData.message} />:<><p>Ahhh crud, I couldn't give you a server-side image! I'll try to sneak this static impasta past ya... 👽</p><GatsbyImage image={data.allContentfulAsset.edges[0].node.gatsbyImageData}/></>}
  </main>
)};

export default SSRPage;

// You can still access + use queried data from build time
export const query = graphql`
  query ssrStaticQuery {
    allContentfulAsset(limit: 1) {
      edges {
        node {
          gatsbyImageData
        }
      }
    }
  }
`
// declaring + exporting an async function named getServerData() tells Gatsby to get data at runtime and pass it to the template above to return as HTML
export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.ok) {
      throw new Error(`Response failed`);
    }

    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 200,
    };
  }
}
