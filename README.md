## BÀI TẬP LỚN MÔN LẬP TRÌNH THIẾT BỊ DI ĐỘNG

### MSSV: 21084321

### Họ tên: Nguyễn Huy Hoàng

### Lớp: DHKTPM16A

### Đề tài: Instagram App

### Link Figma: https://www.figma.com/file/0Uwn9cQ49evRnEKmdfs3DV/Nhom-2_BaiTapLon_Instagram_UI?type=design&node-id=0-1&mode=design&t=4EaPCj01YbNKtT5Z-0

### Features:

- Authentication: login, register
- User: get all users, get user, update profile, update password, follow user, unfollow user
- Post: get all posts, get post by id, create post, update post, delete post, like post, unlike post
- Comment: get comments for post, create comment, delete comment, like comment, unlike comment

### Using Technology:

- React Native
- Expo
- NodeJS
- ExpressJS
- MongoDB
- JWT

### API:

- Login : <br/>
  localhost:5000/api/v1/auth/login
- Register : <br/>
  localhost:5000/api/v1/auth/register

- Get all users :<br/>
  localhost:5000/api/v1/users
- Get user :<br/>
  localhost:5000/api/v1/users/:id
- Update profile :<br/>
  localhost:5000/api/v1/users/profile
- Update password : <br/>
  localhost:5000/api/v1/users/update-password
- Follow user :<br/>
  localhost:5000/api/v1/users/:id/follow
- Unfollow user :<br/>
  localhost:5000/api/v1/users/:id/unfollow

- Get all posts : <br/>
  localhost:5000/api/v1/posts
- Get post by id : <br/>
  localhost:5000/api/v1/posts/:id
- Create post : <br/>
  localhost:5000/api/v1/posts
- Update post : <br/>
  localhost:5000/api/v1/posts/:id
- Delete post : <br/>
  localhost:5000/api/v1/posts/:id
- Like post : <br/>
  localhost:5000/api/v1/posts/:id/like
- Unlike post : <br/>
  localhost:5000/api/v1/posts/:id/unlike

- Create comment : <br/>
  localhost:5000/api/v1/posts/:postId/comments
- Delete comment : <br/>
  localhost:5000/api/v1/posts/:postId/comments/:id
- Like comment : <br/>
  localhost:5000/api/v1/posts/:postId/comments/:id/like
- Unlike comment :<br/>
  localhost:5000/api/v1/posts/:postId/comments/:id/unlike

### Install

### Frontend

1. Install depedencies
```
npm install
```
2. Run App 
```
npm start
```

### Backend
1. Install depedencies
```
npm install
```
2. Run database
```
# Delete all data
npm run deleteData

# Insert all data
npm run insertData
```
3. Run App
```
npm run server
```


