export const getPokedexData = async () => {
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
  const res = await fetch(url)
  return res
}
