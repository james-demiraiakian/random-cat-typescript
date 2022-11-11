import React from 'react';

export default function CatCard({ url, name }: { url: string; name: string }) {
  return (
    <>
      <img className="cat-img" alt="cat" src={url} />
      <p className="cat-name">{name}</p>
    </>
  );
}
