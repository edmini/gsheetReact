
import React, { useMemo } from 'react'
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table'
import { COLUMNS } from './columns'
import { Table, Container, Pagination, Icon, Divider } from 'semantic-ui-react'
import GlobalFilter from './GlobalFilter'
// import '../../styles/TableStyle.module.css'

export default function Sheet (props) {

    const columns = useMemo(() => COLUMNS ,[])

    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        page,
        nextPage,
        previousPage,
        pageOptions,
        setGlobalFilter,
        state,
        gotoPage,
        pageCount,
    } = useTable({
        columns,
        data:props.gdata,
        // initialState : {sortBy}
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    )

    const { globalFilter } = state

    return (
        <Container>
            <Divider clearing />
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Table celled singleLine compact='very' {...getTableProps()}>
                <Table.Header>
                    {headerGroups.map((headerGroup) => (
                    <Table.Row {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <Table.HeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            {/* <span>{column.isSorted ? (column.isSortedDesc ? '^' :'v') : ''}</span> */}
                        </Table.HeaderCell>
                        ))}
                    </Table.Row>
                        ))
                    }
                </Table.Header>
                <Table.Body {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                    <Table.Row {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return (<Table.Cell {...cell.getCellProps()}>{cell.render('Cell')}</Table.Cell>)
                        })}
                    </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Pagination
                defaultActivePage={1}
                onPageChange={(event, data) => gotoPage(data.activePage-1)}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                firstItem={{ content: <Icon name='angle double left' onClick={()=>gotoPage(0)}/>, icon: true }}
                lastItem={{ content: <Icon name='angle double right' onClick={()=>gotoPage(pageCount-1)}/>, icon: true }}
                prevItem={{ content: <Icon name='angle left' onClick={()=>previousPage()} />, icon: true }}
                nextItem={{ content: <Icon name='angle right' onClick={()=>nextPage()} />, icon: true }}
                totalPages={pageOptions.length}
                
            />
        </Container>
    )



    // return (
    //     <>
    //         <table {...getTableProps()}>
    //             <thead>
    //                 {headerGroups.map((headerGroup) => (
    //                 <tr {...headerGroup.getHeaderGroupProps()}>
    //                     {headerGroup.headers.map((column) => (
    //                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    //                     ))}
    //                 </tr>
    //                     ))
    //                 }
    //             </thead>
    //             <tbody {...getTableBodyProps()}>
    //                 {rows.map((row) => {
    //                     prepareRow(row)
    //                     return (
    //                 <tr {...row.getRowProps()}>
    //                     {row.cells.map((cell) => {
    //                         return (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
    //                     })}
    //                 </tr>
    //                     )
    //                 })}
    //             </tbody>
    //         </table>
    //     </>
    // )
}
