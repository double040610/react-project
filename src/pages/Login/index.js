import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useNavigate } from 'react-router-dom'
// 导入样式文件
import './index.scss'
import { useStore } from '@/store'
function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  async function onFinish (values) {
    console.log(values)
    // values：放置的是所有表单项中用户输入的内容
    // todo:登录
    const { mobile, code } = values
    await loginStore.getToken({ mobile, code })
    // 跳转首页
    navigate('/react-project', { replace: true })
    // 提示用户
    message.success('登錄成功！')
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/* 子项用到的触发事件 需要在Form中都声明一下才可以 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: true,
            mobile: '13811111111',
            code: '246810'
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '請輸入13開頭的隨意11位數字！',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '請正確輸入13開頭的隨意11位數字！',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="請輸入13開頭的隨意11位數字！" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '請輸入246810！',
              },
              {
                len: 6,
                message: '請輸入246810！',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="請輸入246810！" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"

          >
            <Checkbox className="login-checkbox-label">
            我已閱讀並同意「用戶協議」和「隱私條款」！
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登錄！
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login