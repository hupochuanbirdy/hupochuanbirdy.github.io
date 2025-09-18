# Interface 接口文档

## 【1】Sptingboot定时任务 动态定时器

### 描述

[![z6kIvn.png](https://s1.ax1x.com/2022/12/06/z6kIvn.png)](https://imgse.com/i/z6kIvn)

当数据库中的优惠券快过期，在过期的那个时间点执行定时任务

如果项目被重新启动，需要重新执行定时任务（不论执行过没有）

### 需要执行的操作

更新coupon表的status字段，符合更新的数据指优惠券没有使用并且已经过期

更新过期成功后，删除此定时任务

### 参考

https://blog.csdn.net/weixin_43081541/article/details/126425311

https://blog.csdn.net/qq_18432653/article/details/107810980

