import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FilterType, getUsersThunkCreator } from '../../redux/users-reducer'
import {
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
  getСurrentPage
} from '../../redux/users-selectors'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import { UserSearchForm } from './UserSearchForm'
import * as queryString from 'querystring'

type PropsType = {}

type QueryParamsType = {
  term?: string
  page?: string
  friend?: string
}

export const Users: React.FC<PropsType> = props => {
  // hook
  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getСurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search.substr(1)
    ) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = +parsed.page

    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string }

    if (!!parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend:
          parsed.friend === 'null'
            ? null
            : parsed.friend === 'true'
            ? true
            : false
      }

    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
      // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  }, [filter, currentPage])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter))
  }
  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>
      <UserSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  )
}
