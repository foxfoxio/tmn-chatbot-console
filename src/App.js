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
const api_key = ''
// const api_uri = 'https://asia-east2-acm-clt-chatbots.cloudfunctions.net/webhook'
// const api_uri = 'https://barbie-mai-convertible-buzz.trycloudflare.com/tmn-chatbot-staging/asia-east2/webhook'
// const api_uri = 'http://localhost:5001/tmn-chatbot-staging/asia-east2/webhook'
const api_uri = 'https://asia-east2-tmn-chatbot-staging.cloudfunctions.net/webhook'

// 10_authen 00_home → 01_select → 10_authen → 11_login → 05_before_end → z05a_more → 01_select

const FLOWS_0c_input_phone_txday_amount = [
  'สวัสดี',
  'โอนเงิน',
  'โอนเงินไปธนาคาร',
  'วิธีโอนเงินไปธนาคาร',
  'ไม่สามารถโอนเงินได้',
  'ปัญหาอื่นๆ',
  'แจ้งว่า...',
  '0812345678',
  '13/01/2522',
  100,
  'จบการสนทนา',
  'พอใจ'
]

const FLOWS_30_transfer = ['สวัสดี', 'โอนเงิน', 'โอนเงินไปธนาคาร', 'วิธีโอนเงินไปธนาคาร', 'สอบถามเพิ่มเติม']

const FLOWS_20_account = ['สวัสดี', 'จัดการบัญชี', 'แก้ไขข้อมูลส่วนตัว', 'ยังไม่ลบ ใช้งานต่อ', 'สอบถามเพิ่มเติม']

// 10_authen 00_home → 01_select → 10_authen → 12_forget_pass → 12a_new → 12aa_new_rem → 05_before_end → z05a_more → 01_select
const FLOWS_10_3 = ['สวัสดี', 'เข้าระบบ', 'ลืมรหัสผ่าน', 'เปลี่ยน/ล้าง', 'จำได้', 'ถามเพิ่ม']

const FLOWS_10_account_12_forget_pass1 = ['สวัสดี', 'เข้าระบบ', 'ลืมรหัสผ่าน', 'เปลี่ยน/ล้าง', 'จำได้', 'ถามเพิ่ม']
const FLOWS_10_account_12_forget_pass2 = [
  'สวัสดี',
  'เข้าระบบ',
  'ลืมรหัสผ่าน',
  'ไม่ได้เปลี่ยน/ล้าง',
  'จำได้/เครื่องเดิม',
  'จบการสนทนา',
  'พอใจ'
]

// 10_authen 00_home → 01_select → 10_authen → 11_login → 11a_end → 05_before_end → z05a_more → 01_select
const FLOWS_10_account_1 = ['สวัสดี', 'เข้าระบบ', 'การเข้าสู่ระบบ']

// 40_register 00_home → 01_select → 40_register → 43_app → 43c →
// 0a1_input_phone_nid_bday → 0a1_screen → @sys.any → 0a1_phone → @sys.phone-number → 0a1_nid → @sys.number-integer → 0a1_bday → @sys.date → 08_wait_for_call
const FLOWS_40_1 = [
  'สวัสดี',
  'สมัครวอลเล็ท',
  'แอปทรู ไอดี',
  'ต่อบชกับทรูidไม่ได้',
  'อะไรก็ได้',
  '0987778890',
  '3589900012345',
  '23/01/1979'
]

const FLOWS_30_fill = [
  'สวัสดี',
  'โอนเงิน',
  'โอนเงินไปธนาคาร',
  'วิธีโอนเงินไปธนาคาร',
  'ไม่สามารถโอนเงินได้',
  'ปัญหาอื่นๆ',
  'อะไรก็ได้',
  '0987778890',
  '23/01/1979',
  '100',
  'จบ',
  'ดี'
]

// 40_register 00_home → 01_select → 40_register → 41_tmn_wallet → 41c_reg_fail → 41ca_invalid → 49_before_end → 49a_tried →
// 0a_input_phone_nid_bday → 0aa_phone → @sys.phone-number → 0ab_nid → @sys.number-integer → 0ac_bday → @sys.date → 08_wait_for_call
const FLOW_40_5 = [
  'สวัสดี',
  'สมัครวอลเล็ท',
  'แอปทรูมันนี่ วอลเล็ท',
  'ไม่สามารถสมัครได้',
  'ข้อมูลไม่ถูกต้อง',
  'ลองใหม่แล้วแต่ไม่ได้',
  '0987778890',
  '3589900012345',
  '23/01/1979'
]

// 40_register 00_home → 01_select → 40_register → 43_app → 43c →
// 0a1_input_phone_nid_bday → 0a1_screen → @screen → 0a1_jump → 0a2_input_phone_nid_bday → 0a2a_phone → @sys.phone-number → 0a2b_nid → @sys.number-integer → 0a2c_bday → @sys.date → 08_wait_for_call
const FLOW_40_last = [
  'สวัสดี',
  'สมัครวอลเล็ท',
  'แอปทรู ไอดี',
  'ต่อบชกับทรูidไม่ได้',
  'แบบนี้',
  'แบบนี้',
  '0812345678',
  '3589900012345',
  '23/01/1979'
]

