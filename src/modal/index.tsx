export type sidebarModal = {
    link: string,
    name: string,
    icon: any,
}

interface TabModalProps {
    tabKey: string;
}

interface Tabs {
    id: number;
    title: string;
}
export interface TabModal {
    RowList?: React.ComponentType<TabModalProps>,
    tabList?: Tabs[]
}


export type PaginatedModal = {
    _id: string,
    img: string,
    name: string,
    quantity: number,
    createdDate: any,
}
