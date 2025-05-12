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

## 安装与部署

详细的安装和部署说明请参考 [部署文档](DEPLOYMENT.md)。

## 开发环境设置

### 后端设置

1. 克隆仓库
```bash
git clone <repository-url>
cd eShop
```

2. 创建并激活虚拟环境
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. 安装依赖
```bash
pip install -r requirements.txt
```

4. 配置数据库
   - 在 `djangoProject/settings.py` 中配置数据库连接
   - 默认使用MySQL，数据库名为 `dbproject2`

5. 运行数据库迁移
```bash
python manage.py migrate
```

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

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件