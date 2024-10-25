import { useState } from "react";

export const PostCreate = (props) => {
    const [post, setPost] = useState("");
    const postCreate = async () => {
        if (post.trim().length !== 0){
            const url = "https://railway.bulletinboard.techtrain.dev/threads/" + props.thread_id + "/posts";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ post: post })
            };
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setPost("")
                props.getData(props.offset)
                return data;
            } catch (e) {
                return e;
            }
        }
    }
    return (
        <div>
            <label>
                新規投稿
                <input 
                    value={post}
                    onChange={e => setPost(e.target.value)}
                ></input>
            </label>
            <button disabled={post.trim().length === 0} onClick={postCreate}>投稿</button>
        </div>
    );
};