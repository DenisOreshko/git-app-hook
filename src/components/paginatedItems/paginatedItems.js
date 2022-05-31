import { useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import Right from './right.js';
import Left from './left.js';
import './paginatedItems.css';

const PaginatedItems = ({ itemsPerPage, onClickedPage, public_repos, userLogin}) => {

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [forcePg, setForcePg] = useState(0);

    useEffect(() => {
      setPageCount(Math.ceil(public_repos / itemsPerPage));
    }, [itemOffset, itemsPerPage, public_repos]);

    useEffect(() => {
        setForcePg(0);
    }, [userLogin]);    

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % public_repos;
      onClickedPage(event.selected + 1);
      setItemOffset(newOffset);
      setForcePg(event.selected );
    }
  
    return (    
      <div className="pages">
            <ReactPaginate
                            breakLabel="..."
                            nextLabel={<Right className="right"/>}
                            previousLabel={<Left className="left"/>}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}  
                            forcePage={forcePg}              
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item-prev"
                            previousLinkClassName="page-link"
                            nextClassName="page-item-next"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            activeClassName="active"/>
            <div className="info-pages">          
                {public_repos ? <>{itemOffset + 1}-{itemOffset + itemsPerPage} of {public_repos} items</> : null}
            </div>  
      </div>
    )
}

export default PaginatedItems;