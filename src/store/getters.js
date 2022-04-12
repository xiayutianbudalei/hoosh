/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-12 15:35:06
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-28 16:40:09
 */
const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  user_headicon: state => state.user.user.user_headicon
};
export default getters;
