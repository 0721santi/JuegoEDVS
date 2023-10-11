import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/style.css';

const TableWithData = () => {
  const [data, setData] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [clickedItemData, setClickedItemData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5001/api/preguntas/ids').then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const renderTableRows = () => {
    const rows = [];
    const colsPerRow = 4;
  
    for (let i = 0; i < data.length; i += colsPerRow) {
      const rowCells = [];
      for (let j = i; j < i + colsPerRow && j < data.length; j++) {
        const item = data[j];
        rowCells.push(
          <td key={item} colSpan="2"><button onClick={() => handleButtonClick(item)}>{item}</button></td>
        );
      }
      rows.push(<tr key={i}>{rowCells}</tr>);
    }
  
    return rows;
  };
  const renderAnswers = () =>{
    if(!clickedItemData || clickedItemData.length === 0){
      return null;
    }
    const col = [];
    for(let i=1;i<=5;i++){
      const item = clickedItemData[i];
      col.push(
          <tr key={item}><button onClick={() => checkAnswer(item)}>{item}</button></tr>
      )
    }
    return col;
  }
  const handleButtonClick = (item) => {
    document.getElementById("result").innerHTML = "";
    axios.get(`http://127.0.0.1:5001/api/preguntas/${item}`).then(response => {
        setClickedItemId(item);
        setClickedItemData(response.data[0]);
    })
      .catch(error => {
        console.error('Error fetching item data:', error);
      });
  };
  const checkAnswer = (item) => {
    if(!clickedItemData || clickedItemData.length === 0){
      return null;
    }
    const res = clickedItemData[6];
    const answer = item ? parseInt(item.substring(0,1)): '';
    if(answer === res){
      document.getElementById("result").innerHTML = "RESPUESTA CORRECTA";
    }else{
      document.getElementById("result").innerHTML = "RESPUESTA INCORRECTA";
    }
  }

  return (
    <div class="main">
        <center><h1>INVERSIONISTAS ECO-RESPONSABLES</h1></center>
        <div class="juego">
            <div class="tabla">
              <h2>ELIGE TU PREGUNTA</h2>
              <table>
                <tbody>
                    {renderTableRows()}
                </tbody>
              </table>
            </div>
            <div class="variables">
                <div class="cuestionario">
                    <div class="pregunta">
                        {clickedItemData && (
                        <div class="msg">
                            <h1>Pregunta {clickedItemId}</h1>
                            <center><h2>{clickedItemData[0]}</h2></center>
                        </div>
                        )}
                    </div>
                    <div class="respuestas">
                        <table>
                            <tbody>
                                {renderAnswers()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="contadores">
                  <h1 id="result"></h1>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TableWithData;
