import { useEffect, useState } from "react";
import { socket } from '../socket/socket.ts'

const ChatBox = () => {
    const [msg, setMsg] = useState<string[]>([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        socket.on('chat', (msg: string) => {
            setMsg((prev) => [...prev, msg])
        })
        return () => {
            socket.off('chat')
        }
    })
    const sendMsg = () => {
        if (input.trim() !== '') {
            socket.emit('chat', input)
            setInput('')
        }
    }
    return (<div>

        <div className="mt-7">
            {msg.map((m, i) => (<p key={i}>{m}</p>))}</div> <input type="text" value={input} onChange={(e) => { setInput(e.target.value) }} onKeyDown={(e) => e.key === 'Enter' && sendMsg()} />
        <button onClick={sendMsg}>Send</button>
    </div>);
}

export default ChatBox;