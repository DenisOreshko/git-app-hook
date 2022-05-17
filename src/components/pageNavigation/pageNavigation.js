import { Component } from 'react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Right from './right.js';
import Left from './left.js';
import './pageNavigation.css';
class PageNavigation extends Component{

    state = {
        public_repos:null
    }

    componentDidMount(){
        this.setState({
            public_repos: this.props.public_repos
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.public_repos !== this.props.public_repos) {
            this.setState({
                public_repos: this.props.public_repos
            })
        }
    }

    onPage = (numberPage) => {
        this.props.onPage(numberPage);         
    }

    render(){    
        return (
            <>
                <PaginatedItems itemsPerPage={4} onClickedPage={this.onPage} public_repos={this.state.public_repos}/>
            </>
        )
    }    
}

const PaginatedItems = ({ itemsPerPage, onClickedPage,  public_repos }) => {

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {

      setPageCount(Math.ceil(public_repos / itemsPerPage));

    }, [itemOffset, itemsPerPage, public_repos]);
    

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % public_repos;    
      onClickedPage(event.selected + 1);
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

                {public_repos ? <InfoView itemOffset={itemOffset} itemsPerPage={itemsPerPage} public_repos={public_repos}/> : null}

            </div>  
      </div>
    )
}

const InfoView = ({itemOffset, itemsPerPage, public_repos}) =>{

    return(
        <>{itemOffset + 1}-{itemOffset + itemsPerPage} of {public_repos} items</>
    )

}

export default PageNavigation;