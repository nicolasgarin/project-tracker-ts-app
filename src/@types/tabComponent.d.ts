export type TabsContextProps = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};

export type TabsProviderProps = {
  children: ReactNode;
};

export type TabTitlesProps = {
  items: {
    id: string;
    title: string;
  }[];
};

export type TabContentProps = {
  items: {
    id: string;
    content: React.ReactNode;
  }[];
};

export type TabsComposition = {
  Titles: (props: TabTitlesProps) => React.ReactNode;
  Contents: (props: TabContentProps) => React.ReactNode;
};

export type TabsProps = {
  children: React.ReactNode;
};

export type TabsWrapper = (props: TabsProps) => React.ReactNode;
