import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import { addItem } from "../actions/addItem"

type InsertItemComponentProps = {
  onChange: () => void;
}

export const InsertItemComponent = (props: InsertItemComponentProps) => {
  const { onChange } = props;
  const [inputText, setInputText] = useState<string>('')

  async function handleAddItem() {
    const res = await addItem(inputText);
    if (res) {
      setInputText('');
      onChange();
    }
  }

  return (
    <form className="flex w-full gap-2" onSubmit={handleAddItem}>
      <Input type="text" placeholder="Add new item" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <Button type="submit" disabled={!inputText}>
        <PlusIcon />
      </Button>
    </form>
  )
}