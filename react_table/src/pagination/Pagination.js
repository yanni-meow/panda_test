import React, { useState } from 'react'
import './style.css'
import { ReactComponent as Left } from '../images/arrow_left.svg'
import { ReactComponent as Right } from '../images/arrow_right.svg'

export const Pagination = (props) => {
  const { pagination, setPagination, handleOnChange } = props

  const fullItemsList = pagination.total
  const totalPages = Math.ceil(fullItemsList / pagination.limitPerPage)

  const pagesBtn = () => {
    const content = []
    for (let i = 1; i <= totalPages; i++) {
      content.push(
        <li key={i} className='pagination__item' title={`${i}`}>
          <button
            className='pagination__item__btn'
            style={{
              background: pagination.initPage === i ? 'rgb(255, 204, 250)' : '#afafaf',
            }}
            onClick={() => {
              setPagination({ ...pagination, initPage: i })
              handleOnChange && handleOnChange()
            }}
          >
            {i}
          </button>
        </li>
      )
    }
    return content
  }

  return (
    <ul className='pagination'>
      <li className='pagination__item' title='preview'>
        <button
          className='pagination__item__btn'
          onClick={() => {
            setPagination({ ...pagination, initPage: pagination.initPage - 1 })
            handleOnChange && handleOnChange()
          }}
          disabled={pagination.initPage === 1}
        >
          <Left />
        </button>
      </li>{' '}
      {pagesBtn()}
      <li className='pagination__item' title='next'>
        <button
          className='pagination__item__btn'
          onClick={() => {
            setPagination({ ...pagination, initPage: pagination.initPage + 1 })
            handleOnChange && handleOnChange()
          }}
          disabled={pagination.initPage === totalPages}
        >
          <Right />
        </button>
      </li>
    </ul>
  )
}
