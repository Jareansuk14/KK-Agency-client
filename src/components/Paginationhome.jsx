import React from 'react'
import "../styles/Pagination.scss";


const Paginationhome = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];
    const top = () => { window.scrollTo(410, 410) }

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => {

                const handleClick = () => {
                    top(); // Scroll to top
                    setCurrentPage(page); // Set current page
                };

                return (
                    <button
                        key={index}
                        onClick={handleClick}
                        className={page == currentPage ? 'active' : ''}
                    >{page}
                    </button>
                )
            })
            }
        </div>
    )
}


export default Paginationhome
