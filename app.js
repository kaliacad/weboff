// Using query
// async function fetchArticle(title) {
//     const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${title}&origin=*`);
//     const data = await response.json();
//     console.log(data.parse.text["*"]);
    
//     return data;
//   }

//   console.log("testing...");
  

//   console.log(fetchArticle("Book"));

// Using parse
async function fetchArticle(pageTitle) {
  const url = "https://en.wikipedia.org/w/api.php?" +
      new URLSearchParams({
          origin: "*",           // Required to avoid CORS issues
          action: "parse",       // 'parse' returns the HTML content of the page
          page: pageTitle,       // The Wikipedia page title
          format: "json"         // Get data in JSON format
      });

  try {
      const response = await fetch(url);
      const data = await response.json();
      const html = data.parse.text["*"]

      // Page title
      const title = document.createElement("h1")
      title.innerText = pageTitle
      const body = document.querySelector("body")
      
      // Append 
      body.appendChild(title)
      body.insertAdjacentHTML("beforeend", html)

      console.log(html); // HTML content of the page
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

fetchArticle("Pet door");
fetchArticle("Book")

