'use client';

import { useEffect, useState } from 'react';

const unitOptions: Record<string, string[]> = {
  'ศจส.บก.สนก.1 นทพ.': ['ศจส.นพค11 สนภ.1 นทพ.', 'ศจส.นพค12 สนภ.1 นทพ.', 'ศจส.นพค13 สนภ.1 นทพ.', 'ศจส.นพค14 สนภ.1 นทพ.', 'ศจส.นพค15 สนภ.1 นทพ.', 'ศจส.นพค16 สนภ.1 นทพ.', 'ศจส.วส.934 สนภ.1 นทพ.'],
  'ศจส.บก.สนก.2 นทพ.': ['ศจส.นพค21 สนภ.2 นทพ.', 'ศจส.นพค22 สนภ.2 นทพ.', 'ศจส.นพค23 สนภ.2 นทพ.', 'ศจส.นพค24 สนภ.2 นทพ.', 'ศจส.นพค25 สนภ.2 นทพ.', 'ศจส.นพค26 สนภ.2 นทพ.', 'ศจส.วส.909 สนภ.2 นทพ.'],
  'ศจส.บก.สนก.3 นทพ.': ['ศจส.นพค31 สนภ.3 นทพ.', 'ศจส.นพค32 สนภ.3 นทพ.', 'ศจส.นพค33 สนภ.3 นทพ.', 'ศจส.นพค34 สนภ.3 นทพ.', 'ศจส.นพค35 สนภ.3 นทพ.', 'ศจส.นพค36 สนภ.3 นทพ.', 'ศจส.วส.914 สนภ.3 นทพ.'],
  'ศจส.บก.สนก.4 นทพ.': ['ศจส.นพค41 สนภ.4 นทพ.', 'ศจส.นพค42 สนภ.4 นทพ.', 'ศจส.นพค43 สนภ.4 นทพ.', 'ศจส.นพค44 สนภ.4 นทพ.', 'ศจส.นพค45 สนภ.4 นทพ.', 'ศจส.นพค46 สนภ.4 นทพ.', 'ศจส.วส.912 สนภ.4 นทพ.'],
  'ศจส.บก.สนก.5 นทพ.': ['ศจส.นพค51 สนภ.5 นทพ.', 'ศจส.นพค52 สนภ.5 นทพ.', 'ศจส.นพค53 สนภ.5 นทพ.', 'ศจส.นพค54 สนภ.5 นทพ.', 'ศจส.นพค55 สนภ.5 นทพ.', 'ศจส.นพค56 สนภ.5 นทพ.', 'ศจส.วส.921 สนภ.5 นทพ.'],
  'เพิ่มเติม': ['ศจส.สทพ.นทพ.', 'ศจส.กกส.สทพ.นทพ.', 'ศจส.กสข.สทพ.นทพ.', 'ศจส.นกส.1 สทพ.นทพ.', 'ศจส.นกส.2 สทพ.นทพ.', 'ศจส.นกส.3 สทพ.นทพ.', 'ศจส.นกส.4 สทพ.นทพ.', 'ศจส.นกส.5 สทพ.นทพ.', 'ศจส.สสน.นทพ.', 'ศจส.สนร.นทพ.', 'ศจส.นพศ.นทพ.', 'ศจส.ศฝภ.นทพ.'],
};

const allSubUnits = Object.values(unitOptions).flat();

const formatFormType = (type: string) => {
  switch (type) {
    case 'development':
      return 'จิตอาสาพัฒนา';
    case 'disaster':
      return 'จิตอาสาภัยพิบัติ';
    case 'special':
      return 'จิตอาสาเฉพาะกิจ';
    default:
      return type;
  }
};

