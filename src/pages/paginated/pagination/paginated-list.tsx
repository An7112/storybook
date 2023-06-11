import React, { useState, useMemo } from 'react';
import Pagination from './pagination';
import { PaginatedModal } from 'modal/index';
import './pagination.css'

interface Props {
  paginatedData: PaginatedModal[];
  isloading: boolean,
  column?: number,
  url?: string,
  count?: number,
  objectKeys?: Record<string, any>,
  schema?: {
    header: string,
    gridSpan: string,
  }[],
  RowList?: React.ComponentType<PaginatedRowListProps>
}
interface PaginatedRowListProps {
  currentPage: number;
}

const PaginatedList = (props: Props) => {

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
  
  return (
    <>
      <div className='paginated-main'>
        <div className='paginated-row paginated-header' style={{ gridTemplateColumns: paginatedColumn.length > 1 ? '' : '1fr' }}>
          <div className='paginated-item'>
            <span className='item-name'>
              Name
            </span>
            <span className='item-3'>
              Quantity
            </span>
            <span className='item-3'>
              Date created
            </span>
          </div>
        </div>
        {
          RowListComponent
            ? <RowListComponent currentPage={currentPage} />
            : <div className='paginated-row grid-container'>
              {
                pagedItems
                  .map((element: PaginatedModal, index: number) => (
                    <>
                      <div className='paginated-item items'>
                        <div className='item-name'>
                          <div className='class-img'>
                            <span className='span-frame'>
                              <img className='img-avatar' alt='' src={element.img} />
                            </span>
                          </div>
                          <span className='item-name-store'>{element.name}</span>
                        </div>
                        <span className='item-3'>
                          {element.quantity}
                        </span>
                        <span className='item-3'>
                          {element.createdDate}
                        </span>
                      </div>
                    </>
                  ))
              }
            </div>
        }
      </div>
      <Pagination
        pageCount={Math.ceil(paginatedData.length / itemsPerPage)}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </>
  );
};
export default PaginatedList;
