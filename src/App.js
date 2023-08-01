import './App.scss';
import QRCode from "qrcode";
import QRCodeShow from "react-qr-code";
import { useState } from "react";

function App() {

  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState(message);
  const [qrURL, setQrURL] = useState('');
  const [error, setError] = useState("");

  const Update = (event) => {
    setMessage(event.target.value);
  }
  
  const Generator = () => {
    if (message.length == 0) {
      setError("Please Enter QR Value...")
      return setTimeout(() => {
        setError(false);
      }, 3000);
    }
    setUpdated(message);
    setMessage('');
    const response = QRCode.toDataURL(message);
    setQrURL(response)
  }

  const Reset = () => {
    setMessage('');
    setUpdated(false)
  }

  return (
    <div className="App">
      <div className="box">
        <h2>Generate QR Code</h2>
        <div className="qrcode">
          {updated ?
            <QRCodeShow value={updated}
              size={256}
              bgColor={`#282c34`}
              fgColor={`#ffffff`}
              viewBox={`0 0 256 256`} />
            : ''
          }
          <div className="right">
            <span>
              <input type="text" value={message} onChange={Update} spellCheck={false} placeholder='Enter QR value...' />
              {error}
            </span>
            <div className="btn">
              <a href={qrURL} download="QRCode.png"><button>Download</button></a>
              <button id='Reset' onClick={Reset}>Reset</button>
              <button id='generate' onClick={Generator}>Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
