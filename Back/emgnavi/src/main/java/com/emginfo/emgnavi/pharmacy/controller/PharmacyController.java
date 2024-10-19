package com.emginfo.emgnavi.pharmacy.controller;

import com.emginfo.emgnavi.pharmacy.mapper.PharmacyMapper;
import com.emginfo.emgnavi.pharmacy.service.PharmacyService;
import com.emginfo.emgnavi.pharmacy.vo.Pharmacy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pharmacy")
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private PharmacyMapper pharmacyMapper;

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getPharmacyList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            int offset = page * size;
            List<Pharmacy> pharmacies = pharmacyService.getPharmacyList(offset, size);
            int totalCount = pharmacyMapper.getTotalCount();

            Map<String, Object> response = new HashMap<>();
            response.put("pharmacies", pharmacies);
            response.put("totalPages", (int) Math.ceil((double) totalCount / size));
            response.put("currentPage", page);
            response.put("totalItems", totalCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch pharmacy list");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/detail/{hpid}")
    public ResponseEntity<?> getPharmacyDetail(@PathVariable String hpid) {
        try {
            Pharmacy pharmacy = pharmacyService.getPharmacyDetail(hpid);
            if (pharmacy != null) {
                return ResponseEntity.ok(pharmacy);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pharmacy not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching pharmacy detail");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchPharmacy(
            @RequestParam(required = false) String dutyName,
            @RequestParam(required = false) String dutyAddr,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            List<Pharmacy> results = pharmacyService.searchPharmacy(dutyName, dutyAddr, page, size);
            int totalCount = pharmacyService.getSearchResultCount(dutyName, dutyAddr);

            Map<String, Object> response = new HashMap<>();
            response.put("pharmacies", results);
            response.put("totalPages", (int) Math.ceil((double) totalCount / size));
            response.put("currentPage", page);
            response.put("totalItems", totalCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to search pharmacies");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<?> autocomplete(
            @RequestParam String query,
            @RequestParam String searchType
    ) {
        try {
            if (query.length() < 2) {
                return ResponseEntity.ok(List.of());
            }

            List<Map<String, Object>> suggestions = pharmacyService.getAutocompleteSuggestions(query, searchType);

            if (suggestions.isEmpty()) {
                Map<String, Object> noResult = new HashMap<>();
                noResult.put("hpid", "no-result");
                noResult.put("dutyName", "검색 결과가 없습니다");
                noResult.put("dutyAddr", "");
                return ResponseEntity.ok(List.of(noResult));
            }

            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching autocomplete suggestions");
        }
    }
}