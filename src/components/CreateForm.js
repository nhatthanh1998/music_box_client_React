import React from 'react'
import styled from 'styled-components'
import {history} from '../routes/App'
import axios from 'axios'
const CreateBox = styled.div`
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
class CreateForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            display_name:'',
            username_error:null,
            password_error:null,
            display_name_error:null,
            create_error:''
        }
    }

    render_success(){
        if(this.state.create_error === null){
            return <div className="row" style={{marginLeft:"auto",marginRight:"auto",display:"block",fontSize:"1.5rem"}}><small style={{color:"green"}}>Create successful!</small></div>
        }
    }
    render(){
        return(
        <CreateBox>
            <div className="row">
            <img src="./img/fox.png" style={{width:"10",height:"10rem",marginTop:"3rem"}} className="input" alt=""/>
            </div>
            <div className="row" style={{textAlign:"center"}}>
            <span style={{fontSize:"4rem",fontFamily:"'Simonetta', cursive",color:"#E76541"}} className="input">FOXY MUSIC</span>
            </div>

            <div className="row" style={{marginLeft:"auto",marginRight:"auto",display:"block"}}><small style={{color:"red"}}>{this.state.create_error}</small></div>
            <div className="row" style={{marginLeft:"auto",marginRight:"auto",display:"block"}}><small style={{color:"red"}}>{this.state.username_error}</small></div>
            <div className="row mb-4 p-0" style={{paddingTop:"2rem"}}>
            <div className="col-7 input">
            <input className="form-control input_field" placeholder = "Username" style={{fontSize:"1.5rem"}}
            onChange={event=>{
                this.setState({
                    username:event.target.value
                })
            }}
            />
            </div>
            </div>
            <div className="row" style={{marginLeft:"auto",marginRight:"auto",display:"block"}}><small style={{color:"red"}}>{this.state.password_error}</small></div>
            <div className="row mb-4">
            <div className="col-7 input">
            <input className="form-control input_field" type="password" placeholder = "Password" style={{fontSize:"1.5rem"}}
            onChange={event=>{
                this.setState({
                    password:event.target.value
                })
            }}
            />
            </div>
            </div>

            <div className="row" style={{marginLeft:"auto",marginRight:"auto",display:"block"}}><small style={{color:"red"}}>{this.state.display_name_error}</small></div>
            <div className="row mb-4">
            <div className="col-7 input">
            <input className="form-control input_field" placeholder = "Display name" style={{fontSize:"1.5rem"}}
            onChange={event=>{
                this.setState({
                    display_name:event.target.value
                })
            }}
            />
            </div>
            </div>
            
            <div className="row mb-2" >
            <div className="col-7 input">
            <div className="form-control input_field btn btn-success"style={{fontSize:"1.8rem"}}
            onClick = {async ()=>{
                var username = this.state.username
                var password = this.state.password
                var display_name = this.state.display_name
                if(username.length === 0){
                    this.setState({
                        username_error:"username required"
                    })
                }else{
                        this.setState({
                            username_error:null
                        })
                }
                
                if(password.length === 0){
                    this.setState({
                        password_error:"password required"
                    })
                }else if(password.length < 5){
                    this.setState({
                        password_error:"password must be from 5 characters"
                    })
                }else{
                    this.setState({
                        password_error:null
                    })
                }
                
                if(display_name.length === 0){
                    this.setState({
                        display_name_error:"display_name required"
                    })
                }else{
                    this.setState({
                        display_name_error:null
                    })
                }
                if(this.state.display_name_error === null && this.state.password_error === null && this.state.username_error === null){
                    var create_callback = await axios.post("http://localhost:5000/create",{
                        username:this.state.username,
                        password:this.state.password,
                        display_name:this.state.display_name
                    })
                    if(create_callback.data === ""){
                        this.setState({
                            create_error:null
                        })
                    }else{
                        this.setState({
                            create_error:create_callback.data
                        })
                    }
                }
            }}
            >Register!</div>
            {this.render_success()}
            </div>
            </div>
            <span style={{marginBottom:"2rem"}}>OR</span>
            <div className="row mb-4" >
            <div className="col-7 input" style = {{marginBottom:"7rem"}}>
            
            <div className="form-control input_field btn btn-dark"style={{fontSize:"1.8rem"}} onClick={()=>{
                history.push("/")
            }}>Login</div>
            </div>
            </div>             
        </CreateBox>)
    }
}
export default CreateForm