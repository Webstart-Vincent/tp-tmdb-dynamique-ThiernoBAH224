const json_data =
    "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&region=FR&include_adult=false&api_key=a9d73722dee06410f25de86c66ef1722";
const bigcontainer = document.getElementById("container");

fetch(json_data)
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((film) => {
            if (
                film.overview !== "" &&
                film.poster_path !== "" &&
                film.poster_path !== null &&
                film.original_title !== ""
            ) {
                const description = film.overview;
                const image = film.poster_path;
                const titre = film.original_title;

                const Container = document.createElement("div");
                Container.classList.add("container");

                const imageElement = document.createElement("img");
                imageElement.crossOrigin = "anonymous";
                imageElement.src = `https://image.tmdb.org/t/p/w400/${image}`;
                imageElement.alt = titre;
                imageElement.classList.add("poster");

                const colorThief = new ColorThief();

                imageElement.addEventListener("load", () => {
                    const dominantColor = colorThief.getColor(imageElement);
                    const palette = colorThief.getPalette(imageElement, 3);

                    Container.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                    Container.style.borderColor = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`;

                    var luminosite =
                        (dominantColor[0] * 299 +
                            dominantColor[1] * 587 +
                            dominantColor[2] * 114) /
                        1000;
                    if (luminosite > 125) {
                        luminosite = "0";
                        titleElement.style.color = `rgb(${luminosite}, ${luminosite}, ${luminosite})`;
                        texteElement.style.color = `rgb(${luminosite}, ${luminosite}, ${luminosite})`;
                    } else {
                        luminosite = "256";
                        titleElement.style.color = `rgb(${luminosite}, ${luminosite}, ${luminosite})`;
                        texteElement.style.color = `rgb(${luminosite}, ${luminosite}, ${luminosite})`;
                    }
                });

                const informationDiv = document.createElement("div");
                informationDiv.classList.add("information");

                const titleElement = document.createElement("h1");
                titleElement.classList.add("title");
                titleElement.textContent = titre;

                const texteElement = document.createElement("p");
                texteElement.classList.add("texte");
                texteElement.textContent = description;

                informationDiv.appendChild(titleElement);
                informationDiv.appendChild(texteElement);

                Container.appendChild(imageElement);
                Container.appendChild(informationDiv);

                bigcontainer.appendChild(Container);
            }
        });
    })
    .catch((error) => console.error(error));
