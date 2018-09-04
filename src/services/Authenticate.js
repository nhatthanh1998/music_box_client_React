import React from 'react'
import axios from 'axios'
import {history} from '../routes/App'
export const withAuthenticate = WrappedComponent => {
  return class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            current_user:null
        }
    }
    async componentDidMount(){
        const user = await axios.get("http://localhost:5000/current_user",{
            headers:{
                "x-auth":localStorage.getItem("token")
            }
        })
            if(!user.data.user){
            history.push("/")
        }else{
            this.setState({
                current_user:user.data.user
            })
        }
        
    }
    render() {
        return (
            <div>
              <WrappedComponent {...this.props}/>
            </div>
          )
  }
}
}