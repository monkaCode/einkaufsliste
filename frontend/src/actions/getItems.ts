import { Item } from "../models/Item";

export async function getItems(): Promise<Item[] | undefined> {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items`);
    if (res.ok) {
      const items = await res.json();
      return items.map((i: any) => new Item(i));
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}