scp ubuntu@1.117.47.136:/var/www  /Users/birdyyoung/Documents/program/flarum-app



scp -r ubuntu@1.117.47.136:/var/www  /Users/birdyyoung/Documents/program/flarum-app

```
scp /Applications/XAMPP/xamppfiles/htdocs/flarum/public/assets/static/shareImage.js ubuntu@1.117.47.136:/var/www/html/forum/public/assets/static
```

Http123456/









# 百科

权限：允许所有注册用户编辑 

日志：需要日志记录用户编辑痕迹

用户：用户和论坛用户同步

后台： 

1. table 所有的百科列表
2. 提供一个入口，允许用户使用Markdown 编辑器（类似于富文本）
3. 分类管理（admin权限）
4. 日志管理
5. 用户管理

前端：

1. 百科页面 也能直接编辑，需要把内容回显到编辑器上

   

http://aizuda.com/wiki/1083472/1084862 





##  后台逻辑

1. 分类（category）页面管理 Tree structure
2. 标签（tag）页面管理  //待定，不确定和分类的区别
3. wiki文章列表管理 ✅
4. wiki MK文本页面
5. 热门管理 hot 表
6. 用户管理列表（仅允许删除，不允许add）
7. 日志管理 (action not AOP) ✅
8. 图片上传 imgur 图床 (非关联上传完成，后期需要使用token俩关联图片和账户) ✅



## 前端

1. 分类（category）页面管理

2. 标签（tag）页面管理  

3. wiki文章列表管理 ✅

4. wiki MK文本页面

5. 热门管理 hot 表

6. 用户管理列表

7. 日志管理 (action not AOP) ✅

   

## 网站

[ ] 主页

[ ] 全局搜索

[ ] 文章页面

[ ] 评论功能

[ ] 浏览量统计

[ ] 热门



### 09/07/2023

#### Update

WikiArticle CRUD 简单测试

imgur图床图片上传



#### 新增需求

标签管理 / **分类管理**（categoryType） / 热门管理

#### Client ID: 495ce33da2f8252

#### Client secret: e8c197682360944a96322dd2aef0f3a6a194db8f



#### Client ID:  742668c4a4ebebb

#### Client secret: 930dae01db7c99632f4bb9cb298e385a31ced97f



###  10/07/2023

#### Update 

WikiArticle DB change, userid --> created_by

create a new DB: category_type

#### Need

分类管理category， tree结构



###  11/07/2023

#### Update

标签管理

####  14/07/2023

#### Update

新增两个API， 查询分类和标签

分类为树形结构

​					

###  14/07/2023

NEW 🆕 Needs新的需求

热门表

用户收藏表

热门分类表

###  17/07/2023

#### Update

需要记录标签/分类的使用次数，可能需要新建立一个中间表来记录每篇文章的标签使用次数，如果tags表更新，删除，关联表也需要做同样的操作（？）

###  21/07/2023

有一些改动：

新增文章只需要返回200

更改文章也只需要返回200





**普通用户功能** 

- [ ] 新增/修改文章

已存在修改的文章，其他用户不可点击修改

- [ ] 查看编辑历史

- [ ] 点赞功能

- [ ] 收藏夹功能

- [ ] 全局搜索

  

**管理员功能**

- [ ] 文章管理 
  1.  新增/修改/删除
  2. 热门管理
- [ ] 标签管理 （CRUD）

当某标签（删除）下存在某文章，将此文章移至“其他”标签

- [ ] 分类管理（CRUD）

当某分类（删除）下存在某文章，将此文章移至“其他”分类

- [ ] 编辑历史管理（RUD）

- [ ] 用户管理（所有用户必须是论坛注册用户）

  1. 黑名单管理 （账户禁用）
  2. 用户操作管理（记录禁止用户的某些操作，例如点赞）

  



**安全方面**

- 所有接口都需要携带JWT进行验证
- rate limit限制，防止恶意刷新
- 短时间内连续点赞次数多的用户被禁止点赞一天
- 多次恶意请求的用户封号处理
- 所有对文章操作的行为都需要记录到日志中（操作时间，操作方法，ip等）



**UI**

- [ ] 主页
  1. 直接显示9条文章
  2. 标签栏
  3. 分类bar
  4. 贡献者栏
  5. 热门推荐
- [ ] 文章详情页面

1. 左侧内容，右侧TOC目录

- [ ] 登陆页面

- [ ] 后台Dashboard

  

  

  

  https://blog.csdn.net/StrugglingXuYang/article/details/118109455 浏览量 +1

  http://tinymce.ax-z.cn/download-all.php  Richtext

  

  

  

  

  

  

  

  scp -i /Users/birdyyoung/Desktop/witchkey.pem /Users/birdyyoung/Desktop/banner.css ubuntu@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com:/var/www/html/forum/public/assets/static

  

  scp -i /Users/birdyyoung/Desktop/witchkey.pem /Users/birdyyoung/Desktop/composer.json ubuntu@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com:/tmp
  ssh -i /Users/birdyyoung/Desktop/witchkey.pem ubuntu@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com
  sudo mv /tmp/composer.json /var/www/html/forum/

  

  

  

  scp -i /Users/birdyyoung/Desktop/witchkey.pem /Users/birdyyoung/Desktop/images.pnf ubuntu@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com:/tmp

  ssh -i /Users/birdyyoung/Desktop/witchkey.pem ubuntu@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com
  sudo mv /tmp/images  /var/www/html/forum/public/assets/static

  

  scp -i /path/to/your/private/key.pem -r /path/to/local/folder username@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com:/var/www/html/forum

  

  scp -i /Users/birdyyoung/Desktop/witchkey.pem   -r  /Users/birdyyoung/Desktop/avatars ubuntu@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com:/tmp

  ssh -i /Users/birdyyoung/Desktop/witchkey.pem ubuntu@ec2-15-164-50-199.ap-northeast-2.compute.amazonaws.com
  sudo mv /tmp/avatar  /var/www/html/forum/public/assets

  

  

  

