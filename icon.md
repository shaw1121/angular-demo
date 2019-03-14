 ## 图标

1. 使用i标签做小图标

```html
<div class="my_div">
  <i class="icon"></i>
</div>
```
```scss
.icon {
    display: inline-block; // 这样才可以设置长宽
    width: 100px; 
    height: 100px;
    background-image: url(images/a.jpg);
    background-size: 60px 60px; // 设置背景图大小
    background-repeat: no-repeat; // 设置图片不重复显示
}
```

2. 使用图标库 fontawesome 做小图标

引入
```html
<link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">
```

直接在标签中使用该库提供的类就可以添加小图标了，有具体的类可以调节小图标的大小，旋转，还可以自定义小图标的样式。
参见[here](http://www.fontawesome.com.cn/examples/)

```html
<i class="fa fa-camera-retro"></i> fa-camera-retro
```


refer: 
http://www.fontawesome.com.cn/examples/
https://jingyan.baidu.com/album/454316ab3710d2f7a6c03a5f.html?picindex=1