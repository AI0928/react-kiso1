import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { PostCreate } from '../CreatePost/CreatePost';
import { useSearchParams } from 'react-router-dom';

type ThreadData = {
    threadId: string,
    posts: PostData[]
}

type PostData = {
    id: string,
    post: string
}

export const ViewPosts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const  {thread_id} = useParams();
    searchParams.get("title");//?

    const [data, setData] = useState<ThreadData>()
    const [offset, setOffset] = useState<number>(0)
    //データ取得
    async function getData(offset: number) {
        const url = "https://railway.bulletinboard.techtrain.dev/threads/" +  thread_id + "/posts?offset=" + offset;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`レスポンスステータス: ${response.status}`);
            }
        
            const json = await response.json();
            console.log(json)
            setData(json)
        } catch (error) {
            console.error((error as Error).message);
            changeOffset(-10)
        }
    }

    useEffect(() => {
        getData(offset);
    }, [offset]);

    const changeOffset = (change: number) => {
        if (offset + change >= 0){ 
            setOffset(offset + change)
        }
    }

    return (
        <div className='viewThread-container'>
            <h1>{searchParams}</h1>
            <div className='mokuzi'>            
                <button className='mokuzi-button' onClick={() => changeOffset(-100)}>100件前へ</button>
                <button className='mokuzi-button' onClick={() => changeOffset(-10)}>前の10件</button>
                <h2>{offset}件目から表示</h2>
                <button className='mokuzi-button'onClick={() => changeOffset(10)}>次の10件</button>
                <button className='mokuzi-button'onClick={() => changeOffset(100)}>100件次へ</button>
            </div>

            <div className="card-container">       
                {data && data.posts.map((item, index) => (
                    <div className="card" key={index}>
                        <h2 className="card-title">{item.post}</h2>
                    </div>
                ))}
            </div>
            {thread_id && <PostCreate thread_id={thread_id} getData={getData} offset={offset} />}
        </div>
    );
};