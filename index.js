const apiKey = 'GdoryNHkDKbdz5PnjM4xUB6ZyV9T0tOTN2kw1BQ9';

function getData() {
  console.log('a')
  const searchTerm = $('#js-search-term').val();
  const maxResults = $('#js-max-results').val();
  console.log(searchTerm);
  const searchUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&API_KEY=${apiKey}&limit=${maxResults}`


  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
    })
    .then((responseJson) => {
      console.log(responseJson)

      for (let i = 0; i < responseJson.data.length; i++) {
          let name = responseJson.data[i].fullName
          let des = responseJson.data[i].description
          let urlAddress = responseJson.data[i].url 
          $('#results-list').append(`<li>
            <h3>${name}</h3>
            <p>${des}</p>
            <a href="${urlAddress}"target="_blank">Find Out More</a>
          </li>`)
      }
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    $('#results-list').empty();
    getData();
  })
}
$(watchForm);
