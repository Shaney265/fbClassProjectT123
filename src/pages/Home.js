import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Card  from 'react-bootstrap/Card';

import { FBDBContext } from '../contexts/FBDBContext';
import { useContext, useEffect, useState } from 'react';
import {collection, doc, getDocs} from "firebase/firestore";


export function Home () {
    const [data, setData ]= useState([])
    const FBDB = useContext(FBDBContext)

    const getData = async() => {
//get data from the firebase collection called books
        const querySnapshot = await getDocs(collection(FBDB, "books"))
 // an array to store all books in firestore  
        let books = []
        querySnapshot.forEach( (doc) => {
            let book = doc.data()
            book.id = doc.id
 //add book to th array           
            books.push(book)

            
        })
// set the books array as the data state        
        setData(books)
        console.log (books)
    }
 useEffect(() => {
    if(data.length === 0) {
        getData()
    }
 })
 const Columns = data.map( (book, key) =>{
    return(
        <Col md="4" key={key}>
            <Card>
                <Card.Body>
                    <Card.Title> (books.title)

                    </Card.Title>
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
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}