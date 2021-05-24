import React, { useState, useEffect } from 'react'
import { Container, Dimmer, Loader, Table, Pagination } from 'semantic-ui-react'
import axios from 'axios'

function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    // const url = "http://3.35.21.138:5000/gsheet";
    const url = 'http://localhost:3030/gsheet';

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const getData = await axios.get(url);
                setPosts(getData.data);
                setLoading(false)
                console.log(getData.data);
            } catch (e){
                console.log("Error response FetchData : " + e);
            }
        }
        fetchData();
    }, []);


    return (
        <Container>

            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            <Table striped compact='very' celled selectable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>날짜</Table.HeaderCell>
                    <Table.HeaderCell>회사명</Table.HeaderCell>
                    <Table.HeaderCell>이름</Table.HeaderCell>
                    <Table.HeaderCell>직위</Table.HeaderCell>
                    <Table.HeaderCell>핸드폰</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {posts.map((post, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell>{post.date}</Table.Cell>
                    <Table.Cell>{post.company}</Table.Cell>
                    <Table.Cell>{post.name}</Table.Cell>
                    <Table.Cell>{post.grade}</Table.Cell>
                    <Table.Cell>{post.cell}</Table.Cell>
                </Table.Row>
                ))}
                </Table.Body>
            </Table>
            <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={10}
            />

        </Container>
    )
}

export default Post;
