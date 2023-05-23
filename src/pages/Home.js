import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { ref } from "firebase/storage";

//import { FBDbContext } from '../contexts/FBDbContext';
import { FBDBContext } from '../contexts/FBDBContext';
import { FBStorageContext } from '../contexts/FBStorageContext';

export function Home () {
    const[ data, setData ] = useState([])

    const FBDB = useContext(FBDBContext)
    const FBStorage = useContext( FBStorageContext )

    const getData = async () => {
        // get data from firestore collection called "books"
        const querySnapshot = await getDocs( collection(FBDB, "books") )
        // an array to store all the books from firestore
        let books = []
        querySnapshot.forEach( (doc) => {
            let book = doc.data()
            book.id = doc.id
            // add the book to the array
            books.push(book)
        })
        // set the books array as the data state
        setData(books)
        console.log(books)
    }

    useEffect( () => {
        if( data.length === 0 ) {
            getData()
        }
    })

    const Columns = data.map( (books, key) => {
        return(
            <Col md="4" key={key}>
                <Card>
                    <Card.Body>
                        <Card.Title>{books.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
       <Container>
            <Row>
                {Columns}
            </Row>
       </Container>
    )
}