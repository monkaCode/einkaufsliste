import { Item } from "../models/Item";

export async function addItem(name: string): Promise<Item | undefined> {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) return res.json();
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
