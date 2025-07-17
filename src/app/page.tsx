'use client';

import { useState, useRef, useEffect } from 'react';
import domtoimage from 'dom-to-image-more';

const unitOptions: Record<string, string[]> = {
  'ศจส.บก.สนก.1 นทพ.': [
    'ศจส.นพค11 สนภ.1 นทพ.',
    'ศจส.นพค12 สนภ.1 นทพ.',
    'ศจส.นพค13 สนภ.1 นทพ.',
    'ศจส.นพค14 สนภ.1 นทพ.',
    'ศจส.นพค15 สนภ.1 นทพ.',
    'ศจส.นพค16 สนภ.1 นทพ.',
    'ศจส.วส.934 สนภ.1 นทพ.',
  ],
  'ศจส.บก.สนก.2 นทพ.': [
    'ศจส.นพค21 สนภ.2 นทพ.',
    'ศจส.นพค22 สนภ.2 นทพ.',
    'ศจส.นพค23 สนภ.2 นทพ.',
    'ศจส.นพค24 สนภ.2 นทพ.',
    'ศจส.นพค25 สนภ.2 นทพ.',
    'ศจส.นพค26 สนภ.2 นทพ.',
    'ศจส.วส.909 สนภ.2 นทพ.',
  ],
  'ศจส.บก.สนก.3 นทพ.': [
    'ศจส.นพค31 สนภ.3 นทพ.',
    'ศจส.นพค32 สนภ.3 นทพ.',
    'ศจส.นพค33 สนภ.3 นทพ.',
    'ศจส.นพค34 สนภ.3 นทพ.',
    'ศจส.นพค35 สนภ.3 นทพ.',
    'ศจส.นพค36 สนภ.3 นทพ.',
    'ศจส.วส.914 สนภ.3 นทพ.',
  ],
  'ศจส.บก.สนก.4 นทพ.': [
    'ศจส.นพค41 สนภ.4 นทพ.',
    'ศจส.นพค42 สนภ.4 นทพ.',
    'ศจส.นพค43 สนภ.4 นทพ.',
    'ศจส.นพค44 สนภ.4 นทพ.',
    'ศจส.นพค45 สนภ.4 นทพ.',
    'ศจส.นพค46 สนภ.4 นทพ.',
    'ศจส.วส.912 สนภ.4 นทพ.',
  ],
  'ศจส.บก.สนก.5 นทพ.': [
    'ศจส.นพค51 สนภ.5 นทพ.',
    'ศจส.นพค52 สนภ.5 นทพ.',
    'ศจส.นพค53 สนภ.5 นทพ.',
    'ศจส.นพค54 สนภ.5 นทพ.',
    'ศจส.นพค55 สนภ.5 นทพ.',
    'ศจส.นพค56 สนภ.5 นทพ.',
    'ศจส.วส.921 สนภ.5 นทพ.',
  ],
  'เพิ่มเติม': [
    'ศจส.สทพ.นทพ.',
    'ศจส.กกส.สทพ.นทพ.',
    'ศจส.กสข.สทพ.นทพ.',
    'ศจส.นกส.1 สทพ.นทพ.',
    'ศจส.นกส.2 สทพ.นทพ.',
    'ศจส.นกส.3 สทพ.นทพ.',
    'ศจส.นกส.4 สทพ.นทพ.',
    'ศจส.นกส.5 สทพ.นทพ.',
    'ศจส.สสน.นทพ.',
    'ศจส.สนร.นทพ.',
    'ศจส.นพศ.นทพ.',
    'ศจส.ศฝภ.นทพ.',
  ],
};

