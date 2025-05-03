"use client";
import { useState } from 'react';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<null | 'loading' | 'verified' | 
'error'>(null);

  const handleChange = (e: any) => {
    setCode(e.target.value);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus('loading');

    // Send verification code to backend to check
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      setStatus('verified');
    } else {
      setStatus('error');
    }
  }

  if (status === 'verified') return <div>✅ Verified! You can now proceed 
to your Creator Studio.</div>;

  return (
    <form onSubmit={handleSubmit} className="form-class">
      <input
        required
        className="input-class"
        name="code"
        placeholder="Enter Verification Code"
        value={code}
        onChange={handleChange}
      />
      <button type="submit">Verify</button>
      {status === 'error' && <div>Invalid code, please try again.</div>}
    </form>
  );
}