// PASSED
const FLOW_40_last_oc = [
  'สวัสดี',
  'สมัครวอลเล็ท',
  'แอปทรู ไอดี',
  'ต่อบชกับทรูidไม่ได้',
  'แบบนี้',
  '0812345678',
  '23/01/1979',
  '200',
  'ถามเพิ่ม'
]

const FLOWS_SHORT_60 = ['สวัสดี', 'เข้าระบบ', 'การเข้าสู่ระบบ', '0987778890', '23/01/1979', '100', '1234567890']

// 70_topup › 00_home → 01_select → 70_topup → 74_problem_topup → 74d_true_card → 74db_cannot_use_topup_card →
// 0m_input_topup_phone_txday_amount_serial → 0ma_topup → @sys.any → 0mb_phone → @sys.phone-number → 0mc_txday → @sys.date → 0md_txamount → @sys.number → 0me_serial → @sys.number-integer → 08_wait_for_call

const FLOWS_SHORT_70 = [
  'สวัสดี',
  'เติมเงิน',
  'พบปัญหาในการเติมเงิน',
  'ผ่านบัตรทรูมันนี่',
  'ใช้บัตรเติมเงินไมได้',
  'อะไรก็ได้',
  '0812345678',
  '23/01/1979',
  '100'
]

// 60_bill 00_home → 01_select → 60_bill → 65_easypass → 65b_problem_topup → 65ba_topup_noupdate →
// 0i_input_phone_txday_amount_number → 0ia_phone → @sys.phone-number → 0ib_txday → @sys.date → 0ic_txamount → @sys.number → 0id_number → @sys.number-integer → 08_wait_for_call
// MISSING ID
const FLOWS_SHORT_60_1 = [
  'สวัสดี',
  'จ่ายบิล',
  'เติมเงินอีซี่พาส',
  'พบปัญหาการเติมเงิน',
  'เติมเงินยอดไม่อัปเดต',
  '0812345678',
  '200',
  '23/01/1979',
  '1234567890'
]

// 70_topup 00_home → 01_select → 70_topup → 74_problem_topup → 74a_bankall → 74ac_problem_topup →
// 0m_input_topup_phone_txday_amount_serial → 0ma_topup → @sys.any → 0mb_phone → @sys.phone-number → 0md_txamount → @sys.number → 0mc_txday → @sys.date → 0me_serial → @sys.number → 08_wait_for_call
const FLOWS_70 = [
  'สวัสดี',
  'เติมเงิน',
  'พบปัญหาในการเติมเงิน',
  'BankApp/iBanking/ATM',
  'ไม่สามารถเติมเงินได้',
  'อะไรก็ได้',
  '0987778890',
  '200',
  '23/01/1979',
  '123456789012345678'
]

// PASSED
const FLOWS_SHORT = [
  'สวัสดี',
  'เข้าระบบ',
  'การเข้าสู่ระบบ',
  'อะไรก็ได้',
  '0987778890',
  '12345678',
  '23/01/1979',
  '123456789012345678'
]

// 70_topup 00_home → 01_select → 70_topup → 74_problem_topup → 74c_bank_binding → 74ca_pass_notentered → 74cab_notcut →
// 0b_input_phone → 0ba_phone → @sys.phone-number → 08_wait_for_call
// PASSED
const FLOWS_70_0b = [
  'สวัสดี',
  'เติมเงิน',
  'พบปัญหาในการเติมเงิน',
  'ผ่านการผูกบัญชี',
  'สำเร็จ ยอดไม่เข้า',
  'ไม่ถูกตัดจากธนาคาร',
  '0987778890'
]

const FLOWS_70_topup = ['สวัสดี', 'topup', 'ผ่านการผูกบัญชี', 'สำเร็จ ยอดไม่เข้า', 'ไม่ถูกตัดจากธนาคาร', '0987778890']

// 90_package 00_home → 01_select → 90_package → 91_internet_package → 91b_internet_package_problem → 91bb_fail_otherpackage → 91bbb_no_sms_confirmation →
// 0t_input_phone_txday_notpackage → 0ta_phone → @sys.phone-number → 0tb_txday → @sys.date → 0tc_notpackagephone → @sys.any → 08_wait_for_call

// 70_topup 00_home → 01_select → 70_topup → 74_problem_topup → 74a_bankall → 74aa_pass_amount_notentered → 74aab_no → 0k_input_phone_wrong_txday_amount → 0ka_phone → @sys.any → 0kb_wrongnumber → @sys.any → 0kc_txday → @sys.date → 0kd_txamount → @amount → 08_wait_for_call
// 70_topup 00_home → 01_select → 70_topup → 74_problem_topup → 74a_bankall → 74aa_pass_amount_notentered → 74aab_no → 0k_input_phone_wrong_txday_amount → 0ka_phone → @sys.any → 0kb_wrongnumber → @sys.any → 0kc_txday → @sys.date → 0kd_txamount → @amount → 08_wait_for_call
const FLOWS = FLOWS_70_topup

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
          <input readOnly value={api_key} />
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
