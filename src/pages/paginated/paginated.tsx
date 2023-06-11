import Tabs from 'component/tabs/tabs'
import React, { useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './paginated.css'
import PaginatedList from './pagination/paginated-list';

interface TabProps {
  tabKey: string;
}
const CustomListView: React.FC<TabProps> = (props) => {

  const paginationAction = `
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [inputPage, setInputPage] = useState(initialPage + 1);
    const [endPage, setEndPage] = useState(5);
    const [startPage, setStartPage] = useState(0)

    useEffect(() => {
      setCurrentPage(initialPage);
      setInputPage(initialPage + 1);
    
      let newStartPage = 0;
      let newEndPage = 5;
    
      if (currentPage >= 3 && currentPage + 2 < pageCount) {
        newStartPage = currentPage - 2;
        newEndPage = currentPage + 3;
      } else if (currentPage >= 3 && currentPage + 2 >= pageCount) {
        newStartPage = pageCount - 5;
        newEndPage = pageCount;
      }
    
      setStartPage(newStartPage);
      setEndPage(newEndPage);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, initialPage]);

    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputPage(Number(event.target.value));
    };

    const handleInputBlur = () => {
      if (inputPage < 1) {
        setInputPage(1);
      } else if (inputPage > pageCount) {
        setInputPage(pageCount);
      }
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const pageNumber = inputPage - 1;
        if (pageNumber < 0) {
          handlePageChange(inputPage)
        } else {
          handlePageChange(pageNumber);
        }
      }
    };

    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers.slice(startPage, endPage).map((pageNumber) => (
        <div
          key={pageNumber}
          // page-item pageNumber === currentPage ? 'active' : ''}
          className={}
          onClick={() => handlePageChange(pageNumber)}
        >
          <button className="page-link">{pageNumber + 1}</button>
        </div>
      ));
    };
  `;

  const paginationList = `
    const { paginatedData, column } = props;
    const RowListComponent = props.RowList;

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, _] = useState(5);

    const existingColumn = column ?? 1;
    const paginatedColumn = [];
    for (let i = 0; i < existingColumn; i++) {
      paginatedColumn.push(i);
    }

    const handlePageChange = (selectedPage: number) => {
      setCurrentPage(selectedPage);
    };

    const offset = currentPage * itemsPerPage;
    const pagedItems = useMemo(() => {
      const startIndex = offset;
      const endIndex = offset + itemsPerPage;
      return paginatedData.slice(startIndex, endIndex);
    }, [offset, itemsPerPage, paginatedData]);
  
  `;

  const exampleData = [
    {
      _id: '1',
      img: 'https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3',
      name: 'item 1',
      quantity: 1,
      createdDate: '12/12/2012'
    },
    {
      _id: '2',
      img: 'https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3',
      name: 'item 1',
      quantity: 1,
      createdDate: '12/12/2012'
    },
    {
      _id: '3',
      img: 'https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3',
      name: 'item 1',
      quantity: 1,
      createdDate: '12/12/2012'
    },
    {
      _id: '4',
      img: 'https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3',
      name: 'item 1',
      quantity: 1,
      createdDate: '12/12/2012'
    },
    {
      _id: '5',
      img: 'https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3',
      name: 'item 1',
      quantity: 1,
      createdDate: '12/12/2012'
    },
    {
      _id: '6',
      img: 'https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3',
      name: 'item 1',
      quantity: 1,
      createdDate: '12/12/2012'
    }
  ]

  return (
    <div className='container-custom paginated'>
      <div className='paginated-frame-ui'>
        <PaginatedList
          isloading={false}
          paginatedData={exampleData}
          column={1}
        />
      </div>

      <div className='source-code'>
        <h3>Component (Pagination-list)</h3>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {paginationList}
        </SyntaxHighlighter>
      </div>
      <div className='source-code'>
        <h3>Pagination (action)</h3>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {paginationAction}
        </SyntaxHighlighter>

      </div>
    </div>
  );
}

function Paginated() {

  const Item = useCallback((props: TabProps) => {
    return <CustomListView {...props} />;
  }, []);

  return (
    <Tabs tabList={[{ id: 1, title: 'ReactJS' }]} RowList={Item} />
  )
}

export default Paginated