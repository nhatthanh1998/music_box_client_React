import React from 'react'
import  LoginForm  from '../components/LoginForm'
import styled from 'styled-components'

const Container = styled.div`
width:"100%";
min-height:100vh;
background:url("./img/login.jpg");
background-size:cover;

`
export default class LoginView extends React.Component{
    render(){
        return(
        
        <Container>
        <div className="container" style={{paddingTop:"18rem"}}>
        <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
        <div className="row">
        <LoginForm/>
        </div>
        </div>
        <div className="col-3"></div>
        </div>
        </div>
        </Container>
        
        )
    }
}