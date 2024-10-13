import { useEffect, useState} from 'react'

type PostData = {
    id: string,
    title: string
}

  
export const ViewPost = () => {
    const [data, setData] = useState<PostData[]>([])
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
        }
    }

    useEffect(() => {
        const n = "10";
        getData(n);
    }, []);

    return (
        <div>
            <h1>データ一覧</h1>
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