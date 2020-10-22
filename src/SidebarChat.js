import { Avatar } from '@material-ui/core'
import React ,{useEffect,useState}from 'react'
import db from './firebas'
import './SidebarChat.css'
import {Link} from 'react-router-dom'

function SidebarChat({id,name,addNewChat}) {

    const [seed,setSeed]= useState('')
    const[message,setMessage] = useState("")

    useEffect(()=>{
   if(id){
       db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(
         (snapshot) => setMessage(snapshot.docs.map((doc)=>doc.data())));
   }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000)); {/*It will generate a random number between 0 and 5000 */}
     
    },[])
    const createChat=()=>{
      const roomName = prompt('Please enter name for chat')  //whatever you will type here will store in roomName

      if(roomName){
        //do something clever 
        db.collection('rooms').add({
          name:roomName
        })
      }
    }
    return !addNewChat ? (
      <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat__info">
        <h2>{name}</h2>
    <p>{message[0]?.message}</p>
        </div>
        </div>
      </Link>
       
    ) : (
      <div className="sidebarChat" onClick={createChat}>
        <h2>Add new chat</h2>
      </div>
    )
}

export default SidebarChat
