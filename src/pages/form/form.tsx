import Tabs from 'component/tabs/tabs'
import React, { useCallback, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './form.css'

interface TabProps {
  tabKey: string;
}
const CustomListView: React.FC<TabProps> = (props) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === '') {
      setUsernameError('Please input your username!');
    } else if (password.trim() === '') {
      setPasswordError('Please input your password!');
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const codeReactjs = `
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (username.trim() === '') {
        setUsernameError('Please input your username!');
      } else if (password.trim() === '') {
        setPasswordError('Please input your password!');
      }
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
      setUsernameError('');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setPasswordError('');
    };
  `;

  const codeJS = `
    //HTML
    <div>
      <form id="myForm">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" required>
          <div id="usernameError" class="error"></div>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" required>
          <div id="passwordError" class="error"></div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

    //JS
    document.getElementById("myForm").addEventListener("submit", function(event) {
      event.preventDefault();
    
      var usernameInput = document.getElementById("username");
      var passwordInput = document.getElementById("password");
    
      var usernameError = document.getElementById("usernameError");
      var passwordError = document.getElementById("passwordError");
    
      var username = usernameInput.value.trim();
      var password = passwordInput.value.trim();
    
      if (username === '') {
        usernameError.innerText = "Please input your username!";
      } else {
        usernameError.innerText = "";
      }
    
      if (password === '') {
        passwordError.innerText = "Please input your password!";
      } else {
        passwordError.innerText = "";
      }
    
      if (username !== '' && password !== '') {
        // Thực hiện các xử lý khác khi form hợp lệ
      }
  });
  
  `;

  return (
    <div className='container-custom'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='div-label-input'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && <div className="error">{usernameError}</div>}
        </div>
        <div className='div-label-input'>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <button className='button-not-empty' type='submit'>Submit</button>
      </form>
      <div className='source-code'>
        <h3>Code</h3>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {props.tabKey === 'JS'
            ?
            codeJS
            :
            codeReactjs
          }
        </SyntaxHighlighter>

      </div>
    </div>
  );
}

function Form() {

  const Item = useCallback((props: TabProps) => {
    return <CustomListView {...props} />;
  }, []);

  return (
    <Tabs RowList={Item} />
  )
}

export default Form