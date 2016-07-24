---
layout: post
title: 在 CentOS 7 上搭建 Docker 私有仓库
data: 2016-07-24
tags: docker
comments: true
---

我们知道，执行 docker pull 某镜象，默认都是从 [Docker Hub](https://hub.docker.com/) 的公共仓库去获取的。这有点像全球最大的代码托管商：Github，但对于公司而言，也行我们更加需要是的自建的仓库服务，所以我们用自建的 Gitlab 代替 Github，那有什么可以替代 Docker Hub 呢？答案是：自建 Docker Registry。以下是自己的一点实践：

## 安装环境

docker-engine 使用了最新的 1.11.2 版本。

```
[root@crh211 ~]# docker version
Client:
 Version:      1.11.2
 API version:  1.23
 Go version:   go1.5.4
 Git commit:   b9f10c9
 Built:        Wed Jun  1 21:23:11 2016
 OS/Arch:      linux/amd64

Server:
 Version:      1.11.2
 API version:  1.23
 Go version:   go1.5.4
 Git commit:   b9f10c9
 Built:        Wed Jun  1 21:23:11 2016
 OS/Arch:      linux/amd64
```

操作系统采用 CentOS 7, 内核 `3.10.0-229.el7.x86_64`

## Docker Registry

一开始照着 [这里](https://yeasy.gitbooks.io/docker_practice/content/repository/local_repo.html) 的教程安装了一下，发现在 push 镜象时，会报错。应该是跟 `https` 相关的问题，查阅了一下 [官方资料](https://docs.docker.com/registry/insecure/)，依照提示想给 docker 启动增加参数：

```
DOCKER_OPTS="--insecure-registry myregistrydomain.com:5000"
```

但重启 docker 后好像没反应，试了好多种类似的方案都不行。看来要换种思路。一路找下去找到了 Docker Registry 2.0，抛弃了 insecure 的运行方式，而是采用了自建证书的认证方式。

### 生成证书


```
mkdir -p certs && openssl req \
  -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key \
  -x509 -days 365 -out certs/domain.crt
  
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:Zhengjiang
Locality Name (eg, city) []:Hangzhou
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Cairenhui
Organizational Unit Name (eg, section) []:FE
Common Name (e.g. server FQDN or YOUR name) []:192.168.1.211:5000
Email Address []:wuwj@cairenhui.com  
```

接下来将刚生成的 `certs/domain.crt` 复制到 `/etc/docker/certs.d/192.168.1.211:5000/ca.crt`，并**重启 docker**。

### 安装 Docker Registry 2.0

```
docker run -d -p 5000:5000 --restart=always --name registry \
  -v /root/certs:/certs \
  -v /opt/data:/var/lib/registry \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  registry:2
```

## 问题

安装完后在 push 镜象时还是遇到了一点小问题：

```
x509: cannot validate certificate for 192.168.1.211 because it doesn't contain any IP SANs
```

### 解决办法：

修改 `/etc/pki/tls/openssl.cnf` 配置，在该文件中找到 `[ v3_ca ]`，在它下面添加如下内容：

```
[ v3_ca ]
# Extensions for a typical CA
subjectAltName = IP:192.168.1.211
```

再次重启 docker，问题解决。

至此，`docker registry` 私有仓库安装成功。
接下来可以随时登录公司的 VPN 去 pull 镜象了，正式登上 docker 这艘大船初步探入云时代了。
