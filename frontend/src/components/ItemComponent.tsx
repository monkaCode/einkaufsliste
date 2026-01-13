import { useState } from "react";
import { Item } from "../models/Item";
import { Checkbox } from "./ui/checkbox";
import { updateItem } from "../actions/updateItem";
import { TrashIcon } from "lucide-react";
import { relativeTimeFrom } from "../lib/utils";
import { deleteItem } from "../actions/deleteItem";

type ItemComponentProps = {
  item: Item;
  onChange: () => void;
}

export const ItemComponent = (props: ItemComponentProps) => {
  const { item, onChange } = props;
  const [checked, setChecked] = useState<boolean>(item.bought);

  async function handleCheckedChange() {
    const res = await updateItem(item._id, !checked);
    if (res) {
      setChecked(res?.bought)
    }
  }

  async function handleDelete() {
    const res = await deleteItem(item._id);
    if (res) {
      onChange();
    }
  }

  return (
    <div className="flex items-center px-3 py-1 bg-secondary hover:bg-[#2f2f2f] w-full hover:cursor-pointer justify-between rounded-md" onClick={handleCheckedChange}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox className="size-7 border-white/40" checked={checked} />
        <div className="flex flex-col min-w-0">
          <span className="truncate">{item.name}</span>
          <span className="text-white/40 text-sm">Added {relativeTimeFrom(item.createdAt)}</span>
        </div>
      </div>

      <TrashIcon className="text-[#888] hover:text-primary shrink-0" onClick={handleDelete} />
    </div>
  );
}