import { useContext } from 'react';
import { ItemComponent } from './components/ItemComponent';
import { DataContext } from './providers/DataProvider';
import { InsertItemComponent } from './components/InsertItemComponent';

function App() {
  const data = useContext(DataContext);

  if (!data) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-2 items-center w-[90%] md:w-[40%] m-auto py-10 text-xl">
      <span className="text-[40px] mb-5">Einkaufsliste</span>
      {data.items?.map(item => {
        return <ItemComponent key={item._id} item={item} onChange={data.reload}/>
      })}
      <InsertItemComponent onChange={data.reload} />
    </div>
  );
}

export default App;
