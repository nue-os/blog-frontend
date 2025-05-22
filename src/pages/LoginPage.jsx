import { useEffect, useMemo, useState } from 'react'
import Input from '../components/Input'
import { validateId, validatePassword } from '../utils/validation'

const LoginPage = () => {
  const [form, setForm] = useState({
    id: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    id: '',
    password: '',
  })
  const [isLogining, setIsLogining] = useState(false)

  const isFormValid = form.id && form.password && !errors.id && !errors.password

  const validators = useMemo(
    () => ({
      id: validateId,
      password: validatePassword,
    }),
    []
  )

  useEffect(() => {
    setErrors({
      id: validators.id(form.id),
      password: validators.password(form.password),
    })
  }, [form, validators])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = e => {
    e.preventDefault()
    setIsLogining(true)

    // 임시
    setTimeout(() => {
      alert('로그인 성공')
      setIsLogining(false)
    }, 3000)
  }

  return (
    <main className="main">
      <h2 className="heading2">로그인</h2>
      <form onSubmit={handleLogin} className="w-[calc(100%-2em)] m-auto flex flex-col gap-4">
        <Input
          name="id"
          placeholder="아이디"
          value={form.id}
          error={errors.id}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="패스워드"
          value={form.password}
          error={errors.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!isFormValid}
          className={`button w-full p-4 rounded-xl self-center ${isFormValid ? 'bg-violet-300 cursor-pointer' : 'bg-violet-100 cursor-not-allowed'}`}
        >
          {isLogining ? '로그인 중' : '로그인'}
        </button>
      </form>
      <div className="my-4">
        <p className="text-center cursor-pointer">소셜 계정으로 로그인</p>
      </div>
    </main>
  )
}

export default LoginPage
