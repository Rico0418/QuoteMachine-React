import React, {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.css';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

const QuoteBox = () =>{
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [buttonColor,setButtonColor] = useState('rgb(189, 187, 153)');
  const [quoteTextColor, setQuoteTextColor] = useState('black');
  const [twitterColor, setTwitterColor] = useState('rgb(189, 187, 153)')

  const fetchQuote = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    setQuote(data.content);
    setAuthor(data.author);

    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    setButtonColor(randomColor);
    setQuoteTextColor(randomColor);
    setTwitterColor(randomColor);
  };
  useEffect(() =>{
    fetchQuote();
  },[]);
  return(
    <div id="quote-box" style={styles.quoteBox}>
      <div style={styles.up}>
        <p id="text" style={{...styles.textStyle, color: quoteTextColor}}>" {quote}</p>
      </div>
      <div style={styles.mid}>
        <p id="author" style={styles.authorStyle}>- {author}</p>
      </div>
      <div style={styles.footer}>
        <div style={{...styles.tweetButton, backgroundColor:twitterColor}}>
          <a id="tweet-quote"  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} 
        target="_blank">   
         <FontAwesomeIcon icon={faTwitter} style={styles.logo}></FontAwesomeIcon>
      </a>
        </div>
        <button id="new-quote" style={{...styles.quoteButton,backgroundColor: buttonColor}} onClick={fetchQuote}>New Quote</button>
      </div>
    </div>
  );
}
const styles ={
  quoteBox:{
    backgroundColor: 'white',
    border: 'none',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    padding: '3rem'
  },
  textStyle:{
    fontWeight:'600',
    fontSize:'40px',
    transition: 'color 1s ease-in-out'
  },
  authorStyle:{
    fontWeight:'400',
    fontSize: '25px'
  },
  quoteButton:{
    border: 'none',
    backgroundColor: 'rgb(189, 187, 153)',
    color: 'white',
    padding: '5px',
    borderRadius: '4px',
    width: '130px',
    fontWeight: '300',
    transition: 'background-color 1s ease-in-out'
  },
  up:{
    display: 'flex',
    justifyContent: 'center'
  },
  mid:{
    display: 'flex',
    justifyContent: 'end'
  },
  logo:{
    width: '25px',
    height: '25px'
  },
  tweetButton: {
    backgroundColor: 'rgb(189, 187, 153)',
    border: 'none',
    fontSize:'30px',
    borderRadius: '4px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 1s ease-in-out'
  },
  footer:{
    display: 'flex',
    flexDirection: 'row',
    gap: '350px',
    justifyContent: 'center'
  }
  
}
const App = () =>{
  return(
    <div>
      <QuoteBox/>
    </div>
  )
}
export default App;
