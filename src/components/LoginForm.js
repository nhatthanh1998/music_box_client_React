import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {history} from '../routes/App'
const LoginBox = styled.div`
width:100%;
background:white;
text-align:center;
font-size:1.7rem;
-webkit-box-shadow: 7px 1px 16px 4px rgba(0,0,0,0.44);
-moz-box-shadow: 7px 1px 16px 4px rgba(0,0,0,0.44);
box-shadow: 7px 1px 16px 4px rgba(0,0,0,0.44);
background-color: rgba(255, 255, 255, 0.8);

.input{
    margin: 0 auto;
}
.input_field{
    height:4rem
}
`
class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            error:false
        }
    }

    render_error(){
        if(this.state.error === true){
            return<small className="input" style={{fontSize:"1.3rem",color:"red"}}>Username or password is wrong</small>
        }else{
            return null
        }
    }
    render(){
        return(
        <LoginBox>
            <div className="row">
            <img src="./img/fox.png" style={{width:"10",height:"10rem",marginTop:"3rem"}} className="input" alt=""/>
            </div>
            <div className="row" style={{textAlign:"center"}}>
            <span style={{fontSize:"4rem",fontFamily:"'Simonetta', cursive",color:"#E76541"}} className="input">FOXY MUSIC</span>
            </div>
            <div className="row mb-4" style={{paddingTop:"2rem"}}>
            <div className="col-7 input">
            <input className="form-control input_field" placeholder = "Username" style={{fontSize:"1.5rem"}}
            onChange={event=>this.setState({
                username:event.target.value
            })}
            />
            </div>
            </div>
            <div className="row mb-4">
            <div className="col-7 input">
            <input className="form-control input_field" type="password" placeholder = "Password" style={{fontSize:"1.5rem"}}
            onChange = {event=>this.setState({
                password:event.target.value
            })}
            />
            </div>
            </div>
            
            <div className="row mb-4">
            {this.render_error()}
            </div>

            <div className="row mb-4">
            <div className="col-7 input">
            <div className="form-control input_field btn btn-success"style={{fontSize:"1.8rem"}}
            onClick={async ()=>{
                var userData = {
                    username:this.state.username,
                    password:this.state.password
                }
                var token = await axios.post("http://localhost:5000/login",userData)
                if(token.data.message){
                   this.setState({
                       error:true
                   })
                }else{
                    localStorage.setItem("token",token.data)
                    this.setState({
                        error:false
                    })
                    history.push("/playlist")
                }
            }}
            >LOGIN</div>
            </div>
            </div>
            <div style={{paddingBottom:"6rem"}}><span className="text-muted">Not registed?</span><span style={{color:"green",marginLeft:".5rem",cursor:"pointer"}}
            onClick={()=>{history.push("/register")}}
            >Create an account</span></div>
            

        </LoginBox>)
    }
}
export default LoginForm