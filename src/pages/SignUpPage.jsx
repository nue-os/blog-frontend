import { useEffect, useMemo, useState } from 'react'
import { validateId, validatePassword, validatePasswordCheck } from '../utils/validation'
import Input from '../components/Input'
import { signUp } from '../apis/userApi'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    id: '',
    password: '',
    passwordCheck: '',
  })

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    passwordCheck: '',
  })

  const [isSigningUp, setIsSigningUp] = useState(false)

  const validators = useMemo(
    () => ({
      id: validateId,
      password: validatePassword,
      passwordCheck: validatePasswordCheck,
    }),
    []
  )

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    setErrors({
      id: validators.id(form.id),
      password: validators.password(form.password),
      passwordCheck: validators.passwordCheck(form.passwordCheck, form.password),
    })
  }, [form, validators])

  const isFormValid =
    form.id &&
    form.password &&
    form.passwordCheck &&
    !errors.id &&
    !errors.password &&
    !errors.passwordCheck

  const handleSignUp = async e => {
    e.preventDefault()
    try {
      setIsSigningUp(true)

      await signUp({ id: form.id, password: form.password })

      alert('가입 완료')
      setIsSigningUp(false)
      navigate('/login')
    } catch (err) {
      if (err.status === 409) setErrors(prev => ({ ...prev, id: err.message }))
      else setErrors(prev => ({ ...prev, passwordCheck: err.message }))
      setIsSigningUp(false)
    }
  }

  return (
    <main>
      <h2>회원가입</h2>
      <form onSubmit={handleSignUp} className="w-[calc(100%-2em)] m-auto flex flex-col gap-4">
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
        <Input
          name="passwordCheck"
          type="password"
          placeholder="패스워드 확인"
          value={form.passwordCheck}
          error={errors.passwordCheck}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!isFormValid}
          className={`button w-full p-4 rounded-xl self-center ${isFormValid ? 'bg-violet-300 cursor-pointer' : 'bg-violet-100 cursor-not-allowed'}`}
        >
          {isSigningUp ? '등록 중' : '가입하기'}
        </button>
      </form>

      <div className="my-4">
        <p className="text-center cursor-pointer">소셜 계정으로 가입하기</p>
      </div>
    </main>
  )
}

export default SignUpPage
