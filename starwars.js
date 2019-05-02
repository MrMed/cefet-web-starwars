// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
$(document).ready(() => {
    let episode = localStorage.getItem("film");
    if (episode) setIntro(episode);
  });
  
  const idfilm = id => {
    let episode = ["", "I", "II", "III", "IV", "V", "VI", "VII"];
    return episode[parseInt(id)];
  };
  
  const setIntro = text => {
    localStorage.setItem("episode", text);
    $(".reading-animation").html(text);
  };
  
  $.ajax({
    url: "https://swapi.co/api/films/",
    method: "get",
    success: response => {
      let $ul = $("#movies ul");
      let episodes = response.results.sort((a, b) => a.episode_id > b.episode_id);
  
      episodes.forEach(film => {
        let $li = $("<li>", {
          "data-url-episode": film.url,
          text: "Episode " + idfilm(film.episode_id) + " : " + film.title
        });
  
        $ul.append($li);
      });
    }
  });
  
  $("#movies ul").on("click", "li", function(e) {
    let url = $(e.target).data("url-episode");
  
    $.ajax({
      url: url,
      method: "get",
      success: response => {
        let episode = idfilm(response.episode_id);
        let text = "Episode " + episode + "\n" + response.title + "\n\n" + response.opening_crawl;
        setIntro(text);
      }
    });
  });