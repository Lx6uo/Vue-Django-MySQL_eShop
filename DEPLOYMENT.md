# eShop 部署文档

本文档提供了 eShop 电子商城系统的详细部署指南，包括环境配置、数据库设置和启动步骤。

## 系统要求

### 后端环境
- Python 3.8+
- MySQL 5.7+
- pip (Python 包管理器)

### 前端环境
- Node.js 14+
- npm 6+ 或 yarn 1.22+

## 部署步骤

### 1. 准备工作

1. 克隆代码仓库
```bash
git clone <repository-url>
cd eShop
```

2. 创建 Python 虚拟环境（推荐）
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

### 2. 后端部署

1. 安装 Python 依赖
```bash
pip install -r requirements.txt
```

如果 requirements.txt 不存在，请安装以下依赖：
```bash
pip install django==4.2 mysqlclient django-cors-headers pillow django-imagekit
```

2. 配置数据库
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

3. 执行数据库迁移
```bash
python manage.py migrate
```

4. 创建媒体文件目录
```bash
mkdir -p media/avatar
mkdir -p media/user_avatar
mkdir -p media/comments
```

5. 收集静态文件（生产环境）
```bash
python manage.py collectstatic
```

### 3. 前端部署

1. 进入前端目录
```bash
cd template
```

2. 安装依赖
```bash
npm install
```

3. 构建生产版本
```bash
npm run build
```
   构建完成后，静态文件将生成在 `template/dist` 目录中。

### 4. 整合前后端

Django 已配置为直接提供前端构建的静态文件，无需额外配置。

### 5. 启动应用

#### 开发环境

1. 启动 Django 开发服务器
```bash
python manage.py runserver
```

2. 在另一个终端中启动 Vue 开发服务器（可选，仅开发时需要）
```bash
cd template
npm run serve
```

#### 生产环境

在生产环境中，建议使用 Gunicorn 或 uWSGI 作为 WSGI 服务器，并使用 Nginx 作为反向代理。

1. 安装 Gunicorn
```bash
pip install gunicorn
```

2. 启动 Gunicorn
```bash
gunicorn djangoProject.wsgi:application --bind 0.0.0.0:8000
```

3. Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your_domain.com;

    location /static/ {
        alias /path/to/eShop/template/dist/static/;
    }

    location /media/ {
        alias /path/to/eShop/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 数据库初始化（可选）

如果需要初始化一些基础数据，可以创建 Django fixture 或使用管理命令：

```bash
python manage.py loaddata initial_data.json
```

## 常见问题

### 数据库连接问题

- 确保 MySQL 服务已启动
- 验证数据库用户名和密码正确
- 检查数据库名称是否正确

### 静态文件不显示

- 确保已运行 `collectstatic` 命令
- 检查 `STATIC_URL` 和 `STATIC_ROOT` 配置
- 验证 Nginx 配置中的静态文件路径

### 媒体文件上传问题

- 确保媒体目录存在且有写入权限
- 检查 `MEDIA_URL` 和 `MEDIA_ROOT` 配置

## 安全注意事项

在生产环境中部署时，请注意以下安全事项：

1. 修改 `settings.py` 中的 `SECRET_KEY`
2. 设置 `DEBUG = False`
3. 更新 `ALLOWED_HOSTS` 为实际域名
4. 使用环境变量存储敏感信息（如数据库密码）
5. 配置 HTTPS

## 系统维护

### 数据库备份

```bash
mysqldump -u root -p dbproject2 > backup.sql
```

### 代码更新

```bash
git pull
python manage.py migrate  # 如有数据库变更
cd template
npm run build  # 如有前端变更
python manage.py collectstatic  # 更新静态文件
```

### 日志管理

生产环境中建议配置日志记录：

```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': '/path/to/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```