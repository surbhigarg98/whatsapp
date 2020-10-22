import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined,AttachFile, MoreVertOutlined, InsertEmoticon } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic';
import React,{useState,useEffect} from 'react'
import './Chat.css'
import {useParams} from 'react-router-dom'
import db from './firebas';
import {useStateValue} from './StateProvider'
import firebase from 'firebase'

function Chat() {

    const [seed,setSeed]= useState('')
    const [input,setInput] = useState('')
    const {roomId} = useParams()
    const [roomName,setRoomName] = useState('')
    const [messages,setMessages] = useState([])
    const [{user},dispatch] =useStateValue()
    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>setRoomName(snapshot.data().name))
        
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timeStamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data())))
             ) }
    },[roomId])

 

    
    
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000)); {/*It will generate a random number between 0 and 5000 */}
        
    },[roomId])

    const sendMessage=(e)=>{
        e.preventDefault()
        console.log('you typed>>..', input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,
            timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')

    }
    return (
        <div className="chat">
        <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
         <div className="chat__headerInfo">
    <h3>{roomName}</h3>
    <p>Last seen{''}
    {new Date(messages[messages.length-1]?.timeStamp?.toDate()).toUTCString()}
    </p>
             </div>  
         <div className="chat__headerRight">
        <IconButton>
            <SearchOutlined/>
        </IconButton>
        <IconButton>
            <AttachFile/>
        </IconButton>
        <IconButton>
            <MoreVertOutlined/>
        </IconButton>
             </div> 
        </div>

        <div className="chat__body">
        {messages.map((message)=>(
         <p className= {`chatMsg ${ message.name === user.displayName  && 'chatReceiver'}`}>
           <span className="chatName">{message.name}</span>  
           {message.message}
               <span className="chatTimestamp">
                   {new Date(message.timeStamp?.toDate()).toUTCString()}
                   </span></p>
         ) )}
             
        </div>

        <div className="chat__input">
         <InsertEmoticon/>
         <form>
             <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message..." type='text'/>
             <button onClick={sendMessage} type='submit' >Send a message</button>
         </form>
         <MicIcon/>
        </div>
        </div>
    )
}

export default Chat
