---
title: "Ubuntu 22.04.3: Chinese Search in Flarum and How to fix 'PHP Notice: fwrite(): send failed with errno=32 Broken pipe' error in my case"
date: 2024-02-11T19:24:37Z
lastmod: 2024-02-11T19:24:37Z
subTitle: ""
description: "In this section, I primarily focus on utilizing the Sonic extension to implement Chinese text search. In my case, the server-side encounters some errors. I will list how I can debug and fix them."
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Tutorial","Cloud", "AWS","PHP"]
categories: ["Flarum"]
cover:
    position: right
    image: "https://i.imgur.com/0myESli.png"
    alt: "<alt text>"
    caption: "<text>"
---
> The main content of this article is to use the Sonic engine to enable Flarum to search Chinese as well.

> In my Flarum, the search module isn't perfect enough so far, almost all the discussions are using Chinese, so the default search module doesn't work. Here, in this section, I primarily focus on utilizing the Sonic extension to implement Chinese text search. In my case, the server-side encounters some errors. I will list how I can debug and fix them.

## Extensions 

Here is the plugin link.

https://discuss.flarum.org/d/28826-flarum-sonic

## Install Sonic env in Ubuntu 22.04.3

My sever is micro tier, so I will choose docker to install sonic env. If you are unfamiliar with docker, you can consider it's a standalone container/server. In this container, you can install everything just as you would on a server.

### Install Docker

To install Docker on Ubuntu, you can follow these steps:

1. Update your system's package index
2. Install the required dependencies
3. Add the official Docker GPG key
4. Set up the stable Docker repository (Replace $(lsb_release -cs) with the codename of your Ubuntu release if it's not automatically detected.)
5. Install Docker
6. Verify that Docker is installed 

{{< highlight bash "linenos=table" >}}
 
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg 
| sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] 
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" 
| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


# here replace $(lsb_release -cs) 
# for example
# echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu focal stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


sudo apt install docker-ce docker-ce-cli containerd.io

sudo docker --version
{{< /highlight >}}

when run ```sudo docker --version``` you will see the version in the terminal

### Install Sonic in docker

v1.4.8 is the latest version so far, you can replace any version you want

{{< highlight bash "linenos=table" >}}
docker pull valeriansaliou/sonic:v1.4.8

{{< /highlight >}}

Now, create a config file for snoic, I set up config.cfg under my home folder, the path it's up to you.

you need root permission.

{{< highlight bash "linenos=table" >}}
cd /home

# create sonic folder under home path
mkdir sonic

sudo vim /home/sonic/config.cfg

# or 
cd sonic
sudo vim config.cfg
{{< /highlight >}}

in the config.cfg, just copy paste the default content the developer provided
{{< highlight toml "linenos=table" >}}

[server]

log_level = "error"

[channel]

inet = "0.0.0.0:1491"
tcp_timeout = 30

auth_password = "SecretPassword"

[channel.search]

query_limit_default = 10
query_limit_maximum = 100
query_alternates_try = 4

suggest_limit_default = 5
suggest_limit_maximum = 20

[store]

[store.kv]

path = "/var/lib/sonic/store/kv/"

retain_word_objects = 1000

[store.kv.pool]

inactive_after = 1800

[store.kv.database]

flush_after = 900

compress = true
parallelism = 2
max_files = 100
max_compactions = 1
max_flushes = 1
write_buffer = 16384
write_ahead_log = true

[store.fst]

path = "/var/lib/sonic/store/fst/"

[store.fst.pool]

inactive_after = 300

[store.fst.graph]

consolidate_after = 180

max_size = 2048
max_words = 250000
{{< /highlight >}}

Then, save the file and exit.

### Install Sonic extension

{{< highlight bash "linenos=table" >}}
composer require ganuonglachanh/sonic
{{< /highlight >}}

Navigate to you admin panel, switch on the extension, no need to change anything, just save it.

### Running Sonic

In the server, switch to root permission to run:

{{< highlight bash "linenos=table" >}}
docker run -p 1491:1491 -v /home/sonic/config.cfg:/etc/sonic.cfg -v ~/sonic/store/:/var/lib/sonic/store/ valeriansaliou/sonic:v1.4.8
{{< /highlight >}}

Then, navigate to fluarm folder run:

{{< highlight bash "linenos=table" >}}
php flarum sonic:addtoindex
{{< /highlight >}}

If it prints the "xxx successfully!", you are lucky, all the steps have done! We can highlight the keyword

{{< highlight css "linenos=table" >}}
.DiscussionListItem-main mark {
    background: #ffff80 !important;
}
{{< /highlight >}}

