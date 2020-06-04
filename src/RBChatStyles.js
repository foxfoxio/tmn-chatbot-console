import styled from '@emotion/styled'

function getChatStyle(myBG, yourBG) {
  return styled.div`
    display: flex;
    flex-direction: column;

    margin: 0 auto;
    padding-left: 32px;
    padding-right: 16px;
    font-weight: 200;
    font-size: medium;
    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    color: #000;

    strong {
      font-weight: 400;
    }
    dd {
      position: relative;
      margin-left: 0px;
    }
    dt {
      margin-bottom: 1em;
      text-align: center;
      font-size: 0.6em;
      color: #999;
    }
    dd + dt {
      margin-top: 1.5em;
    }
    dd + dd {
      margin-top: 0.5em;
    }

    p {
      width: fit-content;
      margin: 0;
      text-align: left;
      margin-right: 25%;
      padding: 0.45em 0.75em;
      background: ${yourBG};
      line-height: 1.25;
      border-radius: 1em;
      margin-left: 0.5em;
    }
    .to p {
      text-align: left;
      float: right;
      margin-right: 0;
      margin-left: 25%;
      background: ${myBG};
      color: #fff;
    }
    p + p {
      margin-top: 0.1em;
    }
    p:last-child {
      position: relative;
    }
    p:last-child::before {
      position: absolute;
      bottom: 0;
      left: -3em;
      width: 3em;
      height: 2em;
      border-right: 1.5em solid ${yourBG};
      border-bottom-right-radius: 50%;
      content: ' ';
      clip: rect(1.1em, 3.5em, 3em, 2em);
    }
    .to p:last-child::before {
      right: -3em;
      left: auto;
      border-right: none;
      border-left: 1.5em solid ${myBG};
      border-bottom-left-radius: 50%;
      clip: rect(1.3em, 2em, 2em, 1.1em);
    }
    .me {
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      float: right;
      margin-right: -32px;
      margin-left: 8px;
      border-radius: 100%;
      bottom: 0px;
      display: block;
    }
    .you {
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      position: absolute;
      margin-left: -32px;
      bottom: 0px;
      float: left;
      display: block;
      border-radius: 50%;
    }

    .no_left {
      margin-left: -16px;
    }

    .holder {
      padding-top: 0.2em;
      padding-bottom: 0.2em;
    }
  `
}

const TYPING = `<span id="wave">
<span class="dot"></span>
<span class="dot"></span>
<span class="dot"></span>
</span>`

const getTypingChatData = ({ uid, name, img, jump, typing = 1000 }) =>
  Object.assign(
    {},
    {
      uid,
      name,
      img,
      msgs: [TYPING],
      jump,
      typing
    }
  )

export { getChatStyle, getTypingChatData, TYPING }
