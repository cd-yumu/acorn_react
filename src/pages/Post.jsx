// src/pages/Post.jxs

import React from 'react';
import { Table } from 'react-bootstrap';

function Post(props) {
    return (
        <>
            <h1>Post List.</h1>
            <Table striped bordered size='sm'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Viewers</th>
                        <th>Add-Date</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>
        </>
    );
}

export default Post;