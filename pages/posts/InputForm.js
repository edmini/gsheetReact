import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container, Button, Form, Segment, Divider, Input, Checkbox, Grid, Label, Icon, Dimmer, Loader, Popup } from 'semantic-ui-react'

const InputForm = () => {
    const [res, setRes] = useState('click me')
    const [loading, setLoading] = useState(false)
    const [cellPhoneValue, setCellPhoneValue] = useState('')
    const [accountIDValue, setAccountIDValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')
    const [faxValue, setFaxValue] = useState('')
    const [incomeValue, setIncomeValue] = useState()
    const [taxValue, setTaxValue] = useState()
    const [tax, setTax] = useState(false)

    //input data send post method -- const url = "http://3.35.21.138:5000/";
    const url = 'http://localhost:3030/googlesheets'
    function handleClick(e){
        e.preventDefault()
        setLoading(true)
        const gdata = []
        for(var i = 0 ; i < 17 ; i++){
            gdata.push(e.target[i].value)
        }
        const now = new Date()
        gdata.unshift(now)
        gdata.unshift('=row()')
        console.log(gdata)
        axios.post(url, gdata).then((response)=>{
            setRes(response.data.status)
            setLoading(false)
        })
    }

    const handleChange = (e) => {
        const regex = /^[0-9\b -]{0,13}$/
        if(e.target.name === 'cellPhone'){
            if(regex.test(e.target.value)){
                setCellPhoneValue(e.target.value)
            }
        }
        if(e.target.name === 'phone'){
            if(regex.test(e.target.value)){
                setPhoneValue(e.target.value)
            }
        }
        if(e.target.name === 'accountID'){
            if(regex.test(e.target.value)){
                setAccountIDValue(e.target.value)
            }
        }
        if(e.target.name === 'fax'){
            if(regex.test(e.target.value)){
                setFaxValue(e.target.value)
            }
        }
        if(e.target.name === 'income'){
            setIncomeValue(e.target.value)
        }
    }

    //tax Check Toggle
    const taxCheck = (e) => {
        e.preventDefault()
        if(tax === false){
            setTax(true)
            if(incomeValue != undefined){
                setTaxValue(Math.round(incomeValue * 10/110))
                setIncomeValue(Math.round(incomeValue - incomeValue * 10/110))
            }
        }
        if(tax === true){
            setTax(false)
            if(incomeValue != undefined){
                setIncomeValue(Math.round(incomeValue + taxValue))
                setTaxValue('')
            }
        }
    }

    //cellphone useEffect
    useEffect(() => {
        if(cellPhoneValue.length === 10){
            setCellPhoneValue(cellPhoneValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))
        }
        if(cellPhoneValue.length === 13){
            setCellPhoneValue(cellPhoneValue.replace(/-/g,'').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
        }
    }, [cellPhoneValue])

    //phone useEffect
    useEffect(() => {
        if(phoneValue.length === 9){
            setPhoneValue(phoneValue.replace(/(^\d{2})(\d{3})(\d{4}$)/, '$1-$2-$3'))
        }
        if(phoneValue.length > 10 && phoneValue.length < 13){
            setPhoneValue(phoneValue.replace(/-/g,'').replace(/(^\d{2,3})(\d{3,4})(\d{4}$)/, '$1-$2-$3'))
        }
        if(phoneValue.length === 13){
            setPhoneValue(phoneValue.replace(/-/g,'').replace(/(^\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
        }
    }, [phoneValue])

    //fax useEffect
    useEffect(() => {
        if(faxValue.length === 9){
            setFaxValue(faxValue.replace(/(^\d{2})(\d{3})(\d{4}$)/, '$1-$2-$3'))
        }
        if(faxValue.length > 10 && faxValue.length < 13){
            setFaxValue(faxValue.replace(/-/g,'').replace(/(^\d{2,3})(\d{3,4})(\d{4}$)/, '$1-$2-$3'))
        }
        if(faxValue.length === 13){
            setFaxValue(faxValue.replace(/-/g,'').replace(/(^\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
        }
    }, [faxValue])

    //account ID useEffect
    useEffect(() => {
        if(accountIDValue.length > 8){
            setAccountIDValue(accountIDValue.replace(/-/g,'').replace(/(\d{6})(\d{7})/, '$1-$2'))
        }
    }, [accountIDValue])


        return (
        <Container>
            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            <Form onSubmit={handleClick}>
            <Segment>
                <Label as='a' color='red' ribbon='right'><Icon name='user outline' />개인정보</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='이름..' name='name'>
                                <input />
                                <Label>이름</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={cellPhoneValue} fluid labelPosition='right' placeholder='휴대폰..' name='cellPhone'>
                                <input />
                                <Label>휴대폰</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='직위..' name='position'>
                                <input />
                                <Label>직위</Label>
                            </Input>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={accountIDValue} fluid labelPosition='right' placeholder='주민등록번호..' name='accountID'>
                                <input />
                                <Label>주민등록번호</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='이메일..' name='email'>
                                <input />
                                <Label>이메일</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='담당자..' name='manager'>
                                <input />
                                <Label>담당자</Label>
                            </Input>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment>
                <Label as='a' color='orange' ribbon='right'><Icon name='building outline' />회사정보</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='회사명..' name='company'>
                                <input />
                                <Label>회사명</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={phoneValue} fluid labelPosition='right' placeholder='전화번호..' name='phone'>
                                <input />
                                <Label>전화번호</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={faxValue} fluid labelPosition='right' placeholder='팩스..' name='fax'>
                                <input />
                                <Label>팩스</Label>
                            </Input>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment>
                <Label as='a' color='teal' ribbon='right'><Icon name='file alternate outline' />접수정보</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input fluid list='kind' labelPosition='right' placeholder='분야..' name='kind'>
                                <input />
                                <Label>분야</Label>
                            </Input>
                            <datalist id='kind'>
                                <option value='건축'>건축</option>
                                <option value='토목'>토목</option>
                                <option value='기계'>기계</option>
                                <option value='조경'>조경</option>
                            </datalist>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid list='grade' labelPosition='right' placeholder='등급..' name='grade'>
                                <input />
                                <Label>등급</Label>
                            </Input>
                            <datalist id='grade'>
                                <option value='초급'>초급</option>
                                <option value='중급'>중급</option>
                                <option value='고급'>고급</option>
                                <option value='특급'>특급</option>
                            </datalist>
                        </Grid.Column>
                        <Grid.Column>
                            <Input list='course' fluid labelPosition='right' placeholder='코스..' name='course'>
                                <input />
                                <Label>등급</Label>
                            </Input>
                            <datalist id='course'>
                                <option value='A'>자격/학력 있음</option>
                                <option value='B'>자격증 취득필요</option>
                                <option value='C'>기타</option>
                            </datalist>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment>
                <Label as='a' color='blue' ribbon='right'><Icon name='user outline' />결제정보</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input type='text' fluid labelPosition='right' placeholder='입금일..' name='incomeDate'>
                                <input />
                                <Label>입금일</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid value={incomeValue} onChange={handleChange} labelPosition='right' placeholder='입금액..' name='income'>
                                <input />
                                <Label>입금액</Label>
                            </Input>
                        </Grid.Column>

                        <Grid.Column>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                            <Checkbox toggle checked={tax} onChange={taxCheck} />
                            <Input type='text' name='tax' value={taxValue} />
                                    </td>
                                    <td width='100%'>
                            <Input fluid labelPosition='right' placeholder='계산서발급일..' name='taxDate'>
                                <input />
                                <Label>계산서발급</Label>
                            </Input>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>
                </Segment>
                <Button fluid color='blue'>{res}</Button>
            </Form>
        </Container>
    );
    
};

export default InputForm;