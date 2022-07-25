import { useState, useEffect } from 'react'
import axios from './utils/axios.instance'
import ReactiveButton from 'reactive-button'

function Shortner() {
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState([])
  const [btnState, setBtnState] = useState('idle')
  const onClickHandler = () => {
    setBtnState('loading')
    setTimeout(() => {
      setBtnState('success')
    }, 2000)
  }
  const initiateApp = async () => {
    if (window.localStorage.getItem('uid')) {
      const uid = window.localStorage.getItem('uid')
      const data = await axios.get('/history', { params: { uid: uid } })
      if (data.data.uid) {
        window.localStorage.clear()
        window.localStorage.setItem('uid', data.data.uid)
      }
      setHistory(data.data.history)
    } else {
      const data = await axios.post('/creatUser')
      window.localStorage.setItem('uid', data.data.uid)
    }
    setLoading(false)
  }
  useEffect(() => {
    initiateApp()
  }, [])
  if (loading) {
    return (
      <img
        className="animate scale-200 duration-10s"
        src="https://c.tenor.com/KEzW7ALwfUAAAAAS/cat-what.gif"
        alt="loading.."
        width="10px"
      />
    )
  }

  return (
    <div className="container flex flex-col  items-center p-4">
      <h1 className="text-3xl p-4">
        ⏩👉🔗<span>🔗</span>👈⏪
      </h1>
      <input className="input-bx border-2   m-3" type="text" id="url" />
      <div className="flex">
        <div className="flex flex-col">
          <label htmlFor="hits" className="text-white font-bold-">
            Hits
          </label>
          <input className="input-bx border-2  m-3" type="text" id="hits" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="expiresIn" className="text-white font-bold">
            expiresIn
          </label>
          <input
            className="input-bx border-2  m-3"
            type="text"
            id="expiresIn"
          />
        </div>
      </div>
      <ReactiveButton
        buttonState={btnState}
        onClick={onClickHandler}
        color={'light'}
        idleText={'Shirk!'}
        loadingText={'shirnking'}
        successText={'Success'}
        errorText={'Error'}
        type={'button'}
        className={'class1 class2'}
        style={{ borderRadius: '5px' }}
        outline={true}
        shadow={true}
        rounded={false}
        size={'large'}
        block={false}
        messageDuration={2000}
        disabled={false}
        buttonRef={null}
        width={null}
        height={null}
        animation={true}
      />
    </div>
  )
}

export default Shortner
