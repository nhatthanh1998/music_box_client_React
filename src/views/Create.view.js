import React from 'react'
import  CreateForm  from '../components/CreateForm'
import styled from 'styled-components'

const Container = styled.div`
width:"100%";
min-height:100vh;
background:url("http://papers.co/wallpaper/papers.co-aq83-nature-anime-art-sea-art-36-3840x2400-4k-wallpaper.jpg");
background-size:cover;

`
export default class CreateView extends React.Component{
    render(){
        return(
        
        <Container>
        <div className="container" style={{paddingTop:"18rem"}}>
        <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
        <div className="row">
        <CreateForm/>
        </div>
        </div>
        <div className="col-3"></div>
        </div>
        </div>
        </Container>
        
        )
    }
}