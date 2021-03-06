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
                <Label as='a' color='red' ribbon='right'><Icon name='user outline' />????????????</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='??????..' name='name'>
                                <input />
                                <Label>??????</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={cellPhoneValue} fluid labelPosition='right' placeholder='?????????..' name='cellPhone'>
                                <input />
                                <Label>?????????</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='??????..' name='position'>
                                <input />
                                <Label>??????</Label>
                            </Input>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={accountIDValue} fluid labelPosition='right' placeholder='??????????????????..' name='accountID'>
                                <input />
                                <Label>??????????????????</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='?????????..' name='email'>
                                <input />
                                <Label>?????????</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='?????????..' name='manager'>
                                <input />
                                <Label>?????????</Label>
                            </Input>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment>
                <Label as='a' color='orange' ribbon='right'><Icon name='building outline' />????????????</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input fluid labelPosition='right' placeholder='?????????..' name='company'>
                                <input />
                                <Label>?????????</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={phoneValue} fluid labelPosition='right' placeholder='????????????..' name='phone'>
                                <input />
                                <Label>????????????</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input type='text' onChange={handleChange} value={faxValue} fluid labelPosition='right' placeholder='??????..' name='fax'>
                                <input />
                                <Label>??????</Label>
                            </Input>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment>
                <Label as='a' color='teal' ribbon='right'><Icon name='file alternate outline' />????????????</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input fluid list='kind' labelPosition='right' placeholder='??????..' name='kind'>
                                <input />
                                <Label>??????</Label>
                            </Input>
                            <datalist id='kind'>
                                <option value='??????'>??????</option>
                                <option value='??????'>??????</option>
                                <option value='??????'>??????</option>
                                <option value='??????'>??????</option>
                            </datalist>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid list='grade' labelPosition='right' placeholder='??????..' name='grade'>
                                <input />
                                <Label>??????</Label>
                            </Input>
                            <datalist id='grade'>
                                <option value='??????'>??????</option>
                                <option value='??????'>??????</option>
                                <option value='??????'>??????</option>
                                <option value='??????'>??????</option>
                            </datalist>
                        </Grid.Column>
                        <Grid.Column>
                            <Input list='course' fluid labelPosition='right' placeholder='??????..' name='course'>
                                <input />
                                <Label>??????</Label>
                            </Input>
                            <datalist id='course'>
                                <option value='A'>??????/?????? ??????</option>
                                <option value='B'>????????? ????????????</option>
                                <option value='C'>??????</option>
                            </datalist>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment>
                <Label as='a' color='blue' ribbon='right'><Icon name='user outline' />????????????</Label>
                <Divider hidden/>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Input type='text' fluid labelPosition='right' placeholder='?????????..' name='incomeDate'>
                                <input />
                                <Label>?????????</Label>
                            </Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Input fluid value={incomeValue} onChange={handleChange} labelPosition='right' placeholder='?????????..' name='income'>
                                <input />
                                <Label>?????????</Label>
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
                            <Input fluid labelPosition='right' placeholder='??????????????????..' name='taxDate'>
                                <input />
                                <Label>???????????????</Label>
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