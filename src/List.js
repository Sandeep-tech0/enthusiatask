import React, { useState, useEffect } from "react";
import axios from 'axios'

const List = () => {

    const [data, setData] = useState([])
    const getData = async () => {
        try {
            let api = await axios.get('https://jsonplaceholder.typicode.com/posts')
            let newData = await api.data
            setData(newData)
        } catch (error) {

        }


    }

    useEffect(() => {
        getData()
    }, [0])
    return (
        <div> <table>
            <tr>
                <th>userId</th>
                <th>id</th>
                <th>title</th>
                <th>Body</th>
            </tr>

            {data?.map((data) => {
                return <tr>
                    <td>{data?.userId}</td>
                    <td>{data?.id}</td>
                    <td>{data?.title}</td>
                    <td>{data?.body}</td>

                </tr>
            })}

        </table>
        </div>
    )
}

export default List