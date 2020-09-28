import axios from 'axios'

//配置默认的参数
axios.defaults.baseURL = 'http://localhost:3001';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式

//发表文章
export function postArticle({type,title,content,tag,surface}){
  return axios.post("/article/add",{type,title,content,tag,surface});
}

/*请求文章*/
export function getArticle(skip=0,limit=5) {
  return axios.get("/article/get"+`?skip=${skip}&limit=${limit}`);
}

/*删除文章*/
export function deleteArticle(_id) {
  if(!_id){
    return Promise.reject();
  }
  return axios.post("/article/delete",{_id});
}

/*更新文章*/
export function updateArticle(_id,options) {
  return axios.post("/article/update",{_id,options});
}

/*请求articleInfo*/
export function getArticleInfo(){
  return axios.get("/article/getInfo")
}


/*请求用户列表*/
export function getUserList(){
  return axios.get("/user/get");
}

/*请求单个用户数据*/
/*export function getUserInfo(_id){
  return axios.get("/user/info?_id="+_id);
}*/

/*删除用户*/
export function deleteUser(_id) {
  return axios.post("/user/delete",{_id});
}

/*更新用户数据*/
export function updateUser(_id,data) {
  return axios.post('/user/update',{_id,data});
}



/*请求留言列表*/
export function getMessageList() {
  return axios.get("/message/get");
}
/*删除留言*/
export function deleteMessage(_id) {
  return axios.post("/message/delete",{_id});
}


/*发表日记*/
export function postDiary(txt,img) {
  return axios.post("/diary/submit",{txt,img});
}
/*请求日记*/
export function getDiary() {
  return axios.get("/diary");
}
/*删除日记*/
export function deleteDiary(_id) {
  return axios.post("/diary/delete",{_id});
}

/*发表友链*/
export function postLinks(options) {
  return axios.post("/links/submit",options);
}
/*请求友链*/
export function getLinks() {
  return axios.get("/links");
}
/*删除友链*/
export function deleteLinks(_id) {
  return axios.post("/links/delete",{_id});
}

/*登陆接口*/
export function login(options) {
  return axios.post('/login',options);
}
/*验证登陆*/
export function ifLogin() {
  return axios.post("/login/ifLogin");
}
