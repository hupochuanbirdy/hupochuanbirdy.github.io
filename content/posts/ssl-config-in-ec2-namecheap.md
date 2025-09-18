---
title: "SSL Configration in Ec2 Namecheap"
date: 2024-09-13T09:26:31+01:00
lastmod: 2025-09-17T09:26:31+01:00
subTitle: ""
description: ""
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Namecheap", "AWS","SSL"]
categories: ["Tutorial"]
cover:
    position: <left,right>
    image: "https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2025-09-17/cover_ssl_namechape.png"
    alt: "<alt text>"
    caption: "<text>"
---

> In this section, I will show you how to config the SSL in Namecheap and AWS EC2.

## Preparation
1. Buy a domain name
2. Buy a SSL certificate
3. Generate a key and csr file
4. Config the SSL in Namecheap
5. Config the SSL in AWS EC2 ubuntu

## Buy a domain name
Go to [Namecheap](https://www.namecheap.com/) and buy a domain name.   

## Buy a SSL certificate

Go to Dashboard -> SSL Certificates -> Buy SSL Certificates.

## Generate a key and csr file

Go to [csrgenerator.com](https://decoder.link/csr_generator) and generate a key and csr file.
You can use online tools to generate the key and csr file. or the following command in Mac:

{{< highlight bash "linenos=table" >}}
openssl req -new -newkey rsa:2048 -nodes -keyout yoursite.key -out yoursite.csr
{{< /highlight >}}

## Config the SSL in Namecheap

Go to [SSL Certificates page](https://ap.www.namecheap.com/ProductList/SslCertificates) and click "Reissue" or "Issue" in the "SSL Certificates" section.
Paste the csr file content into the "CSR" field. Then click "Next" button. Wait for a while, you will see the SSL certificate is ready.
  <div class="polaroid">
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-13+at+17.07.12.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-13+at+17.07.12.png"/>
    </a>
</div>

Then, Go to the "Domains List" --> "Manage" --> "Advanced DNS" --> "Manage" --> "SSL Certificates".
  <div class="polaroid">
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-21+at+14.38.12.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-21+at+14.38.12.png"/>
    </a>
</div>

In my case, I config www, www.site as the domain name. The most important thing is to add "CNAME Record"  for the domain name. If the domain name abc.xxx.com, the Host ofCNAME Record is should be "_0fxxxd.abc", if the domian name you want to config is www.xxx.com, the Host ofCNAME Record is should be "_0fxxxd." Don't forgot the ".".

### Where to find the CNAME Record

In the "SSL Certificate" section, you can see this page and this is the place to get CNAME Record.

  <div class="polaroid">
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/uncollection.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/uncollection.png"/>
    </a>
</div>

  <div class="polaroid">
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-21+at+14.52.43.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-21+at+14.52.43.png"/>
    </a>
</div>

Once you add the CNAME Record, wait for a while, the status of the SSL certificate will be changed from "Pending Validation" to "Verfiy" which me
you can see [download] button in SSL Certificates page.

  <div class="polaroid">
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-21+at+14.53.25.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-09-13/Screenshot+2024-09-21+at+14.53.25.png"/>
    </a>
</div>

Download the SSL certificate in [SSL Certificates page](https://ap.www.namecheap.com/ProductList/SslCertificates). Last step is to config the SSL in AWS EC2.


## Config the SSL in AWS EC2

Log in to EC2. If this is the first time configuring, you'll need to create a folder yourself to store the SSL files.

{{< highlight bash "linenos=table" >}}
sudo mkdir /etc/ssl/
{{< /highlight >}}

Create three files in this folder: certificate.ca-bundle, certificate.crt, and certificate.key(private key). The command is:

{{< highlight bash "linenos=table" >}}
touch certificate.ca-bundle
touch certificate.crt
touch certificate.key
{{< /highlight >}}

Open the files downloaded from Namecheap using a text editor, copy the corresponding content into the respective files, and save them. You may find that there is no `.key` file, but in fact, the key file was already generated when you first created the CSR (Certificate Signing Request)'s PRIVATE KEY.

  <div class="polaroid">
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2025-09-17/csr_generator.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2025-09-17/csr_generator.png"/>
    </a>
</div>


### Configure under the apache2 folder

{{< highlight bash "linenos=table" >}}
cd /etc/apache2/sites-available
ls
cat 000-default.conf
{{< /highlight >}}

In 000-default.conf file: ServerName and ServerAlias should be the domain name you want to config. abc is sub domain name of xxx.com.

In my case, I only want to use visit the site by https://abc.xxx.com, so I need to add the following content into the 000-default.conf file.

```bash
<VirtualHost *:443>
ServerAdmin admin@example.com
DocumentRoot /var/www/html/forum/public
ServerName abc.xxx.com
ServerAlias abc.xxx.com

<Directory /var/www/html/forum/public/>
Options FollowSymLinks
AllowOverride All
Require all granted
</Directory>

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTP_HOST} !^abc\.xxx\.com$ [NC]
RewriteRule ^ - [F]
</IfModule>

SSLEngine on
RewriteCond %{HTTPS} !=on
RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R=301,L]
SSLCertificateFile /etc/ssl/certificate.crt
SSLCertificateKeyFile /etc/ssl/certificate.key
SSLCertificateChainFile /etc/ssl/certificate.ca-bundle

</VirtualHost>
```


"Open the `000-default.conf` file. I have already configured it, and you can see that port 443 is pointing to the SSL files that were just downloaded and uploaded to the server. If you need to make changes..." 

Last step is to restart the apache2 service.

```bash
sudo a2enmod ssl
sudo a2ensite 000-default.conf
sudo apache2ctl configtest

sudo systemctl reload apache2

// check again --- Verify vhosts

sudo apache2ctl -S
→ should now show both *:80 and *:443.

```

Now, you can visit the site by https://abc.xxx.com.