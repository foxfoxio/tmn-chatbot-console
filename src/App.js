import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import './App.css'
import { v5 as uuidv5 } from 'uuid'

const RootContainer = styled.div`
  width: 99%;
  margin: 4px;

  input {
    width: 100%;
  }
`
const ColContainer = styled.div`
  display: flex;
  width: 100%;

  button {
    width: 56px;
  }

  span {
    display: contents;
  }
`
const Container = styled.div`
  pre {
    display: block;
    width: 100%;
    height: fit-content;
  }
`

const session_id = uuidv5.DNS
// const API_KEY = 'edf1ca88a09546f8a0667c81c93d1f31'
const API_KEY = '381b0ac187994f82bdc05c09d1034afa'

const api_uri = 'https://asia-east2-tmn-chatbot-integration.cloudfunctions.net/webhook'
// const api_uri ='https://gourmet-surprising-sorted-projected.trycloudflare.com/tmn-chatbot-integration/asia-east2/webhook'
// const api_uri = 'http://localhost:5001/tmn-chatbot-integration/asia-east2/webhook'
// const api_uri = 'https://asia-east2-acm-clt-chatbots.cloudfunctions.net/webhook'
// const api_uri = 'https://excess-diagnostic-recruiting-jet.trycloudflare.com/tmn-chatbot-integration/asia-east2/webhook'
const _0a_input_phone_nid_bday = [
  'สวัสดี',
  'เข้าระบบ',
  'ลืมรหัสผ่าน',
  'เปลี่ยน/ล้าง',
  'จำได้เข้าemailไม่ได้',
  '0812345678',
  '3589900012034',
  '23/01/1979'
]

const _0b_input_phone = ['สวัสดี', 'เข้าระบบ', 'การเข้าสู่ระบบ', 'ลองแล้วไม่ได้', '0812345678']
const _contact = [
  'ติดต่อเจ้าหน้าที่',
  'ออก',
  'เข้าระบบ',
  'ลืมรหัสผ่าน',
  'เปลี่ยน/ล้าง',
  'จำได้เข้าemailไม่ได้',
  '0812345678',
  '3589900012034',
  '23/01/1979'
]

const _contact2 = ['ติดต่อเจ้าหน้าที่', '0812345678']

const FLOWS = _contact2

const pretty = json => {
  return JSON.stringify(json, null, '  ')
}

let index = 0

function App() {
  const [request, setRequest] = useState()
  const [response, setResponse] = useState()
  const [text, setText] = useState()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState([])

  const makeRequest = (session_id, text) => {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }

    const body = JSON.stringify({ session_id, text })
    const req = {
      method: 'POST',
      headers,
      body
    }

    setRequest(req)
  }

  const send = async api_uri => {
    console.log('send:', api_uri)

    setLoading(true)
    const res = await fetch(api_uri, request)
    const json = await res.json()

    setLoading(false)

    console.log('json:', json)
    setResponse(json)
  }

  const onChange = e => {
    const text = e.target.value
    setText(text)
  }

  const onSubmit = e => {
    e.preventDefault()

    setLogs(typed => [...typed, text])
    send(api_uri)
  }

  useEffect(() => {
    if (index > FLOWS.length - 1) return
    setText(FLOWS[index++])
    // setText(FLOWS[0])
  }, [list])

  useEffect(() => {
    if (!response) return
    setList(list => [response, ...list])
  }, [response])

  useEffect(() => {
    if (!text) return
    makeRequest(session_id, text)
  }, [text])

  useEffect(() => {
    setText(FLOWS[0])
  }, [])

  return (
    <RootContainer>
      <ColContainer>
        <span>api_uri</span>
        <span>
          <input readOnly value={api_uri} />{' '}
        </span>
        <span>session_id</span>
        <span>
          <input readOnly value={session_id} />
        </span>
        <span>api_key</span>
        <span>
          <input readOnly value={API_KEY} />
        </span>
      </ColContainer>
      <ColContainer>
        <span>History</span>
        <input readOnly value={JSON.stringify(logs)} />
      </ColContainer>
      <form onSubmit={onSubmit}>
        <ColContainer>
          <span>Message</span>
          <input onChange={onChange} defaultValue={text} />
          <button>SEND</button>
        </ColContainer>
      </form>
      <Container>
        {list.map((e, i) => (
          <div key={i}>
            <pre>{pretty(e)}</pre>
            <hr />
          </div>
        ))}
      </Container>
    </RootContainer>
  )
}

export default App
