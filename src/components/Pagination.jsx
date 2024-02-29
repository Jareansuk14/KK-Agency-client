import React from 'react'
import "../styles/Pagination.scss";


const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];
    const top = () => {window.scrollTo(0, 0)}

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className='pagination' onClick={top}>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? 'active' : ''}
                    >{page}
                    </button>
                )
            })
            }
        </div>
    )
}


export default Pagination
