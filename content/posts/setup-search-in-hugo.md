---
title: "Setup Search in Hugo"
date: 2024-02-13T19:57:17Z
lastmod: 2024-02-13T19:57:17Z
subTitle: ""
description: "In this article, I will show you how to implement search in Hugo by using Lunr.js, a lightweight JavaScript search engine."
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["search-index","hugo","lunr.js"]
categories: ["hugo"]
cover:
    position: <left,right>
    image: "https://i.imgur.com/mlDeikH.png"
    alt: "<alt text>"
    caption: "<text>"
---

>In this article, I will show you how to implement search in Hugo by using Lunr.js, a lightweight JavaScript search engine. Adding search functionality to your Hugo website enhances user experience and makes it easier for visitors to find relevant content. We will explore the steps involved in integrating Lunr.js, creating a search index from your Hugo content, and incorporating the search feature into your website.

## Refer link
Every step I was following this useful article.
https://victoria.dev/blog/add-search-to-hugo-static-sites-with-lunr/
But I also did some changes, like real-time search without refreshing the page.

## Import lunr.js

Firstly, import lunr.js or you can run `npm install ` it. Here I chose import lunr.js cdn.

{{< highlight js "linenos=table" >}}
<script src="https://unpkg.com/lunr/lunr.js"></script>
{{< /highlight >}}

## Create a search form partial

To conveniently position your search form on any desired location within your website, generate the form as a partial template. Save this template as search-form.html within the `layouts/partials/` directory.

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/7fa2NYO.png">
        <img src="https://i.imgur.com/7fa2NYO.png"/>
    </a>
</div>
{{< highlight html "linenos=table" >}}
<style>
    .input-container {
      width: 220px;
      position: relative;
      }

      .icon {
      position: absolute;
      right: 10px;
      top: calc(50% + 5px);
      transform: translateY(calc(-50% - 5px));
      }

      .input {
      width: 100%;
      height: 40px;
      padding: 10px;
      transition: .2s linear;
      border: 2.5px solid black;
      font-size: 14px;
      letter-spacing: 2px;
      }

      .input:focus {
      outline: none;
      border: 0.5px solid black;
      box-shadow: -5px -5px 0px black;
      }

      .input-container:hover > .icon {
      animation: anim 1s linear infinite;
      }

      @keyframes anim {
      0%,
      100% {
      transform: translateY(calc(-50% - 5px)) scale(1);
      }

      50% {
      transform: translateY(calc(-50% - 5px)) scale(1.1);
      }
      }
 </style>
<div class=" hidden sm:flex input-container ml-12">
    <input type="text" name="text"  id="search-input" class="input" placeholder="search anything...">
    <button type="submit">
        <span class="icon"> 
            <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </span>
    </button>
  </div>
{{< /highlight >}}

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/PUy3Q3z.png">
        <img src="https://i.imgur.com/PUy3Q3z.png"/>
    </a>
</div>

## Create a search index

Create the search folder in `layouts/partials/` path, and create a page named `list.html`. 
Include the search form in list.htm, also you can use in any other templates.
{{< highlight html "linenos=table" >}}
  {{ partial "search-form.html" . }}
{{< /highlight >}}
For example:
{{< highlight html "linenos=table" >}}
<!-- In layouts/partials/search/list.html -->
{{ define "main" }}
<section class="s:mt-10 mt-20">
    <div class="container sm:my-14" >
        <div class="mt-20">
            {{ partial "search-form.html" . }}
        </div>
        <div id="results">
            Enter a keyword above to search this site.
        </div>
    </div>
</section>
{{ end }}

{{< /highlight >}}

## Create a search page
Navigate to content folder, create a folder name search, and a file `_index.md`
<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/43BYz77.png">
        <img src="https://i.imgur.com/43BYz77.png"/>
    </a>
</div>

## Build your search index
In `layouts/partials/` folder, create another html file `search-index.html`
Import `lunr.js` cdn and `search.js`, I haven't created `search.js` so far.
<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/bzIJXop.png">
        <img src="https://i.imgur.com/bzIJXop.png"/>
    </a>
</div>

{{< highlight html "linenos=table" >}}

{{ define "main" }}

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="/js/search.js"></script>
<script>
    window.store = {
        {{ range   .Site.Pages}}
        "{{ .Permalink }}": {
            "title": "{{ .Title  }}",
            "tags": [{{ range .Params.Tags }}"{{ . }}",{{ end }}],
            "content": {{ .Content | plainify }}, 
            "url": "{{ .Permalink }}"
        },
        {{ end }}
    }
</script>

{{< /highlight >}}

## Implement search.js
Compare to this https://victoria.dev/blog/add-search-to-hugo-static-sites-with-lunr/#build-your-search-index article, I did a minor change, no need to refersh the page and get results directly.

{{< highlight js "linenos=table" >}}
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
        // real-time print out
        console.info("query ",query)
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
          // Update the list with results
          displayResults(results, window.store)
        }else{
          const searchResults = document.getElementById('results')
          searchResults.innerHTML = 'Enter a keyword above to search this site.'
        }
      });
    }

  })

{{< /highlight >}}
Here is the result.
<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/pp84uyM.png">
        <img src="https://i.imgur.com/pp84uyM.png"/>
    </a>
</div>
