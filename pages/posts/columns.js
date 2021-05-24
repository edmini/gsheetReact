import { format } from 'date-fns'
import { Button, Icon } from 'semantic-ui-react'
// import ReactTable from 'react-table'
// import { Router, Link } from 'react-router-dom'
// import styles from '../../styles/TableStyle.module.css'
// import '../../styles/TableStyle.module.css'

function handleDelete(val){
    alert(val.row.values.id)
    console.log(typeof(val.row.values.id))
}
function handleEdit(val){
    console.log(val)
}


export const COLUMNS = [
    {
        Header : '순번',
        accessor : 'id',
    },
    {
        Header : '날짜',
        accessor : 'date',
        Cell : ({ value }) => {
            if(value === null || value === undefined || value === ''){
                return null
            }else{
                return format(new Date(value), 'yyyy-MM-dd')
            }
            
        },
    },
    {
        Header : '회사명',
        accessor : 'company',
    },
    {
        Header : '이름',
        accessor : 'name',
    },
    {
        Header : '휴대폰',
        accessor : 'cellPhone',
    },
    {
        Header : '계산서발급일',
        accessor : 'taxDate',
        Cell : ({ value }) => {
            if(value === null || value === undefined || value === ''){
                return null
            }else{
                return format(new Date(value), 'yyyy-MM-dd')
            }
            
        },
    },
    {
        Header : '입금액',
        accessor : 'income',
        Cell : ({value}) => {
            if(value === null || value === undefined || value === '' || isNaN(value)){
                return null
            }else{
                return (<div className='amountAlign'>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>)
            }
        },
    },
    {
        Header : '부가세',
        accessor : 'tax',
        Cell : ({value}) => {
            if(value === null || value === undefined || value === '' || isNaN(value)){
                return null
            }else{
                return (<div className='amountAlign'>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>)
            }
        },
    },
    {
        Header: 'EDIT',
        Cell: row => (
            <div>
                {/* <Button primary onClick={() => handleEdit(row)}>Edit</Button> */}
                <Button size='mini' color='red' onClick={() => handleDelete(row)}><Icon name='delete'/>DEL</Button>
            </div>
        )
    }
]