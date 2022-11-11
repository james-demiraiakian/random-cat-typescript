export async function fetchCat(): Promise<any> {
  const resp: Response = await fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${process.env.CAT_API_KEY}`
  );
  const [respJson] = await resp.json();

  return respJson;
}

export async function fetchCatDetails(id: string): Promise<any> {
  const resp: Response = await fetch(
    `https://api.thecatapi.com/v1/images/${id}`
  );
  const [respJson] = await resp.json();
  console.log(respJson);

  return respJson;
}
