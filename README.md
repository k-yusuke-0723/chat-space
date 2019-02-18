# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



# DB設計


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :members
- has many :messages
- has many :groups, through: :members



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|

### Association
- has_many :members
- has many :users, through: :members




## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user




## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- has many :members