export default function Page() {
  const [images, setImages] = useState<File[]>([]);
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [mainUnit, setMainUnit] = useState('');
  const [subUnit, setSubUnit] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formType, setFormType] = useState<'development' | 'disaster' | 'special'>('development');

  useEffect(() => {
  if (subUnit) {
    // ถ้ายังไม่มีข้อความใน details จะเติม subUnit ให้อัตโนมัติ
    if (!details.includes(subUnit)) {
      setDetails((prev) => `${prev ? prev + '\n' : ''}${subUnit}`);
    }
  }
}, [subUnit]);


  const previewRef = useRef<HTMLDivElement>(null);
  const previewScale = 0.34;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 5 - images.length);
      setImages([...images, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (!date || !details || images.length === 0) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setShowPreview(true);
  };

  const handleDownload = () => {
    if (!previewRef.current) return;

    const origin = previewRef.current;
    const clone = origin.cloneNode(true) as HTMLDivElement;

    // ลบสเกล
    clone.style.transform = '';
    clone.style.transformOrigin = '';

    clone.style.position = 'fixed';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    domtoimage
    .toPng(clone, {
      width: 1920,
      height: 1080
    })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `แบบฟอร์มจิตอาสา.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('Error generating image:', error);
    })
    .finally(() => {
      document.body.removeChild(clone);
    });
  };

 const handleConfirm = async () => {
  const payload = {
    mainUnit,
    subUnit,
    date,
    details,
    formType,
  };

  try {
    const res = await fetch('/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      alert('บันทึกข้อมูลสำเร็จ');
      setIsConfirmed(true);
    } else {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    }
  } catch (error) {
    alert('ไม่สามารถเชื่อมต่อ API ได้');
    console.error(error);
  }
};

  return (
    <div
      style={{
        maxWidth: '700px',
        marginTop: '70px',
        margin: '0 auto',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        fontFamily: 'Prompt, sans-serif',
      }}
      className='bg-gradient-to-br from-lime-200 to-green-100'
    >
      {!showPreview ? (
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            marginTop: '20px',
            background: 'rgba(255, 255, 255, 0.5)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '25px',
              color: '#333',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            📋 ฟอร์มส่งข้อมูลจิตอาสา
          </h2>

          {/* Main Unit */}
          <label style={{ marginTop: '10px'}}>หน่วยงานหลัก:</label>
          <select value={mainUnit} onChange={(e) => { setMainUnit(e.target.value); setSubUnit(''); }} style={{ width: '100%', border:'1px solid grey', borderRadius: '8px', padding: '10px', marginBottom: '20px' }}>
            <option value="">-- เลือกหน่วยงานหลัก --</option>
            {Object.keys(unitOptions).map((main) => (
              <option key={main} value={main}>{main}</option>
            ))}
          </select>

          {/* Sub Unit */}
          {mainUnit && (
            <>
              <label style={{ marginTop: '100px' }}>หน่วยงานย่อย:</label>
              <select value={subUnit} onChange={(e) => setSubUnit(e.target.value)} style={{ width: '100%', border:'1px solid grey', borderRadius: '8px', padding: '10px', marginBottom: '20px' }}>
                <option value="">-- เลือกหน่วยงานย่อย --</option>
                {unitOptions[mainUnit].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </>
          )}

          {/* Radio */}
          <div style={{ marginBottom: '20px' }}>
            <label>
              <input 
                type="radio"
                name='formType'
                value="development"
                checked={formType === 'development'}
                onChange={() => setFormType('development')}
              /> จิตอาสาพัฒนา
            </label>
            <label style={{marginLeft: '20px'}}>
              <input
                type="radio"
                name="formType"
                value="disaster"
                checked={formType === 'disaster'}
                onChange={() => setFormType('disaster')}
              />จิตอาสาภัยพิบัติ
            </label>
            <label style={{marginLeft: '20px'}}>
              <input 
                type="radio"
                name='formType'
                value="special"
                checked={formType === 'special'}
                onChange={() => setFormType('special')}
              /> จิตอาสาเฉพาะกิจ
            </label>
          </div>

          {/* Upload */}
          <label
            style={{
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            📁 อัปโหลดรูปภาพ (สูงสุด 5 รูป)
          </label>

          <label
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#007bff',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              marginBottom: '12px',
            }}
          >
            เลือกรูปภาพ
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '10px',
            }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid #ddd',
                }}
              >
                <img
                  src={URL.createObjectURL(img)}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
                <button
                  onClick={() => handleRemoveImage(idx)}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    background: 'red',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    lineHeight: '1',
                    padding: '0',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Details */}
          <label style={{ marginTop: '10px', display: 'block' }}>
            รายละเอียด:
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            style={{ width: '100%', minHeight: '150px',border:'1px solid grey', borderRadius: '8px' }}
          ></textarea>

          {/* Date */}
          <label style={{ marginTop: '10px', display: 'block' }}>
            วันที่:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{border:'1px solid grey', borderRadius: '8px', padding: '10px' }}
          />

          {/* button */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>

            {/* Confirm */}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={handleConfirm}
            >
              ✅ ยืนยัน
            </button>

            {/* Image */}
            {isConfirmed && (
              <button
              onClick={handleSubmit}
              style={{
                background: '#007bff',
                color: '#fff',
                padding: '9px 10px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '50px',
              }}
              >
                ✅ แสดง Form
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            width: `${1920 * previewScale}px`,
            height: `${1080 * previewScale}px`,
            margin: '0 auto',
            marginTop: '4px',
            }}
        >
          {/* Preview */}
          <div
            ref={previewRef}
            style={{
              width: '1920px',
              height: '1080px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(to right, #d7fc3a, #76f1a5)',
              padding: '20px',
              boxSizing: 'border-box',
              fontFamily: 'Prompt, sans-serif',
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 2fr 1fr 1fr',
                alignItems: 'center',
                padding: '10px 20px',
                borderRadius: '15px',
                border: '4px solid #00bfff',
                gap: '2px',
                fontFamily: "TH Sarabun New, sans-serif",
                fontWeight: '20px',
              }}
            >
              {/* logo 1 */}
              <img
                src="/images/image_logo_01.png"
                alt="ตรา1"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: '190px',
                  marginLeft:'-25px',
                }}
              />

              {/* text */}
              <div
                style={{
                  gridColumn: '2 / span 2',
                  textAlign: 'center',
                  fontSize: '40px',
                  lineHeight: '1.8',
                  marginLeft: '-60px',
                  color: '#004d86',
                  whiteSpace: 'nowrap',
                }}
              >
                <p style={{ margin: 0, textIndent: '2em', border: 'none' }}>
                  รายงานการปฏิบัติ จิตอาสา 904 และจิตอาสาพระราชทาน
                </p>
                <p style={{ margin: 0, border: 'none' }}>
                  ศูนย์จิตอาสา หน่วยบัญชาการทหารพัฒนา เราทำความ ดี ด้วยหัวใจ
                </p>
              </div>

              {/* logo 2 */}
              <img
                src="/images/image_logo_02.png"
                alt="ตรา2"
                style={{
                  width: '100%',
                  maxWidth: '140px',
                  height: 'auto',
                  marginLeft: '90px',
                }}
              />

              {/* date */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: '20px',
                  gap: '2px',
                }}
              >
                <div
                  style={{
                    fontSize: '37px',
                    color:'#004d86',
                    padding: '5px 20px',
                    border:'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ประจำวันที่ {new Date(date).toLocaleDateString('th-TH',
                    { year: 'numeric', month: 'short', day: 'numeric' }
                  )} 
                </div>
                <div
                  style={{
                    padding: '8px 25px',
                    borderRadius: '50px',
                    border: '5px solid #00bfff',
                    background: '#fff',
                    minWidth: '140px',
                    textAlign: 'center',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    color: '#04abcc',
                    marginTop: '10px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'TH Sarabun New, sans-serif',
                  }}
                >
                  {formType === 'development' ? (
                    <>จิตอาสาพัฒนา</>
                  ) : formType === 'disaster' ? (
                    <>จิตอาสาภัยพิบัติ</>
                  ) : (
                    <>จิตอาสาเฉพาะกิจ</>
                  )}
                </div>
              </div>
            </div>

            {/* Body */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gridGap: '20px',
                height: '550px',
                flexShrink: 0,
                border: 'none',
              }}
            >
              <div
                style={{
                  gridRow: '1 / span 2',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#2266aa',
                  border: 'none',
                }}
              >
                {images[0] && (
                  <img
                    src={URL.createObjectURL(images[0])}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      border: 'none',
                    }}
                  />
                )}
              </div>

              {images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#2266aa',
                    border: 'none',
                  }}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      border: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Details */}
            <div
              style={{
                background: '#3b9ace',
                borderRadius: '30px',
                padding: '20px',
                color: '#000000',
                fontSize: '36px',
                lineHeight: '1.6',
                minHeight: '150px',
                whiteSpace: 'pre-wrap', // ให้เว้นบรรทัด
                wordBreak: 'break-word', // ตัดคำ
                textIndent: '2em',
                height: '300px',
                border: '3px solid #004d86',
              }}
            >
              {details}
            </div>
          </div>

          {/* Download / Back */}
          <div style={{
             position: 'absolute',
             bottom: '10px',
             left: '20%',
             transform: 'translate(5%, 200%)',
             gap: '10px',
             display: 'flex',
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                background: '#28a745',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              📥 ดาวน์โหลดเป็น PNG
            </button>

            <button
              onClick={() => setShowPreview(false)}
              style={{
                background: '#6c757d',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              🔙 กลับไปแก้ไข
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
