# eShop 电子商城系统

## 项目简介

eShop是一个基于Django和Vue.js开发的全栈电子商城系统，提供了完整的电商平台功能，包括用户管理、商品管理、购物车、订单处理、评论系统等功能。系统支持多种用户角色（顾客、商家、管理员），并提供了响应式的用户界面。

## 项目结构

```
eShop/
├── djangoProject/          # Django项目配置目录
│   ├── settings.py         # 项目设置
│   ├── urls.py             # URL路由配置
│   └── wsgi.py             # WSGI应用配置
├── media/                  # 媒体文件目录
│   ├── avatar/             # 商品图片
│   └── user_avatar/        # 用户头像
├── myApp/                  # Django应用目录
│   ├── migrations/         # 数据库迁移文件
│   ├── CheckView.py        # 审核相关视图
│   ├── cartViews.py        # 购物车相关视图
│   ├── likeStarView.py     # 收藏和点赞相关视图
│   ├── models.py           # 数据模型定义
│   ├── orderViews.py       # 订单相关视图
│   └── views.py            # 基础视图函数
├── template/               # 前端Vue项目目录
│   ├── src/                # Vue源代码
│   │   ├── components/     # Vue组件
│   │   ├── router/         # 路由配置
│   │   ├── store/          # Vuex状态管理
│   │   ├── view/           # 页面视图
│   │   └── App.vue         # 主应用组件
│   ├── public/             # 静态资源
│   └── package.json        # 前端依赖配置
├── manage.py               # Django管理脚本
└── requirements.txt        # Python依赖列表
```

## 功能特性

### 用户系统
- 用户注册、登录和身份验证
- 多角色支持：顾客、商家、管理员
- 个人信息管理
- 地址管理

### 商品管理
- 商品上传、编辑和删除
- 商品分类和搜索
- 商品审核流程
- 商品库存管理

### 购物功能
- 购物车管理
- 商品收藏
- 店铺收藏
- 商品评价

### 订单系统
- 订单创建和管理
- 订单状态跟踪（未付款、待发货、运输中、待确认、已完成）
- 订单历史查询

### 管理功能
- 用户管理
- 商品审核
- 数据统计和可视化
- 用户行为日志

## 系统要求

### 后端环境
- Python 3.8+
- MySQL 5.7+
- pip (Python 包管理器)

### 前端环境
- Node.js 14+
- npm 6+ 或 yarn 1.22+


## 技术栈

### 后端
- Django 4.2
- MySQL数据库
- Django REST framework

### 前端
- Vue.js 2.7
- Vuetify 2.6
- Vuex
- Vue Router
- Axios

## 开发环境设置

### 后端设置

1. 创建并激活虚拟环境
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

2. 安装依赖
```bash
pip install install django mysqlclient django-cors-headers pillow django-imagekit
```

3. 配置数据库
   - 在 `djangoProject/settings.py` 中配置数据库连接
   - 默认使用MySQL，数据库名为 `dbproject2`
   - 在 MySQL 中创建数据库：
   ```sql
   CREATE DATABASE dbproject2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
   - 修改 `djangoProject/settings.py` 中的数据库配置：
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'dbproject2',  # 数据库名
           'USER': 'root',        # 数据库用户名
           'PASSWORD': 'root',    # 数据库密码
           'HOST': '127.0.0.1',   # 数据库主机
           'PORT': '3306',        # 数据库端口
       }
   }
   ```


4. 运行数据库迁移
```bash
python manage.py migrate
```
4. 创建媒体文件目录
```bash
mkdir -p media/avatar
mkdir -p media/user_avatar
mkdir -p media/comments

6. 启动开发服务器
```bash
python manage.py runserver
```

### 前端设置

1. 进入前端目录
```bash
cd template
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run serve
```

4. 构建生产版本
```bash
npm run build
```