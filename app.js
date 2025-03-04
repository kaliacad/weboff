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
      const htmlData = data.parse.text["*"]

      // Page title
      const title = document.createElement("h1")
      title.innerText = pageTitle
      const body = document.querySelector("body")
      
      // Append 
    //   body.appendChild(title)
    //   body.insertAdjacentHTML("beforeend", htmlData)

    //   Local storage
    const pageData = {
        title: pageTitle,
        content: htmlData
    };
    localStorage.setItem(pageTitle, JSON.stringify(pageData));

  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

fetchArticle("Book")
fetchArticle("Pet door");
fetchArticle("Wikipedia");  


// Helper functions
const createElement = (elt) => document.createElement(elt)

// Retrieving JSON data
const p = document.querySelector("p")
/**
 * Improve the loop w/ object.key
 * https://javascript.info/localstorage
 */
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    const savedData = JSON.parse(localStorage.getItem(key));
    
  const title = createElement("h1")
  title.innerText = savedData.title
  
  p.appendChild(title)
}

function displayPage(event) {
    const output = event.currentTarget

    const body = document.querySelector("body")

    const title = createElement("h1")
    const content = createElement("div")
    
    title.innerText = output.innerText
    const test = title.innerText
    let key = localStorage.key(test)
    const article = JSON.parse(localStorage.getItem(key))
    content.innerHTML = article.content

    body.appendChild(title)
    body.appendChild(content)
    
}

document.querySelector("h1").addEventListener("click", displayPage)
