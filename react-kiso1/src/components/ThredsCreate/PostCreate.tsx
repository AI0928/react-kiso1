import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ThreadCreate = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const postThread = async () => {
        if (title.trim().length !== 0){
            const url = "https://railway.bulletinboard.techtrain.dev/threads";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title })
            };
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setTitle("")
                navigate('/threads/' + data.id);
                return data;
            } catch (e) {
                return e;
            }
        }
    }
    return (
        <div>
            <h1>新規作成</h1>
            <label>
                スレッド名
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>
            </label>
            <button disabled={title.trim().length === 0} onClick={postThread}>投稿</button>
        </div>
    );
};