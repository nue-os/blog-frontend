export const validateId = value => {
  if (!value) return ''
  if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(value)) {
    return '아이디는 영문자로 시작하는 4자 이상의 영문자 또는 숫자여야 합니다.'
  }
  return ''
}

export const validatePassword = value => {
  if (!value) return ''
  if (value.length < 4) {
    return '패스워드는 4자 이상이어야 합니다.'
  }
  return ''
}

export const validatePasswordCheck = (value, password) => {
  if (!value) return ''
  if (value !== password) {
    return '패스워드가 일치하지 않습니다.'
  }
  return ''
}
