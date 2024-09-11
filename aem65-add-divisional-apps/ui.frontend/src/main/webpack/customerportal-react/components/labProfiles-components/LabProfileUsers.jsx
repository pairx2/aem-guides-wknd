import React, {useState} from "react";
import {useSharedLabProfiles} from "../shared/LabProfiles";
import {labUserService} from "../services/LabUserService";
import {usePagination, useSortBy, useTable} from "react-table";
import {LoadingIndicator, Modal, XFDisplay} from "@abbott/add-platform";
import {RTPagination} from "../react-table-components/RT-Pagination";
import {useTranslation} from "react-i18next";

export const LabProfileUsers = () => {
  const { t, i18n } = useTranslation();
  const {labProfiles,
    labProfileUsers,
    selectedLabProfile,
    setSharedSelectedLabProfile,
    setSharedLabProfiles,
    userManagementError,
    setUserManagementError,
    userManagementErrorMsg,
    setUserManagementErrorMsg} = useSharedLabProfiles();
  const {getLabProfileUsers, removeLabProfileUsers} = labUserService();
  const [isLoading, setIsLoading] = useState(true);
  
  
  React.useEffect(() => {
    if (labProfiles?.labProfiles?.length > 0 && selectedLabProfile?.labProfileId) {
      // when selectedLabProfile is loaded into shared state object, try to initialize the lab profile users
      getLabProfileUsers(selectedLabProfile.labProfileId);
    }
  }, [selectedLabProfile])
  
  React.useEffect(() => {
    if (userManagementError) {
      showModal(`#failure-user-remove-modal`)
    }
  }, [userManagementError]);
  
  React.useEffect(() => {
    if (labProfileUsers?.length > 0) {
      // when selectedLabProfile is loaded into shared state object, try to initialize the lab profile users
      setIsLoading(false);
    }
  }, [labProfileUsers]);

  const showModal = (id) => {
    document.querySelector(id).classList.add("show-modal")
    document.querySelector('.a-container').style.zIndex="auto";
    document.querySelector("body").style.overflow = "hidden";
  };
  const closeModal = () => {
    document.querySelector('.show-modal').classList.remove("show-modal")
    document.querySelector('.a-container').style.zIndex="0";
    document.querySelector("body").style.overflow = "auto";
    
  }
  const failureCloseModal = () => {
    closeModal();
    setUserManagementError(false);
    setUserManagementErrorMsg(null);
    
  }

  const removeUserModal = (e, aid) => {
    showModal(`#remove-user-modal_${aid}`)
  }
  
  const handleRemove = (e, labId, aid) => {
    e.preventDefault();
    closeModal();
    removeLabProfileUsers(labId, aid);
  }
  
  // Below prepares the headers for the User table. Formatting is per the react-table package
  const renderColumns = React.useMemo(
    () => [
    {
      Header: t('last-name'),
      accessor: 'lastName',
      sortType: 'alphanumeric',
      disableSortBy: false,
    },
    {
      Header: t('first-name'),
      accessor: 'firstName',
      sortType: 'alphanumeric',
      disableSortBy: false
    },
    {
      Header: t('email-address'),
      accessor: 'email',
      sortType: 'alphanumeric',
      disableSortBy: false,
      
    },
    {
      Header: t('user-role'),
      accessor: 'userType',
      sortType: 'alphanumeric',
      disableSortBy: false
    },
    {
      Header: t('remove'),
      accessor: 'aid',
      disableSortBy: true,
      Cell:(props) => {
        const {value} = props.cell;
        return (<>
          <a href="#"
             className={"remove-button"}
             onClick={(e) => removeUserModal(e, value)}>
            <span className={"remove-button-text"}>Remove</span>
          </a>
          <Modal id={`remove-user-modal_${value}`}>
            <h4>
              {t('lab-profile-remove-user-confirm')}
            </h4>
    
            <div className="button profile-button link a-button a-button--primary">
              <a className="btn " target="_blank"
                 onClick={(e) => handleRemove(e, selectedLabProfile.labProfileId, value)}>
                <span>{t('yes-remove-user')}</span>
              </a>
            </div>
            <div className="button profile-button link a-button  a-button--secondary">
              <a  onClick={(e) => closeModal(e)} className="btn " target="_blank">
                <span>{t('cancel')}</span>
              </a>
            </div>
          </Modal>
        </>)
      }
    }
  ], [selectedLabProfile]);

  const showErrorModal= () => {
    document.querySelector('#empty-amount-users-modal')?.classList?.add("show-modal")
    document.querySelector('.a-container').style.zIndex="auto";
    document.querySelector("body").style.overflow = "hidden";
  };

  const renderFailureModal = () => {
    return (<Modal id="failure-user-remove-modal">
      <h4>{t('failed-to-remove-user')}</h4>
      {(userManagementError && !userManagementErrorMsg) &&
        (<XFDisplay
          xfid={'apiError_userManagement_failure'}/>)}
      {(userManagementError && userManagementErrorMsg) &&
        (<>
          <strong>{t('user-management-error-generic')}</strong>
          <p>{userManagementErrorMsg}</p>
        </>)}
  
      <div className="button profile-button link a-button a-button--primary">
        <a onClick={(e) => failureCloseModal(e)} className="btn " target="_blank">
          <span>{t('close')}</span>
        </a>
      </div>
    </Modal>)
  }
  const renderNoResults = () => {
    return (
      <div className={'no-results'}>
        <XFDisplay
          xfid={'apiError_searchNoResult'} />
      </div>
    )
  }
    const columns = renderColumns;
    const data = labProfileUsers;
    
    // Modules to incorporate from react-table. We're using global search, sorting, and pagination
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      state,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      nextPage,
      previousPage
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 }
      },
      useSortBy,
      usePagination)

      const emptyResponseHandler = () =>{
        return labProfileUsers.some(item=>item.emptyResponse ==="0")
      }
  
      const pageStart = state.pageIndex * state.pageSize + 1;
      let pageEnd = (state.pageIndex + 1) * state.pageSize;
      if (pageEnd > labProfileUsers.length) {
        pageEnd = labProfileUsers.length;
      }
      const tokens = [`${pageStart}`, `${pageEnd}`, `${labProfileUsers.length}`]; // convert to strings
      let pageDesc = t('user-management-page-tokens')
      
      // replace tokens
      for (var i = 0; i < tokens.length; i++) {
        pageDesc = pageDesc.replace("{"+i+"}", tokens[i]);
      }
  if (labProfileUsers && labProfileUsers.length > 0 && !emptyResponseHandler()) {
    return (
      <div className={"user-management"}>
        {renderFailureModal()}
        
        <h2>{t('user-management-heading')}: {selectedLabProfile.labName}</h2>
        <p>{t('user-management-paragraph')}</p>
        <table className={`user-management__table${isLoading ? " loading" : ""}`}
               {...getTableProps() }>
          <thead>
          {// Loop over the header rows
            headerGroups.map((headerGroup, indx) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}
              key={`users-header-group-row_${indx}`}>
                {// Loop over the headers in each row
                  headerGroup.headers.map((column, index) => (
                    // Apply the header cell props
                    <th key={`users-header-group-${indx}-row_${index}`}>
                      <a {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {// Render the header
                            column.render('Header')}
                          <span>
                          {column.disableSortBy == false ? (column.isSorted ? (column.isSortedDesc ? '🡻' : '🡹') : '↕') : ''}
                        </span>
                      </a>
                    </th>
                  ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          <tr>
            <td colSpan={5} className={'results-count'}>
              <span className={'results-count-text'}>{pageDesc}</span>
            </td>
          </tr>
          {// Loop over the table rows
            page.map((row, indx) => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps()}
                    key={`users-row_${indx}`}>
                  {// Loop over the rows cells
                    row.cells.map((cell,indx) => {
                      return (
                        <td {...cell.getCellProps()}
                            key={`users-row-cells_${indx}`}>
                          <div>
                            {// Render the cell contents
                              cell.render('Cell')
                            }
                          </div>
                        </td>
                    
                      )
                    })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <RTPagination
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          state={state}
          canNextPage={canNextPage}
          nextPage={nextPage}
          gotoPage={gotoPage}
        />
      </div>
    )
  } else if (labProfileUsers && emptyResponseHandler()){
    return (
      <>
        <Modal id="empty-amount-users-modal">
          <h4>{t("no-users-label")}</h4>
        <div className="button profile-button link a-button a-button--primary">
          <a onClick={(e) => closeModal(e)} className="btn " target="_blank">
            <span>{t('close-modal')}</span>
          </a>
        </div>
      </Modal>
        <button
          className={`d-none js-empty-amount-users-modal`}
          data-toggle="modal"
          data-target={`#empty-amount-users-modal`}
        />
        {showErrorModal()}
      </>)
  } else {
    return (<div className={`custom-search-results ${isLoading ? 'loading' : ''}`} >
      {isLoading && (
        <div className="custom-search-results-instruments__loading-mask">
          <LoadingIndicator />
        </div>
      )}
      {renderNoResults()}
    </div>)
  }
}