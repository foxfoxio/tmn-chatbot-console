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

  textarea {
    width: 50%;
    height: 400px;
  }
`

const session_id = uuidv5.DNS
const api_key = ''
const api_uri = 'https://asia-east2-acm-clt-chatbots.cloudfunctions.net/webhook'
// const api_uri = 'https://us-earn-compounds-logic.trycloudflare.com/acm-clt-chatbots/asia-east2/webhook'

const pretty = json => {
  return JSON.stringify(json, null, '  ')
}

function App() {
  const [request, setRequest] = useState()
  const [response, setResponse] = useState()
  const [text, setText] = useState()
  const [loading, setLoading] = useState(false)

  const makeRequestPacket = (session_id, text) => {
    const headers = {
      'Content-Type': 'application/json'
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
    setLoading(true)
    const res = await fetch(api_uri, request)
    const json = await res.json()

    setLoading(false)
    setResponse(json)
  }

  const onChange = e => {
    const text = e.target.value
    setText(text)
  }

  const onSubmit = e => {
    e.preventDefault()

    send(api_uri)
  }

  useEffect(() => {
    if (!text) return
    makeRequestPacket(session_id, text)
  }, [text])

  useEffect(() => {
    setText('สวัสดี')
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
          <input readOnly value={api_key} />
        </span>
      </ColContainer>
      <form onSubmit={onSubmit}>
        <ColContainer>
          <span>Message</span>
          <input onChange={onChange} defaultValue={text} />
          <button>SEND</button>
        </ColContainer>
      </form>
      <ColContainer>
        <textarea defaultValue={pretty(request)}></textarea>
        <textarea defaultValue={loading ? 'loading...' : pretty(response)}></textarea>
      </ColContainer>
    </RootContainer>
  )
}

export default App
