import { useEffect, useState} from 'react'
import './ViewThreads.css'

type PostData = {
    id: string,
    title: string
}

export const ViewPost = () => {
    const [data, setData] = useState<PostData[]>([])
    const [offset, setOffset] = useState("0")
    //データ取得
    async function getData(n: string) {
        const url = "https://railway.bulletinboard.techtrain.dev/threads?offset=" + n;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`レスポンスステータス: ${response.status}`);
            }
        
            const json = await response.json();
            setData(json)
        } catch (error) {
            console.error(error.message);
            changeOffset(-10)
        }
    }

    useEffect(() => {
        getData(offset);
    }, [offset]);

    const changeOffset = (change: number) => {
        const before = Number(offset);
        if (before + change >= 0){
            const after = before + change      
            setOffset(String(after))
        }
    }

    return (
        <div className='viewThread-container'>
            <h1>データ一覧</h1>
            <div className='mokuzi'>            
                <button className='mokuji-button' onClick={() => changeOffset(-100)}>Back</button>
                <button className='mokuji-button' onClick={() => changeOffset(-10)}>前のページへ</button>
                <h2>{offset}件目から表示</h2>
                <button className='mokuji-button'onClick={() => changeOffset(10)}>次のページへ</button>
                <button className='mokuji-button'onClick={() => changeOffset(100)}>Next</button>
            </div>

            <div className="card-container">       
                {data.map((item, index) => (
                    <div className="card" key={index}>
                        <h2 className="card-title">{item.title}</h2>
                    </div>
                ))}
          </div>
        </div>
    );
};