import { useContext, useEffect, useState } from 'react'
import Truncate from 'react-truncate';
import parse, { domToReact } from 'html-react-parser';
import { formatDate } from '../common/dateUtil';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const GetNoticeList = () => {

    const [notices, setNotices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('itemName'); // 'itemName' 또는 'entpName'
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);  // 총 페이지 수
    const itemsPerPage = 10;

    const { userId } = useContext(UserContext);

    const navigate = useNavigate();

    const fetchNotices = (page = 1) => {

        setIsLoading(true);
        setError(null);

        // 페이지와 검색어 기반으로 데이터 요청
        fetch(`/api/notice/list?page=${page - 1}&size=${itemsPerPage}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                setNotices(data.data.notices); // 받아온 공지 데이터를 State에 저장
                setTotalPages(data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching hospital data:', error);
            });

        // .then((data) => {
        //     setNotices(data.notices);  // 백엔드에서 받은 의약품 데이터
        //     setTotalPages(data.totalPages);  // 백엔드에서 받은 총 페이지 수
        //     setIsLoading(false);
        // })
        // .catch((error) => {
        //     console.error('There was an error fetching the medicine list!', error);
        //     setError('Failed to fetch medicines');
        //     setIsLoading(false);
        // });
    };

    useEffect(() => {
        fetchNotices(currentPage);
    }, [currentPage]);

    const handleSearch = () => {
        if (!searchQuery) return;
        setIsLoading(true);
        setError(null);

        // 검색 쿼리를 바탕으로 API 요청
        fetch(`/api/notice/search?${searchType}=${searchQuery}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                return response.json();
            })
            .then((data) => {
                setNotices(data.notices);  // 검색된 데이터 설정
                setTotalPages(data.totalPages);  // 검색된 데이터에 대한 총 페이지 수 설정
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error searching for medicine:', error);
                setError('Failed to search medicines');
                setIsLoading(false);
            });
    };

    useEffect(() => {

    }, [notices]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageButtons = () => {
        const maxVisiblePages = 10;
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

        const visiblePages = pageNumbers.slice(
            Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages,
            Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + maxVisiblePages
        );

        return (
            <div className="mr-[5px] flex justify-center mt-8 space-x-2">
                {currentPage > maxVisiblePages && (
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="bg-[#0b2d85] text-white px-3 py-1 rounded-md text-[22px] leading-[31px] font-bold"
                    >
                        {'<'}
                    </button>
                )}

                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${page === currentPage
                            ? 'bg-white text-[#0b2d85] border-2 border-[#0b2d85]'
                            : 'bg-[#0b2d85] text-white'
                            } px-3 py-1 rounded-md text-[22px] leading-[31px] font-bold`}
                    >
                        {page}
                    </button>
                ))}

                {currentPage < totalPages - maxVisiblePages + 1 && (
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="bg-[#0b2d85] text-white px-3 py-1 rounded-md text-[22px] leading-[31px] font-bold"
                    >
                        {'>'}
                    </button>
                )}
            </div>
        );
    };

    // 블록 요소 제거 함수
    const blockToInline = (html) => {
        const blockElements = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'];

        return parse(html, {
            replace: (domNode) => {
                // if (domNode.name === 'div' || domNode.name === 'p' || domNode.name === 'h1' || domNode.name === 'li') {
                if (blockElements.includes(domNode.name)) {
                    return (
                        <>
                            <span>{domToReact(domNode.children)}</span>
                            <br />
                        </>
                    );
                }
            }
        });
    };

    // 삭제 버튼 핸들러
    const handleDeleteBtn = (noticeId) => {

        const url = `/api/notice/delete?noticeId=${noticeId}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('data: ' + data);
                if (data === 1) {
                    //성공 처리
                    console.log('공지사항 삭제 성공');
                    alert('공지사항 삭제 성공');
                    window.location.href = 'https://127.0.0.1:3000/notice/getNoticeList';
                } else {
                    console.log('공지사항 삭제 실패');
                    alert('공지사항 삭제 실패');
                }
            })
            .catch(error => {
                console.error('Error fetching notice data:', error);
            });
    };

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[100%] relative">



                <div className="w-[100%]">
                    <div className="w-[100%] mt-[124px] left-0">
                        <div className="relative">
                            <div className="w-[100%] h-[194px] top-0 left-0 bg-[#0b2d85]">
                                <div className="w-[145px] h-[38px] top-[38px] left-[335px] [font-family:'Inter',Helvetica] font-bold text-white text-[32px] leading-[normal] whitespace-nowrap absolute tracking-[0]">
                                    공지사항
                                    {userId == 'admin' ? (<button onClick={() => window.location.href = 'postNotice'} className="ml-[30px] w-[100px] h-[45px] bg-[#f3f5f9] border-[1px] border-solid border-[#e3e9ef] rounded-[5px] text-[24px] font-['Inter'] font-medium text-[#000]">등록</button>) : ('')}
                                </div>
                            </div>
                            <div id='main' className="w-[100%] mt-[-75px]">
                                <div className="w-[1300px] ml-[310px]">

                                    <div className="bg-white border-t border-solid border-[#e5e7eb] p-10 rounded-[10px_10px_0px_0px]">
                                        {notices && notices.length > 0 ? (

                                            <div>
                                                {notices.map((notice) => (

                                                    <div id='div0' key={notice.noticeId} className="bg-white border-b border-gray-200 py-4 flex">
                                                        <div id='div1' className="flex-shrink-0 flex flex-col items-center text-sm text-gray-500 mb-2 w-[500px]">
                                                            <div className="flex items-center space-x-2">
                                                                <span>{notice.writerId}</span>
                                                                <span>&nbsp;|&nbsp;</span>
                                                                {/* <span>{notice.noticeDate}</span> */}
                                                                <span>{formatDate(notice.noticeDate)}</span>

                                                            </div>
                                                            <h2 className="text-xl font-bold mt-2 text-center" onClick={() => window.location.href = 'getNoticeDetail?noticeId=' + notice.noticeId}>{notice.noticeTitle}</h2>

                                                            {userId == 'admin' ? (
                                                                <div className="flex space-x-4">
                                                                    <button onClick={() => window.location.href = 'putNotice?noticeId=' + notice.noticeId} className="w-[100px] h-[35px] bg-[#f3f5f9] border-[1px] border-solid border-[#e3e9ef] rounded-[5px] text-[24px] font-['Inter'] font-medium text-[#000]">수정</button>
                                                                    <button onClick={() => handleDeleteBtn(notice.noticeId)} className="w-[100px] h-[35px] bg-[#0b2d85] rounded-[5px] text-[24px] font-['Inter'] font-medium text-[#fff] text-center">삭제</button>
                                                                </div>) : ('')}

                                                        </div>
                                                        <div id='div2' className='flex-grow min-w-0'>
                                                            <Truncate lines={3} ellipsis={<span>... <span className="text-gray-400 hover:underline cursor-pointer" onClick={() => window.location.href = 'getNoticeDetail?noticeId=' + notice.noticeId}>[상세보기]</span></span>}>
                                                                {blockToInline(notice.noticeContents)}
                                                            </Truncate>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        ) : (
                                            // 조회된 결과가 없을 때
                                            <div style={{ padding: '20px', textAlign: 'center', fontSize: '16px', color: '#999' }}>
                                                조회된 결과가 없습니다.
                                            </div>
                                        )}
                                        {/* 페이지네이션 */}
                                        {renderPageButtons()}
                                    </div>

                                </div>
                            </div>

                            <div className="w-full bg-black py-10">
                                <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
                                    <div className="mb-8 md:mb-0">
                                        <img className="w-[117px] h-[100px]" src="/img/footer/logo.png" alt="Logo" />
                                        <div className="mt-2 text-2xl font-black text-[#333] font-['Advent_Pro']">응급NAVI</div>
                                    </div>

                                    <div className="flex flex-col max-w-[638px]">
                                        <div className="mb-4 text-sm font-bold text-[#686868] font-['Agdasima']">
                                            이용약관              개인정보처리방침
                                        </div>
                                        <div className="text-sm leading-relaxed font-bold text-[#686868] font-['Agdasima']">
                                            서울 중구 남대문로 120 대일빌딩 2층, 3층 KH정보교육원 종로지원     |     대표자명 : 민봉식     |     대표전화 : 1544-9970
                                            <br />
                                            <span className="flex items-center">
                                                <img className="w-2 h-2 mr-1" src="/img/footer/copyright.png" alt="Copyright" />
                                                2024 응급NAVI.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-8 md:mt-0">
                                        <img className="w-[145px] h-[34px]" src="/img/footer/group.png" alt="Group" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GetNoticeList