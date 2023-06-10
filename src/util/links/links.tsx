import { sidebarModal } from 'modal/index'
import {
    AiOutlineForm,
    AiOutlineFilter,
    AiOutlineLayout,
    AiOutlineFolder,
    AiOutlineFilePdf
} from 'react-icons/ai'

export const linkList: Array<sidebarModal> = [
    {
        link: "form",
        name: "form",
        icon: <AiOutlineForm style={{ fontSize: '18' }} />
    },
    {
        link: "filter",
        name: "filter",
        icon: <AiOutlineFilter style={{ fontSize: '18' }} />
    },
    {
        link: "layout",
        name: "layout",
        icon: <AiOutlineLayout style={{ fontSize: '18' }} />
    },
    {
        link: "paginated",
        name: "paginated",
        icon: <AiOutlineFolder style={{ fontSize: '18' }} />
    },
    {
        link: "pdfviewer",
        name: "PDFViewer",
        icon: <AiOutlineFilePdf style={{ fontSize: '18' }} />
    },
]