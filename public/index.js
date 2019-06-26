

const submitButton = document.querySelector("button");

submitButton.addEventListener("click", e => {
  e.preventDefault();

  const form = document.forms[0];
  const search = form.children[0].value;
  const getMovie = fetch(`http://www.omdbapi.com/?s=${search}&apikey=2f6435d9`);

  getMovie
    .then(response => {
      return response.json();
    })
    .then(data => {
      dataArr = data.Search;

      const newDiv1 = document.querySelector(".wrapper");
      newDiv1.innerHTML = ""
      dataArr.forEach(movie => {
        newDiv1.innerHTML += `<div class="box"> Title: ${movie.Title} <br>
    <br> 
    <ul> Year: ${movie.Year}</ul>
    <img src="${movie.Poster}" onerror="this.src='../images/NO_PHOTO_PROVIDED.jpg';"  srcset="">  
    <button id="${movie.imdbID}" onclick="getMovie('${movie.imdbID}')" type="${
          movie.imdbID
        }">LIKE</button></div>`;
      });
    });
});

const getMovie = id => {
  const getMovieDetails = fetch(
    `http://www.omdbapi.com/?i=${id}&apikey=2f6435d9`
  );

  getMovieDetails
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      const { Title, Plot, Year, Director, Poster, imdbRating, imdbID } = data;
      addItem(data)
    });

    const addItem = (data) => {
      
      console.log(data);
      axios.post('http://localhost:3000/movie/add', data)
        .then((response) => {
          console.log(response)
          alert("Saved")
        })
        .catch((error) => {
          console.log(error);
        })
    }
    
};
