## angular 表单

### 响应式表单和模板驱动表单

Angular 提供了两种不同的方法来通过表单处理用户输入：**响应式表单**和**模板驱动表单**。 两者都从视图中捕获用户输入事件、验证用户输入、创建表单模型、修改数据模型，并提供跟踪这些更改的途径。

不过，响应式表单和模板驱动表单在如何处理和管理表单和表单数据方面有所不同。各有优势。

一般来说：

* 响应式表单更健壮：它们的可扩展性、可复用性和可测试性更强。 如果表单是应用中的关键部分，或者你已经准备使用响应式编程模式来构建应用，请使用响应式表单。

* 模板驱动表单在往应用中添加简单的表单时非常有用，比如邮件列表的登记表单。它们很容易添加到应用中，但是不像响应式表单那么容易扩展。如果你有非常基本的表单需求和简单到能用模板管理的逻辑，请使用模板驱动表单。