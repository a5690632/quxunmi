import line from '../line'



const USER = {
    USER_INFO: `${line}/api/rest/v1x0/getUserInfoById`,//获取用户数据
    EDIT_DATA: `${line}/api/rest/v1x0/complateUserInfo`,//修改用户数据
    FANS: `${line}/api/rest/v1x0/getFansList`,//获取粉丝
    FOLLOWLIST: `${line}/api/rest/v1x0/queryFollowList`,//获取粉丝
    PHOTO: `${line}/api/rest/v1x0/getPhotoListn`,//获取照片墙
    TOPIC: `${line}/api/rest/v1x0/topicView`,//获取帖子
    PRIVATE: `${line}/api/rest/v1x0/getPriveteInfo`,//获取私密
    SELF_INFO: `${line}/api/rest/v1x0/getMyInfo`,//自己的信息
}
export default USER