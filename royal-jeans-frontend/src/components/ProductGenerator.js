import React, { useState } from 'react';

function ProductGenerator({ token }) {
  const [code, setCode] = useState('');
  const [additionalCode, setAdditionalCode] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    console.log('Generating product with token:', token);
    try {
      const response = await fetch('http://127.0.0.1:8000/generate_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        body: `code=${code}&additional_code=${additionalCode}`,
      });
      console.log('Generate response:', response.status);
      const data = await response.json();
      if (response.ok) {
        setResult(data.product_name);
        setError('');
      } else {
        setError(data.detail || 'خطا در تولید محصول');
      }
    } catch (err) {
      setError('اتصال به سرور ناموفق بود');
      console.log('Generate error:', err.message);
    }
  };

  return (
    <div>
      <h2>تولید محصول</h2>
      <form onSubmit={handleGenerate}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="کد 29 رقمی"
        />
        <input
          type="text"
          value={additionalCode}
          onChange={(e) => setAdditionalCode(e.target.value)}
          placeholder="کد اضافی"
        />
        <button type="submit">تولید</button>
        {result && <p>محصول: {result}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default ProductGenerator;