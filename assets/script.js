const max_length = 120;

function getMovie(movie) {
    let container = document.createElement("article");
    container.classList.add("col-xl-4", "col-lg-4", "col-md-6", "col-sm-12", "col-12");
    let synopsis = movie.overview;
    // console.log(synopsis)
    if (synopsis.length > max_length) {
        synopsis = synopsis.slice(0, max_length-3);
        synopsis += "..."
    };
    container.innerHTML = `
     <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${movie.poster_path}" class="img-fluid rounded-start">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${movie.original_title}</h5>
                  <small>ID: ${movie.id}</small>
                  <p class="card-text">${synopsis}.</p>
                  <p class="card-vote">Notes: ${getStarsFromVote(movie.vote_average)}</p>
                </div>
              </div>
            </div>
          </div>
    `;

return container;
}

function getStarsFromVote(vote) {
    vote = parseInt(vote+0.5)/2; 
    container = document.createElement("div");
    let fill = parseInt(vote);
    let half = parseInt(vote-fill+0.5);
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("i");
        if (i < fill) {star.classList.add("fa-solid", "fa-star");}
        else if (i < fill+half) {star.classList.add("fa-solid", "fa-star-half-stroke");}
        container.append(star);
    }
    return container.innerHTML;
}

fetch(new Request("movies.json")) 
    .then((result) => (result.json()))
    .then((result) => {
        // console.log(result.results);
    const movies = result.results
    let global_container = document.getElementById('global-container');
    for(i of movies) {
        global_container.append(getMovie(i))
    }
});