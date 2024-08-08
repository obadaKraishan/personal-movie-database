document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
    fetchWatchlists();
  
    document.getElementById('movieForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const movieId = this.dataset.id;
      if (movieId) {
        updateMovie(movieId);
      } else {
        addMovie();
      }
    });
  
    document.getElementById('watchlistForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const watchlistId = this.dataset.id;
      if (watchlistId) {
        updateWatchlist(watchlistId);
      } else {
        addWatchlist();
      }
    });
  });
  
  async function fetchMovies() {
    const response = await fetch('/api/movies');
    const movies = await response.json();
    displayMovies(movies);
    populateMovieSelect(movies);
  }
  
  async function addMovie() {
    const title = document.getElementById('movieTitle').value;
    const director = document.getElementById('movieDirector').value;
    const year = document.getElementById('movieYear').value;
    const genre = document.getElementById('movieGenre').value;
    const poster = document.getElementById('moviePoster').value;
  
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, director, year, genre, poster })
    });
  
    const newMovie = await response.json();
    displayMovie(newMovie);
    populateMovieSelect([newMovie]);
  
    document.getElementById('movieForm').reset();
  }
  
  async function updateMovie(id) {
    const title = document.getElementById('movieTitle').value;
    const director = document.getElementById('movieDirector').value;
    const year = document.getElementById('movieYear').value;
    const genre = document.getElementById('movieGenre').value;
    const poster = document.getElementById('moviePoster').value;
  
    const response = await fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, director, year, genre, poster })
    });
  
    const updatedMovie = await response.json();
    fetchMovies();
  
    document.getElementById('movieForm').reset();
    document.getElementById('movieForm').removeAttribute('data-id');
  }
  
  function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    movies.forEach(displayMovie);
  }
  
  function displayMovie(movie) {
    const movieList = document.getElementById('movieList');
    const movieElement = document.createElement('li');
    movieElement.className = 'list-group-item';
    movieElement.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <h5>${movie.title}</h5>
          <p>Director: ${movie.director}</p>
          <p>Year: ${movie.year}</p>
          <p>Genre: ${movie.genre}</p>
          <img src="${movie.poster}" alt="${movie.title}" class="img-thumbnail" style="max-width: 100px;">
        </div>
        <div>
          <button class="btn btn-warning btn-sm mr-2" onclick="editMovie('${movie._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteMovie('${movie._id}')">Delete</button>
        </div>
      </div>
    `;
    movieList.appendChild(movieElement);
  }
  
  async function deleteMovie(id) {
    await fetch(`/api/movies/${id}`, { method: 'DELETE' });
    fetchMovies();
  }
  
  function editMovie(id) {
    const movieElement = document.querySelector(`#movieList .list-group-item [onclick="editMovie('${id}')"]`).parentElement.parentElement;
    const title = movieElement.querySelector('h5').textContent;
    const director = movieElement.querySelector('p:nth-child(2)').textContent.split(': ')[1];
    const year = movieElement.querySelector('p:nth-child(3)').textContent.split(': ')[1];
    const genre = movieElement.querySelector('p:nth-child(4)').textContent.split(': ')[1];
    const poster = movieElement.querySelector('img').src;
  
    document.getElementById('movieTitle').value = title;
    document.getElementById('movieDirector').value = director;
    document.getElementById('movieYear').value = year;
    document.getElementById('movieGenre').value = genre;
    document.getElementById('moviePoster').value = poster;
    document.getElementById('movieForm').dataset.id = id;
  }
  
  async function fetchWatchlists() {
    const user = 'defaultUser'; // Replace with actual user logic
    const response = await fetch(`/api/watchlists/${user}`);
    const watchlists = await response.json();
    displayWatchlists(watchlists);
  }
  
  async function addWatchlist() {
    const name = document.getElementById('watchlistName').value;
    const movies = Array.from(document.getElementById('watchlistMovies').selectedOptions).map(option => option.value);
    const user = 'defaultUser'; // Replace with actual user logic
  
    const response = await fetch('/api/watchlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, movies, user })
    });
  
    const newWatchlist = await response.json();
    displayWatchlist(newWatchlist);
  
    document.getElementById('watchlistForm').reset();
  }
  
  async function updateWatchlist(id) {
    const name = document.getElementById('watchlistName').value;
    const movies = Array.from(document.getElementById('watchlistMovies').selectedOptions).map(option => option.value);
  
    const response = await fetch(`/api/watchlists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, movies })
    });
  
    const updatedWatchlist = await response.json();
    fetchWatchlists();
  
    document.getElementById('watchlistForm').reset();
    document.getElementById('watchlistForm').removeAttribute('data-id');
  }
  
  function displayWatchlists(watchlists) {
    const watchlistList = document.getElementById('watchlistList');
    watchlistList.innerHTML = '';
    watchlists.forEach(displayWatchlist);
  }
  
  function displayWatchlist(watchlist) {
    const watchlistList = document.getElementById('watchlistList');
    const watchlistElement = document.createElement('li');
    watchlistElement.className = 'list-group-item';
    watchlistElement.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <h5>${watchlist.name}</h5>
          <p>Movies:</p>
          <ul>
            ${watchlist.movies.map(movie => `<li>${movie.title}</li>`).join('')}
          </ul>
        </div>
        <div>
          <button class="btn btn-warning btn-sm mr-2" onclick="editWatchlist('${watchlist._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteWatchlist('${watchlist._id}')">Delete</button>
        </div>
      </div>
    `;
    watchlistList.appendChild(watchlistElement);
  }
  
  async function deleteWatchlist(id) {
    await fetch(`/api/watchlists/${id}`, { method: 'DELETE' });
    fetchWatchlists();
  }
  
  function editWatchlist(id) {
    const watchlistElement = document.querySelector(`#watchlistList .list-group-item [onclick="editWatchlist('${id}')"]`).parentElement.parentElement;
    const name = watchlistElement.querySelector('h5').textContent;
    const movieTitles = Array.from(watchlistElement.querySelectorAll('ul li')).map(li => li.textContent);
  
    document.getElementById('watchlistName').value = name;
    const watchlistMoviesSelect = document.getElementById('watchlistMovies');
    Array.from(watchlistMoviesSelect.options).forEach(option => {
      if (movieTitles.includes(option.textContent)) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
    document.getElementById('watchlistForm').dataset.id = id;
  }
  
  function populateMovieSelect(movies) {
    const watchlistMoviesSelect = document.getElementById('watchlistMovies');
    movies.forEach(movie => {
      const option = document.createElement('option');
      option.value = movie._id;
      option.textContent = movie.title;
      watchlistMoviesSelect.appendChild(option);
    });
  }
  