import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { Item } from "../models/Item";
import { getItems } from "../actions/getItems";

type DataContextValue = {
  items: Item[] | undefined;
  reload: () => Promise<void>;
};

export const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setData] = useState<Item[] | undefined>(undefined);

  const reload = useCallback(async () => {
    const res = await getItems();
    setData(res);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return <DataContext.Provider value={{ items, reload }}>{children}</DataContext.Provider>;
};
