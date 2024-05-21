import { TabsWrapper, TabsComposition } from '../@types/tabComponent'
import TabsProvider, { useTabsContext } from '../context/TabsContext'

const Tabs: TabsWrapper & TabsComposition = ({ children }) => {
  return <TabsProvider>{children}</TabsProvider>
}

Tabs.Titles = ({ items }) => {
  const { currentIndex, setCurrentIndex } = useTabsContext()
  return (
    <div role="tablist">
      {items.map(({ id, title }, index) => (
        <button
          key={id}
          id={`tab-control-${id}`}
          role="tab"
          aria-controls={`tab-content-${id}`}
          aria-selected={currentIndex === index}
          onClick={() => {
            setCurrentIndex(index)
          }}
        >
          {title}
        </button>
      ))}
    </div>
  )
}

Tabs.Contents = ({ items }) => {
  const { currentIndex } = useTabsContext()
  const { id, content } = items[currentIndex]
  return (
    <div
      key={id}
      id={`tab-content-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-control-${id}`}
    >
      {content}
    </div>
  )
}

export default Tabs