## Error: PHP Notice: fwrite(): send failed with errno=32 Broken pipe
If there are tons of error print it out, like this, well, let's debug it.

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/3Mu8hlT.png">
        <img src="https://i.imgur.com/3Mu8hlT.png"/>
    </a>
</div>

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/nVQGEby.png">
        <img src="https://i.imgur.com/nVQGEby.png"/>
    </a>
</div>

### ✨ Copy same env

It's quite complex, to be honest. I created another instance and RDS to test whether the issue is due to my server environment or something else. Additionally, I don't want to impact my current production environment.

Oh, also need to create a new security group, and open port 80, 22(If you don't mind the security issue in test env, also can allow all traffic)

<div class="polaroid" style="width:40%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/vxfCa5q.png">
        <img src="https://i.imgur.com/vxfCa5q.png"/>
    </a>
</div>

Just make the version is the same as the production env.

Follow my [previous blog](https://hupochuanbird.github.io/posts/flarum-deploy-to-cloud/), I installed php env, composer, and flarum.

Don't forget to edit composer.json file, and delete composer.lock. Then install again. The CLI is
{{< highlight bash "linenos=table" >}}
composer install
{{< /highlight >}}


After that, In RDS section, need to set up EC2 connection.
<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/0BdfhdY.png">
        <img src="https://i.imgur.com/0BdfhdY.png"/>
    </a>
</div>
<div class="polaroid" style="width:50%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/DSaQcCw.png">
        <img src="https://i.imgur.com/DSaQcCw.png"/>
    </a>
</div>

Also I exported my sql from RDS, and imported my test mysql env. 

### Debug in Test env

Now, follow the snoic installation.
In snoic source code, we can find the entry. I don't understand PHP code, but I know where the error is printed out. The logic is to retrieve all the public posts and push them somewhere. In this code, I need to find where the first error occurs. 
 
<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgur.com/hkPsV6A.png">
        <img src="https://i.imgur.com/hkPsV6A.png"/>
    </a>
</div>
I changed the code directly, added a break inside the loop, and printed every content retrieved.

{{< highlight php "linenos=table" >}}
foreach ($posts as $post) {
    $start = microtime(true);
    $content = strip_tags($post->content);
    if (trim($content) !== '') {
        try {
            $this->info("Post ID: {$post->id}, Content: $content");
            $ingest->push('postCollection', 'flarumBucket', $post->id, $content, $locale);
        } catch (\Throwable $e) {
            $this->info(PHP_EOL);
            $this->error("Post id {$post->id} with " . strlen($content) . ' bytes of content failed after ' . round((microtime(true) - $start) * 1000, 2) . 'ms');
            break; // Break out of the loop on exception
        }
    }
    $progress->advance();
}

{{< /highlight >}}

I received 700 normal contents, and then it jumped out of the loop. Now I see that the error part is very long and large because one of the users typed a lot of content in one section. 

I have two solutions: split the content or simply ignore long content. I choose the latter one, as it is easier, albeit at the cost of some search accuracy

{{< highlight php "linenos=table" >}}
$posts = Post::select('id', 'content')
    ->where('type', '=', 'comment')
    ->where('is_approved', 1)
    ->where('is_private', 0)
    ->whereNull('hidden_at')
    ->whereBetween('id', [1, 1130])
    ->orWhereBetween('id', [1134, 1172])
    ->get();
{{< /highlight >}}

I already know the post ID for the long content, so I skipped those. Then, I ran the CLI in the Flarum path:{{< highlight bash "linenos=table" >}}
php flarum sonic:addtoindex
{{< /highlight >}}

All the test pass!


I also try to split the content, but didn't work😭😭😭, can anyone tell me the reason?

{{< highlight php "linenos=table" >}}
$chunkSize = 10000; // Set your desired chunk size

foreach ($posts as $post) {
    $this->info("Post ID: {$post->id}, Content: {$post->content}");
    $start = microtime(true);
    $content = strip_tags($post->content);

    // Split the content into chunks
    $contentChunks = str_split($content, $chunkSize);

    foreach ($contentChunks as $chunk) {
        if (trim($chunk) !== '') {
            try {
                $ingest->push('postCollection', 'flarumBucket', $post->id, $chunk, $locale);
            } catch (\Throwable $e) {
                $this->info(PHP_EOL);
                $this->error("Post id {$post->id} with " . strlen($chunk) . ' bytes of content failed after ' . round((microtime(true) - $start) * 1000, 2) . 'ms');
                break 2; // Break out of both inner and outer loops on exception
            }
        }
    }

    $progress->advance();
}
{{< /highlight >}}
