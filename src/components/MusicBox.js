import React, {Component} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {history} from '../routes/App'
const Container = styled.div`
width:100%;
min-height:100vh;
background:url('https://images.alphacoders.com/555/thumb-1920-555565.jpg');
.mp3{
  color:white;
}


#song_box::-webkit-scrollbar-track
{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
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
  background-color: rgba(76, 65, 119,.8);
  box-shadow: 13px 10px 20px 3px rgba(0,0,0,.6);
  overflow-y:auto;
  max-height:50rem;
  opacity:.8;
}
.center_box{
  padding-top:4rem;
}
.music_title{
  padding-top:.7rem;
}
`
class MusicBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      start:null,
      song_played:null,
      stop:null,
      play_all:true,
      loop:false,
      music_file:null,
      music_list:[],
      music_file_error:null
    }
  }

  //fetch the music list of user
  async componentDidMount(){
    var music_list = await axios.get("http://localhost:5000/music",{
      headers:{
        "x-auth":localStorage.getItem("token")
      }
    })
    this.setState({
      music_list:music_list.data
    })
  }


  //render play button
  render_button(mp3_music){
    if(this.state.stop === mp3_music){
        return <span><i class="fas fa-pause"></i></span>
    }else if(this.state.start === mp3_music){
      return <div class="pulse_action" style={{color:"#ef5350",fontSize:"2.5rem"}}><i class="fab fa-soundcloud"></i></div>
    }else{
      return <span><i class="fas fa-play"></i></span>
    }
  }


  //render one audio file
  render_audio(){
    var mp3_src = `http://localhost:5000/music/${this.state.start}`
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


  render_played_song(song){
    if(this.state.song_played === song){
      return <span style={{color:"rgb(229, 57, 53)"}}>{song}</span>
    }else{
      return <span style={{color:"White"}}>{song}</span>
    }
  }
  //render song name
  render_mp3() {
    return this.state.music_list.map(song => {
      return <div className="row music_title" style={{fontSize:"1.8rem",color:"white"}}
      >
      <div className="col-10">
      {this.render_played_song(song.name)}
       </div>
       <div className="col-2"
       onClick={()=>{
        if(this.state.stop === song.path){
          this.setState({
            stop:null
          })
          document.getElementById("audio").play()
         }
         else if(this.state.start === song.path){
           this.setState({
             stop:song.path
           },function(){
             document.getElementById("audio").pause()
           })
         }
         else{
           this.setState({
             start:song.path,
             stop:null,
             song_played:song.name
           },function(){
             var mp3_player = document.getElementById("audio")
             mp3_player.pause()
             mp3_player.load()
             mp3_player.play()
           })
         }
       }}
       >{this.render_button(song.path)}</div>
       </div>
    })
  }


  //play all list function(when song in 3 -> 4,4 -> 5, last => 0)
  play_all_list(){
    var audio = document.getElementById("audio")
    var next_audio = null
    for(var i = 0;i<this.state.music_list.length;i++){
      if(this.state.start === this.state.music_list[i].path){
        if(i === this.state.music_list.length - 1){
          next_audio = this.state.music_list[0].path
        }else{
          next_audio = this.state.music_list[i+1].path
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
      return <i className="fas fa-retweet" style={{fontSize:"2rem",color:"#e53935",paddingTop:"1rem",cursor:"pointer"}}
      onClick={()=>{
        this.setState({
          play_all:false
        })
      }}
      ></i>
    }else{
    return <i className="fas fa-retweet" style={{fontSize:"2rem",color:"white",paddingTop:"1rem",cursor:"pointer"}}
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
    return <i className="fas fa-infinity" style={{fontSize:"2rem",color:"#e53935",paddingTop:"1rem",marginLeft:"3rem",cursor:"pointer"}}
    onClick={()=>{
      this.setState({
        loop:false
      })
    }}
    ></i>
  }else{
    return <i className="fas fa-infinity" style={{fontSize:"2rem",color:"white",paddingTop:"1rem",marginLeft:"3rem",cursor:"pointer"}}
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
    console.log(this.state.music_list)
      if(this.state.play_all === true && document.getElementById("audio") !== null){
        this.play_all_list()
      }
       return (
      <Container>
        {this.render_audio()}
         <img src="./img/fox.png" style={{width:"10rem",height:"15rem",marginLeft:"auto",marginRight:"auto",display:"block",paddingTop:"5rem"}} alt=""
         onClick={()=>{
           localStorage.clear()
           history.push("/")
         }}
         />

         <span style={{fontSize:"4rem",fontFamily:"'Simonetta', cursive",color:"#E76541",marginLeft:"auto",marginRight:"auto",display:"table"}} className="input">FOXY MUSIC</span>
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
          <i class="fas fa-plus"style={{fontSize:"2rem",color:"white",paddingTop:"1rem",marginLeft:"3rem",cursor:"pointer"}}
          onClick={async ()=>{
            if(this.state.music_file === null){
              this.setState({
                music_file_error:"Music file is required and must be an audio format"
              })
            }else{
              const formData = new FormData()
              formData.append("music",this.state.music_file)
              var music = await axios.post("http://localhost:5000/upload/music",formData,{
              headers:{
                "x-auth":localStorage.getItem("token"),
                "Content-Type":"multipart/form-data"
              }
            })
            var updated_music_list = this.state.music_list
            updated_music_list.push(music.data)
            this.setState({
              music_list:updated_music_list,
              music_file:null,
              music_file_error:null
            })
            document.getElementById("music").value = null

            }
          }}
          ></i>
          </div>
          </div>
          <div className="row mp3_box" style={{height:"4rem"}}>
          <div className="col s12" style={{textAlign:"center"}}>
          <input type="file" style={{fontSize:"1.5rem",color:"white"}} name = "music" id="music"  accept="audio/mpeg3" onChange = {event=>{
            this.setState({
              music_file:event.target.files[0]
            })
          }}/> <span style={{fontSize:"1.5rem",color:"red",paddingLeft:"2rem"}}>{this.state.music_file_error}</span>
          </div>
          </div>
        </div>
      </Container>

    );
  }
}

export default MusicBox;