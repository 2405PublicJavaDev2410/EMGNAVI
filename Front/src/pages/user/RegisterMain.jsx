import { useState, EventHandler, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterMain = () => {
    const nav = useNavigate();
    const handlerGoNextPage = () => {
        nav("/user/register/agree")
    }
    return (
        <>
            <div className="absolute left-0 top-[161px] w-[1920px] h-[908px]">
                <div className="absolute left-0 top-0 w-[1920px] h-[908px] bg-[#fff]"></div>
                <div className="absolute left-[210px] top-[264px] w-[1500px] h-[466px] bg-[#7d85971a] rounded-[20px]"></div>
                <div className="absolute left-0 top-[84px] w-[1920px] h-[47px] text-[40px] font-['Inter'] font-bold text-[#000] text-center">회원가입</div>
                <div className="absolute left-0 top-[477px] w-[1920px] h-[51px] text-[26px] font-['Inter'] font-semibold text-[#000] text-center">일반 회원가입</div>
                <div className="absolute left-0 top-[163px] w-[1920px] text-[15px] font-['Inter'] text-[#7d8597] text-center">회원가입 유형을 선택해주세요.</div>
                <div className="absolute left-0 top-[528px] w-[1920px] text-[16px] font-['Inter'] text-[#000] text-center">대한민국 국적의 일반인</div>
                <img className="absolute left-[932px] top-[350px]" width="56" height="64" src="/img/user/user.png"></img>
                <button onClick={handlerGoNextPage}
                className="absolute left-[868px] top-[607px] w-[184px] h-[60px] bg-[#fff] border-[1px] border-solid border-[#0b2d85] rounded-[50px]">
                <span className="text-[16px] font-['Inter'] text-[#0b2d85] whitespace-nowrap">가입하기</span>
                </button>
            </div>

            {/* footer */}
            <div className="absolute left-0 top-[1069px] w-[1920px] h-[232px] bg-[#000] overflow-hidden">
                <div className="absolute left-[136px] top-[41px] w-[117px] h-[126px] flex">
                    <div className="absolute left-[13px] top-[97px] text-[24px] font-['Advent_Pro'] font-black text-[#333] whitespace-nowrap">응급NAVI</div>
                    <img className="absolute left-0 top-0" width="117" height="100" src="/img/footer/logo.png"></img>
                </div>
                <img className="absolute left-[1634px] top-[47px]" width="145" height="34" src="/img/footer/group.png"></img>
                <div className="absolute left-[404px] top-[137px] w-[621px] h-[16px] text-[14px] leading-[150%] font-['Agdasima'] font-bold text-[#686868]">2024 응급NAVI.</div>
                <div className="absolute left-[390px] top-[62px] w-[742px] h-[90px] flex">
                    <div className="absolute left-0 top-[54px] w-[742px] h-[36px] flex">
                        <div className="absolute left-0 top-0 w-[742px] h-[16px] text-[14px] leading-[150%] font-['Agdasima'] font-bold text-[#686868]">서울 중구 남대문로 120 대일빌딩 2층, 3층 KH정보교육원 종로지원     |     대표자명 : 민봉식     |     대표전화 : 1544-997<br /></div>
                        <img className="absolute left-[2px] top-[27px]" width="9" height="8" src="/img/footer/copyright.png"></img>
                    </div>
                    <div className="absolute left-0 top-0 w-[221px] h-[21px] text-[15px] leading-[150%] font-['Agdasima'] font-bold text-[#686868]">이용약관              개인정보처리방침</div>
                </div>
            </div>
        </>)
}

export default RegisterMain