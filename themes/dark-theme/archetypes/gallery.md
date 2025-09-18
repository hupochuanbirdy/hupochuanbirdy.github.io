---
title: "{{ replace .Name "-" " " | title }}"
date: { { .Date } }
subTitle: "subTitle"
description: "this is description"
draft: false
type: gallery
layout: gallery
avator: { { .Site.Params.authorAvatar } }
author: { { .Site.Params.author } }
tags: [ "tag1" ]
categories: [ "cate1" ]
image: ""
images:
  - src: ""
    alt: ""
    caption: ""
    credit: "Photo: "{ { .Site.Params.author } }
---

