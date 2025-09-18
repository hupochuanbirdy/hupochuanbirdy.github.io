---
title: "Flarum Connects to AWS RDs"
date: 2023-08-13T17:06:05+01:00
lastmod: 2023-08-13T17:06:05+01:00
subTitle: ""
description: "In this section, I mainly focus on create a database/ configuration of security group/ connect RDs in local navicat/ update flaurm config file to connect to RDs"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Tutorial","Cloud", "AWS","RDs"]
categories: ["Flarum"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---

> For the majority tutorial, the flarum always connects with the localhost db directly. However, base on my knowledge, once the server shutdown or reboot, the data could be lost, also it's not easy to debug(although flaurm has logs files to record all errors). So I suppose that separate db and flaurm server.


> In this section, I use AWS EC2 and RDs to implement my solution.

> For how to deploy the Flarum in EC2, I will write author article, but to be honest, it's the common way for deploying to any other Linux server.

## Preparation
1. Creating a Database
2. Setting the security group
3. Testing locally(I use navicat) 
4. Updating the config.php in Flarum

## Creating a Database

Here I choose the free tier of RDs which only for the new register user in 12 months.

### 1. Navigate to RDS
<div class="polaroid" style="width:50%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/1fSpwbU.png">
        <img src="https://i.imgur.com/1fSpwbU.png"/>
    </a>
</div>

### 2. Create a DB

Here is my choice, I use mysql and free tier type.

<div class="polaroid" style="width:50%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/P4nS2SC.png">
        <img src="https://i.imgur.com/P4nS2SC.png"/>
    </a>
</div>
<div class="polaroid" style="width:50%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/lLpZXky.png">
        <img src="https://i.imgur.com/lLpZXky.png"/>
    </a>
</div>

Here I select public access directly, because I need to test the connection and create flarum_db locally. (If you forget, just click [modify] button to select the option)
<div class="polaroid" style="width:50%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/OFb2cLD.png">
        <img src="https://i.imgur.com/OFb2cLD.png"/>
    </a>
</div>

###  3. Waiting for initialization
 
Then the new record has created now.

<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/IMpn41Y.png">
        <img src="https://i.imgur.com/IMpn41Y.png"/>
    </a>
</div>

In the **Connectivity & security** ,  Endpoint is the connection link.
<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/8z8FIL5.png">
        <img src="https://i.imgur.com/8z8FIL5.png"/>
    </a>
</div>

## Update the security group

Although, It can be accessed publicly, but might show [1002 fail connect to db ] error. 

Click [VPC security groups] to navigate to the Security Groups panel. Edit the Inbound rule.

Turn on 3360 port is necessary, and I allow all the traffic to access(In production env, need to delete)

<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/KDBZboG.png">
        <img src="https://i.imgur.com/KDBZboG.png"/>
    </a>
</div>


## Testing locally

### 1. Create a new connection

<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/1PQ9ECz.png">
        <img src="https://i.imgur.com/1PQ9ECz.png"/>
    </a>
</div>

Paste the Endpoint and the username/password, and test connection. In my case, it connects to RDs expectly.


<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/vy51z0d.png">
        <img src="https://i.imgur.com/vy51z0d.png"/>
    </a>
</div>

## Flarum part

If You have deployed Flarum before, just change the config.php.
If You are in the initialization step, just directly fill in RDs.

Here is the CLI to the folder I deploy the flarum.

<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/gWm8EXZ.png">
        <img src="https://i.imgur.com/gWm8EXZ.png"/>
    </a>
</div>


{{< highlight bash "linenos=table" >}}
cd /var/www/html/forum/
// admin role
sudo su
ls
vim config.php 

//exist and save
:wq
{{< /highlight >}}
<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/grEQyAW.png">
        <img src="https://i.imgur.com/grEQyAW.png"/>
    </a>
</div>



Thanks!