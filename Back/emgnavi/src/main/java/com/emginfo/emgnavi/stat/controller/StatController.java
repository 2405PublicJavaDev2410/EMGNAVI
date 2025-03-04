package com.emginfo.emgnavi.stat.controller;

import com.emginfo.emgnavi.common.success.SuccessCode;
import com.emginfo.emgnavi.common.success.SuccessResponse;
import com.emginfo.emgnavi.stat.service.StatService;
import com.emginfo.emgnavi.stat.vo.Stat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@RestController 를 사용했기 때문에 자동으로 return값(객체)를 JSON 형식으로 변환시켜서 보냄
@RestController
@CrossOrigin(origins = "https://127.0.0.1:3000")
//프로젝트에서 백엔드는 api 서버이기 때문에 URL 제일 앞단에 /api를 붙여준다
@RequestMapping("/api/stat")
public class StatController {

    @Autowired
    private StatService statService;

    @GetMapping("/getEmergencyStat")
    public SuccessResponse getEmergencyStat(String searchType, String statType, String keyword) {

        List<Stat> StatInfo = null;
        StatInfo = statService.getStatInfo(searchType, statType, keyword);
            //Day Of the Week
            //Hour Of the Day
            //AM PM by Day of the Week
        //      ##Return값 작성 예시##
        //      SuccessResponse(
        //            SuccessCode.[RESOURCE_FOUND,REGISTER_SUCCESS],    ##SuccessCode enum 객체에서 동작에 어울리는 메시지를 선택하면 된다(현재 등록 완료, 조회 성공 2가지가 있음)
        //            hospitals   ##요청을 보낸 웹 페이지로 보낼 데이터. SuccessResponse 객체의 필드로 저장되며 SuccessResponse째로 JSON 변환되어 요청 보냈던 페이지로 리턴
        //      )
        return new SuccessResponse(SuccessCode.RESOURCE_FOUND, StatInfo);
    }
}