export default function Admin() {
  const [records, setRecords] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [formTypeFilter, setFormTypeFilter] = useState('');

  useEffect(() => {
    fetch('/api/all')
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let data = [...records];

    if (unitFilter) {
      data = data.filter((rec) => rec.subUnit === unitFilter);
    }

    if (startDate) {
      data = data.filter((rec) => rec.date >= startDate);
    }

    if (endDate) {
      data = data.filter((rec) => rec.date <= endDate);
    }

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      data = data.filter((rec) => rec.details.toLowerCase().includes(lowerSearch));
    }

    if (formTypeFilter) {
      data = data.filter((rec) => rec.formType === formTypeFilter);
    }

    setFiltered(data);
  }, [search, unitFilter, startDate, endDate, formTypeFilter, records]);

  const handleEdit = (id: string, currentDetail: string) => {
  const newDetail = prompt('แก้ไขรายละเอียด', currentDetail);
  if (newDetail !== null) {
    fetch(`/api/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ details: newDetail }),
      })
      .then(() => location.reload());
    }
  };

const handleDelete = (id: string) => {
  if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?')) {
    fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    }).then(() => location.reload());
  }
};

  return (
    <div className="p-4 bg-gradient-to-br from-lime-200 to-teal-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-md border-4 border-blue-400 rounded-2xl shadow-xl overflow-x-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          📊 ระบบจัดการข้อมูล Admin
        </h1>

        <div className="mb-6 bg-white/50 border border-blue-300 p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-sm text-blue-800 mb-1">หน่วยงาน</label>
            <select
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              className="border border-blue-400 rounded px-3 py-2"
            >
              <option value="">-- แสดงทั้งหมด --</option>
              {allSubUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-blue-800 mb-1">ตั้งแต่วันที่</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-blue-400 rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-blue-800 mb-1">ประเภทจิตอาสา</label>
            <select
              value={formTypeFilter}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') setFormTypeFilter('');
                else if (val === 'จิตอาสาพัฒนา') setFormTypeFilter('development');
                else if (val === 'จิตอาสาภัยพิบัติ') setFormTypeFilter('disaster');
                else if (val === 'จิตอาสาเฉพาะกิจ') setFormTypeFilter('special');
              }}
              className="border border-blue-400 rounded px-3 py-2"
            >
              <option value="">-- แสดงทั้งหมด --</option>
              <option value="จิตอาสาพัฒนา">จิตอาสาพัฒนา</option>
              <option value="จิตอาสาภัยพิบัติ">จิตอาสาภัยพิบัติ</option>
              <option value="จิตอาสาเฉพาะกิจ">จิตอาสาเฉพาะกิจ</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-blue-800 mb-1">ถึงวันที่</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-blue-400 rounded px-3 py-2"
            />
          </div>

        </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 mb-6">
            <div className="flex col-span-3">
              <input
                type="text"
                placeholder="ค้นหาคำในรายละเอียด..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-blue-400 rounded px-3 py-2 w-full"
              />
            </div>
            <button
              onClick={() => {
              const lowerSearch = search.toLowerCase();
              const data = records.filter((rec) =>
                rec.details.toLowerCase().includes(lowerSearch)
              );
              setFiltered(data);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-20px rounded"
          >
            🔍 ค้นหา
            </button>
          </div>

        <table className="w-full table-auto border border-blue-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gradient-to-r from-lime-300 to-teal-200 text-gray-800">
            <tr>
              <th className="border px-4 py-2">หน่วยงาน</th>
              <th className="border px-4 py-2">ประเภทจิตอาสา</th>
              <th className="border px-4 py-2">วันที่</th>
              <th className="border px-4 py-2">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rec, idx) => (
              <tr key={idx} className="even:bg-white/50 odd:bg-white/30 transition hover:bg-yellow-50">
                <td className="border px-4 py-2 ">{rec.subUnit}</td>
                <td className="border px-4 py-2">{formatFormType(rec.formType)}</td>
                <td className="border px-4 py-2">{rec.date}</td>
                <td className="border px-4 py-2 whitespace-pre-wrap break-words relative group" title={rec.details}>
                  {rec.details}
                  <div className='mt-2 flex gap-2'>
                    <button
                      onClick={() => navigator.clipboard.writeText(rec.details)}
                      className="bg-blue-500 hover:bg-blue-600  hover:pointer text-white font-semibold py-1 px-3 rounded shadow-md transition duration-200"
                    >
                      📋 Coppy
                    </button>
                    <button
                      onClick={() => handleEdit(rec._id, rec.details)}
                      className="bg-yellow-400 hover:bg-yellow-500 hover:pointer text-white font-semibold py-1 px-3 rounded shadow-md transition duration-200"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(rec._id)}
                      className="bg-red-500 hover:bg-red-600 hover:pointer text-white font-semibold py-1 px-3 rounded shadow-md transition duration-200"
                    >
                      🗑️ Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  ไม่มีข้อมูลตรงกับเงื่อนไขที่เลือก
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
