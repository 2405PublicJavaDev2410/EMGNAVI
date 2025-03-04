package com.emginfo.emgnavi.report.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReportActionDTO {
    @NotNull
    private String targetId; // 정지 대상 Id
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate unfreezeDate; // 정지 해제 날짜
}
