package com.emginfo.emgnavi.user.service.impl;

import com.emginfo.emgnavi.user.model.dto.*;
import com.emginfo.emgnavi.user.model.mapper.UserMapper;
import com.emginfo.emgnavi.user.model.vo.Token;
import com.emginfo.emgnavi.user.model.vo.User;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import com.emginfo.emgnavi.user.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    private final DefaultMessageService messageService;
    private UserMapper mapper;
    private RestTemplate restTemplate;

    private static final String kakaoRestApiKey = "43916dfc99b7a10c04471fb22501a64e";
//    private static final String kakaoRedirectUri = "https://127.0.0.1:3000/kakao/callback";
    private static final String kakaoRedirectUri = "https://192.168.60.245:3000/kakao/callback";
    private static final String kakaoTokenUri = "https://kauth.kakao.com/oauth/token";

    private static final String naverClientId = "HybacJJgFsuLnLngHigE";
    private static final String naverClientSecret = "JofjIZZUKG";
    private static final String naverTokenUri = "https://nid.naver.com/oauth2.0/token";

    private static final String googleClientId = "827647998514-r5d3r90h5gpdmnsufack8vq2p1n5a0hi.apps.googleusercontent.com";
    private static final String googleClientSecret = "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";
    private static final String googleTokenUri = "https://oauth2.googleapis.com/token";
    private static final String googleRedirectUri = "https://127.0.0.1:3000/google/callback";

    public UserServiceImpl(UserMapper mapper) {
        this.messageService = NurigoApp.INSTANCE.initialize("NCSY6JZLRXVWS3BX", "RDC9PGPKKGCSIQSWT4IFHK0NNO1IOVW1", "https://api.coolsms.co.kr");
        this.mapper = mapper;
        this.restTemplate = new RestTemplate();
    }

    @Override
    public SingleMessageSentResponse sendVerificationCode(String userPhone, String verificationCode) {
        Message message = new Message();
        message.setFrom("01053248588");

        message.setTo(userPhone);

        message.setText("[응급NAVI] 인증번호[" + verificationCode + "]를 화면에 입력해주세요");
        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));

        return response;
    }

    @Override
    public int insertUser(UserInfoRequest request) {
        int result = mapper.insertUser(request);
        return result;
    }

    @Override
    public int checkIdDuplicate(UserIdRequest request) {
        int result = mapper.checkIdDuplicate(request);
        return result;
    }

    @Override
    public int checkNicknameDuplicate(UserNicknameRequest request) {
        int result = mapper.checkNicknameDuplicate(request);
        return result;
    }

    @Override
    public User selectIdByPhone(VerifyPhoneRequest request) {
        User user = mapper.selectIdByPhone(request);
        return user;
    }

    @Override
    public User checkLogin(LoginRequest request) {
        User user = mapper.checkLogin(request);
        return user;
    }

    @Override
    public User selectUserbyId(UserInfoRequest request) {
        User user = mapper.selectUserById(request);
        return user;
    }

    @Override
    public User selectUserbyId(UserIdRequest request) {
        User user = mapper.selectUserById(request);
        return user;
    }

    @Override
    public int modifyUser(UserInfoRequest request) {
        int result = mapper.modifyUser(request);
        return result;
    }

    @Override
    public int changePw(LoginRequest request) {
        int result = mapper.changePw(request);
        return result;
    }

    @Override
    public void saveResetToken(String userId, String tokenId) {
        mapper.saveResetToken(userId, tokenId);
    }

    @Override
    public boolean resetPassword(String tokenId, String userPw) {
        Token token = mapper.selectTokenById(tokenId);
        if (token != null) {
            UserIdRequest request = new UserIdRequest();
            request.setUserId(token.getUserId());
            User user = mapper.selectUserById(request);
            if(user != null) {
                LoginRequest request1 = new LoginRequest();
                request1.setUserId(token.getUserId());
                request1.setUserPw(userPw);
                mapper.changePw(request1);
                mapper.deleteToken(tokenId);
                return true;
            }
        }
        return false;
    }

    @Override
    public int deleteUser(UserIdRequest request) {
        int result = mapper.deleteUser(request);
        return result;
    }

    @Override
    public int changePhone(ChangePhoneRequest request) {
        int result = mapper.changePhone(request);
        return result;
    }

    @Override
    public String getKaKaoAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoRestApiKey);
        params.add("redirect_url", kakaoRedirectUri);
        params.add("code", code);

        ResponseEntity<Map> response = restTemplate.postForEntity(kakaoTokenUri, params, Map.class);
        Map responseBody = response.getBody();
        return (String) responseBody.get("access_token");
    }

    @Override
    public String getNaverAccessToken(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", naverClientId);
        params.add("client_secret", naverClientSecret);
        params.add("code", code);

        ResponseEntity<Map> response = restTemplate.postForEntity(naverTokenUri, params, Map.class);
        Map responseBody = response.getBody();
        return (String) responseBody.get("access_token");
    }

    @Override
    public String getGoogleAccessToken(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("redirect_uri", googleRedirectUri);
        params.add("code", code);

        ResponseEntity<Map> response = restTemplate.postForEntity(googleTokenUri, params, Map.class);
        Map responseBody = response.getBody();
        return (String) responseBody.get("access_token");
    }

    @Override
    public HashMap<String, Object> getKakaoUserInfo(String accessToken) {
        HashMap<String, Object> kakaoInfo = new HashMap<>();
        String postURL = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(postURL, HttpMethod.POST, entity, Map.class);
        Map<String, Object> body = response.getBody();
        if (body != null) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) body.get("kakao_account");
            String email = (String) kakaoAccount.get("email");
            String phone = (String) kakaoAccount.get("phone_number");
            String gender = (String) kakaoAccount.get("gender");
            String name = (String) kakaoAccount.get("name");
            kakaoInfo.put("email", email);
            kakaoInfo.put("phone_number", phone);
            kakaoInfo.put("gender", gender);
            kakaoInfo.put("name", name);
        }
        return kakaoInfo;
    }

    @Override
    public HashMap<String, Object> getNaverUserInfo(String accessToken) {
        HashMap<String, Object> naverInfo = new HashMap<>();
        String postURL = "https://openapi.naver.com/v1/nid/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(postURL, HttpMethod.POST, entity, Map.class);
        Map<String, Object> body = response.getBody();
        if (body != null) {
            Map<String, Object> naverAccount = (Map<String, Object>) body.get("response");
            String email = (String) naverAccount.get("email");
            String phone = (String) naverAccount.get("mobile");
            String gender = (String) naverAccount.get("gender");
            String name = (String) naverAccount.get("name");
            naverInfo.put("email", email);
            naverInfo.put("phone_number", phone);
            naverInfo.put("gender", gender);
            naverInfo.put("name", name);
        }
        return naverInfo;
    }

    @Override
    public HashMap<String, Object> getGoogleUserInfo(String accessToken) {
        HashMap<String, Object> googleInfo = new HashMap<>();
        String postURL = "https://www.googleapis.com/userinfo/v2/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(postURL, HttpMethod.GET, entity, Map.class);
        Map<String, Object> googleAccount = response.getBody();
        String email = (String) googleAccount.get("email");
        String name = (String) googleAccount.get("name");
        googleInfo.put("email", email);
        googleInfo.put("name", name);
        return googleInfo;
    }

    @Override
    public User selectUserbyId(String userId) {
        User user = mapper.selectUserById(userId);
        return user;
    }

    @Override
    public String convertGender(String gender) {
        if (gender == null) {
            return ""; // null 값 처리
        }
        switch (gender.toLowerCase()) {
            case "female":
                return "F";
            case "male":
                return "M";
            default:
                return gender; // 변환되지 않은 값은 그대로 반환
        }
    }

    @Override
    public String convertPhone(String phone) {
        // 1. "+82"를 "0"으로 대체
        if (phone.startsWith("+82")) {
            phone = phone.replaceFirst("\\+82", "0");
        }
        // 2. 모든 하이픈("-") 제거
        phone = phone.replaceAll("-", "");
        // 3. 공백도 제거
        phone = phone.replaceAll("\\s+", "");
        return phone;
    }
}
