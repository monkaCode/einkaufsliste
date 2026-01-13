import { Item } from "../models/Item";

export async function updateItem(id: string, bought: boolean): Promise<Item | undefined> {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bought }),
    });

    if (res.ok) return res.json();
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
