import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReviewForm } from '../components/ReviewForm';

import { useParams } from 'react-router-dom'

import { useContext, useState, useEffect } from 'react';
import { FBDBContext } from '../contexts/FBDBContext';
import { FBStorageContext } from '../contexts/FBStorageContext';
import { AuthContext } from '../contexts/AuthContext';
import { FBAuthContext } from '../contexts/FBAuthContext';

import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export function Detail(props) {
  const [bookData, setBookData] = useState()
  const [auth, setAuth] = useState()

  let { bookId } = useParams()

  const FBDB = useContext(FBDBContext)
  const FBStorage = useContext(FBStorageContext)
  const FBAuth = useContext(FBAuthContext)

  onAuthStateChanged( FBAuth, (user) => {
    if( user ) {
      // user is signed in
      setAuth(user)
    }
    else {
      // user is not signed in
      setAuth(null)
    }
  })

  const bookRef = doc(FBDB, "books", bookId)

  const getBook = async () => {
    let book = await getDoc(bookRef)
    if (book.exists()) {
      setBookData(book.data())
    }
    else {
      // no book exists with the ID
    }
  }

  useEffect(() => {
    if (!bookData) {
      getBook(bookId)
    }
  })

  const Image = ( props ) => {
    const [imgPath,setImgPath] = useState()
    const imgRef = ref( FBStorage, `book_cover/${ props.path }`)
    getDownloadURL( imgRef ).then( (url) => setImgPath(url) )

    return(
        <img src={imgPath} />
    )
  }


  if (bookData) {
    return (
      <Container>
        <Row>
          <Col>
            <Image path={bookData.image} />
          </Col>
          <Col>
            <h2>{bookData.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReviewForm user={auth} />
          </Col>
        </Row>
      </Container>
    )
  }
  else {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Loading...</h2>
          </Col>
        </Row>
      </Container>
    )
  }
}