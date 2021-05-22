import React, { useEffect, useState } from 'react'
import { Pagination } from '../pagination/Pagination.js'
import { ReactComponent as Arrow } from '../images/arrow_down.svg'
import { ReactComponent as Eye } from '../images/eye.svg'
import './style.css'

export const Table = (props) => {
  const {
    columns,
    data,
    tableName,
    grid,
    pagination,
  } = props

  const [paginationTab, setPaginationTab] = useState({
    total: data.length,
    initPage: pagination.initPage,
    limitPerPage: pagination.limitPerPage,
  })
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [sortToSmall, setSortToSmall] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const filterData = (inputValue) => {
    const newDataArray = data.filter((item) => item.text.includes(inputValue))
    console.log('newDataArray === ', newDataArray);
    return setFilteredData(newDataArray)
  }

  const sortData = (key) => {
    const newDataArray = data.sort(function (a, b) {
      if(sortToSmall) {
        if (a[key] > b[key]) {
          console.log('data === ', data);
          return 1;
        }
        if (a[key] < b[key]) {
          return -1;
        }
        return 0;
      } else {
        if (a[key] < b[key]) {
          console.log('data === ', data);
          return 1;
        }
        if (a[key] > b[key]) {
          return -1;
        }
        return 0;
      }
    });
    setSortToSmall(!sortToSmall);
    return setFilteredData(newDataArray);
  }

  const columnsToRender = () => {
    return (
      <tr className='table__row__top' style={{ gridTemplateColumns: grid ? grid : 'none' }}>
        {columns.map((item) => (
          <td className='table__cell__top' key={item.key} >
            { item.key === 'id' ? (
              <p 
                className='table__cell__top__pointer'
                onClick={() => sortData(item.key)}
              >
                {item.name}
                <Arrow style={{marginLeft: '8px'}}/>
              </p>
            ) : item.key === 'text' ? (
              <> 
              {!isOpenSearch &&  
                <p 
                  className='table__cell__top__pointer'
                  onClick={() => {setIsOpenSearch(true)}}
                >
                  {item.name}
                  <Eye style={{marginLeft: '8px'}}/>
                </p>
              }

              {isOpenSearch && 
                <>
                  <input
                    type='search'
                    className='table__cell__top__input'
                    placeholder='поиск'
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                  />
                  <button 
                    type='submit'
                    className='table__cell__top__btn' 
                    onClick={() => {setIsOpenSearch(false)}}
                  >
                    close
                  </button> 
                </>
              }
              </>
            ) : (
              <p>{item.name}</p>
            ) }
          </td>
        ))}
      </tr>
    )
  }

  const dataToRender = () => {
    const actualPageData = []
    if (filteredData) {
      if (filteredData.length > 50) {
        const since = paginationTab.initPage * 50 - 50
        const upto = paginationTab.initPage * 50
        const page = filteredData.slice(since, upto)
        page.map((elem) => {
          actualPageData.push(elem)
        })
      } else {
        filteredData.map((elem) => {
          actualPageData.push(elem)
        })
      }
    } else if (data.length > 50) {
      const since = paginationTab.initPage * 50 - 50
      const upto = paginationTab.initPage * 50
      const page = data.slice(since, upto)
      page.map((elem) => {
        actualPageData.push(elem)
      })
    } else {
      data.map((elem) => {
        actualPageData.push(elem)
      })
    }

    return actualPageData.map((row, i) => (
        <tr className='table__row' style={{ gridTemplateColumns: grid ? grid : 'none' }} key={i}>
          {columns.map((el) => {
            return (
              <td className='table__cell' key={el.key}>
                {row[el.key]}
              </td>
            )
          })}
        </tr>
      )
    )
  }

  useEffect(() => {
    filterData(inputValue);
    dataToRender()
  }, [inputValue])

  return (
    <div className='table__box'>
      <div className='table__header'>
        <h2>{tableName}</h2>
        <Pagination pagination={paginationTab} setPagination={setPaginationTab} />
      </div>
      <table className='table'>
        <thead>{columnsToRender()}</thead>
        <tbody>{dataToRender()}</tbody>
      </table>
    </div>
  )
}
