import Mock from 'mockjs'

export default defineEventHandler(() => {
  const user = Mock.mock({
    name: '@cname',
    age: '@integer(18, 30)'
  })

  return user
})
