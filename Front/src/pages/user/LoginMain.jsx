import { useState, EventHandler, ReactNode, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxios from '../../axios/useAxios';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const LoginMain = () => {

    const { handleReload } = useContext(UserContext);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const nav = useNavigate();

    const handleMouseDown = () => {
        setIsPasswordVisible(true);
    };

    const handleMouseUp = () => {
        setIsPasswordVisible(false);
    };

    const handleLogin = async (e) => {
        if (e === 'Enter' || e.type === 'click') {
            if (!values.uEmail || !values.uPassword) {
                alert("아이디와 비밀번호를 입력해주세요.");
                return;
            }
            try {
                const response = await axios.post('/api/login', {
                    userId: values.uEmail,
                    userPw: values.uPassword,
                });
                if (response.status === 200) {
                    handleReload(true);
                    nav("/"); // 로그인 성공 후 리다이렉트
                }
            } catch (error) {
                console.error(error);
                alert(error.response?.data || "로그인 중 오류가 발생했습니다.");
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin('Enter');
        }
    };

    const handlerGoRegister = () => {
        nav("/user/register");
    };

    const handlerGoFindId = () => {
        nav("/user/findEmail");
    };

    const handlerGoFindPw = () => {
        nav("/user/findPw");
    };

    const kakaoLogin = () => {
        const REST_API_KEY = "43916dfc99b7a10c04471fb22501a64e";
        // const REDIRECT_URI = "https://127.0.0.1:3000/kakao/callback";
        const REDIRECT_URI = "https://192.168.60.245:3000/kakao/callback";
        const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

        window.location.href = kakaoUrl;
    }

    const naverLogin = () => {
        const NAVER_CLIENT_ID = "HybacJJgFsuLnLngHigE"; // 발급 받은 Client ID 입력 
        // const NAVER_CALLBACK_URL = "https://127.0.0.1:3000/naver/callback"; // 작성했던 Callback URL 입력
        const NAVER_CALLBACK_URL = "https://192.168.60.245:3000/naver/callback"; // 작성했던 Callback URL 입력
        const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}`;

        window.location.href = naverUrl;
    }

    const googleLogin = () => {
        const GOOGLE_CLIENT_ID = "827647998514-r5d3r90h5gpdmnsufack8vq2p1n5a0hi.apps.googleusercontent.com"
        const REDIRECT_URL = "https://127.0.0.1:3000/google/callback";
        const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=email profile`

        window.location.href = googleUrl;
    }

    const [values, setValues] = useState({
        uEmail: '',
        uPassword: '',
    });

    return (
        <>
            <div className="absolute left-[210px] top-[403px] w-[1500px] h-[937px] bg-[#7d85971a] rounded-[20px]"></div>
            <div className="absolute left-[787px] top-[842px] w-[346px] h-[23px] flex">
                <div
                    onClick={handlerGoRegister}
                    style={{ cursor: 'pointer' }}
                    className="absolute left-0 top-0 w-[77px] text-[16px] font-['Inter'] text-[#7d8597]">회원가입  </div>
                <div className="absolute left-[84px] top-0 w-[6px] text-[19px] font-['Inter'] text-[#7d8597]">|</div>
                <div className="absolute left-[209px] top-0 w-[6px] text-[19px] font-['Inter'] text-[#7d8597]">|</div>
                <div
                    onClick={handlerGoFindId}
                    style={{ cursor: 'pointer' }} className="absolute left-[97px] top-0 w-[105px] text-[16px] font-['Inter'] text-[#7d8597] text-center">아이디 찾기</div>
                <div
                    onClick={handlerGoFindPw}
                    style={{ cursor: 'pointer' }} className="absolute left-[222px] top-0 w-[124px] text-[16px] font-['Inter'] text-[#7d8597] text-center">비밀번호 찾기</div>
            </div>
            <div className="absolute left-0 top-[494px] w-[1920px] text-[28px] font-['Istok_Web'] font-bold text-[#0b2d85] text-center">응급NAVI</div>

            <div className="absolute left-[704px] top-[586px] w-[511px] h-[60px] flex">
                <div className="absolute left-0 top-0 w-[511px] h-[60px] bg-[#fff] border-[1px] border-solid border-[#7d8597] rounded-[5px]"></div>
                <input
                    type='text'
                    value={values.uEmail}
                    onChange={(e) => {
                        const value = e.target.value;
                        setValues({ ...values, uEmail: value }); // 값 업데이트
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder='아이디(이메일)를 입력해주세요.'
                    className="absolute left-[79px] top-1 w-[298px] h-[55px] text-[17px] font-['Inter'] text-[#7d8597] flex flex-col justify-center outline-0"></input>
                <img className="absolute left-[28px] top-[19px]" width="22" height="22" src="/img/user/user 185_14.png"></img>
            </div>


            <div className="absolute left-[704px] top-[659px] w-[511px] h-[60px] flex">
                <div className="absolute left-0 top-0 w-[511px] h-[60px] bg-[#fff] border-[1px] border-solid border-[#7d8597] rounded-[5px]"></div>
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={values.uPassword}
                    onChange={(e) => {
                        const value = e.target.value;
                        setValues({ ...values, uPassword: value });
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder='비밀번호를 입력해주세요.'
                    className="absolute left-[79px] top-1 w-[298px] h-[55px] text-[17px] font-['Inter'] text-[#7d8597] flex flex-col justify-center outline-0"></input>
                <img className="absolute left-[27px] top-[17px]" width="25" height="25" src="/img/user/padlock (1) 186_6.png"></img>

                <img
                    onMouseDown={() => handleMouseDown()}
                    onMouseUp={() => handleMouseUp()}
                    onMouseLeave={() => handleMouseUp()}
                    style={{ cursor: 'pointer' }}
                    className="absolute left-[460px] top-[20px]" width="20" height="20"
                    src="/img/user/eye.png">
                </img>
            </div>

            <div className="absolute left-[704px] top-[757px] w-[511px] h-[60px] flex">
                <button
                    type='button'
                    onClick={handleLogin}
                    className="absolute left-0 top-0 w-[511px] h-[60px] bg-[#0b2d85] border-[1px] border-solid border-[#fff] rounded-[5px]">
                    <span className="text-[18px] font-['Inter'] font-bold text-[#fff] text-center flex flex-col justify-center">로그인</span>
                </button>
            </div>
            <div className="absolute left-[704px] top-[932px] w-[150px] h-0 border-[1px] border-solid border-[#7d8597]"></div>
            <div className="absolute left-[1065px] top-[932px] w-[150px] h-0 border-[1px] border-solid border-[#7d8597]"></div>
            <div className="absolute left-[895px] top-[920px] text-[18px] font-['Inter'] font-semibold text-[#7d8597] whitespace-nowrap">SNS 간편 로그인</div>
            <div className="absolute left-[704px] top-[996px] w-[511px] h-[60px] flex">
                <div className="absolute left-0 top-0 w-[511px] h-[60px] flex bg-[#2DB400]">
                    <button type="button"
                        onClick={naverLogin}
                        className="absolute left-0 top-0 w-[511px]">
                        <span className="text-[18px] font-['Inter'] font-bold text-[#fff] text-center flex flex-col justify-center mt-4">네이버 로그인</span>
                    </button>
                </div>
                <img className="absolute left-[28px] top-[19px]" width="27" height="22" src="/img/user/n 186_30.png"></img>
            </div>

            <div className="absolute left-[704px] top-[1069px] w-[511px] h-[60px] flex">
                <div className="absolute left-0 top-0 w-[511px] h-[60px] flex">
                    <button
                        type="button"
                        onClick={kakaoLogin}
                        className="absolute left-0 top-0 w-[511px] h-[60px] bg-[#ffe100] border-[1px] border-solid border-[#fff] rounded-[5px]">
                        <span className="text-[18px] font-['Inter'] font-medium text-[#000] text-center flex flex-col justify-center">카카오톡 로그인</span>
                    </button>
                </div>
                <img className="absolute left-[24px] top-[14px]" width="36" height="32" src="/img/user/kakaotalk86_33.png"></img>
            </div>

            <div className="absolute left-[704px] top-[1142px] w-[511px] h-[60px] flex">
                <div className="absolute left-0 top-0 w-[511px] h-[60px] flex">
                    <button
                        type='button'
                        onClick={googleLogin}
                        className="absolute left-0 top-0 w-[511px] h-[60px] bg-[#fff] border-[1px] border-solid border-[#7d8597] rounded-[5px]">
                        <span className="text-[18px] font-['Inter'] text-[#686868] text-center flex flex-col justify-center">구글 로그인</span>
                    </button>
                </div>
                <img className="absolute left-[29px] top-[18px]" width="25" height="25" src="/img/user/search (1) 186_36.png"></img>
            </div>
            <div className="absolute left-0 top-[245px] w-[1920px] h-[47px] text-[40px] font-['Inter'] font-bold text-[#000] text-center">로그인</div>
            <div className="absolute left-0 top-[324px] w-[1920px] text-[15px] font-['Inter'] text-[#7d8597] text-center">응급NAVI 홈페이지에 방문해주신 여러분 진심으로 환영합니다.</div>
            <div className="absolute left-0 top-[1569px] w-[1920px] h-[232px] bg-[#000] overflow-hidden">
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

export default LoginMain