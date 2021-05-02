import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import stinson from "../Stinson.jpg";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function About() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
          name,
          "bio": bio[0].children[0].text,
          "authorImage": image.asset->url
      }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <div>Loading...</div>;

  return (
    <main className="relative">
      <img src={stinson} alt="Stinson Beach" className="absolute w-full" />
      <div className="p-10 lg:pt-32 container mx-auto relative">
        <section className="bg-green-500 rounded-lg shadow-2xl lg:flex p-10">
          <img
            src={urlFor(author.authorImage).url()}
            className="rounded w-30 h-40 lg:w-64 lg:h-64 mr-8"
            alt="Denzel"
          />
          <div className="text-lg flex flex-col justify-center">
            <h1 className="cursive text-6xl text-green-300 mb-4">
              Hey there. I'm{" "}
              <span className="text-green-100">{author.name}</span>
            </h1>
            <p className="text-green-200 text-lg">{author.bio}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
