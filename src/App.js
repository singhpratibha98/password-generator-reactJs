import React, { useState, useRef, useCallback } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeCharacters, setIncludeCharacters] = useState(true);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numSet = "0123456789";
    const charSet = "!@#$%^&*()_-+=<>?";

    let finalSet = charset;

    if (includeNumbers) {
      finalSet += numSet;
    }

    if (includeCharacters) {
      finalSet += charSet;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * finalSet.length);
      newPassword += finalSet[randomIndex];
    }

    setPassword(newPassword);
  }, [length, includeNumbers, includeCharacters]);

  const copyToClipboard = () => {
    // console.log(passwordRef.current.select());
    // console.log(document.execCommand("copy"));
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
    }
  };

  return (

    <div style={{margin:"150px"}}>
      <label style={{display:"flex",justifyContent:"center", alignItems:"center",color:"#5F0F40", fontSize:"40px", fontWeight:"bolder"}} >
        Password Length:
        <input style={{fontSize:"24px"}} 
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min={4}
        />
      </label>
      <br />
      <label style={{display:"flex",justifyContent:"center", alignItems:"center",fontSize:"20px",color:"#5F0F40"}}>
        Include Numbers:
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </label>
      <br />
      <label style={{display:"flex",justifyContent:"center", alignItems:"center",fontSize:"20px",color:"#5F0F40"}}>
        Include Special Characters:
        <input
          type="checkbox"
          checked={includeCharacters}
          onChange={() => setIncludeCharacters(!includeCharacters)}
        />
      </label>
      <br />
      <div style={{display:"flex", justifyContent:"center",alignItems:"center",}}>
      <button style={{padding: "10px",fontSize:"20px",color:"#5F0F40",backgroundColor:"#C1F2B0",borderRadius:"20px",fontWeight:"bold"}} onClick={generatePassword} >Generate Password</button>
      </div>
      <br />
      <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>


            {/* for show in UI */}
            
      {password && (
        <>
          <textarea style={{padding:"10px", fontSize:"20px", color:"white", backgroundColor:"#527853"}} ref={passwordRef} value={password} readOnly />

          <button style={{padding: "10px", fontSize:"15px", color: "white", backgroundColor:"#092635", fontWeight:"bold"}} onClick={copyToClipboard}>Copy to Clipboard</button>
        </>
      )}
      </div>
    </div>
  );
};

export default PasswordGenerator;