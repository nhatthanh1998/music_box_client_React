import React, {Component} from 'react';
import {data} from "./data";
import styled from 'styled-components'


const Container = styled.div`
width:100%;
min-height:100vh;
background:linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.3)),url('./img/background.jpg');
.mp3{
  color:white;
}


#song_box::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

#song_box::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

#song_box::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)));
}



.mp3_box{
  background:rgba(127, 35, 219,.5);
  box-shadow: 13px 10px 20px 3px rgba(0,0,0,.6);
  overflow-y:auto;
  max-height:30rem
}
.center_box{
  padding-top:4rem;
}
.music_title{
  padding-top:.7rem;
}
`
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      start:null,
      stop:null,
      play_all:true,
      loop:false
    }
  }


  //render play button
  render_button(mp3_music){
    if(this.state.stop === mp3_music){
        return <span><i class="fas fa-pause"></i></span>
    }else if(this.state.start === mp3_music){
      return <div class="pulse_action" style={{color:"#ef5350",fontSize:"1.5rem"}}><i class="fab fa-soundcloud"></i></div>
    }else{
      return <span><i class="fas fa-play"></i></span>
    }
  }


  //render one audio file
  render_audio(){
    var mp3_src = `docs/${this.state.start}.mp3`
    if(this.state.loop === false){
      return (
        <audio id="audio" controls ref="audio" style={{display:"none"}}>
            <source src={mp3_src} type="audio/mpeg"/>
          </audio>
      )
    }else{
      return (
        <audio id="audio" controls ref="audio" style={{display:"none"}} loop>
            <source src={mp3_src} type="audio/mpeg"/>
          </audio>
      )
    }
  }


  //render song name
  render_mp3() {
    return data.map(mp3 => {
      return <div className="row music_title" style={{fontSize:"1.2rem",color:"white"}}
      
      >
      <div className="col s10">
      {mp3}
       </div>
       <div className="col s2"
       onClick={()=>{
        if(this.state.stop === mp3){
          this.setState({
            stop:null
          })
          document.getElementById("audio").play()
         }
         else if(this.state.start === mp3){
           this.setState({
             stop:mp3
           },function(){
             document.getElementById("audio").pause()
           })
         }
         else{
           this.setState({
             start:mp3,
             stop:null
           },function(){
             var mp3_player = document.getElementById("audio")
             mp3_player.pause()
             mp3_player.load()
             mp3_player.play()
           })
         }
       }}
       >{this.render_button(mp3)}</div>
       </div>
    })
  }


  //play all list function(when song in 3 -> 4, last => 0)
  play_all_list(){
    var audio = document.getElementById("audio")
    var next_audio = null
    for(var i = 0;i<data.length;i++){
      if(this.state.start === data[i]){
        if(i === data.length - 1){
          next_audio = data[0]
        }else{
          next_audio = data[i+1]
        }
      }
    }
    audio.addEventListener('ended',()=>{
      this.setState({
        start:next_audio
      },function(){
        audio.pause()
        audio.load()
        audio.play()
      })
  });
  }

  render_play_all_list_button(){
    if(this.state.play_all === true){
      return <i className="fas fa-retweet" style={{fontSize:"2rem",color:"#e53935",paddingTop:"1rem"}}
      onClick={()=>{
        this.setState({
          play_all:false
        })
      }}
      ></i>
    }else{
    return <i className="fas fa-retweet" style={{fontSize:"2rem",color:"white",paddingTop:"1rem"}}
    onClick={()=>{
      this.setState({
        play_all:true,
        loop:false
      })
    }}
    ></i>
  }
}

render_loop_button(){
  if(this.state.loop === true){
    return <i className="fas fa-infinity" style={{fontSize:"2rem",color:"#e53935",paddingTop:"1rem",marginLeft:"3rem"}}
    onClick={()=>{
      this.setState({
        loop:false
      })
    }}
    ></i>
  }else{
    return <i className="fas fa-infinity" style={{fontSize:"2rem",color:"white",paddingTop:"1rem",marginLeft:"3rem"}}
    onClick={()=>{
      this.setState({
        loop:true,
        play_all:false
      })
    }}
    ></i>
}
}
  render() {
      if(this.state.play_all === true && document.getElementById("audio") !== null){
        this.play_all_list()
      }
       return (
      <Container>
        {this.render_audio()}
        <div className="row" style={{textAlign:"center",fontSize:"7rem",color:"#ef5350"}}>
        <i class="fab fa-soundcloud"></i>
        </div>
        <div className="row" style={{textAlign:"center",color:"white",fontSize:"3rem"}}>
          MUSIC BOX
          </div>
        <div className="container center_box">
          
          <div className="row mp3_box" id="song_box">
          <div className="col-12">
          {this.render_mp3()}
          
          </div>
          
          </div>
          <div className="row mp3_box" style={{height:"4rem"}}>
          <div className="col s12" style={{textAlign:"center"}}>
          {this.render_play_all_list_button()}
          {this.render_loop_button()}
          </div>
          </div>
        </div>
        
        
      </Container>

    );
  }
}

export default App;