import { API } from "./constants";

export async function fetchPoke(id: number) {
  const result = await fetch(API + id);
  return (await result.json()) as { sprites: { front_default: string } };
}
