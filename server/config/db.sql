CREATE DATABASE 'db_blog'

CREATE table IF NOT EXISTS 't_user'(
    'id' BIGINT(20) PRIMARY KEY auto_increment,
    'name' VARCHAR(20) not null,
    'avatar' VARCHAR(255) NOT NULL default "",
    'password' VARCHAR(20) not null,
    'identify' int(1) not null DEFAULT 2 comment "用户角色：1-管理员；2-普通用户",
    'c_time' TIMESTAMP default CURRENT_TIMESTAMP,
    'u_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    'status' int(1) not null comment "用户状态：1-正常；2-锁定；3-失效；4-已删除"
);

CREATE table IF NOT EXISTS 't_blog'(
    'id' BIGINT(20) PRIMARY KEY auto_increment,
    'title' VARCHAR(20) not NULL,
    'category_id' BIGINT(20) not NULL,
    'auth_id' BIGINT(20) not NULL,
    'auth_name' VARCHAR(20) not NULL,
    'logo' VARCHAR(255) not NULL,
    'brief' varchar(255) not NULL,
    'detail' text not NULL,
    'read_num' BIGINT(20) default 0,
    'c_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    'u_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    'status' int(1) default 1 comment "文章状态：1-正常 2-下架 3-已删除"
);

CREATE TABLE IF NOT EXISTS 't_category'(
    'id' BIGINT(20) PRIMARY KEY auto_increment,
    'category' VARCHAR(20) not null,
    'blogNum' BIGINT(30) not null,
    'c_time' TIMESTAMP default CURRENT_TIMESTAMP,
    'u_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP,
    'status' int(1) not NULL DEFAULT 1 comment "分类状态：1-正常 2-下架 3-已删除"
);

CREATE table IF NOT EXISTS t_comment(
    'id' BIGINT(20) PRIMARY KEY auto_increment,
    'blog_id' BIGINT(20) not NULL,
    'parent' BIGINT(20),
    'comment' VARCHAR(500) not NULL,
    'user' VARCHAR(20) not null,
    'user_avatar' VARCHAR(255) not NULL,
    'c_time' TIMESTAMP default CURRENT_TIMESTAMP,
    'u_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP
);

CREATE table IF NOT EXISTS t_tag(
    'id' BIGINT(20) PRIMARY KEY not NULL,
    'tag' VARCHAR(10) not NULL,
    'c_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    'u_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE table IF NOT EXISTS IF NOT EXISTS t_blog_tag(
    'id' BIGINT(20) PRIMARY KEY auto_increment,
    'tag_id' BIGINT(20) not NULL,
    'blog_id' BIGINT(20) not NULL,
    'c_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    'u_time' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
