import { useEffect, useState} from 'react'
import './ViewThreads.css'
import { Link } from 'react-router-dom';

type PostData = {
    id: string,
    title: string
}

export const ViewPost = () => {
    const [data, setData] = useState<PostData[]>([])
    const [offset, setOffset] = useState<number>(0)
    //データ取得
    async function getData(offset: number) {
        const url = "https://railway.bulletinboard.techtrain.dev/threads?offset=" + offset;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`レスポンスステータス: ${response.status}`);
            }
        
            const json = await response.json();
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
            <h1>スレッド一覧</h1>
            <div className='mokuzi'>            
                <button className='mokuzi-button' onClick={() => changeOffset(-100)}>100件前へ</button>
                <button className='mokuzi-button' onClick={() => changeOffset(-10)}>前のページへ</button>
                <h2>{offset}件目から表示</h2>
                <button className='mokuzi-button'onClick={() => changeOffset(10)}>次のページへ</button>
                <button className='mokuzi-button'onClick={() => changeOffset(100)}>100件次へ</button>
            </div>

            <div className="card-container">       
                {data.map((item, index) => (
                    <div className="card" key={index}>
                        <h2 className="card-title"><Link to={"/threads/" + item.id + "title?" + item.title}>{item.title}</Link></h2>
                    </div>
                ))}
          </div>
        </div>
    );
};