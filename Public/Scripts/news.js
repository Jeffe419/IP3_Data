const data = null;
var source;
var title = document.getElementById('test');
var url;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
var container = document.getElementById("results");
xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
    var newsdata= JSON.parse(this.responseText);             
     console.log(newsdata);

    for (let i = 1; i < 11; i++) {
      var displaydiv = document.createElement('div');
      displaydiv.innerHTML = `
      <div class="row" id="results">
      <div class="feature-col" >
          <h2>Source</h2>
          <p>
          ${newsdata[i].source}
          </p>
          <h2>Title</h2>
          <P> 
          ${newsdata[i].title}
          </P>
          <br>
          <p> Find Out More Information <a href="${newsdata[i].url}m">Go to Website</a> </p>
      </div>` ;
    

      container.appendChild(displaydiv);
    }

  }
     
	
});

xhr.open("GET", "https://climate-change-live7.p.rapidapi.com/noticias/guardian");
xhr.setRequestHeader("X-RapidAPI-Host", "climate-change-live7.p.rapidapi.com");
xhr.setRequestHeader("X-RapidAPI-Key", "df6fe8b2bamshc3775b50f934b3ap1da4f2jsn1bbbfe7b6ecd");

xhr.send(data);

