import { useState } from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')));

  const [newItem, setNewItem] = useState('');

  const [search, setSearch] = useState('');

  const handleCheck = (id) => {
    const listItem = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }

      return item;
    });

    setAndSaveItemsOnStorage(listItem);
  };

  const handleDelete = (id) => {
    const listItem = items.filter((item) => {
      return item.id !== id;
    });

    setAndSaveItemsOnStorage(listItem);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newItem === null || newItem === false || newItem === '') {
      return;
    }
   
    addItem(newItem);

    setNewItem('');
  }

  const addItem = () => {
    let itemId  =  items.length ? items[items.length - 1].id + 1 : 1;

    let newObjItem = {
      id: itemId,
      checked: false,
      item: newItem,
    };

    let mergedItems = [...items, newObjItem];

    setAndSaveItemsOnStorage(mergedItems);
  }

  const setAndSaveItemsOnStorage = (items) => {
    setItems(items);
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }

  return (
    <div className="App">
      <Header title="Grocery list" />

      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem} 
        handleSubmit={handleSubmit}
      />

      <SearchItem
        search={search} 
        setSearch={setSearch}
      />

      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
