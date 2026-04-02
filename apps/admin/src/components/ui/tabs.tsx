interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex border-b border-border gap-0">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={[
              "px-4 py-2.5 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px",
              isActive
                ? "border-accent text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary hover:border-border",
            ].join(" ")}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export { Tabs }
export type { TabsProps, Tab }
