
function displayResults (results, store) {
    const searchResults = document.getElementById('results')
    if (results.length) {
      let resultList = ''
      // Iterate and build result list elements
      for (const n in results) {
        const item = store[results[n].ref]
        resultList += '<li><p><a href="' + item.url + '">' + item.title + '</a></p>'
        resultList += '<p>' + item.content.substring(0, 150) + '...</p></li>'
      }
      searchResults.innerHTML = resultList
    } else {
      searchResults.innerHTML = 'No results found.'
    }
}
  

  document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var query = searchInput.value.toLowerCase();
        if (query) {
          document.getElementById('search-input').setAttribute('value', query)
          const idx = lunr(function () {
            this.ref('id')
            this.field('title', {
              boost: 15
            })
            this.field('tags')
            this.field('content', {
              boost: 10
            })
        
            for (const key in window.store) {
              this.add({
                id: key,
                title: window.store[key].title,
                tags: window.store[key].category,
                content: window.store[key].content
              })
            }
          })
        
          const results = idx.search(query)
          displayResults(results, window.store)
        }else{
          const searchResults = document.getElementById('results')
          searchResults.innerHTML = 'Enter a keyword above to search this site.'
        }
      });
    }

  })

