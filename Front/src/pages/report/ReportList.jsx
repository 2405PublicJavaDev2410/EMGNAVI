import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';

export const ReportList = () => {
  const [reportList, setReportList] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const [targetId, setTargetId] = useState("");
  const [unfreezeDate, setUnfreezeDate] = useState("");

  const openModal = (id) => {
    setOpenModalId(id);
    const report = reportList[id];
    setTargetId(report.targetId || "");
    setUnfreezeDate(report.unfreezeDate || "");
  };

  const closeModal = () => {
    setOpenModalId(null);
    setTargetId(""); // 모달 닫을 때 targetId 초기화
    setUnfreezeDate(""); // 모달 닫을 때 날짜 초기화
  };  

  const selectedReport = openModalId !== null ? reportList[openModalId] : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 관리자 권한 확인
        const currentUserId = localStorage.getItem('userId');
        if (currentUserId !== 'admin') {
          alert('접근 권한이 없습니다.');
          navigate('/');
          return;
        }
        const res = await axios.get('/api/admin/reportList');
        setReportList(res.data.data);
      } catch (err){
        console.error("Report list fetch error:", err.response?.data || err.message);
        throw err;
      }
    };
    fetchData();
  }, [userId, navigate])

  const reportAction = async (no, targetId, unfreezeDate) => {
    try {
      const response = await axios.post(`/api/reports/${no}`, {
        targetId: targetId,
        unfreezeDate: unfreezeDate,
      });
      console.log('신고 처리 성공 : ', response.data);
      return response.data;
    } catch(error) {
      console.log('신고 처리 오류 : ', error.response?.data || error.mesage);
      throw error;
    }
  }

  const handleConfirm = async () => {
    if (!unfreezeDate) {
      alert('정지 날짜를 선택해주세요');
      return; 
    }
    if (!targetId) {
      alert('정지 시킬 회원을 선택해주세요');
      return;
    }

    if (selectedReport) {
      try {
        const result = await reportAction(selectedReport.no, targetId, unfreezeDate);
        const updatedList = reportList.map(report =>
          report.no === selectedReport.no 
            ? { ...report, status: 1, targetId: result.targetId, unfreezeDate: result.unfreezeDate } 
            : report
        );
        setReportList(updatedList); // 업데이트된 리스트 반영
        closeModal();
      } catch (error) {
        console.error('신고 처리 오류 : ', error.response?.data || error.message);
      }
    }
  };

  // 리뷰 내용 글자 수 제한
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'; // 지정된 글자수 초과 시 잘라내고 ... 표시
    }
    return text;
  };

  const handleTargetIdChange = (e) => {
    setTargetId(e.target.value);
    console.log(`TargetId changed to: ${e.target.value}`);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <main className="flex-grow bg-white py-10">
        <div className="relative mx-auto top-[70px] bg-white rounded-lg p-8">
          <div className="absolute top-0 left-0 right-0 w-[100%] h-[194px] bg-[#850B2D] rounded-t-lg"></div>
          <div className="flex justify-center">
            <div className="w-[1490px]">
                <div className="relative w-full left-[30px] top-[50px] h-[80px] text-white text-3xl font-bold mb-8 flex">
                    회원 신고 리스트
                </div>
                <table className="relative w-full p-3 top-[2px] bg-white rounded-tr-lg rounded-tl-lg overflow-hidden">
                    <thead className="p-3">
                      <tr className="bg-[#FFF5F6]">
                          <th className="p-3 font-bold"></th>
                          <th className="p-3 font-bold">작성자 아이디</th>
                          <th className="p-3 font-bold">리뷰 내용</th>
                          <th className="p-3 font-bold">신고자 아이디</th>
                          <th className="p-3 font-bold">신고 날짜</th>
                          <th className="p-3 font-bold">신고 내용</th>
                          <th className="p-3 font-bold">신고 상태</th>
                          <th className="p-3 font-bold">정지 해제 날짜</th>
                          <th className="p-3 font-bold"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      reportList.length === 0 ? 
                      (
                        <tr className="h-[300px]">
                          <td colSpan="9" className="text-center">
                            <div className="flex items-center justify-center h-full">
                              <span className="font-bold text-lg">신고 내역이 없습니다.</span>
                            </div>
                          </td>
                        </tr>
                      )
                      :
                      (reportList.map((item, index) => (
                        <tr key={index}>
                            <td className="w-[3%] border-b p-3 text-center">{item.no}</td>
                            <td className="w-[12%] border-b p-3 text-center">{item.writerId}</td>
                            <td className="w-[23%] border-b p-3 text-center">{truncateText(item.reviewContent, 18)}</td>
                            <td className="w-[12%] border-b p-3 text-center">{item.reporterId}</td>
                            <td className="w-[10%] border-b p-3 text-center">{item.reportDate}</td>
                            <td className="w-[15%] border-b p-3 text-center">{item.content}</td>
                            <td className="w-[8%] border-b p-3 text-center">
                              {item.status === 0 ? "신고 접수" : "처리 완료"}</td>
                            <td className="w-[10%] border-b p-3 text-center">{item.unfreezeDate === null ? "-" : item.unfreezeDate}</td>
                            <td className="w-[10%] border-b p-3 text-center">
                                <button 
                                onClick={() => openModal(index)}
                                className="bg-[#CA1738] text-white px-4 py-1 rounded"
                                >
                                관리
                                </button>
                            </td>
                        </tr>
                      )))
                    }
                    </tbody>
                </table>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button className="mx-1 w-8 h-8 bg-[#CA1738] text-white rounded">1</button>
            <button className="mx-1 w-8 h-8 border border-[#CA1738] text-[#CA1738] rounded">2</button>
            <button className="mx-1 w-8 h-8 border border-[#CA1738] text-[#CA1738] rounded">3</button>
            <button className="mx-1 w-8 h-8 border border-[#CA1738] text-[#CA1738] rounded">4</button>
          </div>
        </div>
      </main>

      {/* {footer} */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/img/logo_white.png" alt="응급NAVI 로고" className="h-12" />
            <span className="ml-2 font-bold text-2xl">응급NAVI</span>
          </div>
          <div className="text-sm">
            <p>서울 중구 남대문로 120 대일빌딩 2,3층 KH정보교육원 종로지원</p>
            <p>대표자명 : 민용식 | 대표전화 : 1544-9970</p>
            <p>© 2024 응급NAVI.</p>
          </div>
        </div>
      </footer>

      <Modal 
        isOpen={openModalId !== null} 
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        {selectedReport && (
        <div className="bg-white w-[40rem] max-h-[90vh] p-8 rounded-lg shadow-lg flex flex-col overflow-auto">
          <div className="text-[#CA1738] text-3xl font-bold py-4 px-6 border-b border-[#e9e9e9]">
            신고 관리
          </div>
          <div className="px-6 py-4 space-y-4 flex-grow">
            {/* 작성자 정보 */}
            <div className="flex items-center">
              <span className="text-[0.94rem] font-bold inline-block w-28">작성자</span>
              <span>{selectedReport.writerId}</span>
            </div>
            
            {/* 신고자 정보 */}
            <div className="flex items-center">
              <span className="text-[0.94rem] font-bold inline-block w-28">신고자</span>
              <span>{selectedReport.reporterId}</span>
            </div>
            
            {/* 신고 날짜 */}
            <div className="flex items-center">
              <span className="text-[0.94rem] font-bold inline-block w-28">신고 날짜</span>
              <span>{selectedReport.reportDate}</span>
            </div>

            {/* 신고 내용 */}
            <div className="flex items-center">
              <span className="text-[0.94rem] font-bold inline-block w-28">신고 내용</span>
              <span>{selectedReport.content}</span>
            </div>

            {/* 리뷰 내용 */}
            <div className="flex flex-col">
              <span className="text-[0.94rem] font-bold inline-block w-28">리뷰 내용</span>
              <span className="w-full p-3 mt-2 bg-[#f5f5f5] rounded h-[100px] overflow-y-auto">{selectedReport.reviewContent}</span>
            </div>

            {selectedReport.status === 0 ? (
                <>
                    {/* 정지 시킬 회원 */}
                    <div className="flex items-center">
                        <span className="text-[0.94rem] font-bold inline-block w-28">정지 시킬 회원</span>
                        <label className="mr-4">
                            <input className="mr-1 accent-[#CA1738]" type="radio" name="unfreeze" 
                            value={selectedReport.writerId}
                            onChange={handleTargetIdChange}
                            checked={targetId === selectedReport.writerId}
                            required/> 작성자
                        </label>
                        <label>
                            <input className="mr-1 accent-[#CA1738]" type="radio" name="unfreeze" 
                            value={selectedReport.reporterId}
                            onChange={handleTargetIdChange}
                            checked={targetId === selectedReport.reporterId}
                            /> 신고자
                        </label>
                    </div>

                    {/* 정지 기간 */}
                    <div className="flex items-center">
                        <span className="text-[0.94rem] font-bold inline-block w-28">정지 기간</span>
                        <input className="py-1 px-2 rounded border border-[#e0e0e0]" type="date"
                        value={unfreezeDate} 
                        onChange={(e) => setUnfreezeDate(e.target.value)}
                        required/>
                    </div>
                </>
            ) : (
                <div className="p-3 bg-[#f5f5f5] rounded flex flex-col">
                    <div className="pb-3">
                        <span className="text-[0.94rem] font-bold inline-block w-28 text-[#CA1738]">정지된 회원</span>
                        <span>{selectedReport.targetId}</span>
                    </div>
                    <div>
                        <span className="text-[0.94rem] font-bold inline-block w-28 text-[#CA1738]" 
                        value={unfreezeDate}
                        onChange={(e) => setUnfreezeDate(e.target.value)}
                        >정지 해제 날짜</span>
                        <span>{selectedReport.unfreezeDate}</span>
                    </div>
                </div>
            )}
        
            </div>
          {/* 확인 및 닫기 버튼 */}
          <div className="flex justify-end gap-4 px-6">
            {selectedReport.status === 0 && (
                <button className="text-white bg-[#ca1738] rounded py-2 px-5 text-sm font-bold hover:bg-[#a0122b]" onClick={handleConfirm}>
                확인
                </button>
            )}
            <button className="text-[#333] bg-white border border-[#e0e0e0] rounded py-2 px-5 text-sm font-bold hover:bg-[#f5f5f5]" onClick={closeModal}>
              닫기
            </button>
          </div>
            
        </div>
        )}
      </Modal>
    </div>
  );
};

export default ReportList;
