import React, { useState } from 'react';
import axios from 'axios';

function CardUI()
{
    var card = '';
    var search = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.userId;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");
    var bp = require('./Path.js');
    var tok = storage.retrieveToken();

    const addCard = async event => 
    {
	    event.preventDefault();

        var obj = {userId:userId,card:card.value,jwtToken:tok};
        var js = JSON.stringify(obj);

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/addcard'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

        axios(config)
            .then(function(response)
        {
            var res = response.data;

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
            }
        })
        .catch(function(error)
        {
            console.log(error);
        });
	};

    const searchCard = async event => 
    {
        event.preventDefault();
        
        var obj = {userId:userId,search:search.value,jwtToken:tok};
        var js = JSON.stringify(obj);

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/searchcards'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

        axios(config)
            .then(function(response)
        {
            var res = response.data;
            var _results = res.results;
            var resultText = '';

            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }

            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        })
        .catch(function(error)
        {
            console.log(error);
            setResults(error.toString());
        });
    };

    return(
      <div id="cardUIDiv">
        <br />
        <input type="text" id="searchText" placeholder="Card To Search For"
            ref={(c) => search = c} />
        <button type="button" id="searchCardButton" class="buttons"
            onClick={searchCard}> Search Card</button><br />
        <span id="cardSearchResult">{searchResults}</span>
        <p id="cardList">{cardList}</p><br /><br />
        <input type="text" id="cardText" placeholder="Card To Add"
            ref={(c) => card = c} />
        <button type="button" id="addCardButton" class="buttons"
            onClick={addCard}> Add Card </button><br />
        <span id="cardAddResult">{message}</span>
    </div>
    );
}

export default CardUI;
