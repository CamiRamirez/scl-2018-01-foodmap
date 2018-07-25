fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318`)
    .then(response => response.json())//entonces, si la peticion que me estas haciendo esta ok, te envio una respuesta
    .then(data => {
      console.log(data);
      renderInfo(data);
    })
  