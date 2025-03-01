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

// Retrieving JSON data
const p = document.querySelector("p")

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    const savedData = JSON.parse(localStorage.getItem(key));
    
  const title = document.createElement("h1")
  title.innerText = savedData.title
  
  console.log(title);
  
  p.appendChild(title)
}


const listWrapper = document.createElement("ul")
const li = document.createElement("li")
