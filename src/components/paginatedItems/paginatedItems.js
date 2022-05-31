import { useEffect, useState, useReducer } from 'react';
import ReactPaginate from 'react-paginate';
import Right from './right.js';
import Left from './left.js';
import './paginatedItems.css';

const PaginatedItems = ({ itemsPerPage, onClickedPage,  public_repos, userLogin }) => {

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);   //const [currentPage, dispatch] = useReducer();


    useEffect(() => {
      setPageCount(Math.ceil(public_repos / itemsPerPage)); 
    }, [itemOffset, itemsPerPage, public_repos]);

    useEffect(() => {
      console.log('PaginatedItems useEffect  userLogin: ' + userLogin);
      setItemOffset(0);
      setPageCount(Math.ceil(public_repos / itemsPerPage)); 
      setCurrentPage(0);
      //onClickedPage(1);
    }, [userLogin]);
    

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % public_repos;
      onClickedPage(event.selected + 1);
      setCurrentPage(event.selected); 
      setItemOffset(newOffset);
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
                            forcePage={currentPage}          
                            // renderOnZeroPageCount={null}
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