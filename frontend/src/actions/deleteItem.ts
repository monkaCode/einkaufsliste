export async function deleteItem(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
