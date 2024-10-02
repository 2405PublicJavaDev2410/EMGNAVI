import { useEffect } from 'react'

const GetNoticeList = () => {

    useEffect(() => {
        function onGeoOkay(position) {
            console.log(position);
        }

        function onGeoError() {
            alert("I can't find you. No weather for you.");
        }

        navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
    }, []);

    return (
        <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white w-[100%] h-[2143px] relative">

            <div className="absolute left-0 top-[1911px] w-[100%] h-[232px] bg-[#000] overflow-hidden">
                <div className="absolute left-[136px] top-[41px] w-[117px] h-[126px] flex">
                    <div className="absolute left-[13px] top-[97px] text-[24px] font-['Advent_Pro'] font-black text-[#333] whitespace-nowrap">응급NAVI</div>
                    <img className="absolute left-0 top-0" width="117" height="100" src="/img/user/logo.png"></img>
                </div>
                <div className="absolute left-[390px] top-[62px] w-[638px] h-[115px] flex">
                    <div className="absolute left-0 top-[54px] w-[638px] h-[61px] flex">
                        <div className="absolute left-0 top-0 w-[638px] h-[61px] text-[14px] leading-[150%] font-['Agdasima'] font-bold text-[#686868]">서울 중구 남대문로 120 대일빌딩 2층, 3층 KH정보교육원 종로지원     |     대표자명 : 민봉식     |     대표전화 : 1544-9970<br />     2024 응급NAVI.<br /></div>
                        <img className="absolute left-[2px] top-[27px]" width="9" height="8" src="/img/user/copyright (1) 1150_102.png"></img>
                    </div>
                    <div className="absolute left-0 top-0 w-[221px] h-[21px] text-[15px] leading-[150%] font-['Agdasima'] font-bold text-[#686868]">이용약관              개인정보처리방침</div>
                </div>
                <img className="absolute left-[1634px] top-[47px]" width="145" height="34" src="/img/user/Group 17150_104.png"></img>
            </div>
            
            <div className="absolute w-[100%] h-[1911px] top-0 left-0">
            <div className="absolute w-[100%] h-[1787px] top-[124px] left-0">
                <div className="relative h-[1787px]">
                <div className="absolute w-[100%] h-[194px] top-0 left-0 bg-[#0b2d85]">
                    <div className="w-[145px] h-[38px] top-[38px] left-[335px] [font-family:'Inter',Helvetica] font-bold text-white text-[32px] leading-[normal] whitespace-nowrap absolute tracking-[0]">
                    공지사항
                    </div>
                </div>
                <div className="absolute w-[1300px] h-[1675px] top-[119px] left-[310px] rounded-[10px_10px_0px_0px] overflow-hidden">
                    <div className="absolute w-[949px] h-16 top-[1546px] left-[178px] bg-[url(/img/notice/image-55.png)] bg-cover bg-[50%_50%]" />
                    <div className="absolute w-[1300px] h-[1505px] top-0 left-0">
                    <img
                        className="h-[754px] top-[751px] absolute w-[1300px] left-0 object-cover"
                        alt="Image"
                        src="/img/notice/image-54.png"
                    />
                    <img
                        className="h-[758px] top-0 absolute w-[1300px] left-0 object-cover"
                        alt="Image"
                        src="/img/notice/image-52.png"
                    />
                    </div>
                </div>
                </div>
            </div>

            <div className="absolute left-0 top-0 w-[100%] h-[161px] overflow-hidden">
                <div className="absolute left-0 top-0 w-[100%] h-[155px] flex">
                    <div className="absolute left-0 top-[31px] w-[100%] h-[93px] flex">
                        <div className="absolute left-0 top-0 w-[100%] h-[93px] bg-[#fff]"></div>
                    </div>
                    <div className="absolute left-0 top-0 w-[100%] h-[31px] flex">
                        <div className="absolute left-0 top-0 w-[100%] h-[31px] flex">
                            <div className="absolute left-0 top-0 w-[100%] h-[31px] bg-[#0b2d85]"></div>
                            <div className="absolute left-0 top-[4px] w-[100%] h-[27px] flex">
                                <div className="absolute left-[1865px] top-0 w-[55px] h-[27px] text-[16px]"><span className="font-['Inter'] font-extralight text-[#7d8597]">|</span><span className="font-['Inter'] font-semibold text-[#fff]"> </span></div>
                                <div className="absolute left-[1778px] top-0 w-[87px] h-[27px] text-[16px] font-['Inter'] font-medium text-[#fff] text-center">회원가입</div>
                                <div className="absolute left-[1773px] top-0 w-[5px] h-[27px] text-[16px]"><span className="font-['Inter'] font-extralight text-[#7d8597]">|</span><span className="font-['Inter'] font-semibold text-[#fff]"> </span></div>
                                <div className="absolute left-[1697px] top-0 w-[76px] h-[27px] text-[16px] font-['Inter'] font-medium text-[#fff] text-center">로그인</div>
                                <div className="absolute left-0 top-0 w-[1697px] h-[27px] text-[16px] font-['Inter'] font-extralight text-[#7d8597] text-right">|</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-[857px] top-0 w-[207px] h-[155px] flex">
                        <img className="absolute left-0 right-0 top-0 bottom-0" width="206" height="154" src="/img/user/bg279_183.png"></img>
                        <img className="absolute left-[2.21%] right-[2.8%] top-0 bottom-[2.63%]" width="196" height="150" src="/img/user/line279_184.png"></img>
                        <div className="absolute left-[24px] top-[6px] w-[159px] h-[123px] flex">
                            <div className="absolute left-0 top-[95px] w-[159px] h-[28px] text-[24px] font-['Advent_Pro'] font-black text-[#0b2d85] text-center">응급NAVI</div>
                            <img className="absolute left-[24px] top-0" width="111" height="97" src="/img/user/file 1279_187.png"></img>
                        </div>
                    </div>
                </div>
                <div className="absolute left-[264px] top-[60px] w-[1393px] h-[23px] flex">
                    <div className="absolute left-[401px] top-0 text-[16px] font-['Jost'] font-bold text-[#000] whitespace-nowrap">주변약국</div>
                    <div className="absolute left-[208px] top-0 text-[16px] font-['Jost'] font-bold text-[#000] whitespace-nowrap">주변병원</div>
                    <div className="absolute left-[869px] top-0 w-[147px] text-[16px] font-['Jost'] font-bold text-[#000]">자동제세동기(AED)</div>
                    <div className="absolute left-[1136px] top-0 text-[16px] font-['Jost'] font-bold text-[#000] whitespace-nowrap">이용안내</div>
                    <div className="absolute left-[1329px] top-0 text-[16px] font-['Jost'] font-bold text-[#000] whitespace-nowrap"> 공지사항</div>
                    <div className="absolute left-0 top-0 text-[16px] font-['Jost'] font-bold text-[#000] whitespace-nowrap">주변응급실</div>
                </div>
            </div>

            </div>
        </div>
        </div>
    );
};

export default GetNoticeList