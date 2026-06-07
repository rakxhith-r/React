import { useState } from "react"
import Logo from "./components/Logo"
import { itemProps } from "./interface/types"
import PackingList from "./components/PackingList"
import { Form } from "./components/Form"
import Stats from "./components/Stats"

function App() {
  const [items, setItems] = useState<itemProps[]>([])
  function handleAddItems(item: itemProps) {
    setItems((items) => [...items, item])
  }

  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    )
  }

  function onClear() {
    setItems([])
  }

  function onToggleDelete(id: number) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleToggleItem={handleToggleItem}
        onClear={onClear}
        onToggleDelete={onToggleDelete}
      />
      <Stats items={items} />
    </div>
  )
}

export default App
