import { useState } from "react";

export const ThreadCreate = () => {
    const [title, setTitle] = useState("");
    const [isTitle, setIsTitle] = useState(false);
    const postThread = async () => {
        if (title !== ""){
            console.log(title)
            const url = "https://railway.bulletinboard.techtrain.dev/threads";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title })
            };
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                console.log(data)
                setTitle("")
                setIsTitle(false)
                return data;
            } catch (e) {
                return e;
            }
        }
        else{
            setIsTitle(true)
        }
    }
    return (
        <div>
            <h1>PostCreate</h1>
            <label>
                スレッド名
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>
            </label>
            <button onClick={postThread}>投稿</button>
            {isTitle && <p>タイトルが空白です</p>}
        </div>
    );
};