---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
description: "A compelling description of your post (150-160 characters ideal)"
draft: false
featured: false
type: posts
author: "tothemoon"
tags: ["tag1", "tag2"]
categories: ["Category"]
cover:
    image: "path/to/your/image.jpg"
    alt: "Descriptive alt text for the image"
    caption: "Image caption if needed"
seo:
    canonical: ""  # Leave empty for auto-generation
---