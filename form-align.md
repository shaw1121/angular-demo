 ## 如何实现模态框中表单的对齐

> label 和 input 不是嵌套关系，写标签的时候一定要注意，教训


 eg1

 ```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            form {
                    margin-bottom: 18px;
                }

                .formField {
                    overflow: auto;
                    width: 100%;
                    margin: 5px 0;
                }

                label {
                min-width: 130px;
                float: left;
                display: block;
                margin-right: 5px;
                text-transform: capitalize;
            }

                .formText {
                    display: block;
                    float: left;
                }

        </style>
    </head>
    <body>
        <form action="./" method="post" class="form">
                <div class="formField clearfix">
                    <label for="firstName">first name:</label>
                    <input type="text" class="formText" id="firstName"/>
                </div>
                <div class="formField clearfix">
                    <label for="lastName">last name:</label>
                    <input type="text" class="formText" id="lastName" />
                </div>
                <div class="formField clearfix">
                    <label for="email">email address:</label>
                    <input type="text" class="formText" id="email"/>
                </div>
                <div class="formField clearfix">
                    <label for="blog">blog:</label>
                    <input type="text" class="formText" id="blog"/>
                </div>
            </form>
    </body>
</html>
 ```


 refer:
 https://blog.csdn.net/sinat_27714067/article/details/52895963