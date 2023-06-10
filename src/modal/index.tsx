export type sidebarModal = {
    link: string,
    name: string,
    icon: any,
}

interface TabModalProps {
    tabKey: string;
}
export interface TabModal {
    RowList?: React.ComponentType<TabModalProps>,
}
